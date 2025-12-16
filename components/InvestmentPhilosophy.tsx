import type { InvestmentPhilosophyData } from "@/sanity/lib/types";

// Static data - commented out in favor of Sanity CMS
// const investmentPhilosophyData = [
// 	{
// 		id: "item-1",
// 		icon: (
// 			<svg
// 				width="48"
// 				height="48"
// 				viewBox="0 0 48 48"
// 				xmlns="http://www.w3.org/2000/svg"
// 				className="w-[32px] md:w-[48px] h-[32px] md:h-[48px]"
// 			>
// 				<path
// 					d="M6 30V33H12.879L3 42.879L5.121 45L15 35.121V42H18V30H6Z"
// 					fill="white"
// 				/>
// 				<path
// 					d="M45 6H34.5V9H39.8788L28.5 20.3789L22.0605 13.9395C21.7792 13.6583 21.3977 13.5003 21 13.5003C20.6023 13.5003 20.2208 13.6583 19.9395 13.9395L12 21.8787L14.1213 24L21 17.1211L27.4395 23.5605C27.7208 23.8417 28.1023 23.9997 28.5 23.9997C28.8977 23.9997 29.2792 23.8417 29.5605 23.5605L42 11.1212V16.5H45V6Z"
// 					fill="white"
// 				/>
// 				<path d="M45 42H24V45H45V42Z" fill="white" />
// 				<path d="M6 3H3V24H6V3Z" fill="white" />
// 			</svg>
// 		),
// 		title: "Markets Keep Changing",
// 		description:
// 			"The market doesn't care about your old playbook. What worked in 2019 might not work today. We adapt. We stay flexible. And we never fall in love with a single approach.",
// 	},
// 	{
// 		id: "item-2",
// 		icon: (
// 			<svg
// 				width="48"
// 				height="48"
// 				viewBox="0 0 48 48"
// 				xmlns="http://www.w3.org/2000/svg"
// 				className="w-[32px] md:w-[48px] h-[32px] md:h-[48px]"
// 			>
// 				<path d="M25.5 30H22.5V36H25.5V30Z" fill="white" />
// 				<path d="M33 27H30V36H33V27Z" fill="white" />
// 				<path d="M18 21H15V36H18V21Z" fill="white" />
// 				<path
// 					d="M37.5 7.5H33V6C33 5.20435 32.6839 4.44129 32.1213 3.87868C31.5587 3.31607 30.7956 3 30 3H18C17.2044 3 16.4413 3.31607 15.8787 3.87868C15.3161 4.44129 15 5.20435 15 6V7.5H10.5C9.70435 7.5 8.94129 7.81607 8.37868 8.37868C7.81607 8.94129 7.5 9.70435 7.5 10.5V42C7.5 42.7957 7.81607 43.5587 8.37868 44.1213C8.94129 44.6839 9.70435 45 10.5 45H37.5C38.2957 45 39.0587 44.6839 39.6213 44.1213C40.1839 43.5587 40.5 42.7957 40.5 42V10.5C40.5 9.70435 40.1839 8.94129 39.6213 8.37868C39.0587 7.81607 38.2957 7.5 37.5 7.5ZM18 6H30V12H18V6ZM37.5 42H10.5V10.5H15V15H33V10.5H37.5V42Z"
// 					fill="white"
// 				/>
// 			</svg>
// 		),
// 		title: "Rigorous, Not Random",
// 		description:
// 			"We don't pick stocks based on gut feelings or hot tips. Every recommendation is backed by research. Every call is thought through. If we can't explain it clearly, we don't recommend it.",
// 	},
// 	{
// 		id: "item-3",
// 		icon: (
// 			<svg
// 				width="48"
// 				height="48"
// 				viewBox="0 0 48 48"
// 				fill="none"
// 				xmlns="http://www.w3.org/2000/svg"
// 				className="w-[32px] md:w-[48px] h-[32px] md:h-[48px]"
// 			>
// 				<path
// 					d="M21 33V21H33V9H45V6H30V18H18V30H6V3H3V42C3.00099 42.7953 3.31738 43.5578 3.87978 44.1202C4.44217 44.6826 5.20466 44.999 6 45H45V42H6V33H21Z"
// 					fill="white"
// 				/>
// 			</svg>
// 		),
// 		title: "Moving at Market Speed",
// 		description:
// 			"Markets don't wait for quarterly reports. When something changes, you need to know. We send updates when they matter—not on a schedule, but when the situation demands it.",
// 	},
// 	{
// 		id: "item-4",
// 		icons: (
// 			<svg
// 				width="48"
// 				height="48"
// 				viewBox="0 0 48 48"
// 				fill="none"
// 				xmlns="http://www.w3.org/2000/svg"
// 				className="w-[32px] md:w-[48px] h-[32px] md:h-[48px]"
// 			>
// 				<path d="M45 19.5H42V22.5H45V19.5Z" fill="white" />
// 				<path
// 					d="M37.7883 5.07414L35.667 7.19544L37.7883 9.31674L39.9096 7.19544L37.7883 5.07414Z"
// 					fill="white"
// 				/>
// 				<path d="M25.5 0H22.5V3H25.5V0Z" fill="white" />
// 				<path
// 					d="M8.0901 7.22766L10.2114 9.34896L12.3327 7.22766L10.2114 5.10636L8.0901 7.22766Z"
// 					fill="white"
// 				/>
// 				<path d="M6 19.5H3V22.5H6V19.5Z" fill="white" />
// 				<path d="M28.5 45H19.5V48H28.5V45Z" fill="white" />
// 				<path d="M31.5 39H16.5V42H31.5V39Z" fill="white" />
// 				<path
// 					d="M24 6C15.75 6 9 12.75 9 21C9 27.6 12 30.45 14.25 32.4C15.75 33.75 16.5 34.65 16.5 36H19.5C19.5 33.3 17.85 31.65 16.2 30.15C14.1 28.35 12 26.25 12 21C12 14.4 17.4 9 24 9C30.6 9 36 14.4 36 21C36 26.25 33.9 28.35 31.8 30.15C30.15 31.65 28.5 33.15 28.5 36H31.5C31.5 34.65 32.25 33.75 33.75 32.4C36 30.45 39 27.6 39 21C39 12.75 32.25 6 24 6Z"
// 					fill="white"
// 				/>
// 			</svg>
// 		),
// 		title: "Market as Teacher",
// 		description:
// 			"We don't claim to know everything. The market humbles everyone eventually. But we've been at this long enough to know what works, what doesn't, and when to pivot.",
// 	},
// ];

