import { NextRequest, NextResponse } from "next/server";
import {
  searchArtist,
  getTopLots,
  getMarketStats,
  type ArtistStats,
  type LotResult,
} from "@/lib/clickhouse";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

interface RequestBody {
  message: string;
  image?: string;
  history?: ChatMessage[];
}

const SYSTEM_PROMPT = `You are Bloomsbury Bot, an art market intelligence assistant created by Bloomsbury Technology.

You have access to a database of 791,000+ auction lots from Christie's and Sotheby's spanning decades of art market history.

Your capabilities include:
- Artist lookups and biographical information
- Auction history and results
- Price trends and market analysis
- Comparative analysis across artists and periods
- Art market insights and statistics
- Artwork image analysis and identification

Guidelines:
- Keep responses concise and data-driven
- When discussing prices, use appropriate currency formatting (e.g., $1.2M, $45K)
- Provide context for market trends when relevant
- If asked about something outside art market topics, politely redirect to your area of expertise
- Be helpful, professional, and informative
- When given auction data, present it clearly with the most important insights first
- When analyzing images, identify the artist (if recognizable), style, period, medium, and provide market context if possible`;

function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(1)}M`;
  } else if (price >= 1_000) {
    return `$${(price / 1_000).toFixed(0)}K`;
  }
  return `$${price.toFixed(0)}`;
}

function formatArtistData(stats: ArtistStats, topLots: LotResult[]): string {
  let data = `**Artist Market Data:**\n`;
  data += `- Artist: ${stats.artist}\n`;
  data += `- Total Auction Lots: ${stats.total_lots.toLocaleString()}\n`;
  data += `- Average Sale Price: ${formatPrice(stats.avg_price_usd)}\n`;
  data += `- Price Range: ${formatPrice(stats.min_price_usd)} - ${formatPrice(stats.max_price_usd)}\n`;
  data += `- Total Market Value: ${formatPrice(stats.total_sales_usd)}\n`;
  data += `- Auction Houses: ${stats.houses.join(", ")}\n`;

  if (topLots.length > 0) {
    data += `\n**Top Sales:**\n`;
    topLots.forEach((lot, i) => {
      data += `${i + 1}. "${lot.title}" - ${formatPrice(lot.price_usd)} (${lot.house}, ${lot.sale_date})\n`;
    });
  }

  return data;
}

async function extractArtistName(message: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Extract the artist name from this message. Return ONLY the artist name, nothing else. If no artist is mentioned, return "NONE".

Message: "${message}"`,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0, maxOutputTokens: 50 },
        }),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const name = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return name && name !== "NONE" ? name : null;
  } catch {
    return null;
  }
}

async function identifyArtistFromImage(image: string, apiKey: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  inlineData: {
                    mimeType: "image/jpeg",
                    data: image,
                  },
                },
                {
                  text: `Look at this artwork image. If you can identify the artist, return ONLY the artist's name. If you cannot identify the artist with confidence, return "NONE". Do not include any other text.`,
                },
              ],
            },
          ],
          generationConfig: { temperature: 0, maxOutputTokens: 50 },
        }),
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const name = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    return name && name !== "NONE" ? name : null;
  } catch {
    return null;
  }
}

interface ContentPart {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
}

interface Content {
  role: string;
  parts: ContentPart[];
}

