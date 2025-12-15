"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";
import type { PricingData, PricingPlan, BillingPeriod } from "@/sanity/lib/types";

// Default fallback data
const defaultPricingData: PricingData = {
	sectionLabel: "Pricing",
	title: "Pricing plan",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
	billingPeriods: [
		{ key: "monthly", label: "Monthly", suffix: "/mo" },
		{ key: "yearly", label: "Yearly", suffix: "/year" },
	],
	plans: [
		{
			title: "Basic plan",
			description: "Lorem ipsum dolor sit amet",
			prices: [
				{ periodKey: "monthly", amount: 19 },
				{ periodKey: "yearly", amount: 199 },
			],
			ctaText: "Get Started",
			ctaLink: "https://cal.com/magnushathaway/30min",
			features: [
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: false },
				{ text: "Feature text goes here", included: false },
			],
			primary: false,
		},
		{
			title: "Business plan",
			description: "Lorem ipsum dolor sit amet",
			prices: [
				{ periodKey: "monthly", amount: 29 },
				{ periodKey: "yearly", amount: 299 },
			],
			ctaText: "Get Started",
			ctaLink: "https://cal.com/magnushathaway/30min",
			features: [
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
			],
			primary: true,
		},
		{
			title: "Enterprise plan",
			description: "Lorem ipsum dolor sit amet",
			prices: [
				{ periodKey: "monthly", amount: 49 },
				{ periodKey: "yearly", amount: 499 },
			],
			ctaText: "Get Started",
			ctaLink: "https://cal.com/magnushathaway/30min",
			features: [
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
				{ text: "Feature text goes here", included: true },
			],
			primary: false,
		},
	],
};

interface PricingProps {
	data?: { data: PricingData | null };
}

