import Link from "next/link";

const bookACallData = {
	title: "Want research-backed clarity for your portfolio?",
	subtitle: "No hype. No pressure. Just research.",
	contactUsLink: "https://cal.com/magnushathaway/30min",
	bookACallLink: "https://cal.com/magnushathaway/30min",
};

export default function BookACall() {
	return (
		<section className="w-full min-h-screen md:min-h-fit py-[112px] px-[20px] md:px-[80px]">
			<hr className="h-[1px] bg-[#FFFFFF33] w-full" />
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
						<button className="px-[24px] py-[12px] bg-white border border-white rounded-[8px] text-[16px] leading-[24px] text-nowrap">
							Contact Us
						</button>
					</Link>
					<Link
						href={bookACallData.bookACallLink}
						className="cursor-pointer"
					>
						<button className="px-[24px] py-[12px] border border-white rounded-[8px] text-[16px] leading-[24px] text-white text-nowrap">
							Book a Call
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
