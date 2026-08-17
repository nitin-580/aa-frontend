import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query(`SELECT votes FROM voting WHERE key = 'heritage_box'`);
    const votes = res.length > 0 ? res[0].votes : 0;
    return NextResponse.json({ votes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {
  try {
    await query(`
      INSERT INTO voting (key, votes) 
      VALUES ('heritage_box', 151) 
      ON CONFLICT (key) 
      DO UPDATE SET votes = voting.votes + 1
    `);
    
    const res = await query(`SELECT votes FROM voting WHERE key = 'heritage_box'`);
    return NextResponse.json({ success: true, votes: res[0].votes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
