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
			className={`group rounded-xl p-6 transition-all duration-300 my-2 h-[calc(100%-16px)] shadow-sm bg-white/70 backdrop-blur-md hover:shadow-lg hover:border-primary/50`}
		>
			<div className="flex items-start gap-3 mb-3">
				<h3 className="text-foreground inline text-[16px] leading-[20px] font-medium line-clamp-3">
					<span className="inline">
						<MessageCircle className="w-[20px] h-[20px] text-primary flex-shrink-0 inline-block mr-2" />
					</span>
					{question}
				</h3>
			</div>
			<p className="text-muted-foreground text-[12px] leading-[18px] mb-4 line-clamp-3">
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
