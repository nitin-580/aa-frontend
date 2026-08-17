import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const products = await query(`SELECT * FROM products ORDER BY id ASC`);
    
    // Parse arrays correctly
    const formatted = products.map((p: any) => ({
      ...p,
      features: p.features || [],
      sizes: p.sizes || [],
      colors: p.colors || []
    }));
    
    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, brand, price, original_price, image, description, category, features, discount, sizes, colors } = body;
    
    if (!name || !price || !original_price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if product exists to decide Insert vs Update
    const existing = await query(`SELECT id FROM products WHERE id = $1`, [id]);
    
    if (existing.length > 0) {
      // Update
      await query(`
        UPDATE products 
        SET name = $1, brand = $2, price = $3, original_price = $4, image = $5, description = $6, category = $7, features = $8, discount = $9, sizes = $10, colors = $11
        WHERE id = $12
      `, [
        name, 
        brand || "SVNIT Alumni Association", 
        price, 
        original_price, 
        image, 
        description, 
        category, 
        features || [], 
        discount || "", 
        sizes || [], 
        colors || [], 
        id
      ]);
      
      return NextResponse.json({ success: true, message: "Product updated successfully" });
    } else {
      // Insert
      const newId = id || String(Date.now());
      await query(`
        INSERT INTO products (id, name, brand, price, original_price, image, description, category, features, discount, sizes, colors)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        newId, 
        name, 
        brand || "SVNIT Alumni Association", 
        price, 
        original_price, 
        image, 
        description, 
        category, 
        features || [], 
        discount || "", 
        sizes || [], 
        colors || []
      ]);
      
      return NextResponse.json({ success: true, message: "Product created successfully", id: newId });
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
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }

    await query(`DELETE FROM products WHERE id = $1`, [id]);
    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
