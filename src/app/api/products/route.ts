import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { products as fallbackProducts } from "@/components/product/products";

export async function GET() {
  try {
    const products = await query(`SELECT * FROM products ORDER BY id ASC`);
    
    // Parse arrays and fields correctly, merging with fallback local data where needed
    const formatted = products.map((p: any) => {
      const fallback = fallbackProducts.find((fb) => String(fb.id) === String(p.id));

      const images = (p.images && p.images.length > 0) ? p.images : (fallback?.images || [p.image]);
      const colorImages = p.color_images || p.colorImages || fallback?.colorImages || {};
      const imagesByColor = p.images_by_color || p.imagesByColor || fallback?.imagesByColor || {};
      const colors = (p.colors && p.colors.length > 0) ? p.colors : (fallback?.colors || []);

      return {
        ...p,
        originalPrice: p.original_price || p.originalPrice || p.price,
        features: p.features || fallback?.features || [],
        sizes: p.sizes || fallback?.sizes || [],
        colors: colors,
        images: images,
        colorImages: colorImages,
        imagesByColor: imagesByColor
      };
    });
    
    return NextResponse.json(formatted);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      id, name, brand, price, original_price, originalPrice, image, description, category, 
      features, discount, sizes, colors, images, color_images, colorImages, images_by_color, imagesByColor 
    } = body;
    
    const finalOriginalPrice = original_price || originalPrice || price;
    const finalColorImages = JSON.stringify(color_images || colorImages || {});
    const finalImagesByColor = JSON.stringify(images_by_color || imagesByColor || {});

    if (!name || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if product exists to decide Insert vs Update
    const existing = await query(`SELECT id FROM products WHERE id = $1`, [id]);
    
    if (existing.length > 0) {
      // Update
      await query(`
        UPDATE products 
        SET name = $1, brand = $2, price = $3, original_price = $4, image = $5, description = $6, 
            category = $7, features = $8, discount = $9, sizes = $10, colors = $11, 
            images = $12, color_images = $13::jsonb, images_by_color = $14::jsonb
        WHERE id = $15
      `, [
        name, 
        brand || "SVNIT Alumni Association", 
        price, 
        finalOriginalPrice, 
        image, 
        description, 
        category, 
        features || [], 
        discount || "", 
        sizes || [], 
        colors || [], 
        images || [image],
        finalColorImages,
        finalImagesByColor,
        id
      ]);
      
      return NextResponse.json({ success: true, message: "Product updated successfully" });
    } else {
      // Insert
      const newId = id || String(Date.now());
      await query(`
        INSERT INTO products (id, name, brand, price, original_price, image, description, category, features, discount, sizes, colors, images, color_images, images_by_color)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14::jsonb, $15::jsonb)
      `, [
        newId, 
        name, 
        brand || "SVNIT Alumni Association", 
        price, 
        finalOriginalPrice, 
        image, 
        description, 
        category, 
        features || [], 
        discount || "", 
        sizes || [], 
        colors || [],
        images || [image],
        finalColorImages,
        finalImagesByColor
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
