
import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendEmail, generateEmailHtml, ASSOCIATION_EMAIL } from "@/lib/email";

// Send emails independently so one failure doesn't stop another.
async function sendEmailsIndependently(
  emails: {
    to: string;
    subject: string;
    html: string;
  }[]
) {
  const results = await Promise.allSettled(
    emails.map(async (email) => {
      console.log(`Attempting email to: ${email.to}`);

      await sendEmail(email);

      console.log(`Email successfully sent to: ${email.to}`);

      return email.to;
    })
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Email failed for ${emails[index].to}:`,
        result.reason
      );
    }
  });

  return results.map((result, index) => ({
    recipient: emails[index].to,
    success: result.status === "fulfilled",
    error:
      result.status === "rejected"
        ? String(result.reason)
        : null,
  }));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const {
      paymentStatus,
      orderStatus,
      courier,
      awb,
      rejectionReason,
      vendorEmail,
    } = body;

    // Fetch current order
    const current = await query(
      `SELECT * FROM orders WHERE id = $1`,
      [id]
    );

    if (current.length === 0) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    const order = current[0];

    // Build updated values
    const updatedPaymentStatus =
      paymentStatus || order.payment_status;

    const updatedOrderStatus =
      orderStatus || order.order_status;

    const updatedCourier =
      courier !== undefined ? courier : order.courier;

    const updatedAwb =
      awb !== undefined ? awb : order.awb;

    const updatedRejectionReason =
      rejectionReason !== undefined
        ? rejectionReason
        : order.rejection_reason;

    // Update database
    await query(
      `
      UPDATE orders
      SET payment_status = $1,
          order_status = $2,
          courier = $3,
          awb = $4,
          rejection_reason = $5
      WHERE id = $6
      `,
      [
        updatedPaymentStatus,
        updatedOrderStatus,
        updatedCourier,
        updatedAwb,
        updatedRejectionReason,
        id,
      ]
    );

    // Construct order model
    const fullOrderInfo = {
      id,
      name: order.name,
      email: order.email,
      phone: order.phone,
      products: order.products,
      total: order.total,
      utr: order.utr,
      courier: updatedCourier,
      awb: updatedAwb,
    };

    // Association logging function
    const logUpdateToMainEmail = async (
      subjectText: string,
      htmlContent: string
    ) => {
      const results = await sendEmailsIndependently([
        {
          to: ASSOCIATION_EMAIL,
          subject: `[Order Update Log] [Order: ${id}] ${subjectText}`,
          html: htmlContent,
        },
      ]);

      return results[0].success;
    };

    let emailResults: any[] = [];

    // PAYMENT VERIFIED
    if (
      paymentStatus === "VERIFIED" &&
      order.payment_status !== "VERIFIED"
    ) {
      const emailHtml = generateEmailHtml(
        fullOrderInfo,
        "ORDER_CONFIRMED"
      );

      const intimationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0f1e36;">

          <h2 style="color: #7f1d1d; border-bottom: 2px solid #7f1d1d; padding-bottom: 10px;">
            [Intimation] Order Payment Confirmed
          </h2>

          <p style="font-size: 14px; line-height: 1.5;">
            Payment for the following order has been verified and confirmed.
            Please arrange fulfillment.
          </p>

          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;">

            <h4 style="color: #7f1d1d;">Order & Customer Details</h4>

            <p><strong>Order ID:</strong> ${id}</p>
            <p><strong>Customer Name:</strong> ${order.name}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Batch:</strong> ${order.batch}</p>
            <p><strong>Shipping Address:</strong> ${order.address}</p>
            <p><strong>UTR / Reference ID:</strong> ${order.utr}</p>
            <p><strong>Items Ordered:</strong> ${order.products}</p>
            <p><strong>Subtotal:</strong> ₹${order.subtotal}</p>
            <p><strong>Shipping Charges:</strong> ₹${order.shipping}</p>
            <p><strong>Total Paid:</strong> ₹${order.total}</p>

          </div>

          <p style="font-size: 12px; color: #6b7280;">
            Automated notification from SVNIT Alumni Association.
          </p>
        </div>
      `;

      const targetVendor =
        vendorEmail || "vendor@svnitalumni.com";

      // Send customer, association and vendor emails independently
      emailResults = await sendEmailsIndependently([
        {
          to: order.email,
          subject:
            "SVNIT Alumni Store - Order Confirmed & Payment Verified",
          html: emailHtml,
        },
        {
          to: ASSOCIATION_EMAIL,
          subject: `[Payment Confirmed] Order ${id} Sent to Contractor`,
          html: intimationHtml,
        },
        {
          to: targetVendor,
          subject: `[Vendor Order Placement] Order ${id} Ready for Production`,
          html: intimationHtml,
        },
      ]);

      // Preserve the original association update log
      const logSent = await logUpdateToMainEmail(
        "Payment Verified & Order Confirmed",
        intimationHtml
      );

      emailResults.push({
        recipient: ASSOCIATION_EMAIL,
        purpose: "Additional order update log",
        success: logSent,
      });
    }

    // PROCESSING
    else if (
      orderStatus === "PROCESSING" &&
      order.order_status !== "PROCESSING"
    ) {
      const emailHtml = generateEmailHtml(
        fullOrderInfo,
        "IN_PRODUCTION"
      );

      emailResults = await sendEmailsIndependently([
        {
          to: order.email,
          subject:
            "SVNIT Alumni Store - Your order is in Production!",
          html: emailHtml,
        },
      ]);

      await logUpdateToMainEmail(
        "Order Entered Production Stage",
        emailHtml
      );
    }

    // COMPLETED
    else if (
      orderStatus === "COMPLETED" &&
      order.order_status !== "COMPLETED"
    ) {
      const emailHtml = generateEmailHtml(
        fullOrderInfo,
        "COMPLETED"
      );

      const completedNotificationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0f1e36;">

          <h2 style="color: #7f1d1d;">
            [Notification] Order Production Completed
          </h2>

          <p>
            The items for the following order have finished production
            and are ready to be dispatched.
          </p>

          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">

            <p><strong>Order ID:</strong> ${id}</p>
            <p><strong>Customer Name:</strong> ${order.name}</p>
            <p><strong>Items Ordered:</strong> ${order.products}</p>
            <p><strong>Shipping Address:</strong> ${order.address}</p>

          </div>
        </div>
      `;

      emailResults = await sendEmailsIndependently([
        {
          to: order.email,
          subject:
            "SVNIT Alumni Store - Item Production Completed",
          html: emailHtml,
        },
        {
          to: ASSOCIATION_EMAIL,
          subject: `[Order Completed] Order ${id} Production Finished`,
          html: completedNotificationHtml,
        },
      ]);

      await logUpdateToMainEmail(
        "Order Production Completed",
        completedNotificationHtml
      );
    }

    // SHIPPED
    else if (
      orderStatus === "SHIPPED" &&
      order.order_status !== "SHIPPED"
    ) {
      const emailHtml = generateEmailHtml(
        fullOrderInfo,
        "SHIPPED"
      );

      emailResults = await sendEmailsIndependently([
        {
          to: order.email,
          subject: `SVNIT Alumni Store - Order Dispatched (AWB: ${updatedAwb || "N/A"})`,
          html: emailHtml,
        },
      ]);

      await logUpdateToMainEmail(
        "Order Dispatched & Shipped",
        emailHtml
      );
    }

    console.log("Order email results:", {
      orderId: id,
      results: emailResults,
    });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      emailResults,
    });

  } catch (error: any) {
    console.error("Order update failed:", error);

    return NextResponse.json(
      {
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
