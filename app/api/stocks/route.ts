import { NextRequest, NextResponse } from "next/server";
import { fetchStocksFromAirtable } from "@/lib/airtable";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const limit = parseInt(searchParams.get("limit") || "5", 10);

		const stocks = await fetchStocksFromAirtable(limit);

		return NextResponse.json({ stocks }, { status: 200 });
	} catch (error) {
		console.error("Error fetching stocks from Airtable:", error);
		return NextResponse.json(
			{ error: "Failed to fetch stocks" },
			{ status: 500 }
		);
	}
}
