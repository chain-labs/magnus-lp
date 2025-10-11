"use client";

import {
	type CSSProperties,
	type KeyboardEvent,
	useMemo,
	useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

type HoverVideoPlayerProps = {
	videoSrc: string;
	thumbnailSrc?: string;
	title?: string;
	className?: string;
	style?: CSSProperties;
	enableControls?: boolean;
	muted?: boolean;
	loop?: boolean;
};

function extractYouTubeId(input: string): string | null {
	if (!input) return null;
	const trimmed = input.trim();

	if (/^[a-zA-Z0-9_-]{6,}$/.test(trimmed)) {
		return trimmed;
	}

	try {
		const url = new URL(trimmed, "https://youtube.com");

		if (url.hostname.includes("youtu.be")) {
			const [, id] = url.pathname.split("/");
			return id?.split("?")[0] ?? null;
		}

		if (url.pathname.includes("/embed/")) {
			const parts = url.pathname.split("/");
			const id = parts[parts.indexOf("embed") + 1];
			return id ?? null;
		}

		const idParam = url.searchParams.get("v");
		if (idParam) {
			return idParam;
		}
	} catch {
		// ignore parsing errors and fallthrough to null
	}

	return null;
}

export function HoverVideoPlayer({
	videoSrc,
	thumbnailSrc,
	title,
	className,
	style,
	enableControls = false,
	muted = true,
	loop = true,
}: HoverVideoPlayerProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [tapped, setTapped] = useState(false);

	const youTubeId = useMemo(() => extractYouTubeId(videoSrc), [videoSrc]);
	const resolvedThumbnail = useMemo(() => {
		if (thumbnailSrc) return thumbnailSrc;
		if (!youTubeId) return null;
		return `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`;
	}, [thumbnailSrc, youTubeId]);

	const embedUrl = useMemo(() => {
		if (!youTubeId) return videoSrc;

		const params = new URLSearchParams({
			autoplay: "1",
			mute: muted ? "1" : "0",
			loop: loop ? "1" : "0",
			rel: "0",
			modestbranding: "1",
			controls: enableControls ? "1" : "0",
		});

		if (loop) {
			params.set("playlist", youTubeId);
		}

		return `https://www.youtube.com/embed/${youTubeId}?${params.toString()}`;
	}, [enableControls, loop, muted, videoSrc, youTubeId]);

	const showVideo = isHovered || tapped;

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);
	const handleTouchStart = () => setTapped((prev) => !prev);
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			setTapped((prev) => !prev);
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onTouchStart={handleTouchStart}
			onKeyDown={handleKeyDown}
			className={cn(
				"group relative aspect-video w-full overflow-hidden rounded-3xl border border-border/40 bg-black",
				"focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
				className
			)}
			style={style}
		>
			<AnimatePresence initial={false}>
				{showVideo ? (
					<motion.iframe
						key="player"
						title={title}
						src={embedUrl}
						className="absolute inset-0 h-full w-full"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
					/>
				) : (
					<motion.div
						key="thumbnail"
						className="absolute inset-0"
						initial={{ opacity: 0.85 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
					>
						{resolvedThumbnail ? (
							<img
								src={resolvedThumbnail}
								alt={title ?? "Video thumbnail"}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center bg-neutral-900">
								<span className="text-sm text-neutral-400">
									Preview unavailable
								</span>
							</div>
						)}
						<div className="absolute inset-0 bg-black/30 transition duration-300 group-hover:bg-black/10" />
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm text-black shadow-lg transition duration-300 group-hover:scale-105">
								<Play className="ml-1 h-8 w-8" />
								<span className="sr-only">Play video</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

