"use client";

import { MessageCircle, ArrowUpRight } from "lucide-react";

interface QaCardProps {
	question: string;
	answer: string;
	postedAt?: number;
	variant?: "default" | "subtle";
	onClick?: () => void;
	className?: string;
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
	onClick,
	className = "",
}: QaCardProps) {
	const isInteractive = typeof onClick === "function";
	const baseClasses =
		"group relative my-2 flex h-[calc(100%-16px)] flex-col justify-start rounded-xl border border-transparent bg-white/70 p-6 text-left shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:border-primary/50";
	const interactiveClasses =
		"cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white";

	const content = (
		<>
			{isInteractive ? (
				<span className="absolute right-4 top-4 opacity-0 text-primary transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100">
					<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
				</span>
			) : null}
			<div className="mb-3 flex items-start gap-3">
				<h3 className="inline text-[16px] font-medium leading-[20px] text-foreground line-clamp-2">
					<span className="inline">
						<MessageCircle className="mr-2 inline-block h-[20px] w-[20px] flex-shrink-0 text-primary" />
					</span>
					{question}
				</h3>
			</div>
			<p className="text-[12px] leading-[18px] text-muted-foreground line-clamp-3">
				{answer}
			</p>
			{/* <div className="inline-flex items-center gap-1.5 rounded-full bg-black/5 dark:bg:white/5 px-3 py-1.5">
        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground font-medium">
          {postedAt ? formatTimeAgo(postedAt) : "Just now"}
        </span>
      </div> */}
		</>
	);

	if (isInteractive) {
		return (
			<button
				type="button"
				onClick={onClick}
				className={`${baseClasses} ${interactiveClasses} ${className}`}
			>
				{content}
			</button>
		);
	}

	return <div className={`${baseClasses} ${className}`}>{content}</div>;
}
