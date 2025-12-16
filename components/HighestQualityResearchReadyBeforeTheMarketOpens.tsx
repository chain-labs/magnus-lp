"use client";

import { HighestQualityResearchData, StockData } from "@/sanity/lib/types";
import { useState, useEffect } from "react";
import ResearchDownloadModal from "./ResearchDownloadModal";

const defaultTableHeaders: HighestQualityResearchData["tableHeaders"] = [
	{ label: "Name", align: "left" },
	{ label: "Status", align: "left" },
	{ label: "Entry Price", align: "left" },
	{ label: "Exit Price", align: "left" },
	{ label: "LDP", align: "left" },
	{ label: "Gains", align: "left" },
	{ label: "Duration", align: "left" },
	{ label: "Research Report", align: "left" },
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
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedStock, setSelectedStock] = useState<{
		name: string;
		url: string;
	} | null>(null);

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

	const handleDownloadClick = (name: string, url: string | undefined) => {
		if (!url) return;
		setSelectedStock({ name, url });
		setModalOpen(true);
	};

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
									stockData.map((stock, index) => {
										const gainsValue = parseFloat(stock.gains.replace(/[+%]/g, ""));
										const isPositiveGains = gainsValue > 0;
										const isNegativeGains = gainsValue < 0;

										return (
											<tr key={stock.id || index}>
												<td className="py-[4px] pt-[32px] text-[16px] leading-[24px] text-black font-medium">
													{stock.name}
												</td>
												<td className="py-[4px] pt-[32px]">
													<span
														className={`inline-flex items-center px-3 py-[5px] rounded-lg text-[14px] leading-[20px] font-medium uppercase ${
															stock.status === "Current"
																? "bg-[#DBEAFE] text-[#1E40AF] border border-[#3B82F6]"
																: "bg-[#F3F4F6] text-[#6B7280] border border-[#9CA3AF]"
														}`}
													>
														{stock.status}
													</span>
												</td>
												<td className="py-[4px] pt-[32px] text-[#000] opacity-60 text-[16px] leading-[24px]">
													₹{stock.entryPrice.toLocaleString()}
												</td>
												<td className="py-[4px] pt-[32px] text-[#000] opacity-60 text-[16px] leading-[24px]">
													{stock.exitPrice ? `₹${stock.exitPrice.toLocaleString()}` : "-"}
												</td>
												<td className="py-[4px] pt-[32px] text-[#000] opacity-60 text-[16px] leading-[24px]">
													{stock.ldp ? `₹${stock.ldp.toLocaleString()}` : "-"}
												</td>
												<td className={`py-[4px] pt-[32px] text-[16px] leading-[24px] font-semibold ${
													isPositiveGains ? "text-[#16A34A]" : isNegativeGains ? "text-[#DC2626]" : "text-[#000] opacity-60"
												}`}>
													{stock.gains}
												</td>
												<td className="py-[4px] pt-[32px] text-[#000] opacity-60 text-[16px] leading-[24px]">
													{stock.duration}
												</td>
												<td className="py-[4px] pt-[32px]">
													{stock.researchReportUrl ? (
														<button
															onClick={() => handleDownloadClick(stock.name, stock.researchReportUrl)}
															className="inline-flex items-center gap-2 px-4 py-2 bg-[#030919] text-white rounded-lg text-[14px] leading-[20px] font-medium hover:bg-[#030919]/90 transition-all"
														>
															<svg
																className="w-4 h-4"
																fill="none"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
															</svg>
															Download
														</button>
													) : (
														<span className="text-[#000] opacity-40 text-[14px] leading-[20px]">
															Not Available
														</span>
													)}
												</td>
											</tr>
										);
									})
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

			{/* Download Modal */}
			{selectedStock && (
				<ResearchDownloadModal
					isOpen={modalOpen}
					onClose={() => setModalOpen(false)}
					stockName={selectedStock.name}
					researchReportUrl={selectedStock.url}
				/>
			)}
		</section>
	);
}