// Default fallback data
const defaultInvestmentPhilosophyData: InvestmentPhilosophyData = {
	visible: true,
	sectionLabel: "Investment Philosophy",
	title: "How We Think About Investing",
	description:
		"We buy fair Valuation, in the right Opportunity setup, with Longevity to compound—only when a real Trigger is in sight",
	items: [
		{
			letter: "V",
			title: "Valuation",
			description:
				"Are we paying a fair price for the next 2 – 3 years of earnings power? We compare today’s price with the company’s growth, cash flows, and sector history to avoid overpaying",
		},
		{
			letter: "O",
			title: "Opportunity",
			description:
				"Is the environment favourable now? We look for clear tailwinds or inflection points in themes / sectors — policy support, capex or commodity upcycles, sector rotation etc. In short: is this the right theme to deploy capital at this point in the cycle?",
		},
		{
			letter: "L",
			title: "Longevity",
			description:
				"Can this business compound through cycles? We prefer companies with clean balance sheets, strong unit economics, high ROCE, visible runways (order books, product pipelines), and consistent reinvestment back into the business with minimal dilution",
		},
		{
			letter: "T",
			title: "Trigger",
			description:
				"What can unlock the next upmove? A concrete near-term catalyst: management change, margin improvement, large order win, product launch, regulatory clearance etc.",
		},
	],
};

