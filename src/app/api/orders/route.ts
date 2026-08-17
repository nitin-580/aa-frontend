import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendEmail, generateEmailHtml } from "@/lib/email";

export async function GET() {
  try {
    const orders = await query(`SELECT * FROM orders ORDER BY date DESC, id DESC`);
    
    // Format values nicely
    const formatted = orders.map((o: any) => ({
      id: o.id,
      name: o.name,
      email: o.email,
      phone: o.phone,
      batch: o.batch,
      address: o.address,
      products: o.products,
      subtotal: Number(o.subtotal),
      shipping: Number(o.shipping),
      total: Number(o.total),
      utr: o.utr,
      paymentStatus: o.payment_status,
      orderStatus: o.order_status,
      date: o.date,
      courier: o.courier || "",
      awb: o.awb || "",
      rejectionReason: o.rejection_reason || ""
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, email, phone, batch, address, products, subtotal, shipping, total, utr, paymentStatus, orderStatus, date } = body;
    
    if (!name || !email || !phone || !address || !products || !utr) {
      return NextResponse.json({ error: "Missing required order details" }, { status: 400 });
    }

    const orderId = id || ("SVN-" + Math.floor(Math.random() * 900000 + 100000));
    
    await query(`
      INSERT INTO orders (id, name, email, phone, batch, address, products, subtotal, shipping, total, utr, payment_status, order_status, date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `, [
      orderId, 
      name, 
      email, 
      phone, 
      batch || "", 
      address, 
      products, 
      subtotal || 0, 
      shipping || 0, 
      total || 0, 
      utr, 
      paymentStatus || "PENDING_VERIFICATION", 
      orderStatus || "PENDING_PAYMENT", 
      date || new Date().toLocaleString("en-IN")
    ]);

    // Send confirmation email
    try {
      const emailHtml = generateEmailHtml({
        id: orderId,
        name,
        email,
        phone,
        products,
        total,
        utr
      }, "ORDER_PLACED");

      await sendEmail({
        to: email,
        subject: `Order Placed - SVNIT Alumni Association Store [${orderId}]`,
        html: emailHtml
      });
    } catch (e) {
      console.error("Failed to send initial order verification email:", e);
    }

    return NextResponse.json({ success: true, message: "Order placed successfully", id: orderId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
