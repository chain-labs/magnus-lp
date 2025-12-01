const founderDetails = {
	name: "Alireza Azar",
	position: "Founder & SEBI Registered Research Analyst",
	bio: "Ali started Magnus Hathaway after seeing too many retail investors lose money to bad advice half-baked Telegram tips, influencer-led chart patterns, random YouTube calls with no accountability. He believed retail investors deserved better. Not tips. Not hype. Just honest, research-backed guidance that explains why, not just what.",
	credentials: [
		"SEBI Registered Research Analyst (INH000016588)",
		"Chartered Accountant (CA)",
		"15+ years in equity research and analysis",
	],
};
export default function MeetTheFounder() {
	return (
		<section className="w-full py-[112px] px-[80px]">
			<div className="max-w-[848px] mx-auto flex flex-col gap-[80px]">
				<div className="flex flex-col gap-[16px]">
					<h2 className="text-[40px] leading-[48px] text-white">
						Meet the founder
					</h2>
					<p className="text-[20px] leading-[32px] text-white opacity-60">
						The team behind the research. The people you can trust.
					</p>
				</div>
				<div className="w-full h-[526px] bg-[#DBDBDB] rounded-[12px]"></div>
				<div className="text-[#686e7d] flex flex-col gap-[24px] text-[24px] leading-[32px]">
					<p>
						<span className="text-white">
							Magnus Hathaway exists
						</span>{" "}
						because of a simple observation: retail investors aren't
						losing money because they lack intelligence. They're
						losing money because they lack time. HNI investors have
						dedicated teams tracking stocks full-time. Retail
						investors are juggling day jobs and responsibilities. By
						the time they research a stock, the opportunity has
						passed. Or they chase tips from YouTube and Telegram,
						hoping they picked right.
					</p>
					<p>
						So Ali Azar built Magnus Hathaway to fill that gap. To
						do the full-time work of stock research and tracking
						that retail investors can't do themselves. Not to make
						them analysts. But to give them what HNI investors have
						always had: quality stock recommendations, explained
						clearly, with ongoing support.
					</p>
					<p>
						Just like discount brokers freed people from expensive
						middlemen, Magnus Hathaway frees people from having to
						be full-time analysts.
					</p>
				</div>
				<div className="grid grid-cols-5 gap-[32px]">
					<div className="w-full h-full rounded-[12px] bg-[#DBDBDB] col-span-2 row-span-[1/3]"></div>
					<div className="flex flex-col gap-[32px] col-span-3">
						<div className="flex flex-col gap-[24px]">
							<div className="flex flex-col">
								<h3 className="text-[32px] leading-[40px] text-white">
									{founderDetails.name}
								</h3>
								<p className="text-[20px] leading-[32px] text-white">
									{founderDetails.position}
								</p>
							</div>
							<p className="text-[16px] leading-[24px] text-white opacity-60">
								{founderDetails.bio}
							</p>
						</div>
						<ol className="flex flex-col gap-[16px] opacity-80">
							{founderDetails.credentials.map(
								(credential, index) => (
									<li>
										<p
											key={index}
											className="text-[16px] leading-[24px] text-white"
										>
											{credential}
										</p>
									</li>
								)
							)}
						</ol>
					</div>
				</div>
			</div>
		</section>
	);
}
