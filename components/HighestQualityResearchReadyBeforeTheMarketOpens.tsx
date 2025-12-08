import Image from "next/image";

const stockData = [
	{
		ticker: "PEP",
		logo: "/images/stocks/pepsi.svg",
		priceZone: "165-180",
		action: "BUY",
		target: "$205.50",
		stopLoss: "$178.50",
		potential: "15 %",
		duration: "3 WEEKS",
		published: "JAN 5, 2026",
	},
	{
		ticker: "STRBKS",
		logo: "/images/stocks/starbucks.svg",
		priceZone: "172-178",
		action: "HOLD",
		target: "$202.00",
		stopLoss: "$180.00",
		potential: "8 %",
		duration: "4 WEEKS",
		published: "FEB 20, 2026",
	},
	{
		ticker: "STRBKS",
		logo: "/images/stocks/starbucks.svg",
		priceZone: "172-178",
		action: "HOLD",
		target: "$202.00",
		stopLoss: "$180.00",
		potential: "8 %",
		duration: "4 WEEKS",
		published: "FEB 20, 2026",
	},
	{
		ticker: "STRBKS",
		logo: "/images/stocks/starbucks.svg",
		priceZone: "172-178",
		action: "HOLD",
		target: "$202.00",
		stopLoss: "$180.00",
		potential: "8 %",
		duration: "4 WEEKS",
		published: "FEB 20, 2026",
	},
	{
		ticker: "STRBKS",
		logo: "/images/stocks/starbucks.svg",
		priceZone: "172-178",
		action: "HOLD",
		target: "$202.00",
		stopLoss: "$180.00",
		potential: "8 %",
		duration: "4 WEEKS",
		published: "FEB 20, 2026",
	},
];

const tableHeader = [
	{
		label: "Ticker",
		align: "left",
	},
	{
		label: "Price Zone",
		align: "left",
	},
	{
		label: "Action",
		align: "left",
	},
	{
		label: "Target",
		align: "left",
	},
	{
		label: "Stop-Loss",
		align: "left",
	},
	{
		label: "Potential",
		align: "left",
	},
	{
		label: "Duration",
		align: "left",
	},
	{
		label: "Published",
		align: "left",
	},
];

const blurredRows = [
	{ color: "bg-red-500" },
	{ color: "bg-gray-700" },
	{ color: "bg-gray-700" },
];

export default function HighestQualityResearchReadyBeforeTheMarketOpens() {
	const blurred = false;
	return (
		<section className="w-full py-[80px] md:py-[120px] px-[20px] md:px-[80px]">
			<div className="max-w-7xl mx-auto flex flex-col gap-[80px]">
				<div className="flex flex-col gap-[16px] text-center justify-center items-center max-w-3xl mx-auto">
					<h2 className="text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-[#030919]">
						Highest quality research, ready before the market opens
					</h2>
					<p className="text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-black opacity-60">
						Curated calls across overnight, intraday, and positional
						strategies. Unlock deeper analytics, price targets, and
						premium playbooks tailored to your desk without the
						noise.
					</p>
				</div>
				<div className="relative bg-[#FDFDFD] border border-[#E0E0E0] outline outline-offset-4 outline-[#E0E0E0] rounded-[16px] shadow-sm overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full min-w-[1000px]">
							<thead>
								<tr className="border-b border-gray-100">
									{tableHeader.map((header, index) => (
										<th
											key={index}
											className="text-left py-6 px-4 text-[14px] leading-[24px] text-[#9E9E9E] font-normal uppercase"
										>
											{header.label}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="relative">
								{stockData.map((stock, index) => (
									<tr
										key={index}
										className="border-b border-gray-50"
									>
										<td className="py-5 px-6">
											<div className="flex items-center gap-3">
												<div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
													<Image
														src={stock.logo}
														alt={stock.ticker}
														width={48}
														height={48}
														className="object-contain"
													/>
												</div>
												<span className="uppercase text-[16px] leading-[24px]">
													{stock.ticker}
												</span>
											</div>
										</td>
										<td className="py-5 px-4 text-[#212121] opacity-60">
											{stock.priceZone}
										</td>
										<td className="py-5 px-4">
											<span
												className={`inline-flex items-center px-[12px] py-[5px] rounded-[8px] text-[14px] leading-[24px] font-bold uppercase ${
													stock.action === "BUY"
														? "bg-[#D7FFE5] text-[#0FAB49] border border-[#16A34A]"
														: "bg-[#FCFFD7] text-[#A39016] border border-[#A39016]"
												}`}
											>
												{stock.action}
											</span>
										</td>
										<td className="py-5 px-4 text-black opacity-60 uppercase">
											{stock.target}
										</td>
										<td className="py-5 px-4 text-black opacity-50 uppercase">
											{stock.stopLoss}
										</td>
										<td className="py-5 px-4 text-[#16A34A] uppercase">
											{stock.potential}
										</td>
										<td className="py-5 px-4 text-black opacity-60 uppercase">
											{stock.duration}
										</td>
										<td className="py-5 px-4 text-black opacity-60 uppercase">
											{stock.published}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Blurred section with overlay */}
					<div className="relative">
						<div className="blur-sm pointer-events-none select-none">
							{/* <table className="w-full">
								<tbody>
									{blurredRows.map((row, index) => (
										<tr
											key={index}
											className="border-b border-gray-50"
										>
											<td className="py-5 px-6">
												<div className="flex items-center gap-3">
													<div
														className={`w-10 h-10 rounded-full ${row.color}`}
													></div>
													<span className="font-medium text-gray-400">
														---
													</span>
												</div>
											</td>
											<td className="py-5 px-4 text-gray-300">
												---
											</td>
											<td className="py-5 px-4">
												<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-400">
													---
												</span>
											</td>
											<td className="py-5 px-4 text-gray-300">
												---
											</td>
											<td className="py-5 px-4 text-gray-300">
												---
											</td>
											<td className="py-5 px-4 text-gray-300">
												---
											</td>
											<td className="py-5 px-4 text-gray-300">
												---
											</td>
											<td className="py-5 px-4 text-gray-300">
												---
											</td>
										</tr>
									))}
								</tbody>
							</table> */}
						</div>
						{blurred && (
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
									className="text-[16px] leading-[24px] text-white px-[21px] py-[16px] rounded-[8px] font-bold flex items-center gap-2"
								>
									Unlock More Stocks Data
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
											stroke-width="2"
											stroke-linecap="round"
										/>
										<path
											d="M5 10H19V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V10Z"
											stroke="white"
											stroke-width="2"
											stroke-linejoin="round"
										/>
										<path
											d="M14.5 15.5H14.5083V15.5083H14.5V15.5Z"
											stroke="white"
											stroke-width="2"
											stroke-linejoin="round"
										/>
									</svg>
								</button>
								<p className="mt-4 text-black opacity-70 text-center">
									You need a plan to unlock premium research
									insights
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
