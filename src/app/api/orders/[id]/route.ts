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
