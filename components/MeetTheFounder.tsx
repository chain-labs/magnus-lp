import type { MeetTheFounderData, Founder } from "@/sanity/lib/types";
import { TextRevealParagraph } from "@/components/ui/text-reveal";

// Default fallback data
const defaultMeetTheFounderData: MeetTheFounderData = {
	visible: true,
	sectionTitle: "Meet the founders",
	sectionSubtitle: "The team behind the research. The people you can trust.",
	heroImage: undefined,
	storyParagraphs: [
		"Magnus Hathaway exists because of a simple observation: retail investors aren't losing money because they lack intelligence. They're losing money because they lack time. HNI investors have dedicated teams tracking stocks full-time. Retail investors are juggling day jobs and responsibilities. By the time they research a stock, the opportunity has passed. Or they chase tips from YouTube and Telegram, hoping they picked right.",
		"So Ali Azar built Magnus Hathaway to fill that gap. To do the full-time work of stock research and tracking that retail investors can't do themselves. Not to make them analysts. But to give them what HNI investors have always had: quality stock recommendations, explained clearly, with ongoing support.",
		"Just like discount brokers freed people from expensive middlemen, Magnus Hathaway frees people from having to be full-time analysts.",
	],
	founders: [
		{
			imagePosition: "left",
			name: "Alireza Azar",
			position: "Founder & SEBI Registered Research Analyst",
			bio: "Ali started Magnus Hathaway after seeing too many retail investors lose money to bad advice half-baked Telegram tips, influencer-led chart patterns, random YouTube calls with no accountability. He believed retail investors deserved better. Not tips. Not hype. Just honest, research-backed guidance that explains why, not just what.",
			credentials: [
				"SEBI Registered Research Analyst (INH000016588)",
				"Chartered Accountant (CA)",
				"15+ years in equity research and analysis",
			],
		},
	],
};

interface MeetTheFounderProps {
	data?: { data: MeetTheFounderData | null };
}

