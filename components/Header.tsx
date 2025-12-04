import Image from "next/image";
import Link from "next/link";

export default function Header() {
	return (
		<header className="w-full h-fit z-50 fixed top-0 left-1/2 -translate-x-1/2 flex items-center justify-between max-w-7xl mx-auto mt-6 rounded-full bg-[#FFFFFF1A] overflow-hidden px-[16px] py-[10px]">
			{/* Logo and Brand Name */}
			<Link href="/" className="flex items-center gap-[12px] text-white">
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
					className="text-white text-[16px] leading-[24px] hover:opacity-80 transition"
				>
					About
				</Link>
				<Link
					href="#offerings"
					className="text-white text-[16px] leading-[24px] hover:opacity-80 transition"
				>
					Offerings
				</Link>
				<Link
					href="https://cal.com/magnushathaway/30min"
					target="_blank"
					rel="noopener noreferrer"
				>
					<button className="ml-[-16px] px-[24px] py-[10px] rounded-full bg-white text-[#000] text-[16px] leading-[24px] shadow-md transition hover:bg-gray-100 focus:outline-none border border-white">
						Get Started
					</button>
				</Link>
			</nav>
		</header>
	);
}
