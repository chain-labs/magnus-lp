"use client";

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

interface TableHeader {
	label: string;
	align: string;
}

interface HighestQualityResearchData {
	data: {
		title: string;
		description: string;
		displayLimit: number;
		tableHeaders: TableHeader[];
		ctaTitle?: string;
		ctaDescription?: string;
		ctaButtonText?: string;
		ctaButtonLink?: string;
	} | null;
}

const defaultTableHeaders: TableHeader[] = [
	{ label: "Ticker", align: "left" },
	{ label: "Price Zone", align: "left" },
	{ label: "Action", align: "left" },
	{ label: "Target", align: "left" },
	{ label: "Stop-Loss", align: "left" },
	{ label: "Potential", align: "left" },
	{ label: "Duration", align: "left" },
	{ label: "Published", align: "left" },
];

export default function HighestQualityResearchReadyBeforeTheMarketOpens({
	data,
}: HighestQualityResearchData) {
	const sanityData = data;
	const displayLimit = sanityData?.displayLimit || 5;
	const tableHeaders = sanityData?.tableHeaders || defaultTableHeaders;
	const blurred = false;

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
		<section className="w-full py-20 md:py-[120px] px-5 md:px-20">
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
											<td className="py-[20px] text-[16px] leading-[24px]">
												<div className="flex items-center gap-3">
													<div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
														{stock.logo ? (
															<img
																src={stock.logo}
																alt={stock.ticker}
																width={48}
																height={48}
																className="object-contain w-12 h-12"
																onError={(e) => {
																	(e.currentTarget as HTMLImageElement).src = "/assets/default/logo.png";
																}}
															/>
														) : (
															<span className="text-[16px] leading-[24px] text-gray-500">
																{stock.ticker?.slice(0, 2)}
															</span>
														)}
													</div>
													<span className="uppercase text-[16px] leading-6 text-black">
														{stock.ticker}
													</span>
												</div>
											</td>
											<td className="py-[4px] pt-[32px] text-[#212121] opacity-60">
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
											<td className="py-[4px] pt-[32px] text-[#212121] opacity-60 text-[16px] leading-[24px]">
												₹{stock.target}
											</td>
											<td className="py-[4px] pt-[32px] text-[#212121] opacity-50 text-[16px] leading-[24px]">
												₹{stock.stopLoss}
											</td>
											<td className="py-[4px] pt-[32px] text-[#16A34A] text-[16px] leading-[24px]">
												{stock.potential}
											</td>
											<td className="py-[4px] pt-[32px] text-[#212121] opacity-60 text-[16px] leading-[24px]">
												{stock.duration}
											</td>
											<td className="py-[4px] pt-[32px] text-[#212121] opacity-60 text-[16px] leading-[24px]">
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

					{/* Blurred section with overlay */}
					{blurred && (
						<div className="relative">
							<div className="blur-sm pointer-events-none select-none"></div>
							<div
								style={{
									height: `${(stockData.length - 2) * 81}px`,
								}}
								className="absolute backdrop-blur-sm bottom-0 left-0 w-full flex flex-col items-center justify-center"
							>
								<button
									style={{
										background: `radial-gradient(97.46% 172.79% at 2.54% 70.83%, #A12FFF 0%, rgba(0, 22, 118, 0.5) 100%),
										radial-gradient(169.02% 564.79% at 77.54% -103.13%, #2FFCFF 0%, rgba(0, 22, 118, 0.5) 100%),
										#00177C`,
									}}
									className="text-[16px] leading-6 text-white px-[21px] py-4 rounded-lg font-bold flex items-center gap-2"
								>
									{sanityData?.ctaButtonText ||
										"Unlock More Stocks Data"}
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8 10V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V10"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
										/>
										<path
											d="M5 10H19V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V10Z"
											stroke="white"
											strokeWidth="2"
											strokeLinejoin="round"
										/>
										<path
											d="M14.5 15.5H14.5083V15.5083H14.5V15.5Z"
											stroke="white"
											strokeWidth="2"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
								<p className="mt-4 text-black opacity-70 text-center">
									{sanityData?.ctaDescription ||
										"You need a plan to unlock premium research insights"}
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