// Founder Card Component
function FounderCard({ founder }: { founder: Founder }) {
	const isImageLeft = founder.imagePosition === "left";

	return (
		<div className="grid grid-cols-1 md:grid-cols-5 w-full gap-y-[32px] md:gap-[32px]">
			{/* Image - conditionally ordered */}
			<div
				style={{
					mixBlendMode: "luminosity",
					backgroundImage: founder.image
						? `url(${founder.image})`
						: "url(/assets/section/founder/ali.png)",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundBlendMode: "luminosity",
				}}
				className={`w-full h-full min-h-[386.6190490722656px] rounded-[12px] bg-[#040D26] col-span-2 row-span-[1/3] aspect-3/4 ${
					isImageLeft ? "md:order-1" : "md:order-2"
				}`}
			></div>

			{/* Content - conditionally ordered */}
			<div
				className={`flex flex-col gap-[32px] col-span-3 ${
					isImageLeft ? "md:order-2" : "md:order-1"
				}`}
			>
				<div className="flex flex-col gap-[24px]">
					<div className="flex flex-col">
						<h3 className="text-[20px] md:text-[32px] leading-[32px] md:leading-[40px] text-white">
							{founder.name}
						</h3>
						<p className="text-[14px] md:text-[20px] leading-[20px] md:leading-[32px] text-white opacity-80">
							{founder.position}
						</p>
					</div>
					<p className="text-[16px] leading-[24px] text-white opacity-60">
						{founder.bio}
					</p>
				</div>
				<ol className="flex flex-col gap-[16px] opacity-80">
					{founder.credentials.map((credential, credIndex) => (
						<li
							key={credIndex}
							className="flex gap-[16px] items-center"
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.00001 1C7.8674 1 7.74022 1.05268 7.64645 1.14645C7.55268 1.24021 7.50001 1.36739 7.50001 1.5V5.045C7.05583 5.12353 6.63527 5.30185 6.27001 5.5665L3.9192 3.21555C3.85058 3.14658 3.76881 3.09208 3.67875 3.05526C3.58869 3.01845 3.49217 3.00006 3.39488 3.0012C3.29759 3.00234 3.20152 3.02297 3.11234 3.06189C3.02317 3.1008 2.9427 3.1572 2.87571 3.22775C2.13249 4.02875 1.58637 4.99207 1.28076 6.04115C0.975145 7.09022 0.918465 8.19613 1.11522 9.27095C1.31198 10.3458 1.75676 11.3599 2.41419 12.2327C3.07162 13.1054 3.92358 13.8128 4.90235 14.2986C5.20603 14.4562 5.52393 14.5847 5.85181 14.6824C7.04102 15.0569 8.30828 15.1092 9.52433 14.8341C10.7404 14.559 11.8617 13.9663 12.774 13.1165C12.8442 13.0505 12.9004 12.9711 12.9393 12.883C12.9782 12.7948 12.9989 12.6998 13.0002 12.6034C13.0015 12.5071 12.9833 12.4115 12.9469 12.3223C12.9104 12.2332 12.8563 12.1523 12.7879 12.0845L10.4385 9.735C10.7021 9.3678 10.8787 8.9455 10.955 8.5H14.5C14.6326 8.5 14.7598 8.44732 14.8536 8.35355C14.9473 8.25979 15 8.13261 15 8C14.9979 6.14413 14.2597 4.36486 12.9474 3.05256C11.6351 1.74026 9.85588 1.00209 8.00001 1ZM8.00001 6C8.39557 6 8.78225 6.1173 9.11115 6.33706C9.44004 6.55682 9.69639 6.86918 9.84776 7.23463C9.99914 7.60009 10.0387 8.00222 9.96158 8.39018C9.88441 8.77814 9.69392 9.13451 9.41422 9.41421C9.13451 9.69392 8.77815 9.8844 8.39019 9.96157C8.00222 10.0387 7.60009 9.99913 7.23464 9.84776C6.86919 9.69638 6.55683 9.44004 6.33707 9.11114C6.1173 8.78224 6.00001 8.39556 6.00001 8C6.0006 7.46975 6.21151 6.96139 6.58645 6.58644C6.96139 6.2115 7.46976 6.0006 8.00001 6ZM3.415 4.1255L5.56296 6.27345C5.19801 6.77661 5.00101 7.38204 5 8.00361C4.99898 8.62519 5.194 9.23125 5.55731 9.7356L3.41905 11.8741C2.50412 10.7907 2.00185 9.41856 2.00111 8.00051C2.00037 6.58247 2.5012 5.20985 3.415 4.1255ZM4.12641 12.5805L6.26436 10.4425C6.63207 10.7048 7.0546 10.88 7.50001 10.955V13.976C6.25688 13.8766 5.07653 13.3883 4.12641 12.5805ZM8.50001 13.9781V10.9546C8.94367 10.8785 9.36434 10.7029 9.73045 10.441L11.8714 12.5818C10.9217 13.3891 9.74237 13.8775 8.50001 13.9781ZM10.955 7.5C10.8504 6.88696 10.558 6.32153 10.1182 5.88178C9.67847 5.44203 9.11304 5.14965 8.50001 5.045V2.0205C9.91294 2.14072 11.2379 2.75663 12.2406 3.75937C13.2432 4.7621 13.8591 6.08706 13.9793 7.5H10.955Z"
									fill="white"
								/>
							</svg>

							<p className="text-[16px] leading-[24px] text-white">
								{credential}
							</p>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}

export default function MeetTheFounder({ data }: MeetTheFounderProps) {
	const meetTheFounderData = data?.data || defaultMeetTheFounderData;
	const founders = meetTheFounderData.founders || [];

	return (
		<section
			id="meet-the-founder"
			className="w-full py-[80px] md:py-[112px] px-[20px] md:px-[80px]"
		>
			<div className="max-w-[848px] mx-auto flex flex-col gap-[80px]">
				<div className="flex flex-col gap-[16px]">
					<h2 className=" text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-white">
						{meetTheFounderData.sectionTitle}
					</h2>
					<p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] text-white opacity-60">
						{meetTheFounderData.sectionSubtitle}
					</p>
				</div>
				{meetTheFounderData.heroImage && (
					<div
						className="w-full h-[526px] rounded-[12px]"
						style={{
							backgroundImage: meetTheFounderData.heroImage
								? `url(${meetTheFounderData.heroImage})`
								: undefined,
							backgroundSize: "contain",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
						}}
					></div>
				)}
				<TextRevealParagraph
					paragraphs={meetTheFounderData.storyParagraphs}
					className="flex flex-col gap-[24px]"
				/>
				{/* Founders Stack */}
				<div className="flex flex-col gap-[64px]">
					{founders.map((founder, index) => (
						<FounderCard
							key={index}
							founder={founder}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
