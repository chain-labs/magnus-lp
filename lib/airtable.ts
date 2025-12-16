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
    Name: string;
    Status: "Current" | "Sold";
    "Entry Price": number;
    "Exit Price"?: number;
    LDP?: number; // Last Dated Price
    Gains?: string; // Calculated or manual
    Duration: string;
    "Research Report URL"?: string;
    // Hidden fields (not displayed in frontend)
    Display?: boolean;
    "Internal Notes"?: string;
    "Created By"?: string;
  };
}

export interface StockData {
  id: string;
  name: string;
  status: "Current" | "Sold";
  entryPrice: number;
  exitPrice?: number;
  ldp?: number;
  gains: string;
  duration: string;
  researchReportUrl?: string;
}

export async function fetchStocksFromAirtable(limit: number = 5): Promise<StockData[]> {
  try {
    const records = await stocksTable
      .select({
        maxRecords: limit,
        filterByFormula: "NOT({Display} = FALSE())",
        sort: [{ field: "Name", direction: "asc" }],
      })
      .firstPage();

    return records.map((record) => {
      const status = record.get("Status") as "Current" | "Sold";
      const entryPrice = record.get("Entry Price") as number;
      const exitPrice = record.get("Exit Price") as number | undefined;
      const ldp = record.get("LDP") as number | undefined;
      let gains = record.get("Gains") as string | undefined;

      // Auto-calculate gains if not provided
      if (!gains) {
        if (status === "Sold" && exitPrice) {
          const gainsPercent = ((exitPrice - entryPrice) / entryPrice) * 100;
          gains = `${gainsPercent > 0 ? "+" : ""}${gainsPercent.toFixed(2)}%`;
        } else if (status === "Current" && ldp) {
          const gainsPercent = ((ldp - entryPrice) / entryPrice) * 100;
          gains = `${gainsPercent > 0 ? "+" : ""}${gainsPercent.toFixed(2)}%`;
        } else {
          gains = "-";
        }
      }

      return {
        id: record.id,
        name: record.get("Name") as string,
        status,
        entryPrice,
        exitPrice,
        ldp,
        gains,
        duration: record.get("Duration") as string,
        researchReportUrl: record.get("Research Report URL") as string | undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching stocks from Airtable:", error);
    return [];
  }
}
