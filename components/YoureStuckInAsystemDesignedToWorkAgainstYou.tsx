import { FaRegFrown } from "react-icons/fa";

const youreStuckInAsystemDesignedToWorkAgainstYouData = [
	{
		id: "item-1",
		icon: (
			<FaRegFrown className="text-white text-[32px] leading-[40px] mb-[24px]" />
		),
		title: "No real guidance",
		description:
			"You have access to the markets. You don't have time to find and evaluate quality stocks alongside your job. So you settle for whatever shows up on your feed. YouTube picks. Telegram tips. Your colleague's hot stock idea. You're picking stocks you haven't vetted, hoping you made the right call.",
	},
	{
		id: "item-2",
		icon: (
			<FaRegFrown className="text-white text-[32px] leading-[40px] mb-[24px]" />
		),
		title: "Drowning in information without understanding",
		description:
			"You see a stock recommendation. You don't understand the valuation. You don't know when to exit. So you hold too long. You panic sell at the bottom. You miss the rebounds. The information exists. The clarity doesn't.",
	},
	{
		id: "item-3",
		icon: (
			<FaRegFrown className="text-white text-[32px] leading-[40px] mb-[24px]" />
		),
		title: "The class gap is real",
		description:
			"HNI investors have research teams. You have X/twitter threads. They're building generational wealth. Your stocks aren't moving. Theirs are compounding Hoping you made the right call.",
	},
];

export default function YoureStuckInAsystemDesignedToWorkAgainstYou() {
	return (
		<section className="w-full py-[120px] px-[80px]">
			<div className="max-w-7xl mx-auto flex flex-col gap-[80px]">
				<h2 className="max-w-2xl text-[40px] leading-[48px]">
					You're stuck in a system designed to work against you
				</h2>
				<div className="grid grid-cols-3 gap-[20px]">
					{youreStuckInAsystemDesignedToWorkAgainstYouData.map(
						(item) => (
							<div
								key={item.id}
								className="w-full h-full bg-[#010943] rounded-[8px] p-[32px] gap-[16px] flex flex-col"
							>
								{item.icon}
								<h5 className="text-white text-[24px] leading-[32px]">
									{item.title}
								</h5>
								<p className="text-white text-[16px] leading-[24px] opacity-60">
									{item.description}
								</p>
							</div>
						)
					)}
				</div>
			</div>
		</section>
	);
}
