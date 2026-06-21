import Airtable from "airtable";

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_ID!
);

const stocksBase = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_ID_STOCKS!
);

export const questionsTable = base("Questions");
export const stocksTable = stocksBase("Signals");
export const usersTable = base("Users");

// User interface for the Users table
export interface User {
	id?: string;
	fields: {
		Name: string;
		Email: string;
		Phone?: string;
		Source: "Question" | "Research Download";
		"Created At": string;
		"Last Activity": string;
	};
}

// Helper function to save or update user in the Users table
export async function saveUserToAirtable(userData: {
	name: string;
	email: string;
	phone?: string;
	source: "Question" | "Research Download";
}): Promise<{ success: boolean; userId?: string; error?: string }> {
	try {
		// Check if user with this email already exists
		const existingRecords = await usersTable
			.select({
				filterByFormula: `{Email} = "${userData.email}"`,
				maxRecords: 1,
			})
			.firstPage();

		if (existingRecords.length > 0) {
			// User exists, update the last activity
			const existingRecord = existingRecords[0];
			await usersTable.update([
				{
					id: existingRecord.id,
					fields: {
						"Last Activity": new Date().toISOString(),
						// Update phone if provided and different
						...(userData.phone && { Phone: userData.phone }),
						// Update name if provided and different
						...(userData.name && { Name: userData.name }),
					},
				},
			]);
			return { success: true, userId: existingRecord.id };
		} else {
			// Create new user
			const newRecord = await usersTable.create([
				{
					fields: {
						Name: userData.name,
						Email: userData.email,
						Phone: userData.phone || "",
						Source: userData.source,
						"Created At": new Date().toISOString(),
						"Last Activity": new Date().toISOString(),
					},
				},
			]);
			return { success: true, userId: newRecord[0].id };
		}
	} catch (error) {
		console.error("Error saving user to Airtable:", error);
		return { success: false, error: String(error) };
	}
}

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
	locked: boolean;
}

// Airtable returns a plain object like { error: "#ERROR!" } for formula/lookup/rollup
// cells that fail to evaluate. Rendering such an object directly crashes React
// ("Objects are not valid as a React child", minified error #31), which white-screens
// the entire page from a single bad cell. Coerce any plain object to undefined so callers
// fall back to safe defaults. Arrays (linked/lookup fields) and primitives pass through
// unchanged — React renders those fine.
function cell<T>(value: unknown): T | undefined {
	if (value !== null && typeof value === "object" && !Array.isArray(value)) {
		return undefined;
	}
	return value as T;
}

export async function fetchStocksFromAirtable(
	limit: number = 5
): Promise<StockData[]> {
	try {
		const records = await stocksTable
			.select({
				maxRecords: limit * 3,
				filterByFormula: "NOT({Display} = FALSE())",
			})
			.firstPage();

		const mapped: StockData[] = records.map((record) => {
			const status = cell<"Current" | "Sold">(
				record.get("Status")
			) as "Current" | "Sold";
			const entryPrice = cell<number>(record.get("Entry Price")) as number;
			const exitPrice = cell<number>(record.get("Exit Price"));
			const ldp = cell<number>(record.get("LDP"));
			// A failed `Gains` formula becomes undefined here and is recalculated below.
			let gains = cell<string>(record.get("Gains"));

			// Auto-calculate gains if not provided
			if (!gains) {
				if (status === "Sold" && exitPrice) {
					const gainsPercent =
						((exitPrice - entryPrice) / entryPrice) * 100;
					gains = `${
						gainsPercent > 0 ? "+" : ""
					}${gainsPercent.toFixed(2)}%`;
				} else if (status === "Current" && ldp) {
					const gainsPercent =
						((ldp - entryPrice) / entryPrice) * 100;
					gains = `${
						gainsPercent > 0 ? "+" : ""
					}${gainsPercent.toFixed(2)}%`;
				} else {
					gains = "-";
				}
			}

			return {
				id: record.id,
				name: cell<string>(record.get("Name")) as string,
				status,
				entryPrice,
				exitPrice,
				ldp,
				gains,
				// `Duration` is a formula field; fall back to "-" when it errors,
				// matching the empty-cell convention used elsewhere in the table.
				duration: cell<string>(record.get("Duration")) ?? "-",
				researchReportUrl: cell<string>(
					record.get("Research Report URL")
				),
				locked: record.get("Locked") === true, // expects a boolean 'Locked' field in Airtable
			};
		});

		// Sort stocks into locked and unlocked
		const unlocked = mapped.filter((s) => !s.locked);
		const locked = mapped.filter((s) => s.locked);

		// Concatenate, then sort all by reverse id (descending lexicographically)
		const allStocks = [...unlocked, ...locked].sort((a, b) => {
			if (a.id < b.id) return 1;
			if (a.id > b.id) return -1;
			return 0;
		});

		return allStocks;
	} catch (error) {
		console.error("Error fetching stocks from Airtable:", error);
		return [];
	}
}
