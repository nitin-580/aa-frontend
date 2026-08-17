import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Save to database
    await query(`
      INSERT INTO newsletter_subscribers (email) 
      VALUES ($1) 
      ON CONFLICT (email) DO NOTHING
    `, [email.toLowerCase().trim()]);

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
