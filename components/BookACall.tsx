import Link from "next/link";

const bookACallData = {
	title: "Want research-backed clarity for your portfolio?",
	subtitle: "No hype. No pressure. Just research.",
	contactUsLink: "https://cal.com/magnushathaway/30min",
	bookACallLink: "https://cal.com/magnushathaway/30min",
};

export default function BookACall() {
	return (
		<section className="w-full py-[112px] px-[80px]">
			<div className="max-w-2xl mx-auto flex flex-col gap-[32px]">
				<div className="flex flex-col justify-center items-center text-center gap-[24px]">
					<h2 className="text-[40px] leading-[48px] text-white">
						{bookACallData.title}
					</h2>
					<p className="text-[24px] leading-[32px] pb-[24px] text-white">
						{bookACallData.subtitle}
					</p>
				</div>
				<div className="flex gap-[16px] mx-auto">
					<Link
						href={bookACallData.contactUsLink}
						className="cursor-pointer"
					>
						<button className="px-[24px] py-[12px] bg-white border border-white rounded-[8px] text-[16px] leading-[24px]">
							Contact Us
						</button>
					</Link>
					<Link
						href={bookACallData.bookACallLink}
						className="cursor-pointer"
					>
						<button className="px-[24px] py-[12px] border border-white rounded-[8px] text-[16px] leading-[24px] text-white">
							Book a Call
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
}
