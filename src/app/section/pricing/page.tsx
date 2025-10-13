"use client";

import { useEffect, useState } from "react";
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

const primaryFeatureRows = featureRows.slice(
	0,
	Math.min(4, featureRows.length)
);
const secondaryFeatureRows = featureRows.slice(Math.min(4, featureRows.length));

const pricingCategories = [
	{
		id: "advisory-foundations",
		title: "Advisory Foundations",
		description:
			"Structured planning support for households building long-term momentum.",
		plans: [
			{
				id: "foundations-core",
				name: "Core",
				price: "$149/mo",
				tagline: "Quarterly reviews and guided implementation",
				features: [
					"90-day onboarding roadmap",
					"Quarterly advisor reviews",
					"Secure plan workspace",
				],
			},
			{
				id: "foundations-plus",
				name: "Momentum",
				price: "$219/mo",
				tagline: "Monthly touchpoints with guided accountability",
				features: [
					"Monthly advisor syncs",
					"Investment policy updates",
					"Priority email support",
				],
			},
		],
		benefits: [
			"Dedicated financial strategist matched to your goals",
			"Coordinated cash-flow and savings automations",
			"Stress-tested roadmap for the next 3-5 years",
			"Secure hub for documents, tasks, and progress tracking",
		],
	},
	{
		id: "growth-strategies",
		title: "Growth Strategies",
		description:
			"Built for emerging leaders balancing equity, compensation, and rapid growth.",
		plans: [
			{
				id: "growth-equity",
				name: "Equity Focus",
				price: "$329/mo",
				tagline: "Scenario modeling for stock and incentive plans",
				features: [
					"Quarterly equity liquidation modeling",
					"Tax-efficient exercise strategies",
					"Employer benefit optimization",
				],
			},
			{
				id: "growth-accelerate",
				name: "Accelerate",
				price: "$459/mo",
				tagline: "Deep coordination with tax and legal partners",
				features: [
					"Integrated tax advisory touchpoints",
					"Real-time cash management dashboards",
					"Annual multi-scenario simulations",
				],
			},
		],
		benefits: [
			"Equity windfall planning with proactive guidance",
			"On-demand advisor support within 1 business day",
			"Access to curated partner network (tax, legal, lending)",
			"Structured liquidity and diversification playbooks",
		],
	},
	{
		id: "enterprise-stewardship",
		title: "Enterprise Stewardship",
		description:
			"White-glove coordination for complex household balance sheets and entities.",
		plans: [
			{
				id: "enterprise-family",
				name: "Family Office",
				price: "$689/mo",
				tagline: "Multi-entity tracking and governance",
				features: [
					"Consolidated reporting across entities",
					"Estate workflows with legal partners",
					"Quarterly risk management council",
				],
			},
			{
				id: "enterprise-bespoke",
				name: "Bespoke",
				price: "Custom",
				tagline: "Engagements tailored to unique complexity",
				features: [
					"Dedicated virtual CFO team",
					"Capital event readiness planning",
					"Custom performance analytics",
				],
			},
		],
		benefits: [
			"Executive dashboard with live balance sheet reconciliation",
			"Proactive coordination across tax, legal, and banking teams",
			"Annual family summit with guided facilitation",
			"Scenario planning for acquisitions, liquidity, and succession",
		],
	},
] as const;

type PricingCategory = (typeof pricingCategories)[number];
type PricingCategoryPlan = PricingCategory["plans"][number];

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

