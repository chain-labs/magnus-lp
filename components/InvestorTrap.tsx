"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

// Card pairs - each pair appears together (left + right)
const cardPairs = [
	{
		id: "pair-1",
		left: {
			title: "Emotional Trading",
			subtitle: "(Fear & Greed)",
		},
		right: {
			title: "Hero Mentality",
			subtitle: "(Following the crowd)",
		},
		// Vertical position on the funnel (percentage from top)
		topPosition: "20%",
	},
	{
		id: "pair-2",
		left: {
			title: "Timing the Market",
			subtitle: "(Buying high, selling low)",
		},
		right: {
			title: "Lack of Diversification",
			subtitle: "(Only investing on similar stocks)",
		},
		topPosition: "50%",
	},
	{
		id: "pair-3",
		left: {
			title: "Chasing Past Performance",
			subtitle: "(Assuming old ways always works)",
		},
		right: {
			title: "Ignoring Fees and Expenses",
			subtitle: "(Buying high, selling low)",
		},
		topPosition: "80%",
	},
];

// Card component with connecting line
function TrapCard({
	title,
	subtitle,
	side,
	style,
}: {
	title: string;
	subtitle: string;
	side: "left" | "right";
	style?: React.CSSProperties;
}) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "start start"],
	});

	const opacity = useTransform(
		scrollYProgress,
		[0.6, 0.7, 0.8, 0.9],
		[0.3, 1, 1, 0.3]
	);

	return (
		<motion.div
			ref={ref}
			className={`flex items-center gap-3 ${
				side === "left" ? "flex-row" : "flex-row-reverse"
			}`}
			style={{ ...style, opacity }}
		>
			{/* Card content */}
			<div
				className={`bg-[#1a1f35]/90 backdrop-blur-sm border border-[#2a3050] rounded-lg px-4 py-3 min-w-[200px]`}
			>
				<h3 className="text-white text-base font-semibold">{title}</h3>
				<p className="text-gray-400 text-sm mt-1">{subtitle}</p>
			</div>
		</motion.div>
	);
}


export default function InvestorTrap() {
	return (
		<section className="relative w-full h-[200vh] z-10">
			{/* Sticky wrapper that pins everything in viewport */}
			<h1 className="text-[40px] leading-[48px] text-center text-white pt-[250px]">
				The retail investor&apos;s trap.
				<br />
				And how we fix it.
			</h1>
			<Image
				src="/assets/section/investorTrap/trap.svg"
				alt="Investor Trap Funnel"
				width={600}
				height={800}
				className="block sticky top-[150px] w-[510px] h-[704.5px] mx-auto mt-[100px] mb-10"
			/>
			{/* Cards */}

			<div className="relative h-screen transform -translate-y-[80%]">
				{cardPairs.map((pair) => (
					<>
						<TrapCard
							title={pair.left.title}
							subtitle={pair.left.subtitle}
							side="left"
							style={{
								position: "absolute",
								top: pair.topPosition,
								left: "15%",
								transform: "translateY(-100%)",
							}}
						/>
						<TrapCard
							title={pair.right.title}
							subtitle={pair.right.subtitle}
							side="right"
							style={{
								position: "absolute",
								top: pair.topPosition,
								right: "15%",
								transform: "translateY(50%) ",
							}}
						/>
					</>
				))}
			</div>
		</section>
	);
}
