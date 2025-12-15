"use client";

import { HighestQualityResearchData } from "@/sanity/lib/types";
import Image from "next/image";
import { useState, useEffect } from "react";

interface StockData {
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

const defaultTableHeaders: HighestQualityResearchData["tableHeaders"] = [
	{ label: "Ticker", align: "left" },
	{ label: "Price Zone", align: "left" },
	{ label: "Action", align: "left" },
	{ label: "Target", align: "left" },
	{ label: "Stop-Loss", align: "left" },
	{ label: "Potential", align: "left" },
	{ label: "Duration", align: "left" },
	{ label: "Published", align: "left" },
];

const defaultData: HighestQualityResearchData = {
	visible: true,
	title: "Highest quality research, ready before the market opens",
	description:
		"Curated calls across overnight, intraday, and positional strategies. Unlock deeper analytics, price targets, and premium playbooks tailored to your desk without the noise.",
	displayLimit: 5,
	tableHeaders: defaultTableHeaders,
};

interface HighestQualityResearchDataProps {
	data?: { data: HighestQualityResearchData | null };
}

export default function HighestQualityResearchReadyBeforeTheMarketOpens({
	data,
}: HighestQualityResearchDataProps) {
	const sanityData = data?.data || defaultData;
	const displayLimit = sanityData?.displayLimit || 5;
	const tableHeaders = sanityData?.tableHeaders || defaultTableHeaders;

	const [stockData, setStockData] = useState<StockData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchStocks = async () => {
			try {
				const response = await fetch(
					`/api/stocks?limit=${displayLimit}`
				);
				if (response.ok) {
					const result = await response.json();
					setStockData(result.stocks || []);
				}
			} catch (error) {
				console.error("Error fetching stocks:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStocks();
	}, [displayLimit]);

	return (
		<section id="highest-quality-research" className="w-full py-20 md:py-[120px] px-5 md:px-20">
			<div className="max-w-7xl mx-auto flex flex-col gap-20">
				<div className="flex flex-col gap-4 text-center justify-center items-center max-w-3xl mx-auto">
					<h2 className="text-[32px] md:text-[40px] leading-10 md:leading-12 text-[#030919]">
						{sanityData?.title ||
							"Highest quality research, ready before the market opens"}
					</h2>
					<p className="text-[16px] md:text-[18px] leading-6 md:leading-7 text-black opacity-60">
						{sanityData?.description ||
							"Curated calls across overnight, intraday, and positional strategies. Unlock deeper analytics, price targets, and premium playbooks tailored to your desk without the noise."}
					</p>
				</div>
				<div className="relative bg-[#FDFDFD] border border-[#E0E0E0] outline outline-offset-4 outline-[#E0E0E0] rounded-2xl shadow-sm overflow-hidden">
					<div className="overflow-x-auto pl-12 py-4">
						<table className="w-full min-w-[1000px] p-10">
							<thead className="">
								<tr>
									{tableHeaders.map((header, index) => (
										<th
											key={index}
											className="py-[4px] pt-[16px] text-left text-[14px] leading-6 text-[#9E9E9E] font-normal"
										>
											{header.label}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="relative">
								{isLoading ? (
									<tr>
										<td
											colSpan={8}
											className="py-10 text-center text-gray-500"
										>
											<div className="flex items-center justify-center gap-2">
												<div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
												Loading stocks...
											</div>
										</td>
									</tr>
								) : stockData.length > 0 ? (
									stockData.map((stock, index) => (
										<tr key={stock.id || index}>
											<td className="py-[4px] pt-[32px] text-[16px] leading-[24px]">
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
														{stock.logo ? (
															<img
																src={stock.logo}
																alt={
																	stock.ticker
																}
																width={48}
																height={48}
																className="object-contain w-12 h-12"
																onError={(
																	e
																) => {
																	(
																		e.currentTarget as HTMLImageElement
																	).src =
																		"/assets/default/logo.png";
																}}
															/>
														) : (
															<span className="text-[16px] leading-[24px] text-gray-500">
																{stock.ticker?.slice(
																	0,
																	2
																)}
															</span>
														)}
													</div>
													<span className="uppercase text-[16px] leading-6 text-black">
														{stock.ticker}
													</span>
												</div>
											</td>
											<td className="py-[4px] pt-[32px] text-[#000] opacity-60">
												{stock.priceZone}
											</td>
											<td className="py-[4px] pt-[32px]">
												<span
													className={`inline-flex items-center px-3 py-[5px] rounded-lg text-[16px] leading-[24px] uppercase ${
														stock.action === "BUY"
															? "bg-[#D7FFE5] text-[#0FAB49] border border-[#16A34A]"
															: stock.action ===
															  "SELL"
															? "bg-[#FFD7D7] text-[#DC2626] border border-[#DC2626]"
															: "bg-[#FCFFD7] text-[#A39016] border border-[#A39016]"
													}`}
												>
													{stock.action}
												</span>
											</td>
											<td className="py-[4px] pt-[32px] text-[#000] opacity-60 text-[16px] leading-[24px]">
												₹{stock.target}
											</td>
											<td className="py-[4px] pt-[32px] text-[#000] opacity-60 text-[16px] leading-[24px]">
												₹{stock.stopLoss}
											</td>
											<td className="py-[4px] pt-[32px] text-[#16A34A] text-[16px] leading-[24px]">
												{stock.potential}
											</td>
											<td className="py-[4px] pt-[32px] text-[#000] opacity-60 text-[16px] leading-[24px]">
												{stock.duration}
											</td>
											<td className="py-[4px] pt-[32px] text-[#000] opacity-60 text-[16px] leading-[24px]">
												{new Date(
													stock.published
												).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
													year: "numeric",
												})}
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={8}
											className="py-10 text-center text-gray-500"
										>
											No stock data available
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
}
