"use client";

import { InvestorTrapData } from "@/sanity/lib/types";
import {
	motion,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "motion/react";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";

// Static data - commented out in favor of Sanity CMS
// const cardPairs = [
// 	{
// 		id: "pair-1",
// 		left: {
// 			title: "Emotional Trading",
// 			subtitle: "(Fear & Greed)",
// 		},
// 		right: {
// 			title: "Hero Mentality",
// 			subtitle: "(Following the crowd)",
// 		},
// 		topPosition: "20%",
// 	},
// 	{
// 		id: "pair-2",
// 		left: {
// 			title: "Timing the Market",
// 			subtitle: "(Buying high, selling low)",
// 		},
// 		right: {
// 			title: "Lack of Diversification",
// 			subtitle: "(Only investing on similar stocks)",
// 		},
// 		topPosition: "50%",
// 	},
// 	{
// 		id: "pair-3",
// 		left: {
// 			title: "Chasing Past Performance",
// 			subtitle: "(Assuming old ways always works)",
// 		},
// 		right: {
// 			title: "Ignoring Fees and Expenses",
// 			subtitle: "(Buying high, selling low)",
// 		},
// 		topPosition: "80%",
// 	},
// ];

// Default fallback data
const defaultInvestorTrapData: InvestorTrapData = {
	title: "The retail investor's trap.",
	subtitle: "And how we fix it.",
	cardPairs: [
		{
			left: {
				title: "Emotional Trading",
				subtitle: "(Fear & Greed)",
			},
			right: {
				title: "Hero Mentality",
				subtitle: "(Following the crowd)",
			},
			topPosition: "22%",
		},
		{
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
	],
};

interface InvestorTrapProps {
	data?: { data: InvestorTrapData | null };
}

function useMidlineTrigger(triggerPercentage: number = 0.1) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		function handleScroll() {
			if (!ref.current) return;

			const rect = ref.current.getBoundingClientRect();
			const viewportMid = (window.innerHeight * triggerPercentage) + 231;

			// If the TOP of the card has reached or passed the middle of the screen
			if (rect.top <= viewportMid) {
				setIsActive(true);
			} else {
				setIsActive(false);
			}
		}

		// Run once on mount
		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	return { ref, isActive };
}

function MobileTrapCard({
	pair,
	index,
}: {
	pair: {
		left: {
			title: string;
			subtitle: string;
		};
		right: {
			title: string;
			subtitle: string;
		};
		topPosition: string;
	};
	index: number;
}) {
	const { ref: leftRef, isActive: leftActive } = useMidlineTrigger(0.5);
	const { ref: rightRef, isActive: rightActive } = useMidlineTrigger(0.5);
	return (
		<div key={index} className="">
			<motion.div
				ref={leftRef}
				initial={{ opacity: 0.3 }}
				animate={{ opacity: leftActive ? 1 : 0.3 }}
				transition={{ duration: 0.25, ease: "easeOut" }}
				className={`bg-[#1a1f35]/90 backdrop-blur-sm border border-[#2a3050] rounded-lg px-4 py-3 min-w-[200px] w-[261px] mb-4 mx-auto`}
			>
				<h3 className="text-white text-base font-semibold">
					{pair.left.title}
				</h3>
				<p className="text-gray-400 text-sm mt-1">
					{pair.left.subtitle}
				</p>
			</motion.div>
			<motion.div
				ref={rightRef}
				initial={{ opacity: 0.3 }}
				animate={{ opacity: rightActive ? 1 : 0.3 }}
				transition={{ duration: 0.25, ease: "easeOut" }}
				className={`bg-[#1a1f35]/90 backdrop-blur-sm border border-[#2a3050] rounded-lg px-4 py-3 min-w-[200px] w-[261px] mb-4 mx-auto`}
			>
				<h3 className="text-white text-base font-semibold">
					{pair.right.title}
				</h3>
				<p className="text-gray-400 text-sm mt-1">
					{pair.right.subtitle}
				</p>
			</motion.div>
		</div>
	);
}

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
	const { ref, isActive } = useMidlineTrigger();

	return (
		<motion.div
			ref={ref}
			className={`flex items-center gap-3 ${
				side === "left" ? "flex-row" : "flex-row-reverse"
			}`}
			style={style}
			initial={{ opacity: 0.3 }}
			animate={{ opacity: isActive ? 1 : 0.3 }}
			transition={{ duration: 0.25, ease: "easeOut" }}
		>
			<div className="bg-[#1a1f35]/90 backdrop-blur-sm border border-[#2a3050] rounded-lg px-4 py-3 min-w-[200px]">
				<h3 className="text-white text-base font-semibold">{title}</h3>
				<p className="text-gray-400 text-sm mt-1">{subtitle}</p>
			</div>
		</motion.div>
	);
}

