import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
  connectionString: process.env.NEON_CONNECTION_STRING || ""
});

let isInit = false;

export async function query(queryString: string, params: any[] = []) {
  if (!isInit) {
    isInit = true;
    try {
      await initDb();
    } catch (e) {
      console.error("Failed to auto-init database:", e);
    }
  }
  try {
    const res = await pool.query(queryString, params);
    return res.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

// Auto-initialize tables
export async function initDb() {
  if (!process.env.NEON_CONNECTION_STRING) {
    console.warn("NEON_CONNECTION_STRING is missing in environment variables. Database not initialized.");
    return;
  }
  
  try {
    // 1. Products Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255),
        price VARCHAR(50) NOT NULL,
        original_price VARCHAR(50) NOT NULL,
        image TEXT NOT NULL,
        description TEXT,
        category VARCHAR(100),
        features TEXT[],
        discount VARCHAR(100),
        sizes TEXT[],
        colors TEXT[]
      )
    `);

    // Ensure columns exist on existing databases
    await pool.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS sizes TEXT[]`);
    await pool.query(`ALTER TABLE products ADD COLUMN IF NOT EXISTS colors TEXT[]`);

    // Seed initial products if table is empty
    const productCountRes = await pool.query(`SELECT COUNT(*) FROM products`);
    if (parseInt(productCountRes.rows[0].count) === 0) {
      const initialProducts = [
        {
          id: "1",
          name: "SVNIT Premium Leather Diary",
          brand: "SVNIT Alumni Association",
          price: "499",
          original_price: "799",
          image: "/images/diary.png",
          description: "Carry your thoughts in style with the official premium SVNIT leather-bound diary featuring the gold SVNIT crest.",
          category: "Accessories",
          features: ["Genuine Leather Cover", "SVNIT Gold Embossed Logo", "200 Ruled Pages"],
          discount: "37% Off",
          sizes: [] as string[],
          colors: [] as string[]
        },
        {
          id: "2",
          name: "Official SVNIT Legacy T-Shirt",
          brand: "SVNIT Alumni Association",
          price: "699",
          original_price: "999",
          image: "/images/Tshirt.png",
          description: "Comfortable navy-blue cotton polo t-shirt with official SVNIT Alumni insignia. Perfect for alumni meets and reunions.",
          category: "Apparel",
          features: ["100% Premium Cotton", "Embroidered Left-Chest Crest", "Polo Collar Style"],
          discount: "30% Off",
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["#0F1E36", "#7f1d1d"]
        },
        {
          id: "3",
          name: "SVNIT Gold Emblem Keychain",
          brand: "SVNIT Alumni Association",
          price: "149",
          original_price: "299",
          image: "/images/keychain.png",
          description: "A solid metal keychain with a polished gold plating of the SVNIT logo. A durable piece of legacy for your daily keys.",
          category: "Accessories",
          features: ["Solid Zinc Alloy", "Detailed Gold Plating", "Laser Engraved details"],
          discount: "50% Off",
          sizes: [] as string[],
          colors: [] as string[]
        }
      ];

      for (const p of initialProducts) {
        await pool.query(`
          INSERT INTO products (id, name, brand, price, original_price, image, description, category, features, discount, sizes, colors)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, [p.id, p.name, p.brand, p.price, p.original_price, p.image, p.description, p.category, p.features, p.discount, p.sizes, p.colors]);
      }
      console.log("Seeded initial products successfully.");
    }

    // Force update sizes and colors for product ID '2' (Legacy Polo T-shirt) if they are currently null or empty
    await pool.query(`
      UPDATE products 
      SET sizes = ARRAY['S', 'M', 'L', 'XL', 'XXL'], colors = ARRAY['#0F1E36', '#7f1d1d']
      WHERE id = '2' AND (sizes IS NULL OR cardinality(sizes) = 0)
    `);

    // 2. Orders Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        batch VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        products TEXT NOT NULL,
        subtotal NUMERIC NOT NULL,
        shipping NUMERIC NOT NULL,
        total NUMERIC NOT NULL,
        utr VARCHAR(255) NOT NULL,
        payment_status VARCHAR(100) NOT NULL,
        order_status VARCHAR(100) NOT NULL,
        date VARCHAR(100) NOT NULL,
        courier VARCHAR(255),
        awb VARCHAR(255),
        rejection_reason TEXT
      )
    `);

    // 3. Voting Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS voting (
        key VARCHAR(100) PRIMARY KEY,
        votes INTEGER DEFAULT 0
      )
    `);
    const voteCountRes = await pool.query(`SELECT COUNT(*) FROM voting WHERE key = 'heritage_box'`);
    if (parseInt(voteCountRes.rows[0].count) === 0) {
      await pool.query(`INSERT INTO voting (key, votes) VALUES ('heritage_box', 150)`);
    }

    // 4. Jobs Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id BIGINT PRIMARY KEY,
        role VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        batch_preferred VARCHAR(255),
        posted_by VARCHAR(255) NOT NULL,
        link VARCHAR(255)
      )
    `);

    // Seed initial jobs if empty
    const jobCountRes = await pool.query(`SELECT COUNT(*) FROM jobs`);
    if (parseInt(jobCountRes.rows[0].count) === 0) {
      const initialJobs = [
        {
          id: 1,
          role: "Senior Software Engineer (Backend)",
          company: "Google",
          location: "Bengaluru, India (Hybrid)",
          batchPreferred: "2015 - 2020 Batches",
          postedBy: "Alok Sharma (B.Tech CSE '16)",
          link: "https://google.com/careers"
        },
        {
          id: 2,
          role: "Lead Project Manager",
          company: "L&T Construction",
          location: "Mumbai, India",
          batchPreferred: "2010 - 2015 Batches",
          postedBy: "Rajesh Patel (B.Tech Civil '11)",
          link: "https://larsentoubro.com/careers"
        }
      ];

      for (const j of initialJobs) {
        await pool.query(`
          INSERT INTO jobs (id, role, company, location, batch_preferred, posted_by, link)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [j.id, j.role, j.company, j.location, j.batchPreferred, j.postedBy, j.link]);
      }
    }

    // 5. Scholarships Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS scholarships (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100),
        date VARCHAR(100)
      )
    `);

    // 6. Convention Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS conventions (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date VARCHAR(100)
      )
    `);

    // 7. ACE Awards Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ace_awards (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date VARCHAR(100)
      )
    `);

    // 8. Projects Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date VARCHAR(100)
      )
    `);

    // 9. Chapters Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chapters (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date VARCHAR(100)
      )
    `);

    // 10. Newsletter Subscribers Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        email VARCHAR(255) PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 11. Cart Items Table (tracked per IP user)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(100) NOT NULL,
        product_id VARCHAR(100) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        size VARCHAR(50),
        color VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 12. Contact Submissions Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        batch VARCHAR(100),
        purpose VARCHAR(100) NOT NULL,
        subject VARCHAR(255),
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Database tables initialized and verified successfully.");
  } catch (error) {
    console.error("Error during database tables initialization:", error);
  }
}