export function Pricing1({
	initialPlanName,
}: { initialPlanName?: PlanName } = {}) {
	const [selectedPlanName, setSelectedPlanName] = useState<PlanName>(
		initialPlanName ?? defaultPlan.name
	);
	const selectedPlan =
		plans.find((plan) => plan.name === selectedPlanName) ?? defaultPlan;
	const otherPlans = plans.filter((plan) => plan.name !== selectedPlan.name);

	return (
		<div className="mt-8 md:mt-20">
			<div className="bg-card relative rounded-3xl border shadow-xl">
				<div className="grid gap-12 divide-y p-12 items-center md:grid-cols-2 md:divide-x md:divide-y-0">
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
								<h3 className="text-2xl font-medium">
									{selectedPlan.name}
								</h3>
								<p className="mt-2 text-[14px]">
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

								<p className="text-muted-foreground mt-12 text-[12px]">
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
									{selectedPlan.features.map((feature) => (
										<li
											key={feature}
											className="flex items-center gap-2"
										>
											<Check className="size-3" />
											<span>{feature}</span>
										</li>
									))}
								</ul>
								{otherPlans.length > 0 && (
									<motion.div
										layout
										className="mt-12 rounded-2xl border border-dashed border-primary/10 bg-primary/5 p-6"
									>
										<p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
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
													className="flex h-full flex-col rounded-xl bg-background p-4 text-left shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
													whileHover={{
														y: -4,
													}}
													whileTap={{ y: 0 }}
												>
													<span className="text-base font-semibold">
														{plan.name}
													</span>
													<span className="mt-1 text-sm text-muted-foreground">
														{plan.description}
													</span>
													<span className="pt-4 text-sm font-medium text-primary mt-auto">
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
		<section className="py-16 md:py-32 z-10">
			<div className="mx-auto max-w-5xl px-6">
				<div className="w-full overflow-auto lg:overflow-visible">
					<table className="w-[200vw] border-separate border-spacing-x-3 md:w-full dark:[--color-muted:var(--color-zinc-900)]">
						<thead className="sticky top-0">
							<tr className="*:py-4 *:text-left *:font-medium">
								<th className="lg:w-2/5"></th>
								{planColumns.map((plan) => {
									const isHighlighted =
										plan.name === highlightedPlanName;

									return (
										<th
											key={plan.name}
											className={
												isHighlighted
													? "bg-background rounded-t-(--radius) space-y-3 px-4"
													: "space-y-3"
											}
										>
											<span className="block">
												{plan.name}
											</span>

											<Button
												asChild
												size="sm"
												variant={
													isHighlighted
														? "default"
														: "outline"
												}
											>
												<Link href="#contact">
													{plan.cta}
												</Link>
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
										className={
											plan.name === highlightedPlanName
												? "bg-background border-none px-4"
												: undefined
										}
									/>
								))}
							</tr>

							{primaryFeatureRows.map((row) => (
								<tr
									key={row.feature}
									className="*:border-b *:py-3"
								>
									<td className="text-muted-foreground">
										{row.feature}
									</td>
									{planColumns.map((plan) => {
										const isHighlighted =
											plan.name === highlightedPlanName;
										const content = renderAvailability(
											row.availability[plan.name]
										);

										return (
											<td
												key={`${row.feature}-${plan.name}`}
												className={
													isHighlighted
														? "bg-background border-none px-4"
														: undefined
												}
											>
												{isHighlighted ? (
													<div className="-mb-3 border-b py-3">
														{content}
													</div>
												) : (
													content
												)}
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
												className={
													plan.name ===
													highlightedPlanName
														? "bg-background border-none px-4"
														: undefined
												}
											/>
										))}
									</tr>

									{secondaryFeatureRows.map((row) => (
										<tr
											key={row.feature}
											className="*:border-b *:py-3"
										>
											<td className="text-muted-foreground">
												{row.feature}
											</td>
											{planColumns.map((plan) => {
												const isHighlighted =
													plan.name ===
													highlightedPlanName;
												const content =
													renderAvailability(
														row.availability[
															plan.name
														]
													);

												return (
													<td
														key={`${row.feature}-${plan.name}`}
														className={
															isHighlighted
																? "bg-background border-none px-4"
																: undefined
														}
													>
														{isHighlighted ? (
															<div className="-mb-3 border-b py-3">
																{content}
															</div>
														) : (
															content
														)}
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
										className={
											plan.name === highlightedPlanName
												? "bg-background rounded-b-(--radius) border-none px-4"
												: undefined
										}
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

export function Pricing3() {
	const [activeCategoryId, setActiveCategoryId] = useState<PricingCategory["id"] | null>(null);
	const activeCategory =
		activeCategoryId
			? pricingCategories.find((category) => category.id === activeCategoryId) ?? null
			: null;
	const [activePlanId, setActivePlanId] = useState<PricingCategoryPlan["id"] | null>(null);

	useEffect(() => {
		if (!activeCategory) {
			setActivePlanId(null);
			return;
		}

		setActivePlanId((current) => {
			if (
				current &&
				activeCategory.plans.some((plan) => plan.id === current)
			) {
				return current;
			}

			return activeCategory.plans[0]?.id ?? null;
		});
	}, [activeCategory]);

	const activePlan = activeCategory
		? activeCategory.plans.find((plan) => plan.id === activePlanId) ??
		  activeCategory.plans[0]
		: null;
	const showIntro = !activeCategory;

	return (
		<div className="mt-8 md:mt-20">
			<motion.div
				layout
				className="relative overflow-hidden"
			>
				<motion.div
					layout
					className={
						showIntro
							? "space-y-6 p-6 md:p-10"
							: "grid gap-10 p-6 md:grid-cols-[minmax(0,260px)_1fr] md:p-10"
					}
				>
					<motion.div
						layout
						className={showIntro ? "space-y-4 max-w-xl mx-auto" : "space-y-3 md:sticky md:top-10"}
					>
						{pricingCategories.map((category) => {
							const isActive = category.id === activeCategoryId;

							return (
								<motion.button
									layout
									key={category.id}
									type="button"
									onClick={() => setActiveCategoryId(category.id)}
									className={`w-full rounded-2xl border px-5 py-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
										isActive
											? "border-primary bg-primary/10 shadow-md"
											: "border-border/60 bg-background/60 hover:border-primary/50"
									}`}
									whileHover={{ y: -2 }}
									whileTap={{ y: 0 }}
								>
									<div className="flex items-center justify-between gap-4">
										<div>
											<h3 className="text-base font-semibold">
												{category.title}
											</h3>
											<p className="mt-2 text-sm text-muted-foreground">
												{category.description}
											</p>
										</div>
										<span className="shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
											{isActive ? "Selected" : showIntro ? "Explore" : "View"}
										</span>
									</div>
								</motion.button>
							);
						})}
					</motion.div>

					<AnimatePresence mode="wait">
						{activeCategory ? (
							<motion.div
								key={activeCategory.id}
								layout
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 12 }}
								transition={{ duration: 0.3 }}
								className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]"
							>
								<motion.div layout className="space-y-6">
									<div>
										<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
											Monthly plans
										</p>
										<h3 className="mt-2 text-2xl font-semibold">
											{activeCategory.title}
										</h3>
										<p className="mt-2 text-sm text-muted-foreground">
											{activeCategory.description}
										</p>
									</div>

									<div className="space-y-4">
										{activeCategory.plans.map((plan) => {
											const isSelected = plan.id === activePlanId;

											return (
												<motion.button
													layout
													key={plan.id}
													type="button"
													onClick={() => setActivePlanId(plan.id)}
													className={`w-full rounded-2xl border px-5 py-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
														isSelected
															? "border-primary bg-primary/10 shadow-sm"
															: "border-border/60 bg-background hover:border-primary/40"
														}`}
													whileHover={{ y: -2 }}
													whileTap={{ y: 0 }}
												>
													<div className="flex items-start justify-between gap-4">
														<div>
															<p className="text-base font-semibold">
																{plan.name}
															</p>
															<p className="mt-2 text-sm text-muted-foreground">
																{plan.tagline}
															</p>
														</div>
														<span className="shrink-0 text-sm font-medium text-primary">
															{plan.price}
														</span>
													</div>

													<AnimatePresence initial={false}>
														{isSelected ? (
															<motion.ul
																layout
																initial={{ opacity: 0, height: 0 }}
																animate={{ opacity: 1, height: "auto" }}
																exit={{ opacity: 0, height: 0 }}
																transition={{ duration: 0.2 }}
																className="mt-4 space-y-2 text-sm text-muted-foreground"
															>
																{plan.features.map((feature) => (
																	<li key={feature} className="flex items-start gap-2">
																		<Check className="mt-0.5 size-4 text-primary" />
																		<span>{feature}</span>
																	</li>
																))}
															</motion.ul>
														) : null}
													</AnimatePresence>
												</motion.button>
											);
										})}
								</div>

								<div className="pt-2">
									<Button asChild size="lg">
										<Link href="#contact">Talk with an advisor</Link>
									</Button>
									<p className="mt-2 text-xs text-muted-foreground">
										We tailor the {activePlan?.name ?? "plan"} to your household goals.
									</p>
								</div>
							</motion.div>

							<motion.div
								layout
								className="rounded-3xl border border-dashed border-primary/20 bg-primary/5 p-6 lg:p-8"
							>
								<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									Core benefits
								</p>
								<h4 className="mt-3 text-xl font-semibold">
									Included with {activeCategory.title}
								</h4>
								<ul className="mt-6 space-y-4">
									{activeCategory.benefits.map((benefit) => (
										<motion.li
											layout
											key={benefit}
											className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
										>
											<Check className="mt-0.5 size-4 text-primary" />
											<span>{benefit}</span>
										</motion.li>
									))}
								</ul>
							</motion.div>
						</motion.div>
					) : null}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	</div>
	);
}

const pricings = [<Pricing1 />, <Pricing2 />, <Pricing3 />];

export default function Pricing() {
	const [switcher, setSwitcher] = useState(0);
	function handleSwitch() {
		setSwitcher((prev) => (prev + 1) % pricings.length);
	}
	return (
		<div className="min-h-screen w-full relative">
			<Button
				variant="secondary"
				className="absolute m-4 z-10"
				onClick={handleSwitch}
			>
				Switch
			</Button>
			<div className="relative py-16 md:py-32">
				<div className="mx-auto max-w-7xl px-6">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5">
							Start managing your company smarter today
						</h2>
					</div>
					{pricings[switcher]}
				</div>
			</div>
		</div>
	);
}
