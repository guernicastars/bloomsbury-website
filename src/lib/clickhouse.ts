import { createClient } from "@clickhouse/client-web";

export function getClickHouseClient() {
  return createClient({
    url: `https://${process.env.CLICKHOUSE_HOST}:${process.env.CLICKHOUSE_PORT}`,
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD,
  });
}

export interface ArtistStats {
  artist: string;
  total_lots: number;
  avg_price_usd: number;
  min_price_usd: number;
  max_price_usd: number;
  total_sales_usd: number;
  houses: string[];
}

export interface LotResult {
  title: string;
  artist: string;
  house: string;
  sale_date: string;
  price_usd: number;
  estimate_low_usd: number;
  estimate_high_usd: number;
  medium: string;
}

export async function searchArtist(artistName: string): Promise<ArtistStats | null> {
  const client = getClickHouseClient();

  try {
    const result = await client.query({
      query: `
        SELECT
          artist_name as artist,
          count(*) as total_lots,
          avg(price_usd) as avg_price_usd,
          min(price_usd) as min_price_usd,
          max(price_usd) as max_price_usd,
          sum(price_usd) as total_sales_usd,
          groupUniqArray(house) as houses
        FROM lots
        WHERE lower(artist_name) LIKE lower({pattern:String})
          AND price_usd > 0
        GROUP BY artist_name
        ORDER BY total_lots DESC
        LIMIT 1
      `,
      query_params: {
        pattern: `%${artistName}%`,
      },
      format: "JSONEachRow",
    });

    const rows = (await result.json()) as ArtistStats[];
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("ClickHouse query error:", error);
    return null;
  } finally {
    await client.close();
  }
}

export async function getTopLots(artistName: string, limit: number = 5): Promise<LotResult[]> {
  const client = getClickHouseClient();

  try {
    const result = await client.query({
      query: `
        SELECT
          title,
          artist_name as artist,
          house,
          sale_date,
          price_usd,
          estimate_low_usd,
          estimate_high_usd,
          medium
        FROM lots
        WHERE lower(artist_name) LIKE lower({pattern:String})
          AND price_usd > 0
        ORDER BY price_usd DESC
        LIMIT {limit:UInt32}
      `,
      query_params: {
        pattern: `%${artistName}%`,
        limit,
      },
      format: "JSONEachRow",
    });

    return (await result.json()) as LotResult[];
  } catch (error) {
    console.error("ClickHouse query error:", error);
    return [];
  } finally {
    await client.close();
  }
}

export async function getRecentSales(artistName: string, limit: number = 5): Promise<LotResult[]> {
  const client = getClickHouseClient();

  try {
    const result = await client.query({
      query: `
        SELECT
          title,
          artist_name as artist,
          house,
          sale_date,
          price_usd,
          estimate_low_usd,
          estimate_high_usd,
          medium
        FROM lots
        WHERE lower(artist_name) LIKE lower({pattern:String})
          AND price_usd > 0
        ORDER BY sale_date DESC
        LIMIT {limit:UInt32}
      `,
      query_params: {
        pattern: `%${artistName}%`,
        limit,
      },
      format: "JSONEachRow",
    });

    return (await result.json()) as LotResult[];
  } catch (error) {
    console.error("ClickHouse query error:", error);
    return [];
  } finally {
    await client.close();
  }
}

export async function getMarketStats(): Promise<{
  total_lots: number;
  total_artists: number;
  total_sales_usd: number;
  avg_price_usd: number;
} | null> {
  const client = getClickHouseClient();

  try {
    const result = await client.query({
      query: `
        SELECT
          count(*) as total_lots,
          uniq(artist_name) as total_artists,
          sum(price_usd) as total_sales_usd,
          avg(price_usd) as avg_price_usd
        FROM lots
        WHERE price_usd > 0
      `,
      format: "JSONEachRow",
    });

    const rows = (await result.json()) as Array<{
      total_lots: number;
      total_artists: number;
      total_sales_usd: number;
      avg_price_usd: number;
    }>;
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("ClickHouse query error:", error);
    return null;
  } finally {
    await client.close();
  }
}
