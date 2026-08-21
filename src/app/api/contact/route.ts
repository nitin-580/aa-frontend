import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, batch, purpose, subject, description } = body;

    if (!name || !email || !phone || !purpose || !description) {
      return NextResponse.json(
        { error: "Required fields are missing: name, email, phone, purpose, description" },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO contact_submissions (name, email, phone, batch, purpose, subject, description)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, email, phone, batch || null, purpose, subject || null, description]
    );

    return NextResponse.json({ success: true, message: "Contact inquiry submitted successfully." });
  } catch (error: any) {
    console.error("Error submitting contact inquiry:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
