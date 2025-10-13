"use client";

import { useState } from "react";
import { motion } from "motion/react";

import { HoverVideoPlayer } from "@/components/manually-addded/hover-video-player";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/ui/video-thumbnail-player";

type DiyVideo = {
	id: string;
	videoSrc: string;
	title: string;
	subtitle: string;
	thumbnailSrc?: string;
};

const diyVideos: DiyVideo[] = [
	{
		id: "economic-machine",
		videoSrc: "https://www.youtube.com/watch?v=PHe0bXAIuk0",
		title: "How The Economic Machine Works",
		subtitle:
			"Ray Dalio breaks down the mechanics behind debt cycles, productivity, and how to anticipate market shifts.",
	},
	{
		id: "index-fund-blueprint",
		videoSrc: "https://www.youtube.com/watch?v=C7CcMP2b6no",
		title: "Index Funds Explained Step-by-Step",
		subtitle:
			"Learn how to construct a diversified, low-cost index fund portfolio in under an hour.",
	},
	{
		id: "asset-allocation",
		videoSrc: "https://www.youtube.com/watch?v=brM1afEcG28",
		title: "Designing the Right Asset Allocation",
		subtitle:
			"Understand how to balance risk and reward across equities, fixed income, and alternatives.",
	},
];

type DiyShowcaseVideo = {
	id: string;
	videoUrl: string;
	thumbnailUrl: string;
	title: string;
	description: string;
};

const diyShowcaseVideos: DiyShowcaseVideo[] = [
	{
		id: "wealth-building",
		videoUrl: "https://www.youtube.com/embed/PHe0bXAIuk0?autoplay=1",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1600&q=80",
		title: "Wealth Building Fundamentals",
		description:
			"Learn how cash flow, debt, and productivity interact to create long-term financial resilience.",
	},
	{
		id: "principles-of-success",
		videoUrl: "https://www.youtube.com/embed/B9XGUpQZY38?autoplay=1",
		thumbnailUrl:
			"https://images.unsplash.com/photo-1444653389962-8149286c578a?auto=format&fit=crop&w=1600&q=80",
		title: "Principles for Financial Success",
		description:
			"A condensed playbook on building habits that compound wealth and opportunity over time.",
	},
];

const diyStrategyHighlights = [
	"Curated playbooks for self-led investors",
	"Downloadable checklists and calculators",
	"Action plans tailored to growth, preservation, or passive income",
] as const;

const diys = [
	<DiyVideosSection1 key="diy-primary" />,
	<DiyVideosSection2 key="diy-showcase" />,
];

export default function DiyVideosSection() {
	const [switcher, setSwitcher] = useState(0);
	function handleSwitch() {
		setSwitcher((prev) => (prev + 1) % diys.length);
	}
	return (
		<div className="min-h-screen w-full relative">
			<Button
				variant="secondary"
				className="absolute m-4 z-10"
				onClick={handleSwitch}
			>
				Switch
			</Button>
			<div className="relative py-16 md:py-32">
				<div className="mx-auto max-w-5xl px-6">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5">
							DIY Videos
						</h2>
						<p className="text-muted-foreground mt-5">
							Explore our collection of expert videos designed to
							help you make informed investment decisions.
						</p>
					</div>
					{diys[switcher]}
				</div>
			</div>
		</div>
	);
}

export function DiyVideosSection1() {
	return (
		<section className="">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
					{diyVideos.map((video, index) => (
						<motion.article
							key={video.id}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.45,
								delay: index * 0.06,
								ease: [0.16, 1, 0.3, 1],
							}}
							viewport={{ once: true, amount: 0.2 }}
							className="flex h-full flex-col p-2 rounded-3xl border shadow-[0_20px_70px_-50px_rgba(15,23,42,0.64)] backdrop-blur bg-background overflow-hidden"
						>
							<div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.4)1px,rgba(255,255,255,0)0)]" />
							<HoverVideoPlayer
								title={video.title}
								videoSrc={video.videoSrc}
								thumbnailSrc={video.thumbnailSrc}
								className="rounded-2xl"
							/>
							<div className="space-y-2 p-2 pt-4">
								<h3 className="text-[16px] font-medium leading-[20px]">
									{video.title}
								</h3>
								<p className="text-[12px] text-muted-foreground line-clamp-2 text-ellipsis leading-[18px]">
									{video.subtitle}
								</p>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}

export function DiyVideosSection2() {
	const [...supportingVideos] = diyShowcaseVideos;
	return (
		<section className="relative pt-16 md:pt-20">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="mt-12 grid gap-8 md:grid-cols-2">
					{supportingVideos.map((video, index) => (
						<VideoPlayer
							thumbnailUrl={video.thumbnailUrl}
							videoUrl={video.videoUrl}
							title={video.title}
							description={video.description}
							className="overflow-hidden rounded-2xl"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
