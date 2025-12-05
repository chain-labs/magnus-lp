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
	return (
		<motion.div
			className={`flex items-center gap-3 ${
				side === "left" ? "flex-row" : "flex-row-reverse"
			}`}
			style={style}
		>
			{/* Dashed line connecting to funnel */}
			<div className="w-[50px] lg:w-[80px] border-t-2 border-dashed border-[#4A6CF7]/60" />
			{/* Card content */}
			<div
				className={`bg-[#1a1f35]/90 backdrop-blur-sm border border-[#2a3050] rounded-lg px-4 py-3 min-w-[200px] ${
					side === "left" ? "text-left" : "text-right"
				}`}
			>
				<h3 className="text-white text-base font-semibold">{title}</h3>
				<p className="text-gray-400 text-sm mt-1">{subtitle}</p>
			</div>
		</motion.div>
	);
}

export default function InvestorTrap() {
	const sectionRef = useRef<HTMLElement>(null);

	// Track scroll progress within this section
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	// Pair 1 animations (0 - 0.33)
	const pair1Opacity = useTransform(
		scrollYProgress,
		[0.05, 0.15, 0.25, 0.33],
		[0, 1, 1, 0]
	);
	const pair1Y = useTransform(
		scrollYProgress,
		[0.05, 0.15, 0.25, 0.33],
		[50, 0, 0, -50]
	);

	// Pair 2 animations (0.33 - 0.66)
	const pair2Opacity = useTransform(
		scrollYProgress,
		[0.38, 0.48, 0.58, 0.66],
		[0, 1, 1, 0]
	);
	const pair2Y = useTransform(
		scrollYProgress,
		[0.38, 0.48, 0.58, 0.66],
		[50, 0, 0, -50]
	);

	// Pair 3 animations (0.66 - 1.0)
	const pair3Opacity = useTransform(
		scrollYProgress,
		[0.71, 0.81, 0.91, 0.99],
		[0, 1, 1, 0]
	);
	const pair3Y = useTransform(
		scrollYProgress,
		[0.71, 0.81, 0.91, 0.99],
		[50, 0, 0, -50]
	);

	const pairAnimations = [
		{ opacity: pair1Opacity, y: pair1Y },
		{ opacity: pair2Opacity, y: pair2Y },
		{ opacity: pair3Opacity, y: pair3Y },
	];

	return (
		<section ref={sectionRef} className="w-full h-[400vh] relative">
			{/* Sticky wrapper that pins everything in viewport */}
			<div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
				{/* Background container for centering */}
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					{/* Title at the top */}
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="absolute top-[5%] text-[32px] lg:text-[40px] leading-tight text-white text-center px-4 z-20"
					>
						The retail investor&apos;s trap.
						<br /> And how we fix it.
					</motion.h2>

					{/* Funnel image - absolutely centered */}
					<div className="relative z-10">
						<Image
							src="/assets/section/investorTrap/trap.svg"
							alt="Debt Trap Funnel"
							width={548}
							height={906}
							className="h-[70vh] w-auto max-h-[700px] object-contain"
							priority
						/>
					</div>

					{/* Left side cards */}
					{cardPairs.map((pair, index) => (
						<div
							key={`left-${pair.id}`}
							className="absolute z-20"
							style={{
								top: pair.topPosition,
								right: "calc(50% + 140px)",
							}}
						>
							<TrapCard
								title={pair.left.title}
								subtitle={pair.left.subtitle}
								side="left"
								style={{
									opacity: pairAnimations[index].opacity as any,
									y: pairAnimations[index].y as any,
								}}
							/>
						</div>
					))}

					{/* Right side cards */}
					{cardPairs.map((pair, index) => (
						<div
							key={`right-${pair.id}`}
							className="absolute z-20"
							style={{
								top: pair.topPosition,
								left: "calc(50% + 140px)",
							}}
						>
							<TrapCard
								title={pair.right.title}
								subtitle={pair.right.subtitle}
								side="right"
								style={{
									opacity: pairAnimations[index].opacity as any,
									y: pairAnimations[index].y as any,
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
