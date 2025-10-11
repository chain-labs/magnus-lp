"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
	{
		name: "Initial Consultation",
		price: "Free",
		description:
			"Start your financial journey with a complimentary consultation",
		features: [
			"60-minute discovery meeting",
			"Financial situation review",
			"Goal assessment",
			"Service overview",
			"No obligation",
		],
		cta: "Schedule Free Meeting",
		popular: false,
	},
	{
		name: "Comprehensive Planning",
		price: "Custom",
		description: "Full financial planning with ongoing advisory services",
		features: [
			"Complete financial plan",
			"Investment management",
			"Tax planning strategies",
			"Retirement planning",
			"Estate planning guidance",
			"Quarterly portfolio reviews",
			"Unlimited consultations",
			"Real-time portfolio access",
		],
		cta: "Get Started",
		popular: true,
	},
	{
		name: "Specialized Services",
		price: "Custom",
		description: "Tailored solutions for specific financial needs",
		features: [
			"Business owner planning",
			"Executive compensation",
			"Equity compensation planning",
			"Charitable giving strategies",
			"Risk management",
			"Insurance planning",
		],
		cta: "Learn More",
		popular: false,
	},
] as const;

const priceLabel = (price: string) => {
	const isNumeric = /^\d+(\.\d+)?$/.test(price);

	if (!isNumeric) {
		return price;
	}

	return (
		<span className="inline-flex items-baseline gap-1">
			<span className="text-4xl">$</span>
			<span className="text-6xl font-bold">{price}</span>
		</span>
	);
};

const defaultPlan = plans.find((plan) => plan.popular) ?? plans[0];

export default function Pricing() {
	const [selectedPlanName, setSelectedPlanName] = useState<"Specialized Services" | "Initial Consultation" | "Comprehensive Planning">(defaultPlan.name);
	const selectedPlan = plans.find((plan) => plan.name === selectedPlanName) ?? defaultPlan;
	const otherPlans = plans.filter((plan) => plan.name !== selectedPlan.name);

	return (
		<div className="relative py-16 md:py-32">
			<div className="mx-auto max-w-5xl px-6">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
						Start managing your company smarter today
					</h2>
				</div>
				<div className="mt-8 md:mt-20">
					<div className="bg-card relative rounded-3xl border shadow-2xl shadow-zinc-950/5">
						<div className="grid gap-12 divide-y p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
							<AnimatePresence mode="wait">
								{selectedPlan && (
									<motion.div
										key={`details-${selectedPlan.name}`}
										className="pb-12 text-center md:pb-0 md:pr-12"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3 }}
									>
										<h3 className="text-2xl font-semibold">{selectedPlan.name}</h3>
										<p className="mt-2 text-lg">{selectedPlan.description}</p>
										<span className="mb-6 mt-12 inline-block text-6xl font-bold">
											{priceLabel(selectedPlan.price)}
										</span>

										<div className="flex justify-center">
											<Button asChild size="lg">
												<Link href="#contact">{selectedPlan.cta}</Link>
											</Button>
										</div>

										<p className="text-muted-foreground mt-12 text-sm">
											Includes: {selectedPlan.features.slice(0, 3).join(", ")}
										</p>
									</motion.div>
								)}
							</AnimatePresence>

							<AnimatePresence mode="wait">
								{selectedPlan && (
									<motion.div
										key={`features-${selectedPlan.name}`}
										className="relative"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3 }}
									>
										<ul role="list" className="space-y-4">
											{selectedPlan.features.map((feature) => (
												<li key={feature} className="flex items-center gap-2">
													<Check className="size-3" />
													<span>{feature}</span>
												</li>
											))}
										</ul>
										{otherPlans.length > 0 && (
											<motion.div
												layout
												className="mt-12 rounded-2xl border border-dashed border-foreground/10 bg-muted/20 p-6"
											>
												<p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
													Additional Options
												</p>
												<div className="mt-4 grid gap-4 sm:grid-cols-2">
													{otherPlans.map((plan) => (
														<motion.button
															key={plan.name}
															type="button"
															onClick={() => setSelectedPlanName(plan.name)}
															className="flex h-full flex-col rounded-xl bg-background p-4 text-left shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
															whileHover={{ y: -4 }}
															whileTap={{ y: 0 }}
														>
															<span className="text-base font-semibold">{plan.name}</span>
															<span className="mt-1 text-sm text-muted-foreground">
																{plan.description}
															</span>
															<span className="mt-3 text-sm font-medium text-primary">
																{plan.price}
															</span>
														</motion.button>
													))}
												</div>
											</motion.div>
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
