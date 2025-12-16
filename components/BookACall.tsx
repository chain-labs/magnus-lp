import Link from "next/link";
import type { BookACallData } from "@/sanity/lib/types";

// Static data - commented out in favor of Sanity CMS
// const bookACallData = {
// 	title: "Want research-backed clarity for your portfolio?",
// 	subtitle: "No hype. No pressure. Just research.",
// 	contactUsLink: "https://cal.com/magnushathaway/30min",
// 	bookACallLink: "https://cal.com/magnushathaway/30min",
// };

// Default fallback data
const defaultBookACallData: BookACallData = {
	visible: true,
	title: "Want research-backed clarity for your portfolio?",
	subtitle: "No hype. No pressure. Just research.",
	contactUsLink: "https://cal.com/magnushathaway/30min",
	contactUsButtonText: "Contact Us",
};

interface BookACallProps {
	data?: { data: BookACallData | null };
}

export default function BookACall({ data }: BookACallProps) {
	const bookACallData = data?.data || defaultBookACallData;
	return (
		<section id="book-a-call" className="relative w-full h-screen md:h-fit py-[112px] px-[20px] md:px-[80px]">
			<hr className="hidden md:absolute top-0 left-[20px] h-[1px] w-[calc(100%-40px)] bg-[#FFFFFF33] opacity-20" />
			<div className="w-full h-full md:max-w-2xl mx-auto flex flex-col justify-center items-center gap-[32px]">
				<div className="flex flex-col justify-center items-center text-center gap-[24px]">
					<h2 className="text-[24px] md:text-[40px] leading-[32px] md:leading-[48px] text-white">
						{bookACallData.title}
					</h2>
					<p className="text-[20px] md:text-[24px] leading-[32px] pb-[24px] text-white opacity-60">
						{bookACallData.subtitle}
					</p>
				</div>
				<div className="flex justify-center gap-[16px] mx-auto w-full">
					<Link
						href={bookACallData.contactUsLink}
						className="cursor-pointer"
					>
						<button className="px-[24px] py-[12px] bg-white border border-white rounded-[8px] text-[16px] leading-[24px] text-nowrap cursor-pointer">
							{bookACallData.contactUsButtonText || "Contact Us"}
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
