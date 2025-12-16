import { NextRequest, NextResponse } from "next/server";
import Airtable from "airtable";

// Initialize a separate table for download tracking (optional but recommended)
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_ID!
);

// You can create a new table called "Research Downloads" in Airtable with fields:
// - Name (text)
// - Email (email)
// - Phone (phone)
// - Stock Name (text)
// - Research Report URL (URL)
// - Downloaded At (date)
const downloadsTable = base(process.env.AIRTABLE_DOWNLOADS_TABLE_NAME || "Research Downloads");

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, phone, stockName, researchReportUrl } = body;

		// Validate required fields
		if (!name || !email || !phone) {
			return NextResponse.json(
				{ error: "Name, email, and phone are required" },
				{ status: 400 }
			);
		}

		if (!stockName || !researchReportUrl) {
			return NextResponse.json(
				{ error: "Stock name and research report URL are required" },
				{ status: 400 }
			);
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email format" },
				{ status: 400 }
			);
		}

		// Log the download request to Airtable
		try {
			await downloadsTable.create([
				{
					fields: {
						Name: name,
						Email: email,
						Phone: phone,
						"Stock Name": stockName,
						"Research Report URL": researchReportUrl,
						"Downloaded At": new Date().toISOString(),
					},
				},
			]);
		} catch (airtableError) {
			console.error("Error logging to Airtable:", airtableError);
			// Continue even if logging fails - don't block the download
		}

		// Return the research report URL to trigger download
		return NextResponse.json(
			{
				success: true,
				downloadUrl: researchReportUrl,
				message: "Form submitted successfully",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error processing download request:", error);
		return NextResponse.json(
			{ error: "Failed to process download request" },
			{ status: 500 }
		);
	}
}
