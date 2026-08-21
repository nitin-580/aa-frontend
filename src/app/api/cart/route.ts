import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// Helper to get client IP
function getClientIp(req: NextRequest): string {
  let ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
  if (ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }
  return ip;
}

// GET: Retrieve all cart items for the user's IP
export async function GET(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    
    // Automatically clean up cart items older than 1 week (7 days)
    await query(`DELETE FROM cart_items WHERE created_at < NOW() - INTERVAL '7 days'`);

    // Fetch user's cart items joined with products
    const cartItems = await query(`
      SELECT c.id, c.product_id as "productId", c.quantity, c.size, c.color, 
             p.name, p.price, p.image, p.original_price as "originalPrice"
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.ip_address = $1
      ORDER BY c.id ASC
    `, [ip]);

    return NextResponse.json(cartItems);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Add an item or update its quantity in the cart
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const body = await req.json();
    const { productId, quantity, size, color, action } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Clean up expired items
    await query(`DELETE FROM cart_items WHERE created_at < NOW() - INTERVAL '7 days'`);

    // Check if the item already exists with exact same size and color
    const existing = await query(`
      SELECT id, quantity FROM cart_items
      WHERE ip_address = $1 
        AND product_id = $2 
        AND (size = $3 OR (size IS NULL AND $3 IS NULL)) 
        AND (color = $4 OR (color IS NULL AND $4 IS NULL))
    `, [ip, String(productId), size || null, color || null]);

    const qty = parseInt(quantity) || 1;

    if (existing.length > 0) {
      const existingId = existing[0].id;
      const currentQty = existing[0].quantity;
      
      let newQty = currentQty + qty;
      if (action === "set") {
        newQty = qty;
      } else if (action === "decrement") {
        newQty = currentQty - 1;
      }

      if (newQty <= 0) {
        await query(`DELETE FROM cart_items WHERE id = $1`, [existingId]);
        return NextResponse.json({ success: true, message: "Item removed from cart" });
      } else {
        await query(`
          UPDATE cart_items 
          SET quantity = $1, created_at = CURRENT_TIMESTAMP 
          WHERE id = $2
        `, [newQty, existingId]);
        return NextResponse.json({ success: true, message: "Cart updated", quantity: newQty });
      }
    } else {
      if (qty > 0) {
        await query(`
          INSERT INTO cart_items (ip_address, product_id, quantity, size, color)
          VALUES ($1, $2, $3, $4, $5)
        `, [ip, String(productId), qty, size || null, color || null]);
        return NextResponse.json({ success: true, message: "Item added to cart" });
      }
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove specific cart item or clear the whole cart
export async function DELETE(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { searchParams } = new URL(req.url);
    const cartItemId = searchParams.get("cartItemId");
    const clearAll = searchParams.get("clearAll");

    if (clearAll === "true") {
      await query(`DELETE FROM cart_items WHERE ip_address = $1`, [ip]);
      return NextResponse.json({ success: true, message: "Cart cleared" });
    }

    if (!cartItemId) {
      return NextResponse.json({ error: "Missing cartItemId parameter" }, { status: 400 });
    }

    await query(`DELETE FROM cart_items WHERE ip_address = $1 AND id = $2`, [ip, parseInt(cartItemId)]);
    return NextResponse.json({ success: true, message: "Item removed from cart" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
