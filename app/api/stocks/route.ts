import { NextRequest, NextResponse } from "next/server";
import { stocksTable, Stock } from "@/lib/airtable";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const limit = parseInt(searchParams.get("limit") || "5", 10);

		const records = await stocksTable
			.select({
				maxRecords: limit,
				sort: [{ field: "Published", direction: "desc" }],
			})
			.firstPage();

		const stocks = records.map((record) => ({
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

		return NextResponse.json({ stocks }, { status: 200 });
	} catch (error) {
		console.error("Error fetching stocks from Airtable:", error);
		return NextResponse.json(
			{ error: "Failed to fetch stocks" },
			{ status: 500 }
		);
	}
}
