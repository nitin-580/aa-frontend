import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendEmail, generateEmailHtml } from "@/lib/email";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { paymentStatus, orderStatus, courier, awb, rejectionReason } = body;

    // Fetch the current order
    const current = await query(`SELECT * FROM orders WHERE id = $1`, [id]);
    if (current.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = current[0];

    // Build values to update
    const updatedPaymentStatus = paymentStatus || order.payment_status;
    const updatedOrderStatus = orderStatus || order.order_status;
    const updatedCourier = courier !== undefined ? courier : order.courier;
    const updatedAwb = awb !== undefined ? awb : order.awb;
    const updatedRejectionReason = rejectionReason !== undefined ? rejectionReason : order.rejection_reason;

    // Update in database
    await query(`
      UPDATE orders 
      SET payment_status = $1, order_status = $2, courier = $3, awb = $4, rejection_reason = $5
      WHERE id = $6
    `, [updatedPaymentStatus, updatedOrderStatus, updatedCourier, updatedAwb, updatedRejectionReason, id]);

    // Construct order model for email template
    const fullOrderInfo = {
      id,
      name: order.name,
      email: order.email,
      phone: order.phone,
      products: order.products,
      total: order.total,
      utr: order.utr,
      courier: updatedCourier,
      awb: updatedAwb
    };

    // Trigger emails for specific stage changes
    try {
      if (paymentStatus === "VERIFIED" && order.payment_status !== "VERIFIED") {
        // Payment verified & Order Confirmed
        const emailHtml = generateEmailHtml(fullOrderInfo, "ORDER_CONFIRMED");
        await sendEmail({
          to: order.email,
          subject: "SVNIT Alumni Store - Order Confirmed & Payment Verified",
          html: emailHtml
        });

        // Direct intimation to Alumni Association / Vendor Contractor
        const intimationHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0f1e36;">
            <h2 style="color: #7f1d1d; border-bottom: 2px solid #7f1d1d; padding-bottom: 10px; margin-bottom: 20px;">[Intimation] Order Payment Confirmed</h2>
            <p style="font-size: 14px; line-height: 1.5;">This is to notify you that the payment for the following order has been verified and confirmed. The order details have been sent to the vendor contractor for fulfillment.</p>
            
            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px 0; color: #7f1d1d;">Order & Customer Details</h4>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Order ID:</strong> ${id}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Customer Name:</strong> ${order.name}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Email:</strong> ${order.email}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Phone:</strong> ${order.phone}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Batch:</strong> ${order.batch}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Shipping Address:</strong> ${order.address}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>UTR / Reference ID:</strong> ${order.utr}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Items Ordered:</strong> ${order.products}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Subtotal:</strong> ₹${order.subtotal}</p>
              <p style="margin: 0 0 6px 0; font-size: 13px;"><strong>Shipping Charges:</strong> ₹${order.shipping}</p>
              <p style="margin: 0;"><strong>Total Paid:</strong> ₹${order.total}</p>
            </div>
            
            <p style="font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 10px; margin-top: 25px;">
              This is an automated notification from the SVNIT Alumni Association Store.
            </p>
          </div>
        `;
        await sendEmail({
          to: "mail@svnitalumni.com",
          subject: `[Payment Confirmed] Order ${id} Sent to Contractor`,
          html: intimationHtml
        });
      } else if (orderStatus === "PROCESSING" && order.order_status !== "PROCESSING") {
        // Entered Production
        const emailHtml = generateEmailHtml(fullOrderInfo, "IN_PRODUCTION");
        await sendEmail({
          to: order.email,
          subject: "SVNIT Alumni Store - Your order is in Production!",
          html: emailHtml
        });
      } else if (orderStatus === "COMPLETED" && order.order_status !== "COMPLETED") {
        // Production Completed
        const emailHtml = generateEmailHtml(fullOrderInfo, "COMPLETED");
        await sendEmail({
          to: order.email,
          subject: "SVNIT Alumni Store - Item Production Completed",
          html: emailHtml
        });
      } else if (orderStatus === "SHIPPED" && order.order_status !== "SHIPPED") {
        // Dispatched via Courier
        const emailHtml = generateEmailHtml(fullOrderInfo, "SHIPPED");
        await sendEmail({
          to: order.email,
          subject: `SVNIT Alumni Store - Order Dispatched (AWB: ${updatedAwb || "N/A"})`,
          html: emailHtml
        });
      }
    } catch (emailErr) {
      console.error("Email trigger failed in route:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Order updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