export default function InvestorTrap({ data }: InvestorTrapProps) {
	const investorTrapData = data?.data || defaultInvestorTrapData;
	const cardPairs = investorTrapData.cardPairs;

	return (
		<section className="relative w-full min-h-fit z-[-1] bg-[#000728]">
			{/* Background Skewed Grid */}
			<div className="absolute w-full h-full overflow-hidden z-[-1]">
				<div className="absolute top-[0%] left-[50%] translate-x-[-50%] translate-y-[0%] w-[571px] h-[571px] aspect-square bg-[#5872BA] blur-[339.1px] opacity-80"></div>
				<div className="absolute top-[15%] left-[100%] translate-x-[50%] w-[571px] h-[571px] aspect-square bg-[#5872BA] blur-[339.1px]"></div>
				<div className="absolute top-[15%] left-[0%] translate-x-[-50%] w-[571px] h-[571px] aspect-square bg-[#5872BA] blur-[339.1px] opacity-20"></div>
			</div>
			<div className="w-full md:h-[2200px] py-20 md:py-[120px] px-5 z-10 md:pt-[370px]">
				<Image
					src="/assets/section/hero/skewedGrid.svg"
					alt="skewed grid"
					width={1000}
					height={1000}
					className="w-full h-[50%] max-h-[500px] absolute bottom-0 left-0 object-cover rotate-180 -z-10 opacity-30"
				/>

				{/* Sticky wrapper that pins everything in viewport */}
				<h1 className="block md:sticky top-[10vh] text-[24px] md:text-[40px] leading-8 md:leading-12 text-center text-white">
					{investorTrapData.title}
					<br />
					{investorTrapData.subtitle}
					<Image
						src="/assets/section/investorTrap/trap-desktop.svg"
						alt="Investor Trap Funnel"
						width={600}
						height={800}
						className="hidden md:block md:sticky max-w-full w-[510px] h-[704.5px] mx-auto mt-[100px] mb-10"
					/>
				</h1>

				{/* mobile */}
				<div className="md:hidden mt-10">
					{cardPairs.map((pair, index) => (
						<MobileTrapCard pair={pair} index={index} key={index} />
					))}
					<svg
						width="44"
						height="129"
						viewBox="0 0 44 129"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="mx-auto"
					>
						<path
							d="M37.7735 129L43.547 119L32 119L37.7735 129ZM37.7735 0L36.7735 4.37114e-08L36.7735 2.01563L37.7735 2.01562L38.7735 2.01562L38.7735 -4.37114e-08L37.7735 0ZM37.7735 6.04688L36.7735 6.04688L36.7735 10.0781L37.7735 10.0781L38.7735 10.0781L38.7735 6.04688L37.7735 6.04688ZM37.7735 14.1094L36.7735 14.1094L36.7735 18.1406L37.7735 18.1406L38.7735 18.1406L38.7735 14.1094L37.7735 14.1094ZM37.7735 22.1719L36.7735 22.1719L36.7735 26.2031L37.7735 26.2031L38.7735 26.2031L38.7735 22.1719L37.7735 22.1719ZM37.7735 30.2344L36.7735 30.2344L36.7735 34.2656L37.7735 34.2656L38.7735 34.2656L38.7735 30.2344L37.7735 30.2344ZM37.7735 38.2969L36.7735 38.2969L36.7735 42.3281L37.7735 42.3281L38.7735 42.3281L38.7735 38.2969L37.7735 38.2969ZM37.7735 46.3594L36.7735 46.3594L36.7735 50.3906L37.7735 50.3906L38.7735 50.3906L38.7735 46.3594L37.7735 46.3594ZM37.7735 54.4219L36.7735 54.4219L36.7735 58.4531L37.7735 58.4531L38.7735 58.4531L38.7735 54.4219L37.7735 54.4219ZM37.7735 62.4844L36.7735 62.4844L36.7735 66.5156L37.7735 66.5156L38.7735 66.5156L38.7735 62.4844L37.7735 62.4844ZM37.7735 70.5469L36.7735 70.5469L36.7735 74.5781L37.7735 74.5781L38.7735 74.5781L38.7735 70.5469L37.7735 70.5469ZM37.7735 78.6094L36.7735 78.6094L36.7735 82.6406L37.7735 82.6406L38.7735 82.6406L38.7735 78.6094L37.7735 78.6094ZM37.7735 86.6719L36.7735 86.6719L36.7735 90.7031L37.7735 90.7031L38.7735 90.7031L38.7735 86.6719L37.7735 86.6719ZM37.7735 94.7344L36.7735 94.7344L36.7735 98.7656L37.7735 98.7656L38.7735 98.7656L38.7735 94.7344L37.7735 94.7344ZM37.7735 102.797L36.7735 102.797L36.7735 106.828L37.7735 106.828L38.7735 106.828L38.7735 102.797L37.7735 102.797ZM37.7735 110.859L36.7735 110.859L36.7735 114.891L37.7735 114.891L38.7735 114.891L38.7735 110.859L37.7735 110.859ZM37.7735 118.922L36.7735 118.922L36.7735 122.953L37.7735 122.953L38.7735 122.953L38.7735 118.922L37.7735 118.922Z"
							fill="url(#paint0_linear_585_4037)"
						/>
						<path
							d="M5.7735 129L11.547 119L9.10119e-07 119L5.7735 129ZM5.7735 0L4.7735 4.37114e-08L4.7735 2.01563L5.7735 2.01562L6.7735 2.01562L6.7735 -4.37114e-08L5.7735 0ZM5.7735 6.04688L4.7735 6.04688L4.7735 10.0781L5.7735 10.0781L6.7735 10.0781L6.7735 6.04688L5.7735 6.04688ZM5.7735 14.1094L4.7735 14.1094L4.7735 18.1406L5.7735 18.1406L6.7735 18.1406L6.7735 14.1094L5.7735 14.1094ZM5.7735 22.1719L4.7735 22.1719L4.7735 26.2031L5.7735 26.2031L6.7735 26.2031L6.7735 22.1719L5.7735 22.1719ZM5.7735 30.2344L4.7735 30.2344L4.7735 34.2656L5.7735 34.2656L6.7735 34.2656L6.7735 30.2344L5.7735 30.2344ZM5.7735 38.2969L4.7735 38.2969L4.7735 42.3281L5.7735 42.3281L6.7735 42.3281L6.7735 38.2969L5.7735 38.2969ZM5.7735 46.3594L4.7735 46.3594L4.7735 50.3906L5.7735 50.3906L6.7735 50.3906L6.7735 46.3594L5.7735 46.3594ZM5.7735 54.4219L4.7735 54.4219L4.7735 58.4531L5.7735 58.4531L6.7735 58.4531L6.7735 54.4219L5.7735 54.4219ZM5.7735 62.4844L4.7735 62.4844L4.7735 66.5156L5.7735 66.5156L6.7735 66.5156L6.7735 62.4844L5.7735 62.4844ZM5.7735 70.5469L4.7735 70.5469L4.7735 74.5781L5.7735 74.5781L6.7735 74.5781L6.7735 70.5469L5.7735 70.5469ZM5.7735 78.6094L4.7735 78.6094L4.7735 82.6406L5.7735 82.6406L6.7735 82.6406L6.7735 78.6094L5.7735 78.6094ZM5.7735 86.6719L4.7735 86.6719L4.7735 90.7031L5.7735 90.7031L6.7735 90.7031L6.7735 86.6719L5.7735 86.6719ZM5.7735 94.7344L4.7735 94.7344L4.7735 98.7656L5.7735 98.7656L6.7735 98.7656L6.7735 94.7344L5.7735 94.7344ZM5.7735 102.797L4.7735 102.797L4.7735 106.828L5.7735 106.828L6.7735 106.828L6.7735 102.797L5.7735 102.797ZM5.7735 110.859L4.7735 110.859L4.7735 114.891L5.7735 114.891L6.7735 114.891L6.7735 110.859L5.7735 110.859ZM5.7735 118.922L4.7735 118.922L4.7735 122.953L5.7735 122.953L6.7735 122.953L6.7735 118.922L5.7735 118.922Z"
							fill="url(#paint1_linear_585_4037)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_585_4037"
								x1="38.2735"
								y1="-2.18557e-08"
								x2="38.2735"
								y2="129"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#040D26" />
								<stop offset="1" stopColor="#7FA1FF" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_585_4037"
								x1="6.2735"
								y1="-2.18557e-08"
								x2="6.2735"
								y2="129"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#040D26" />
								<stop offset="1" stop-color="#7FA1FF" />
							</linearGradient>
						</defs>
					</svg>
				</div>
				<Image
					src="/assets/section/investorTrap/trap.svg"
					alt="Investor Trap Funnel"
					width={600}
					height={800}
					className="block md:hidden max-w-full w-[510px] h-[704.5px] mx-auto mt-[-100px] mb-10"
				/>

				{/* Cards */}

				<div className="hidden md:block relative h-[1325.454545484px] transform -translate-y-[80%] max-w-7xl mx-auto">
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
									transform: "translateY(0%)",
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
									transform: "translateY(40%)",
								}}
							/>
						</>
					))}
				</div>
			</div>
		</section>
	);
}
