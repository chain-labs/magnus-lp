"use client";

import { MessageCircle, Clock } from "lucide-react";

interface QaCardProps {
	question: string;
	answer: string;
	postedAt?: number;
	variant?: "default" | "subtle";
}

const formatTimeAgo = (timestamp: number): string => {
	const now = Date.now();
	const diff = now - timestamp;

	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
	const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

	if (minutes < 1) return "Just now";
	if (minutes < 60) return `${minutes}m ago`;
	if (hours < 24) return `${hours}h ago`;
	if (days < 7) return `${days}d ago`;
	if (weeks < 4) return `${weeks}w ago`;
	return `${months}mo ago`;
};

export default function QaCard({
	question,
	answer,
	postedAt,
	variant = "default",
}: QaCardProps) {
	return (
		<div
			className={`group rounded-xl p-6 transition-all duration-300 my-2 h-[calc(100%-16px)] shadow-sm ${
				variant === "default"
					? "hover:shadow-lg hover:border-primary/50"
					: "bg-card/30 backdrop-blur-md"
			}`}
		>
			<div className="flex items-start gap-3 mb-3">
				<MessageCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
				<h3 className="text-foreground text-lg !leading-normal">
					{question}
				</h3>
			</div>
			<p className="text-muted-foreground text-sm leading-relaxed mb-4">
				{answer}
			</p>
			{/* <div className="inline-flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/5 px-3 py-1.5">
        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">
          {postedAt ? formatTimeAgo(postedAt) : "Just now"}
        </span>
      </div> */}
		</div>
	);
}
