"use client";

import type { OurTrackRecordData } from "@/sanity/lib/types";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";

// Default company performance comparison data
const defaultCompanyPerformanceData = [
	{ company: "Magnus", returnPercentage: 24.5, color: "#3b82f6" },
	{ company: "Motilal Oswal", returnPercentage: 18.2, color: "#6b7280" },
	{ company: "Zerodha", returnPercentage: 16.8, color: "#6b7280" },
	{ company: "Groww", returnPercentage: 15.3, color: "#6b7280" },
	{ company: "Angel One", returnPercentage: 14.7, color: "#6b7280" },
];

// Static data - commented out in favor of Sanity CMS
// const trackRecordData = [
// 	{
// 		value: "4,000+",
// 		description: "Retail Investors Trust Our Research",
// 	},
// 	{
// 		value: "25+",
// 		description: "Years Cumulative Team Experience",
// 	},
// 	{
// 		value: "500k+",
// 		description: "Social Media Following",
// 	},
// 	{
// 		value: "High",
// 		description: "Renewal Rate Through Oct 2024— Apr 2025 Crash",
// 	},
// ];

// Default fallback data
const defaultTrackRecordData: OurTrackRecordData = {
	visible: true,
	title: "Our track record",
	subtitle: "We don't promise returns. We promise clarity.",
	stats: [
		{
			value: "4,000+",
			description: "Retail Investors Trust Our Research",
		},
		{
			value: "25+",
			description: "Years Cumulative Team Experience",
		},
		{
			value: "500k+",
			description: "Social Media Following",
		},
		{
			value: "High",
			description: "Renewal Rate Through Oct 2024— Apr 2025 Crash",
		},
	],
};

interface OurTrackRecordProps {
	data?: { data: OurTrackRecordData | null };
}


// Bar Chart Component
function PerformanceComparisonChart({ data }: { data: OurTrackRecordData }) {
	const companyData =
		data.companyPerformanceData || defaultCompanyPerformanceData;
	const chartTitle = data.chartTitle || "Performance Comparison";
	const chartSubtitle = data.chartSubtitle || "Since Inception Returns";

	return (
		<div className="w-full h-full min-h-[376px] bg-[#67676733] rounded-[12px] p-6 flex flex-col">
			<div className="mb-4">
				<h3 className="text-white text-lg font-semibold mb-1">
					{chartTitle}
				</h3>
				<p className="text-white/60 text-sm">{chartSubtitle}</p>
			</div>

			<ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
				<>
					{/* Desktop Layout */}
					<div className="hidden md:block w-full h-[300px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={companyData}
								margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
							>
								<XAxis
									dataKey="company"
									stroke="transparent"
									tick={{
										fill: "rgba(255,255,255,0.85)",
										fontSize: 12,
										fontWeight: 500,
									}}
									axisLine={false}
									tickLine={false}
									dy={10}
									interval={0}
								/>
								<Tooltip
									content={({ active, payload, label }) => {
										if (active && payload && payload.length) {
											const value = payload[0].value as number;
											return (
												<div className="bg-[#1a1a1a85] backdrop-blur-2xl border border-white/20 rounded-lg p-4 shadow-xl">
													<p className="text-white font-semibold text-base mb-2">
														{label}
													</p>
													<div className="flex items-center gap-2">
														<div
															className="w-3 h-3 rounded-full"
															style={{
																backgroundColor:
																	payload[0].payload
																		.color,
															}}
														/>
														<p
															className={`font-bold text-lg ${
																value >= 0
																	? "text-green-400"
																	: "text-red-400"
															}`}
														>
															{value > 0 ? "+" : ""}
															{value}% Returns
														</p>
													</div>
												</div>
											);
										}
										return null;
									}}
									cursor={{ fill: "rgba(255,255,255,0.08)", radius: 8 }}
								/>
								<Bar dataKey="returnPercentage" radius={[6, 6, 0, 0]} style={{ outline: 'none' }}>
									{companyData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												entry.color ||
												(index === 0 ? "#3b82f6" : "#6b7280")
											}
											style={{ outline: 'none' }}
										/>
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>

					{/* Mobile Layout */}
					<div className="block md:hidden w-full h-[250px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={companyData}
								margin={{ top: 25, right: 5, left: 5, bottom: 20 }}
							>
								<XAxis
									dataKey="company"
									stroke="transparent"
									tick={{
										fill: "rgba(255,255,255,0.85)",
										fontSize: 9,
										fontWeight: 500,
									}}
									axisLine={false}
									tickLine={false}
									dy={10}
									interval={0}
									angle={-25}
									textAnchor="end"
									height={60}
								/>
								<Bar 
									dataKey="returnPercentage" 
									radius={[4, 4, 0, 0]} 
									style={{ outline: 'none' }}
									label={{
										position: 'top',
										fill: 'rgba(255,255,255,0.85)',
										fontSize: 10,
										fontWeight: 600,
										formatter: (value) => value != null ? `${Number(value) > 0 ? '+' : ''}${value}%` : '',
									}}
								>
									{companyData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												entry.color ||
												(index === 0 ? "#3b82f6" : "#6b7280")
											}
											style={{ outline: 'none' }}
										/>
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</>
			</ResponsiveContainer>
		</div>
	);
}

export default function OurTrackRecord({ data }: OurTrackRecordProps) {
	const trackRecordData = data?.data || defaultTrackRecordData;
	return (
		<section
			id="our-track-record"
			className="w-full py-[80px] md:py-[112px] px-[20px] md:px-[80px]"
		>
			<div className="max-w-7xl mx-auto">
				<div className="grid  grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[80px]">
					<PerformanceComparisonChart data={trackRecordData} />
					<div className="flex flex-col gap-[24px]">
						<div className="flex flex-col gap-[8px]">
							<h2 className="text-[40px] leading-[48px] text-white">
								{trackRecordData.title}
							</h2>
							<p className="text-[16px] leading-[24px] text-white">
								{trackRecordData.subtitle}
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
							{trackRecordData.stats.map((item, index) => (
								<div
									key={`stat-${index}`}
									className="rounded-[8px] bg-[#F8F9FB1A] py-[16px] px-[12px] flex flex-col gap-4"
								>
									<div className="text-[32px] leading-[40px] text-white">
										{item.value}
									</div>
									<p className="text-[16px] leading-[24px] text-white opacity-60">
										{item.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
