"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useHeaderTheme } from "./HeaderThemeContext";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import type { HeaderData } from "@/sanity/lib/types";

// Default fallback data
const defaultHeaderData: HeaderData = {
	visible: true,
	logoImage: "/assets/logo/logo.png",
	brandName: "Magnus Hathaway",
	navLinks: [
		{ label: "About", href: "#meet-the-founder" },
		{ label: "Offerings", href: "#pricing" },
	],
	ctaButtonText: "Get Started",
	ctaButtonLink: "https://cal.com/magnushathaway/30min",
};

interface HeaderProps {
	data?: { data: HeaderData | null };
}

export default function Header({ data }: HeaderProps) {
	const headerData = data?.data || defaultHeaderData;
	const { theme } = useHeaderTheme();
	const isDark = theme === "dark";
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header
			className={cn(
				"w-full max-w-full h-fit z-50 fixed top-0 left-1/2 -translate-x-1/2 max-w-7xl px-[20px] md:px-0 mx-auto mt-6"
			)}
		>
			<div
				className={cn(
					"w-full flex items-center justify-between rounded-full overflow-hidden px-[16px] py-[10px] transition-colors duration-300 relative z-50",
					isDark
						? "text-white bg-[#FFFFFF1A] backdrop-blur-md"
						: "text-[#000728] bg-[#FFFFFFCC] backdrop-blur-md"
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
							src={
								headerData.logoImage || "/assets/logo/logo.png"
							}
							alt={`${headerData.brandName} Logo`}
							width={40}
							height={40}
							className="w-full h-full"
						/>
					</div>
					<span className="text-[20px] leading-[32px]">
						{headerData.brandName}
					</span>
				</Link>

				{/* Navigation Links */}
				<nav className="hidden md:flex items-center gap-[32px]">
					{headerData.navLinks.map((link, index) => (
						<Link
							key={`nav-${index}`}
							href={link.href}
							className={cn(
								"text-[16px] leading-[24px] hover:opacity-80 transition-colors duration-300",
								isDark ? "text-white" : "text-[#000728]"
							)}
						>
							{link.label}
						</Link>
					))}
					<Link
						href={headerData.ctaButtonLink}
						target="_blank"
						rel="noopener noreferrer"
					>
						<button
							className={cn(
								"ml-[-16px] px-[24px] py-[10px] rounded-full text-[16px] leading-[24px] shadow-md transition-all duration-300 hover:opacity-90 focus:outline-none border cursor-pointer",
								isDark
									? "bg-white text-[#000] border-white"
									: "bg-[#000728] text-white border-[#000728]"
							)}
						>
							{headerData.ctaButtonText}
						</button>
					</Link>
				</nav>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden w-[44px] h-[44px] bg-white rounded-full flex items-center justify-center"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? (
						<X className="w-5 h-5 text-black" />
					) : (
						<Menu className="w-5 h-5 text-black" />
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div
					className={cn(
						"absolute top-[calc(100%+12px)] left-[20px] right-[20px] md:hidden rounded-[24px] p-6 flex flex-col gap-6 shadow-xl backdrop-blur-md border transition-all duration-300 animate-in fade-in slide-in-from-top-5",
						isDark
							? "bg-[#FFFFFF1A] border-white/10 text-white"
							: "bg-white/90 border-black/5 text-[#000728]"
					)}
				>
					<nav className="flex flex-col gap-4">
						{headerData.navLinks.map((link, index) => (
							<Link
								key={`mobile-nav-${index}`}
								href={link.href}
								className="text-[18px] font-medium hover:opacity-70 transition-opacity"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
					</nav>
					<Link
						href={headerData.ctaButtonLink}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<button
							className={cn(
								"w-full py-[14px] rounded-full text-[16px] font-semibold shadow-md transition-all duration-300 hover:opacity-90 active:scale-[0.98] cursor-pointer",
								isDark
									? "bg-white text-black"
									: "bg-[#000728] text-white"
							)}
						>
							{headerData.ctaButtonText}
						</button>
					</Link>
				</div>
			)}
		</header>
	);
}
