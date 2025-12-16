"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { HowMagnusChangesThisData } from "@/sanity/lib/types";

// Static data - commented out in favor of Sanity CMS
// const howMagnusHathawayChangesThisData = [
// 	{
// 		id: "item-1",
// 		tag: "Gives clarity",
// 		title: "You get expert research. Clearly explained.",
// 		description:
// 			"Every stock recommendation comes with a detailed research report. Not a hot tip. Not a chart pattern. Real analysis. Real reasoning. Real clarity on why we think this stock matters. You understand the business. You understand the valuation. You understand what could go wrong.",
// 		image: "/assets/section/howMagnusHathawayChangesThis/1.png",
// 		imageDirection: "left",
// 	},
// 	{
// 		id: "item-2",
// 		tag: "Clear Reasoning",
// 		title: "You get what HNI investors have always had.",
// 		description:
// 			"Just like discount brokers democratized trading, Magnus Hathaway democratizes quality investment advice.  Stock recommendations you can act on. Clear reasoning behind every pick. No conflicts. No pressure to buy. You stay in control. You make the final call.",
// 		image: "/assets/section/howMagnusHathawayChangesThis/2.png",
// 		imageDirection: "right",
// 	},
// 	{
// 		id: "item-3",
// 		tag: "Frequent updates",
// 		title: "You get regular updates. Not daily noise.",
// 		description:
// 			"Quarterly updates on each holding. We explain what changed. We tell you when to hold and when to exit. You're not left wondering if this is still a good idea. Over time, you learn to spot opportunities yourself. You learn to think like an investor. Eventually, you won't need to rely on us. You'll have the confidence to invest on your own.",
// 		image: "/assets/section/howMagnusHathawayChangesThis/3.png",
// 		imageDirection: "left",
// 	},
// ];

// Default fallback data
const defaultHowMagnusChangesThisData: HowMagnusChangesThisData = {
	visible: true,
	title: "How Magnus Hathaway Changes This",
	items: [
		{
			tag: "Gives clarity",
			title: "You get expert research. Clearly explained.",
			description:
				"Every stock recommendation comes with a detailed research report. Not a hot tip. Not a chart pattern. Real analysis. Real reasoning. Real clarity on why we think this stock matters. You understand the business. You understand the valuation. You understand what could go wrong.",
			image: "/assets/section/howMagnusHathawayChangesThis/1.svg",
			imageDirection: "left",
		},
		{
			tag: "Clear Reasoning",
			title: "You get what HNI investors have always had.",
			description:
				"Just like discount brokers democratized trading, Magnus Hathaway democratizes quality investment advice.  Stock recommendations you can act on. Clear reasoning behind every pick. No conflicts. No pressure to buy. You stay in control. You make the final call.",
			image: "/assets/section/howMagnusHathawayChangesThis/2.svg",
			imageDirection: "right",
		},
		{
			tag: "Frequent updates",
			title: "You get regular updates. Not daily noise.",
			description:
				"Quarterly updates on each holding. We explain what changed. We tell you when to hold and when to exit. You're not left wondering if this is still a good idea. Over time, you learn to spot opportunities yourself. You learn to think like an investor. Eventually, you won't need to rely on us. You'll have the confidence to invest on your own.",
			image: "/assets/section/howMagnusHathawayChangesThis/3.svg",
			imageDirection: "left",
		},
	],
};

function ImageWithFallback({
	src,
	alt,
	width,
	height,
	className,
}: {
	src?: string | null;
	alt: string;
	width: number;
	height: number;
	className?: string;
}) {
	const [imgSrc, setImgSrc] = useState(src || "/images/placeholder-image.png");
	const [imgClassName, setImgClassName] = useState(className || "");
	return (
		<Image
			src={imgSrc}
			alt={alt}
			width={width}
			height={height}
			className={imgClassName}
			onError={() => {setImgSrc("/assets/default/logo.png") ; setImgClassName("justify-center items-center w-[300px] h-[300px] m-auto mix-blend-multiply");}}
		/>
	);
}

interface HowMagnusHathawayChangesThisProps {
	data?: { data: HowMagnusChangesThisData | null };
}

export default function HowMagnusHathawayChangesThis({
	data,
}: HowMagnusHathawayChangesThisProps) {
	const howMagnusHathawayChangesThisData =
		data?.data || defaultHowMagnusChangesThisData;
	const [scrollProgress, setScrollProgress] = useState<number[]>([]);
	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const handleScroll = () => {
			const progress = cardRefs.current.map((card) => {
				if (!card) return 0;
				const rect = card.getBoundingClientRect();
				const windowHeight = window.innerHeight;
				const cardTop = rect.top;
				const cardHeight = rect.height;
				
				// Calculate progress (0 to 1) as card enters viewport
				const progress = Math.max(0, Math.min(1, (windowHeight - cardTop) / (windowHeight + cardHeight)));
				return progress;
			});
			setScrollProgress(progress);
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, [howMagnusHathawayChangesThisData.items.length]);

	return (
		<section id="how-magnus-hathaway-changes-this" className="relative w-full py-[80px] md:py-[120px] px-[20px] md:px-[80px] z-0">
			<div className="absolute top-0 left-0 h-[821.818359375px] w-full z-[-1]">
				<Image
					src="/assets/grids/simpleGrid.svg"
					alt="simple grid"
					width={1000}
					height={1000}
					className="z-[-1] w-full h-full object-cover opacity-10"
				/>
			</div>
			<div className="max-w-7xl mx-auto flex flex-col gap-[40px] md:gap-[80px] z-10">
				<h2 className="text-[32px] leading-[40px] md:text-[48px] md:leading-[64px] text-[#010943] text-center max-w-xl mx-auto">
					{howMagnusHathawayChangesThisData.title}
				</h2>

				{howMagnusHathawayChangesThisData.items.map((item, idx) => (
					<div
						ref={(el) => { cardRefs.current[idx] = el; }}
						className="flex flex-col md:flex-row rounded-[12px] overflow-hidden bg-[#F4F6F8] border border-[#37416C1A] sticky transition-all duration-300"
						style={{
							top: `${100}px`,
							zIndex: howMagnusHathawayChangesThisData.items.length + idx,
							transform: `scale(${1 - (scrollProgress[idx] || 0) * 0.05})`,
						}}
						key={idx}
					>
						<div
							className={`p-[24px] md:p-[48px] flex flex-col justify-center items-start h-fit md:h-[640px] w-full md:w-[640px] ${
								item.imageDirection === "right"
									? "md:order-2 order-1"
									: "order-1"
							}`}
						>
							<span className="text-[14px] md:text-[20px] leading-[20px] md:leading-[32px] text-[#030919] opacity-80 mb-[8px]">
								{item.tag}
							</span>
							<h3 className="text-[24px] md:text-[40px] leading-[32px] md:leading-[48px] text-[#030919] mb-[16px] md:mb-[32px]">
								{item.title}
							</h3>
							<p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] text-[#030919] opacity-60">
								{item.description}
							</p>
						</div>
						<div
							className={`h-full md:h-[640px] w-full md:w-[640px] flex justify-center items-center ${
								item.imageDirection === "right"
									? "order-1"
									: "order-2"
							}`}
						>
							<ImageWithFallback
								src={item.image || `/assets/section/howMagnusHathawayChangesThis/${idx + 1}.svg`}
								alt={item.title}
								width={640}
								height={640}
								className="w-full h-full aspect-square object-contain md:object-cover"
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
