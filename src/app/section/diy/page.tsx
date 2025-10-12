"use client";

import { motion } from "motion/react";

import { HoverVideoPlayer } from "@/components/manually-addded/hover-video-player";
import { TextureOverlay } from "@/components/manually-addded/texture-overlay";

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

export default function DiyVideosSection() {
	return (
		<section className="py-16 sm:py-24">
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
						Explore our collection of expert videos designed to help
						you make informed investment decisions.
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
							className="flex h-full flex-col p-2 rounded-3xl border shadow-[0_20px_70px_-50px_rgba(15,23,42,0.64)] backdrop-blur bg-background overflow-hidden"
						>
							{/* <TextureOverlay texture="dots" opacity={.15} className="text-white" /> */}
							<div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.4)1px,rgba(255,255,255,0)0)]"></div>
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
