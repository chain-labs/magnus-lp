"use client";

import Image from "next/image";
import Link from "next/link";
import { useHeaderTheme } from "./HeaderThemeContext";
import { cn } from "@/lib/utils";

export default function Header() {
	const { theme } = useHeaderTheme();
	const isDark = theme === "dark";

	return (
		<header
			className={cn(
				"w-full h-fit z-50 fixed top-0 left-1/2 -translate-x-1/2 flex items-center justify-between max-w-7xl mx-auto mt-6 rounded-full overflow-hidden px-[16px] py-[10px] transition-colors duration-300",
				isDark
					? "bg-[#FFFFFF1A]"
					: "bg-[#FFFFFFCC] backdrop-blur-md border border-[#0000001A]"
			)}
		>
			{/* Logo and Brand Name */}
			<Link
				href="/"
				className={cn(
					"flex items-center gap-[12px] transition-colors duration-300",
					isDark ? "text-white" : "text-[#000728]"
				)}
			>
				<div className="rounded-full w-[40px] h-[40px] flex items-center justify-center">
					<Image
						src="/assets/logo/logo.png"
						alt="Magnus Hathaway Logo"
						width={40}
						height={40}
						className="w-full h-full"
					/>
				</div>
				<span className="text-[20px] leading-[32px]">
					Magnus Hathaway
				</span>
			</Link>

			{/* Navigation Links */}
			<nav className="flex items-center gap-[32px]">
				<Link
					href="#about"
					className={cn(
						"text-[16px] leading-[24px] hover:opacity-80 transition-colors duration-300",
						isDark ? "text-white" : "text-[#000728]"
					)}
				>
					About
				</Link>
				<Link
					href="#offerings"
					className={cn(
						"text-[16px] leading-[24px] hover:opacity-80 transition-colors duration-300",
						isDark ? "text-white" : "text-[#000728]"
					)}
				>
					Offerings
				</Link>
				<Link
					href="https://cal.com/magnushathaway/30min"
					target="_blank"
					rel="noopener noreferrer"
				>
					<button
						className={cn(
							"ml-[-16px] px-[24px] py-[10px] rounded-full text-[16px] leading-[24px] shadow-md transition-all duration-300 hover:opacity-90 focus:outline-none border",
							isDark
								? "bg-white text-[#000] border-white"
								: "bg-[#000728] text-white border-[#000728]"
						)}
					>
						Get Started
					</button>
				</Link>
			</nav>
		</header>
	);
}

