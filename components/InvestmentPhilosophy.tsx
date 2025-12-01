import { FaRegFrown } from "react-icons/fa";

const investmentPhilosophyData = [
	{
		id: "item-1",
		icon: (
			<FaRegFrown className="text-white text-[48px] leading-[48px] mb-[24px]" />
		),
		title: "Markets Keep Changing",
		description:
			"The market doesn't care about your old playbook. What worked in 2019 might not work today. We adapt. We stay flexible. And we never fall in love with a single approach.",
	},
	{
		id: "item-2",
		icon: (
			<FaRegFrown className="text-white text-[48px] leading-[48px] mb-[24px]" />
		),
		title: "Rigorous, Not Random",
		description:
			"We don't pick stocks based on gut feelings or hot tips. Every recommendation is backed by research. Every call is thought through. If we can't explain it clearly, we don't recommend it.",
	},
	{
		id: "item-3",
		icon: (
			<FaRegFrown className="text-white text-[48px] leading-[48px] mb-[24px]" />
		),
		title: "Moving at Market Speed",
		description:
			"Markets don't wait for quarterly reports. When something changes, you need to know. We send updates when they matter—not on a schedule, but when the situation demands it.",
	},
	{
		id: "item-4",
		icons: (
			<FaRegFrown className="text-white text-[48px] leading-[48px] mb-[24px]" />
		),
		title: "Market as Teacher",
		description:
			"We don't claim to know everything. The market humbles everyone eventually. But we've been at this long enough to know what works, what doesn't, and when to pivot.",
	},
];

export default function InvestmentPhilosophy() {
	return (
		<section className="w-full py-[120px] px-[80px] bg-[#000728]">
			<div className="max-w-7xl mx-auto grid grid-cols-3 gap-[80px]">
				<div className="flex flex-col gap-[16px] col-span-1">
					<h6 className="text-[20px] leading-[32px] text-white">
						Investment Philosophy
					</h6>
					<h2 className="max-w-2xl text-[40px] leading-[48px] text-white">
						How We Think About Investing
					</h2>
				</div>
				<div className="w-full h-full grid grid-cols-2 gap-x-[48px] gap-y-[64px] col-span-2">
					{investmentPhilosophyData.map((item) => (
						<div
							key={item.id}
							className="w-full h-full gap-[24px] flex flex-col"
						>
							{item.icon}
							<h5 className="text-white text-[24px] leading-[32px]">
								{item.title}
							</h5>
							<p className="text-white text-[16px] leading-[24px] opacity-70">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
