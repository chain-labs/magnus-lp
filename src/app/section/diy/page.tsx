"use client";

import { motion } from "motion/react";

import { HoverVideoPlayer } from "@/components/manually-addded/hover-video-player";

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
	{
		id: "dollar-cost-averaging",
		videoSrc: "https://www.youtube.com/watch?v=wOG63bu5B3U",
		title: "Dollar-Cost Averaging in Practice",
		subtitle:
			"See how consistent contributions beat market timing using real-world portfolio scenarios.",
	},
	{
		id: "behavioral-biases",
		videoSrc: "https://www.youtube.com/watch?v=FEDfX2lH5G8",
		title: "Avoiding Behavioral Investing Mistakes",
		subtitle:
			"Identify the cognitive traps that derail DIY investors and learn frameworks to stay disciplined.",
	},
	{
		id: "tax-efficient-investing",
		videoSrc: "https://www.youtube.com/watch?v=4z0u0WMsGAs",
		title: "Tax-Efficient Investing Playbook",
		subtitle:
			"Optimize accounts, harvest losses, and choose tax-smart instruments to keep more of your returns.",
	},
];

export default function DiyVideosSection() {
	return (
		<section className="bg-background py-16 sm:py-24">
			<div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: true }}
					className="mx-auto max-w-2xl text-center"
				>
					<h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5">
						DIY Videos
					</h2>
					<p className="text-muted-foreground mt-5">
						Explore our collection of expert videos designed to help you make informed investment decisions.
					</p>
				</motion.div>

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
							className="flex h-full flex-col rounded-3xl border border-border/40 bg-card/60 p-4 shadow-[0_20px_70px_-50px_rgba(15,23,42,0.64)] backdrop-blur"
						>
							<HoverVideoPlayer
								title={video.title}
								videoSrc={video.videoSrc}
								thumbnailSrc={video.thumbnailSrc}
								className="rounded-2xl"
							/>
							<div className="mt-4 space-y-2">
								<h3 className="text-lg font-semibold text-foreground leading-[1.15]">
									{video.title}
								</h3>
								<p className="text-sm text-muted-foreground line-clamp-2 leading-[1.15]">
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

