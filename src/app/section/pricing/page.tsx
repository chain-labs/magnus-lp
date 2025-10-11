"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Check, Cpu, Sparkles } from "lucide-react";

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

type Plan = (typeof plans)[number];
type PlanName = Plan["name"];
type FeatureAvailability = Record<PlanName, boolean>;
type FeatureRow = {
	feature: string;
	availability: FeatureAvailability;
};

const featureRows: FeatureRow[] = (() => {
	const map = new Map<string, Partial<FeatureAvailability>>();

	for (const plan of plans) {
		for (const feature of plan.features) {
			if (!map.has(feature)) {
				map.set(feature, {});
			}

			map.get(feature)![plan.name] = true;
		}
	}

	return Array.from(map.entries()).map(([feature, availability]) => {
		const normalized = plans.reduce<FeatureAvailability>((acc, plan) => {
			acc[plan.name] = Boolean(availability[plan.name]);
			return acc;
		}, {} as FeatureAvailability);

		return { feature, availability: normalized };
	});
})();

const primaryFeatureRows = featureRows.slice(0, Math.min(4, featureRows.length));
const secondaryFeatureRows = featureRows.slice(Math.min(4, featureRows.length));

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

export function Pricing1({ initialPlanName }: { initialPlanName?: PlanName } = {}) {
	const [selectedPlanName, setSelectedPlanName] = useState<PlanName>(initialPlanName ?? defaultPlan.name);
	const selectedPlan =
		plans.find((plan) => plan.name === selectedPlanName) ?? defaultPlan;
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
										<h3 className="text-2xl font-semibold">
											{selectedPlan.name}
										</h3>
										<p className="mt-2 text-lg">
											{selectedPlan.description}
										</p>
										<span className="mb-6 mt-12 inline-block text-6xl font-bold">
											{priceLabel(selectedPlan.price)}
										</span>

										<div className="flex justify-center">
											<Button asChild size="lg">
												<Link href="#contact">
													{selectedPlan.cta}
												</Link>
											</Button>
										</div>

										<p className="text-muted-foreground mt-12 text-sm">
											Includes:{" "}
											{selectedPlan.features
												.slice(0, 3)
												.join(", ")}
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
											{selectedPlan.features.map(
												(feature) => (
													<li
														key={feature}
														className="flex items-center gap-2"
													>
														<Check className="size-3" />
														<span>{feature}</span>
													</li>
												)
											)}
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
															onClick={() =>
																setSelectedPlanName(
																	plan.name
																)
															}
															className="flex h-full flex-col rounded-xl bg-background p-4 text-left shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
															whileHover={{
																y: -4,
															}}
															whileTap={{ y: 0 }}
														>
															<span className="text-base font-semibold">
																{plan.name}
															</span>
															<span className="mt-1 text-sm text-muted-foreground">
																{
																	plan.description
																}
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


export function Pricing2() {
	const planColumns = plans;
	const highlightedPlanName: PlanName = defaultPlan.name;

	const renderAvailability = (available: boolean) =>
		available ? (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="size-4"
			>
				<path
					fillRule="evenodd"
					d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
					clipRule="evenodd"
				/>
			</svg>
		) : (
			<span className="text-muted-foreground">—</span>
		);

	return (
		<section className="py-16 md:py-32">
			<div className="mx-auto max-w-5xl px-6">
				<div className="w-full overflow-auto lg:overflow-visible">
					<table className="w-[200vw] border-separate border-spacing-x-3 md:w-full dark:[--color-muted:var(--color-zinc-900)]">
						<thead className="bg-background sticky top-0">
							<tr className="*:py-4 *:text-left *:font-medium">
								<th className="lg:w-2/5"></th>
								{planColumns.map((plan) => {
									const isHighlighted = plan.name === highlightedPlanName;

									return (
										<th
											key={plan.name}
											className={isHighlighted ? "bg-muted rounded-t-(--radius) space-y-3 px-4" : "space-y-3"}
										>
											<span className="block">{plan.name}</span>

											<Button asChild size="sm" variant={isHighlighted ? "default" : "outline"}>
												<Link href="#contact">{plan.cta}</Link>
											</Button>
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody className="text-caption text-sm">
							<tr className="*:py-3">
								<td className="flex items-center gap-2 font-medium">
									<Cpu className="size-4" />
									<span>Features</span>
								</td>
								{planColumns.map((plan) => (
									<td
										key={plan.name}
										className={plan.name === highlightedPlanName ? "bg-muted border-none px-4" : undefined}
									/>
								))}
							</tr>

							{primaryFeatureRows.map((row) => (
								<tr key={row.feature} className="*:border-b *:py-3">
									<td className="text-muted-foreground">{row.feature}</td>
									{planColumns.map((plan) => {
										const isHighlighted = plan.name === highlightedPlanName;
										const content = renderAvailability(row.availability[plan.name]);

										return (
											<td key={`${row.feature}-${plan.name}`} className={isHighlighted ? "bg-muted border-none px-4" : undefined}>
												{isHighlighted ? <div className="-mb-3 border-b py-3">{content}</div> : content}
											</td>
										);
									})}
								</tr>
							))}

							{secondaryFeatureRows.length > 0 && (
								<>
									<tr className="*:pb-3 *:pt-8">
										<td className="flex items-center gap-2 font-medium">
											<Sparkles className="size-4" />
											<span>Additional Benefits</span>
										</td>
										{planColumns.map((plan) => (
											<td
												key={`secondary-heading-${plan.name}`}
												className={plan.name === highlightedPlanName ? "bg-muted border-none px-4" : undefined}
											/>
										))}
									</tr>

									{secondaryFeatureRows.map((row) => (
										<tr key={row.feature} className="*:border-b *:py-3">
											<td className="text-muted-foreground">{row.feature}</td>
											{planColumns.map((plan) => {
												const isHighlighted = plan.name === highlightedPlanName;
												const content = renderAvailability(row.availability[plan.name]);

												return (
													<td key={`${row.feature}-${plan.name}`} className={isHighlighted ? "bg-muted border-none px-4" : undefined}>
														{isHighlighted ? <div className="-mb-3 border-b py-3">{content}</div> : content}
													</td>
												);
											})}
										</tr>
									))}
								</>
							)}

							<tr className="*:py-6">
								<td></td>
								{planColumns.map((plan) => (
									<td
										key={`footer-${plan.name}`}
										className={plan.name === highlightedPlanName ? "bg-muted rounded-b-(--radius) border-none px-4" : undefined}
									/>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}

export default function Pricing() {
	return (
		<>
			<Pricing1 />
			<Pricing2 />
		</>
	);
}











