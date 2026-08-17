import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const jobs = await query(`SELECT * FROM jobs ORDER BY id DESC`);
    const formatted = jobs.map((j: any) => ({
      id: Number(j.id),
      role: j.role,
      company: j.company,
      location: j.location || "Remote",
      batchPreferred: j.batch_preferred || "All batches welcome",
      postedBy: j.posted_by,
      link: j.link || "#"
    }));
    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, role, company, location, batchPreferred, postedBy, link } = body;
    
    if (!role || !company || !postedBy) {
      return NextResponse.json({ error: "Missing required job details" }, { status: 400 });
    }

    const jobId = id ? Number(id) : Date.now();
    
    // Check if job exists
    const existing = await query(`SELECT id FROM jobs WHERE id = $1`, [jobId]);
    
    if (existing.length > 0) {
      // Update
      await query(`
        UPDATE jobs
        SET role = $1, company = $2, location = $3, batch_preferred = $4, posted_by = $5, link = $6
        WHERE id = $7
      `, [role, company, location || "Remote", batchPreferred || "All batches welcome", postedBy, link || "#", jobId]);
      
      return NextResponse.json({ success: true, message: "Job post updated successfully" });
    } else {
      // Insert
      await query(`
        INSERT INTO jobs (id, role, company, location, batch_preferred, posted_by, link)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [jobId, role, company, location || "Remote", batchPreferred || "All batches welcome", postedBy, link || "#"]);
      
      return NextResponse.json({ success: true, message: "Job post added successfully", id: jobId });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing job ID" }, { status: 400 });
    }

    await query(`DELETE FROM jobs WHERE id = $1`, [Number(id)]);
    return NextResponse.json({ success: true, message: "Job post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
