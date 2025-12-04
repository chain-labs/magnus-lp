"use client";

import { motion } from "motion/react";
import Image from "next/image";

const investmentMistakes = [
	{
		id: "emotional-trading",
		title: "Emotional Trading",
		subtitle: "(Fear & Greed)",
		position: "top-left",
		lineStart: { x: 0, y: 0 },
		lineEnd: { x: 50, y: 50 },
	},
	{
		id: "hero-mentality",
		title: "Hero Mentality",
		subtitle: "(Following the crowd)",
		position: "top-right",
		lineStart: { x: 100, y: 0 },
		lineEnd: { x: 50, y: 50 },
	},
	{
		id: "timing-market",
		title: "Timing the Market",
		subtitle: "(Buying high, selling low)",
		position: "middle-left",
		lineStart: { x: 0, y: 50 },
		lineEnd: { x: 40, y: 60 },
	},
	{
		id: "lack-diversification",
		title: "Lack of Diversification",
		subtitle: "(Only investing on similar stocks)",
		position: "middle-right",
		lineStart: { x: 100, y: 50 },
		lineEnd: { x: 60, y: 60 },
	},
	{
		id: "chasing-performance",
		title: "Chasing Past Performance",
		subtitle: "(Assuming old ways always works)",
		position: "bottom-left",
		lineStart: { x: 0, y: 100 },
		lineEnd: { x: 35, y: 75 },
	},
	{
		id: "ignoring-fees",
		title: "Ignoring Fees and Expenses",
		subtitle: "(Buying high, selling low)",
		position: "bottom-right",
		lineStart: { x: 100, y: 100 },
		lineEnd: { x: 65, y: 75 },
	},
];

export default function InvestorTrap() {
	return (
		<section className="w-full py-[120px] px-[80px]">
			<div className="max-w-7xl mx-auto">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-[40px] leading-[48px] text-white mb-[80px] text-center"
				>
					Investor Trap
				</motion.h2>

				<div className="relative w-full min-h-[1000px] flex items-center justify-center">
					{/* Central Funnel SVG */}

					<Image
						src="/assets/section/investorTrap/trap.svg"
						alt="Debt Trap Funnel"
						width={548}
						height={906}
						className="w-auto h-auto"
					/>
				</div>
			</div>
		</section>
	);
}
