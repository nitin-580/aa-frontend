import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export const ASSOCIATION_EMAIL = "svnitalumniassociation01@gmail.com";

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

  try {
    const data = await resend.emails.send({
      from: "SVNIT Alumni Association <mail@svnitalumniassociation.org>",
      to: [to],
      subject: subject,
      html: html
    });
    console.log("Real Email dispatched via Resend:", data);
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
        <h2 style="color: #7f1d1d; margin: 0 0 5px 0;">SVNIT Alumni Association</h2>
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

export function generateOrderIntimationHtml(order: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; color: #0f1e36; border: 1px solid #e5e7eb; border-radius: 8px;">
      <div style="text-align: center; border-bottom: 2px solid #7f1d1d; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #7f1d1d; margin: 0 0 4px 0;">SVNIT Alumni Association</h2>
        <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #6b7280;">Store Order Intimation Notice</span>
      </div>

      <div style="background-color: #fef2f2; border-left: 4px solid #7f1d1d; padding: 14px 18px; margin: 0 0 20px 0; border-radius: 4px;">
        <h3 style="margin: 0 0 6px 0; color: #7f1d1d; font-size: 16px;">🚨 New Order Placed (Pending Payment Verification)</h3>
        <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.5;">
          A new merchandise order has been placed on the SVNIT Alumni Association portal.
          This intimation is sent immediately upon order placement, regardless of confirmation status.
        </p>
      </div>

      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 12px 0; color: #7f1d1d; font-size: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">
          Order & Customer Information
        </h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
          <tr>
            <td style="padding: 4px 0; width: 35%; color: #6b7280; font-weight: bold;">Order ID:</td>
            <td style="padding: 4px 0; font-family: monospace; font-weight: bold; color: #111827;">${order.id}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">Order Date:</td>
            <td style="padding: 4px 0; color: #111827;">${order.date || new Date().toLocaleString("en-IN")}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">Customer Name:</td>
            <td style="padding: 4px 0; font-weight: bold; color: #111827;">${order.name}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">Email:</td>
            <td style="padding: 4px 0; color: #111827;"><a href="mailto:${order.email}" style="color: #7f1d1d; text-decoration: underline;">${order.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">Phone:</td>
            <td style="padding: 4px 0; color: #111827;"><a href="tel:${order.phone}" style="color: #7f1d1d; text-decoration: none;">${order.phone}</a></td>
          </tr>
          ${order.batch ? `
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">Branch / Batch:</td>
            <td style="padding: 4px 0; color: #111827;">${order.batch}</td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold; vertical-align: top;">Shipping Address:</td>
            <td style="padding: 4px 0; color: #111827;">${order.address}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 18px; margin-bottom: 20px;">
        <h4 style="margin: 0 0 12px 0; color: #7f1d1d; font-size: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">
          Payment & Items Breakdown
        </h4>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.6;">
          <tr>
            <td style="padding: 4px 0; width: 35%; color: #6b7280; font-weight: bold; vertical-align: top;">Items Ordered:</td>
            <td style="padding: 4px 0; color: #111827;">${order.products}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">Subtotal:</td>
            <td style="padding: 4px 0; color: #111827;">₹${order.subtotal || 0}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">Shipping:</td>
            <td style="padding: 4px 0; color: #111827;">₹${order.shipping || 0}</td>
          </tr>
          <tr style="border-top: 1px dashed #d1d5db;">
            <td style="padding: 6px 0; color: #111827; font-weight: bold;">Total Amount:</td>
            <td style="padding: 6px 0; font-weight: bold; color: #7f1d1d; font-size: 16px;">₹${order.total}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">UTR / Reference ID:</td>
            <td style="padding: 4px 0;"><span style="font-family: monospace; font-weight: bold; color: #047857; background: #ecfdf5; padding: 3px 8px; border-radius: 4px; display: inline-block; border: 1px solid #a7f3d0;">${order.utr}</span></td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">Payment Status:</td>
            <td style="padding: 4px 0; color: #b45309; font-weight: bold;">${order.paymentStatus || "PENDING_VERIFICATION"}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0; color: #6b7280; font-weight: bold;">Order Status:</td>
            <td style="padding: 4px 0; color: #4b5563;">${order.orderStatus || "PENDING_PAYMENT"}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 13px; color: #92400e; line-height: 1.4;">
          <strong>Next Action:</strong> Please verify the credited payment against the provided UTR (<strong>${order.utr}</strong>) in the bank statement, then update the order in the Admin Dashboard.
        </p>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
        <p style="margin: 0 0 4px 0;">Automated intimation to SVNIT Alumni Association (${ASSOCIATION_EMAIL})</p>
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} SVNIT Alumni Association. All rights reserved.</p>
      </div>
    </div>
  `;
}
