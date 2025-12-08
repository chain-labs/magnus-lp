import Airtable from "airtable";

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID!
);

export const questionsTable = base(process.env.AIRTABLE_TABLE_NAME!);

// TypeScript types (optional but recommended)
export interface Question {
  id?: string;
  fields: {
    "Question Text": string;
    "User Name"?: string;
    "User Email"?: string;
    "Submission Date": string;
    "Question Status": "Pending" | "Approved" | "Answered" | "Rejected";
    "Answer Text"?: string;
    "Answered By"?: string;
    "Answer Timestamp"?: string;
    Display?: boolean;
  };
}
