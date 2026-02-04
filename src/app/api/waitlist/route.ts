import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@clickhouse/client-web";

function getClickHouseClient() {
  return createClient({
    url: `https://${process.env.CLICKHOUSE_HOST}:${process.env.CLICKHOUSE_PORT}`,
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if ClickHouse is configured
    if (!process.env.CLICKHOUSE_HOST || !process.env.CLICKHOUSE_PASSWORD) {
      console.log("Waitlist signup (no DB):", email);
      return NextResponse.json({ success: true });
    }

    const client = getClickHouseClient();

    try {
      // Create table if it doesn't exist
      await client.command({
        query: `
          CREATE TABLE IF NOT EXISTS waitlist (
            id UUID DEFAULT generateUUIDv4(),
            email String,
            source String DEFAULT 'chat_widget',
            created_at DateTime DEFAULT now(),
            ip_address String DEFAULT ''
          ) ENGINE = MergeTree()
          ORDER BY created_at
        `,
      });

      // Get IP address from request
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ||
                 request.headers.get("x-real-ip") ||
                 "unknown";

      // Insert email
      await client.insert({
        table: "waitlist",
        values: [{ email, ip_address: ip }],
        format: "JSONEachRow",
      });

      console.log("Waitlist signup saved:", email);
      return NextResponse.json({ success: true });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save email" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve waitlist (protected)
export async function GET(request: NextRequest) {
  try {
    // Simple auth check via query param (you'd want proper auth in production)
    const authKey = request.nextUrl.searchParams.get("key");
    if (authKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.CLICKHOUSE_HOST || !process.env.CLICKHOUSE_PASSWORD) {
      return NextResponse.json({
        emails: [],
        error: "Database not configured",
        debug: {
          hasHost: !!process.env.CLICKHOUSE_HOST,
          hasPort: !!process.env.CLICKHOUSE_PORT,
          hasUser: !!process.env.CLICKHOUSE_USER,
          hasPassword: !!process.env.CLICKHOUSE_PASSWORD,
        }
      });
    }

    const client = getClickHouseClient();

    try {
      const result = await client.query({
        query: `SELECT email, source, created_at, ip_address FROM waitlist ORDER BY created_at DESC LIMIT 1000`,
        format: "JSONEachRow",
      });

      const emails = await result.json();
      return NextResponse.json({ emails });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Waitlist GET error:", error);
    return NextResponse.json(
      { emails: [], error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