function PricingCard({
	plan,
	selectedPeriod,
	allPeriods,
}: {
	plan: PricingPlan;
	selectedPeriod: BillingPeriod;
	allPeriods: BillingPeriod[];
}) {
	// Find the price for the selected billing period
	const currentPrice = plan.prices?.find(
		(p) => p.periodKey === selectedPeriod.key
	);
	
	// Find another period to show as alternative (prefer yearly for savings display)
	const alternativePeriod = allPeriods.find((p) => p.key !== selectedPeriod.key);
	const alternativePrice = alternativePeriod
		? plan.prices?.find((p) => p.periodKey === alternativePeriod.key)
		: null;

	return (
		<div
			className={cn(
				"relative rounded-[12px] transition-all duration-300 flex flex-col h-full",
				"border border-[#040D2633] shadow-md hover:shadow-lg",
				"bg-white"
			)}
		>
			<div className="p-[32px] flex-1 flex flex-col gap-[32px]">
				{/* Plan Title and Description */}
				<div>
					<h3 className="text-[20px] leading-[32px] font-semibold text-[#040D26] mb-[4px]">
						{plan.title}
					</h3>
					{plan.description && (
						<p className="text-sm text-[#040D26] opacity-60">
							{plan.description}
						</p>
					)}
				</div>

				<hr className="border-[#040D261F]" />

				{/* Price */}
				<div>
					<div className="flex items-baseline gap-1 mb-2">
						{currentPrice?.originalAmount && (
							<span className="text-[24px] leading-[32px] text-[#040D26] opacity-40 line-through mr-2">
								₹{currentPrice.originalAmount}
							</span>
						)}
						<span className="text-[40px] leading-[48px] text-[#040D26]">
							₹{currentPrice?.amount ?? 0}
						</span>
						<span className="text-[16px] leading-[24px] text-[#040D26]">
							{selectedPeriod.suffix}
						</span>
					</div>
					{alternativePrice && alternativePeriod && (
						<p className="text-sm text-[#040D26]">
							or ₹{alternativePrice.amount} {alternativePeriod.label.toLowerCase()}
						</p>
					)}
				</div>

				{/* CTA Button */}
				<div>
					<a
						href={plan.ctaLink}
						target="_blank"
						rel="noopener noreferrer"
						style={{
							background: plan.primary
								? `radial-gradient(97.46% 172.79% at 2.54% 70.83%, #A12FFF 0%, rgba(0, 22, 118, 0.5) 100%),
								   radial-gradient(169.02% 564.79% at 77.54% -103.13%, #2FFCFF 0%, rgba(0, 22, 118, 0.5) 100%),
								   #00177C`
								: "#00177C",
						}}
						className={cn(
							"block w-full px-[24px] py-[12px] rounded-[8px] text-[16px] leading-[24px] font-bold transition-all duration-300 text-center",
							plan.primary
								? "text-white shadow-[0_1px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_1px_20px_rgba(0,0,0,0.15)] font-semibold text-base"
								: "bg-[#00177C] hover:bg-zinc-800 text-white shadow-sm hover:shadow-md"
						)}
					>
						{plan.ctaText || "Get Started"}
					</a>
				</div>

				<hr className="border-[#040D261F]" />

				{/* Features */}
				<div className="space-y-4 mt-auto">
					{plan.features?.map((feature, index) => (
						<div key={index} className="flex gap-3 items-start">
							<div
								className={cn(
									"mt-0.5 flex-shrink-0",
									feature.included ? "text-[#040D26]" : "text-[#040D26] opacity-40"
								)}
							>
								{feature.included || feature.included === undefined ? (
									<Check className="w-5 h-5" />
								) : (
									<X className="w-5 h-5" />
								)}
							</div>
							<div
								className={cn(
									"text-sm",
									feature.included ? "text-[#040D26]" : "text-[#040D26] opacity-40"
								)}
							>
								{feature.text}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default function Pricing({ data }: PricingProps) {
	const pricingData = data?.data || defaultPricingData;
	const billingPeriods = pricingData.billingPeriods || defaultPricingData.billingPeriods;
	const [selectedPeriodKey, setSelectedPeriodKey] = useState(billingPeriods[0]?.key || "monthly");
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	const selectedPeriod = billingPeriods.find((p) => p.key === selectedPeriodKey) || billingPeriods[0];

	useEffect(() => {
		if (!api) {
			return;
		}

		const snapList = api.scrollSnapList();
		setTimeout(() => {
			setCount(snapList.length);
			setCurrent(api.selectedScrollSnap() + 1);
		}, 0);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const plans = pricingData.plans || [];

	// Determine grid columns based on number of plans
	const getGridCols = () => {
		if (plans.length === 1) return "md:grid-cols-1 max-w-md mx-auto";
		if (plans.length === 2) return "md:grid-cols-2 max-w-3xl mx-auto";
		if (plans.length === 3) return "md:grid-cols-3";
		return "md:grid-cols-3 lg:grid-cols-4"; // 4+ plans
	};

	return (
		<section id="pricing" className="relative text-foreground py-[80px] md:py-[120px] px-[20px] md:px-[64px]">
			<div className="w-full max-w-7xl mx-auto">
				{/* Header Section */}
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
					<div className="flex-1 max-w-[786px]">
						<p className="text-sm text-[#040D26] mb-[16px]">
							{pricingData.sectionLabel}
						</p>
						<h2 className="text-[40px] leading-[48px] text-[#040D26] mb-[24px]">
							{pricingData.title}
						</h2>
						<p className="text-[16px] leading-[24px] text-[#040D26] max-w-[768px]">
							{pricingData.description}
						</p>
					</div>
					
					{/* Dynamic Billing Period Toggle */}
					{billingPeriods.length > 1 && (
						<div className="inline-flex items-center p-[4px] rounded-[8px] border border-[#040D26] w-fit flex-wrap">
							{billingPeriods.map((period) => (
								<button
									key={period.key}
									onClick={() => setSelectedPeriodKey(period.key)}
									className={cn(
										"px-[24px] py-[8px] text-[16px] leading-[24px] rounded-[8px] transition-all duration-300",
										period.key === selectedPeriodKey
											? "bg-[#00177C] text-white shadow-lg"
											: "text-[#040D26] hover:text-[#040D26]"
									)}
								>
									{period.label}
								</button>
							))}
						</div>
					)}
				</div>

				{/* Desktop Grid */}
				<div className={cn("hidden md:grid gap-8", getGridCols())}>
					{plans.map((plan) => (
						<PricingCard
							key={plan.title}
							plan={plan}
							selectedPeriod={selectedPeriod}
							allPeriods={billingPeriods}
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
										selectedPeriod={selectedPeriod}
										allPeriods={billingPeriods}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						{plans.length > 1 && (
							<div className="flex justify-center gap-2 mt-8">
								{Array.from({ length: count }).map((_, index) => (
									<button
										key={index}
										className={cn(
											"h-2 w-2 rounded-full transition-all duration-300",
											index + 1 === current
												? "bg-[#00177C]"
												: "bg-[#040D2633]"
										)}
										onClick={() => api?.scrollTo(index)}
										aria-label={`Go to slide ${index + 1}`}
									/>
								))}
							</div>
						)}
					</Carousel>
				</div>
			</div>
		</section>
	);
}