const iconMap: Record<string, React.ReactNode> = {
	chart: (
		<svg
			width="48"
			height="48"
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg"
			className="w-[32px] md:w-[48px] h-[32px] md:h-[48px]"
		>
			<path
				d="M6 30V33H12.879L3 42.879L5.121 45L15 35.121V42H18V30H6Z"
				fill="white"
			/>
			<path
				d="M45 6H34.5V9H39.8788L28.5 20.3789L22.0605 13.9395C21.7792 13.6583 21.3977 13.5003 21 13.5003C20.6023 13.5003 20.2208 13.6583 19.9395 13.9395L12 21.8787L14.1213 24L21 17.1211L27.4395 23.5605C27.7208 23.8417 28.1023 23.9997 28.5 23.9997C28.8977 23.9997 29.2792 23.8417 29.5605 23.5605L42 11.1212V16.5H45V6Z"
				fill="white"
			/>
			<path d="M45 42H24V45H45V42Z" fill="white" />
			<path d="M6 3H3V24H6V3Z" fill="white" />
		</svg>
	),
	search: (
		<svg
			width="48"
			height="48"
			viewBox="0 0 48 48"
			xmlns="http://www.w3.org/2000/svg"
			className="w-[32px] md:w-[48px] h-[32px] md:h-[48px]"
		>
			<path d="M25.5 30H22.5V36H25.5V30Z" fill="white" />
			<path d="M33 27H30V36H33V27Z" fill="white" />
			<path d="M18 21H15V36H18V21Z" fill="white" />
			<path
				d="M37.5 7.5H33V6C33 5.20435 32.6839 4.44129 32.1213 3.87868C31.5587 3.31607 30.7956 3 30 3H18C17.2044 3 16.4413 3.31607 15.8787 3.87868C15.3161 4.44129 15 5.20435 15 6V7.5H10.5C9.70435 7.5 8.94129 7.81607 8.37868 8.37868C7.81607 8.94129 7.5 9.70435 7.5 10.5V42C7.5 42.7957 7.81607 43.5587 8.37868 44.1213C8.94129 44.6839 9.70435 45 10.5 45H37.5C38.2957 45 39.0587 44.6839 39.6213 44.1213C40.1839 43.5587 40.5 42.7957 40.5 42V10.5C40.5 9.70435 40.1839 8.94129 39.6213 8.37868C39.0587 7.81607 38.2957 7.5 37.5 7.5ZM18 6H30V12H18V6ZM37.5 42H10.5V10.5H15V15H33V10.5H37.5V42Z"
				fill="white"
			/>
		</svg>
	),
	lightning: (
		<svg
			width="48"
			height="48"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="w-[32px] md:w-[48px] h-[32px] md:h-[48px]"
		>
			<path
				d="M21 33V21H33V9H45V6H30V18H18V30H6V3H3V42C3.00099 42.7953 3.31738 43.5578 3.87978 44.1202C4.44217 44.6826 5.20466 44.999 6 45H45V42H6V33H21Z"
				fill="white"
			/>
		</svg>
	),
	book: (
		<svg
			width="48"
			height="48"
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="w-[32px] md:w-[48px] h-[32px] md:h-[48px]"
		>
			<path d="M45 19.5H42V22.5H45V19.5Z" fill="white" />
			<path
				d="M37.7883 5.07414L35.667 7.19544L37.7883 9.31674L39.9096 7.19544L37.7883 5.07414Z"
				fill="white"
			/>
			<path d="M25.5 0H22.5V3H25.5V0Z" fill="white" />
			<path
				d="M8.0901 7.22766L10.2114 9.34896L12.3327 7.22766L10.2114 5.10636L8.0901 7.22766Z"
				fill="white"
			/>
			<path d="M6 19.5H3V22.5H6V19.5Z" fill="white" />
			<path d="M28.5 45H19.5V48H28.5V45Z" fill="white" />
			<path d="M31.5 39H16.5V42H31.5V39Z" fill="white" />
			<path
				d="M24 6C15.75 6 9 12.75 9 21C9 27.6 12 30.45 14.25 32.4C15.75 33.75 16.5 34.65 16.5 36H19.5C19.5 33.3 17.85 31.65 16.2 30.15C14.1 28.35 12 26.25 12 21C12 14.4 17.4 9 24 9C30.6 9 36 14.4 36 21C36 26.25 33.9 28.35 31.8 30.15C30.15 31.65 28.5 33.15 28.5 36H31.5C31.5 34.65 32.25 33.75 33.75 32.4C36 30.45 39 27.6 39 21C39 12.75 32.25 6 24 6Z"
				fill="white"
			/>
		</svg>
	),
};

interface InvestmentPhilosophyProps {
	data?: { data: InvestmentPhilosophyData | null };
}

export default function InvestmentPhilosophy({
	data,
}: InvestmentPhilosophyProps) {
	const investmentPhilosophyData =
		data?.data || defaultInvestmentPhilosophyData;
	return (
		<section
			id="investment-philosophy"
			className="w-full py-[80px] md:py-[120px] px-[20px] md:px-[80px]"
		>
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-[64px] md:gap-[80px]">
				<div className="flex flex-col gap-[32px] md:gap-[16px] col-span-1">
					<h6 className="text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] text-white">
						{investmentPhilosophyData.sectionLabel}
					</h6>
					<h2 className="w-full md:max-w-2xl text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-white font-bold">
						{investmentPhilosophyData.title}
					</h2>
					<h6 className="text-[16px] md:text-[16px] leading-[24px] md:leading-[24px] text-white opacity-60">
						{investmentPhilosophyData.description}
					</h6>
				</div>
				<div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-x-[48px] gap-y-[64px] col-span-2">
					{investmentPhilosophyData.items.map((item, idx) => (
						<div
							key={idx}
							className="w-full h-full gap-[16px] md:gap-[24px] flex flex-col"
						>
							<h5 className="text-white text-[20px] md:text-[24px] leading-[32px]">
								<h1 className="text-[24px] font-bold text-white md:text-[48px] md:leading-[64px] inline-block">
									{item.letter}
								</h1>
								{item.title}
							</h5>
							<p className="text-white text-[16px] leading-[24px] opacity-70">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
