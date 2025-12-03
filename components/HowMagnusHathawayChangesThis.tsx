import Image from "next/image";

const howMagnusHathawayChangesThisData = [
	{
		id: "item-1",
		tag: "Gives clarity",
		title: "You get expert research. Clearly explained.",
		description:
			"Every stock recommendation comes with a detailed research report. Not a hot tip. Not a chart pattern. Real analysis. Real reasoning. Real clarity on why we think this stock matters. You understand the business. You understand the valuation. You understand what could go wrong.",
		image: "/assets/section/howMagnusHathawayChangesThis/1.png",
		imageDirection: "left",
	},
	{
		id: "item-2",
		tag: "Clear Reasoning",
		title: "You get what HNI investors have always had.",
		description:
			"Just like discount brokers democratized trading, Magnus Hathaway democratizes quality investment advice.  Stock recommendations you can act on. Clear reasoning behind every pick. No conflicts. No pressure to buy. You stay in control. You make the final call.",
		image: "/assets/section/howMagnusHathawayChangesThis/2.png",
		imageDirection: "right",
	},
	{
		id: "item-3",
		tag: "Frequent updates",
		title: "You get regular updates. Not daily noise.",
		description:
			"Quarterly updates on each holding. We explain what changed. We tell you when to hold and when to exit. You're not left wondering if this is still a good idea. Over time, you learn to spot opportunities yourself. You learn to think like an investor. Eventually, you won't need to rely on us. You'll have the confidence to invest on your own.",
		image: "/assets/section/howMagnusHathawayChangesThis/3.png",
		imageDirection: "left",
	},
];

export default function HowMagnusHathawayChangesThis() {
	return (
		<section className="w-full py-[120px] px-[80px]">
			<div className="max-w-7xl mx-auto flex flex-col gap-[80px]">
				<h2 className="text-[48px] leading-[64px] text-[#040D26] text-center max-w-xl mx-auto">
					How Magnus Hathaway Changes This
				</h2>

				{howMagnusHathawayChangesThisData.map((item) => (
					<div className="flex rounded-[12px] overflow-hidden bg-[#F4F6F8] border border-[#37416C1A]">
						<div
							className={`p-[48px] flex flex-col justify-center items-start h-[640px] w-[640px] ${
								item.imageDirection === "right"
									? "order-2"
									: "order-1"
							}`}
						>
							<span className="text-[20px] leading-[32px] text-[#030919] opacity-80 mb-[8px]">
								{item.tag}
							</span>
							<h3 className="text-[40px] leading-[48px] text-[#030919] mb-[32px]">
								{item.title}
							</h3>
							<p className="text-[20px] leading-[32px] text-[#030919] opacity-60">
								{item.description}
							</p>
						</div>
						<div
							className={`h-[640px] w-[640px] ${
								item.imageDirection === "right"
									? "order-1"
									: "order-2"
							}`}
						>
							<Image
								src={item.image}
								alt={item.title}
								width={640}
								height={640}
                                className="w-full h-full object-cover"
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
