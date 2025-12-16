import Airtable from "airtable";

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID!
);

export const questionsTable = base(process.env.AIRTABLE_TABLE_NAME!);
export const stocksTable = base(process.env.AIRTABLE_STOCKS_TABLE_NAME || "Stocks");

// TypeScript types (optional but recommended)
export interface Question {
  id?: string;
  fields: {
    "Question Text": string;
    "User Name": string;
    "User Email": string;
    "User Phone"?: string;
    "Submission Date": string;
    "Question Status": "Pending" | "Approved" | "Answered" | "Rejected";
    "Answer Text"?: string;
    "Answered By"?: string;
    "Answer Timestamp"?: string;
    Display?: boolean;
  };
}

export interface Stock {
  id?: string;
  fields: {
    Ticker: string;
    Logo?: string;
    "Price Zone": string;
    Action: "BUY" | "HOLD" | "SELL";
    Target: string;
    "Stop Loss": string;
    Potential: string;
    Duration: string;
    Published: string;
    Display?: boolean;
  };
}

export interface StockData {
  id: string;
  ticker: string;
  logo?: string;
  priceZone: string;
  action: "BUY" | "HOLD" | "SELL";
  target: string;
  stopLoss: string;
  potential: string;
  duration: string;
  published: string;
}

export async function fetchStocksFromAirtable(limit: number = 5): Promise<StockData[]> {
  try {
    const records = await stocksTable
      .select({
        maxRecords: limit,
        sort: [{ field: "Published", direction: "desc" }],
      })
      .firstPage();

    return records.map((record) => ({
      id: record.id,
      ticker: record.get("Ticker") as string,
      logo: record.get("Logo") as string | undefined,
      priceZone: record.get("Price Zone") as string,
      action: record.get("Action") as "BUY" | "HOLD" | "SELL",
      target: record.get("Target") as string,
      stopLoss: record.get("Stop Loss") as string,
      potential: record.get("Potential") as string,
      duration: record.get("Duration") as string,
      published: record.get("Published") as string,
    }));
  } catch (error) {
    console.error("Error fetching stocks from Airtable:", error);
    return [];
  }
}
