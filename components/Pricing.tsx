"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";

const pricingData = {
	basic: {
		title: "Basic plan",
		description: "Lorem ipsum dolor sit amet",
		monthlyPrice: 19,
		yearlyPrice: 199,
		link: "https://cal.com/magnushathaway/30min",
		features: [
			"Feature text goes here",
			"Feature text goes here",
			"Feature text goes here",
			"Feature text goes here",
			"Feature text goes here",
		],
		primary: false,
	},
	business: {
		title: "Business plan",
		description: "Lorem ipsum dolor sit amet",
		monthlyPrice: 29,
		yearlyPrice: 299,
		link: "https://cal.com/magnushathaway/30min",
		features: [
			"Feature text goes here",
			"Feature text goes here",
			"Feature text goes here",
			"Feature text goes here",
			"Feature text goes here",
		],
		primary: true,
	},
	enterprise: {
		title: "Enterprise plan",
		description: "Lorem ipsum dolor sit amet",
		monthlyPrice: 49,
		yearlyPrice: 499,
		link: "https://cal.com/magnushathaway/30min",
		features: [
			"Feature text goes here",
			"Feature text goes here",
			"Feature text goes here",
			"Feature text goes here",
			"Feature text goes here",
		],
		primary: false,
	},
};

function PricingCard({
	plan,
	isYearly,
}: {
	plan: typeof pricingData.basic;
	isYearly: boolean;
}) {
	return (
		<div
			className={cn(
				"relative rounded-[12px] transition-all duration-300 flex flex-col h-full",
				"border border-[#040D2633] shadow-md hover:shadow-lg",
				"bg-white"
			)}
		>
			<div className="p-[32px] flex-1 flex flex-col">
				{/* Plan Title and Description */}
				<div className="mb-6">
					<h3 className="text-[20px] leading-[32px] font-semibold text-[#040D26] mb-[4px]">
						{plan.title}
					</h3>
					<p className="text-sm text-[#040D26] mb-6 opacity-60">
						{plan.description}
					</p>
				</div>

				<hr className="my-[32px] border-[#040D261F]" />

				{/* Price */}
				<div className="mb-8">
					<div className="flex items-baseline gap-1 mb-2">
						<span className="text-[40px] leading-[48px] text-[#040D26]">
							$
							{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
						</span>
						<span className="text-[16px] leading-[24px] text-[#040D26]">
							/{isYearly ? "year" : "mo"}
						</span>
					</div>
					<p className="text-sm text-[#040D26]">
						or ${plan.yearlyPrice} yearly
					</p>
				</div>

				{/* CTA Button */}
				<div className="mt-[32px]">
					<button
						style={{
							background: plan.primary
								? `radial-gradient(97.46% 172.79% at 2.54% 70.83%, #A12FFF 0%, rgba(0, 22, 118, 0.5) 100%),
											    radial-gradient(169.02% 564.79% at 77.54% -103.13%, #2FFCFF 0%, rgba(0, 22, 118, 0.5) 100%),
												#00177C
											    `
								: "#00177C",
						}}
						className={cn(
							"w-full px-[24px] py-[12px] rounded-[8px] text-[16px] leading-[24px] font-bold transition-all duration-300",
							plan.primary
								? "text-white shadow-[0_1px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_1px_20px_rgba(0,0,0,0.15)] font-semibold text-base"
								: "bg-[#00177C] hover:bg-zinc-800 text-white shadow-sm hover:shadow-md"
						)}
					>
						Get Started
					</button>
				</div>

				<hr className="my-[32px] border-[#040D261F]" />

				{/* Features */}
				<div className="space-y-4 mt-auto">
					{plan.features.map((feature, index) => (
						<div key={index} className="flex gap-3 items-start">
							<div className="mt-0.5 flex-shrink-0 text-[#040D26]">
								<Check className="w-5 h-5" />
							</div>
							<div className="text-sm text-[#040D26]">
								{feature}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default function Pricing() {
	const [isYearly, setIsYearly] = useState(false);
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const plans = [
		pricingData.basic,
		pricingData.business,
		pricingData.enterprise,
	];

	return (
		<section className="relative text-foreground py-[80px] md:py-[120px] px-[20px] md:px-[64px]">
			<div className="w-full max-w-7xl mx-auto">
				{/* Header Section */}
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
					<div className="flex-1 max-w-[786px]">
						<p className="text-sm text-[#040D26] mb-[16px]">
							Prizing
						</p>
						<h2 className="text-[40px] leading-[48px] text-[#040D26] mb-[24px]">
							Pricing plan
						</h2>
						<p className="text-[16px] leading-[24px] text-[#040D26]">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Suspendisse varius enim in eros elementum
							tristique.
						</p>
					</div>
					{/* Monthly/Yearly Toggle */}
					<div className="inline-flex items-center p-[4px] rounded-[8px] border border-[#040D26] w-fit">
						{["Monthly", "Yearly"].map((period) => (
							<button
								key={period}
								onClick={() => setIsYearly(period === "Yearly")}
								className={cn(
									"px-[24px] py-[8px] text-[16px] leading-[24px] rounded-[8px] transition-all duration-300",
									(period === "Yearly") === isYearly
										? "bg-[#00177C] text-white shadow-lg"
										: "text-[#040D26] hover:text-[#040D26]"
								)}
							>
								{period}
							</button>
						))}
					</div>
				</div>

				{/* Desktop Grid */}
				<div className="hidden md:grid md:grid-cols-3 gap-8">
					{plans.map((plan) => (
						<PricingCard
							key={plan.title}
							plan={plan}
							isYearly={isYearly}
						/>
					))}
				</div>

				{/* Mobile Carousel */}
				<div className="md:hidden">
					<Carousel setApi={setApi} className="w-full">
						<CarouselContent>
							{plans.map((plan) => (
								<CarouselItem key={plan.title}>
									<PricingCard
										plan={plan}
										isYearly={isYearly}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<div className="flex justify-center gap-2 mt-8">
							{Array.from({ length: count }).map((_, index) => (
								<button
									key={index}
									className={cn(
										"h-2 w-2 rounded-full transition-all duration-300",
										index + 1 === current
											? "bg-[#00177C] w-6"
											: "bg-[#040D2633]"
									)}
									onClick={() => api?.scrollTo(index)}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</Carousel>
				</div>
			</div>
		</section>
	);
}
