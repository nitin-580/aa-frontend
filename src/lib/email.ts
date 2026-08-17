import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailParams) {
  if (!resend) {
    console.warn("Resend API Key is missing. Email simulation only.");
    return { success: false, message: "Resend API key missing." };
  }

  // Resend Free Tier Sandbox limits sending to verified owner email (nitindivya15@gmail.com)
  // We rewrite recipient to owner during tests to ensure successful delivery.
  const targetRecipient = to;
  const verifiedRecipient = "nitindivya15@gmail.com";
  const subjectWithTarget = `[Sandbox Test for ${targetRecipient}] ${subject}`;

  try {
    const data = await resend.emails.send({
      from: "SVNIT Alumni Association Store <onboarding@resend.dev>",
      to: [verifiedRecipient],
      subject: subjectWithTarget,
      html: `
        <div style="background-color: #fef2f2; border: 1px solid #fca5a5; padding: 12px; margin-bottom: 20px; border-radius: 6px; font-family: sans-serif; font-size: 13px; color: #991b1b;">
          <strong>Resend Sandbox Mode:</strong> This email was originally targeted to <strong>${targetRecipient}</strong>, but was routed to you because Resend free tier restricts delivery to verified accounts only.
        </div>
        ${html}
      `
    });
    console.log("Real Email dispatched via Resend Sandbox:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { success: false, error };
  }
}

export function generateEmailHtml(order: any, stage: string) {
  let stageTitle = "";
  let stageDescription = "";
  let extraHtml = "";

  if (stage === "ORDER_PLACED") {
    stageTitle = "Order Placed - Pending Payment Verification";
    stageDescription = `Thank you for your order! We have received your order details and payment reference (UTR: <strong>${order.utr}</strong>). Our administration team is currently verifying the transfer.`;
  } else if (stage === "ORDER_CONFIRMED") {
    stageTitle = "Order Confirmed & Payment Verified";
    stageDescription = `We have verified your payment reference (UTR: <strong>${order.utr}</strong>) and confirmed your order.`;
  } else if (stage === "IN_PRODUCTION") {
    stageTitle = "Your Order is in Production";
    stageDescription = "Your ordered merchandise has successfully entered our production stage. We are crafting it with care.";
  } else if (stage === "COMPLETED") {
    stageTitle = "Production Stage Completed";
    stageDescription = "The production of your SVNIT custom collectible is complete and it is ready to be dispatched.";
  } else if (stage === "SHIPPED") {
    stageTitle = "Order Dispatched & Shipped";
    stageDescription = `Your order has been shipped and is on the way!`;
    extraHtml = `
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 16px;">
        <h4 style="margin: 0 0 8px 0; color: #7f1d1d;">Shipping & Delivery Details</h4>
        <p style="margin: 0 0 4px 0; font-size: 14px;"><strong>Courier Partner:</strong> ${order.courier || "Standard Courier"}</p>
        <p style="margin: 0; font-size: 14px;"><strong>AWB / Tracking Number:</strong> <span style="font-family: monospace;">${order.awb || "N/A"}</span></p>
      </div>
    `;
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #0f1e36;">
      <div style="text-align: center; border-bottom: 2px solid #7f1d1d; padding-bottom: 20px; margin-bottom: 20px;">
        <h2 style="color: #7f1d1d; margin: 0 0 5px 0;">SVNIT Alumni Association Store</h2>
        <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #6b7280;">Official Merchandise Portal</span>
      </div>
      
      <p style="font-size: 16px; line-height: 1.5;">Dear <strong>${order.name}</strong>,</p>
      
      <p style="font-size: 16px; line-height: 1.5; color: #374151;">
        We are happy to update you regarding your order <strong style="font-family: monospace;">${order.id}</strong>.
      </p>
      
      <div style="background-color: #fef2f2; border-left: 4px solid #7f1d1d; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
        <h3 style="margin: 0 0 4px 0; color: #7f1d1d; font-size: 16px;">${stageTitle}</h3>
        <p style="margin: 0; font-size: 14px; color: #4b5563;">${stageDescription}</p>
      </div>
      
      <div style="border-top: 1px solid #f3f4f6; padding-top: 15px; margin-top: 15px;">
        <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #374151;">Order Summary</h4>
        <p style="margin: 0 0 4px 0; font-size: 14px;"><strong>Items:</strong> ${order.products}</p>
        <p style="margin: 0; font-size: 14px;"><strong>Total Amount Paid:</strong> ₹${order.total}</p>
      </div>

      ${extraHtml}

      <p style="font-size: 14px; margin-top: 30px; color: #4b5563;">
        If you have any questions, feel free to reply to this email or contact the SVNIT Alumni Association Team.
      </p>
      
      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; text-align: center; font-size: 12px; color: #9ca3af;">
        <p style="margin: 0 0 5px 0;">Sardar Vallabhbhai National Institute of Technology, Surat, Gujarat</p>
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} SVNIT Alumni Association. All rights reserved.</p>
      </div>
    </div>
  `;
}
