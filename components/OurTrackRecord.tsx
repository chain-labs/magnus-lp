import type { OurTrackRecordData } from "@/sanity/lib/types";

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

export default function OurTrackRecord({ data }: OurTrackRecordProps) {
	const trackRecordData = data?.data || defaultTrackRecordData;
	return (
		<section id="our-track-record" className="w-full py-[80px] md:py-[112px] px-[20px] md:px-[80px]">
			<div className="max-w-7xl mx-auto">
				<div className="grid  grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[80px]">
					<div 
						className="w-full h-full min-h-[376px] bg-[#67676733] rounded-[12px]"
						style={{
							backgroundImage: trackRecordData.heroImage ? `url(${trackRecordData.heroImage})` : undefined,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					></div>
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