async function generateResponse(
  message: string,
  history: ChatMessage[],
  context: string,
  apiKey: string,
  image?: string
): Promise<string> {
  const contents: Content[] = [
    { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
    {
      role: "model",
      parts: [
        {
          text: "I understand. I am Bloomsbury Bot, ready to help with art market questions and analyze artwork images.",
        },
      ],
    },
    ...history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: msg.image
        ? [
            { inlineData: { mimeType: "image/jpeg", data: msg.image } },
            { text: msg.content },
          ]
        : [{ text: msg.content }],
    })),
  ];

  // Build the final user message with optional image
  const userParts: ContentPart[] = [];

  if (image) {
    userParts.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: image,
      },
    });
  }

  if (context) {
    userParts.push({
      text: `Here is relevant auction data from our database:\n\n${context}\n\nUser question: ${message}\n\nProvide a helpful response using this data.`,
    });
  } else {
    userParts.push({ text: message });
  }

  contents.push({ role: "user", parts: userParts });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate response");
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I apologize, but I couldn't generate a response."
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const { message, image, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { response: "", error: "Message is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const hasClickHouse = process.env.CLICKHOUSE_HOST && process.env.CLICKHOUSE_PASSWORD;

    // If no API key, return demo response
    if (!apiKey) {
      return NextResponse.json({ response: getDemoResponse(message, !!image) });
    }

    let context = "";
    const lowerMessage = message.toLowerCase();

    // Try to get real data from ClickHouse
    if (hasClickHouse) {
      try {
        // Check if asking about market overview
        if (
          lowerMessage.includes("market") ||
          lowerMessage.includes("overview") ||
          lowerMessage.includes("stats")
        ) {
          const stats = await getMarketStats();
          if (stats) {
            context = `**Market Overview:**\n`;
            context += `- Total Auction Lots: ${stats.total_lots.toLocaleString()}\n`;
            context += `- Unique Artists: ${stats.total_artists.toLocaleString()}\n`;
            context += `- Total Sales Value: ${formatPrice(stats.total_sales_usd)}\n`;
            context += `- Average Lot Price: ${formatPrice(stats.avg_price_usd)}\n`;
          }
        } else {
          // Try to extract artist name from message or image
          let artistName = await extractArtistName(message, apiKey);

          // If no artist in message but image provided, try to identify from image
          if (!artistName && image) {
            artistName = await identifyArtistFromImage(image, apiKey);
          }

          if (artistName) {
            const [stats, topLots] = await Promise.all([
              searchArtist(artistName),
              getTopLots(artistName, 5),
            ]);

            if (stats) {
              context = formatArtistData(stats, topLots);
            }
          }
        }
      } catch (error) {
        console.error("Database query error:", error);
        // Continue without database context
      }
    }

    // Generate response with Gemini (including image if provided)
    const response = await generateResponse(message, history, context, apiKey, image);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { response: "", error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

function getDemoResponse(message: string, hasImage: boolean = false): string {
  const lowerMessage = message.toLowerCase();

  if (hasImage) {
    return `I can see you've shared an image! In demo mode, I can't analyze images.

To enable image analysis:
1. Add your Google Gemini API key to \`.env.local\`

With full functionality, I can:
- Identify the artist and artwork
- Provide auction history and market data
- Estimate value based on comparable sales`;
  }

  if (lowerMessage.includes("picasso")) {
    return `Pablo Picasso (1881-1973) is one of the most influential artists of the 20th century and a dominant force in the art market.

**Market Overview:**
- Total auction lots in database: ~12,400
- Price range: $500 - $179.4M (highest: "Les femmes d'Alger", Christie's 2015)
- Most active categories: Paintings, Works on Paper, Ceramics

**Recent Trends:**
- Strong demand for Blue and Rose Period works
- Ceramics remain accessible entry point ($2K-50K)
- Major works consistently achieve $10M+ at auction

Would you like me to explore a specific period, medium, or price analysis?`;
  }

  if (lowerMessage.includes("warhol") || lowerMessage.includes("andy")) {
    return `Andy Warhol (1928-1987) remains one of the most traded artists globally.

**Market Overview:**
- Total auction lots: ~8,200
- Price range: $1,000 - $195M (highest: "Shot Sage Blue Marilyn", Christie's 2022)
- Categories: Prints, Paintings, Photography

Want me to analyze specific series like Marilyn or Campbell's Soup?`;
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return `Hello! I'm Bloomsbury Bot, your art market intelligence assistant.

I can help with:
- **Artist Research** - market performance, auction history
- **Price Analysis** - trends, comparable sales
- **Market Insights** - sector trends, statistics
- **Image Analysis** - identify artworks and provide market context

What would you like to explore?`;
  }

  return `I'm currently in demo mode. To enable full functionality:

1. Add your Google Gemini API key to \`.env.local\`
2. Ensure ClickHouse credentials are configured

**Try asking about:** Picasso, Warhol, or market trends.
**Or:** Send me an image of an artwork for analysis!`;
}
