"use client";

import { motion } from "motion/react";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResearchSignal = {
	stockname: string;
	pricerange: string;
	actionzone: "buy" | "hold" | "exit";
	targetprice: number;
	percentage: string;
	date: string;
	stoploss: number;
	duration: string;
};

const researchSignals: ResearchSignal[] = [
	{
		stockname: "AAPL",
		pricerange: "170-175",
		actionzone: "buy",
		targetprice: 190,
		percentage: "10%",
		date: "2025-10-12",
		stoploss: 165,
		duration: "2 weeks",
	},
	{
		stockname: "TSLA",
		pricerange: "250-260",
		actionzone: "hold",
		targetprice: 280,
		percentage: "8%",
		date: "2025-10-10",
		stoploss: 240,
		duration: "1 month",
	},
	{
		stockname: "AMZN",
		pricerange: "130-135",
		actionzone: "buy",
		targetprice: 150,
		percentage: "12%",
		date: "2025-10-09",
		stoploss: 125,
		duration: "3 weeks",
	},
	{
		stockname: "NFLX",
		pricerange: "400-410",
		actionzone: "exit",
		targetprice: 380,
		percentage: "-7%",
		date: "2025-10-11",
		stoploss: 395,
		duration: "immediate",
	},
	{
		stockname: "GOOGL",
		pricerange: "135-140",
		actionzone: "hold",
		targetprice: 150,
		percentage: "7%",
		date: "2025-10-08",
		stoploss: 132,
		duration: "1 month",
	},
	{
		stockname: "MSFT",
		pricerange: "320-325",
		actionzone: "buy",
		targetprice: 350,
		percentage: "9%",
		date: "2025-10-07",
		stoploss: 315,
		duration: "3 weeks",
	},
	{
		stockname: "NVDA",
		pricerange: "450-460",
		actionzone: "hold",
		targetprice: 480,
		percentage: "6%",
		date: "2025-10-12",
		stoploss: 445,
		duration: "2 weeks",
	},
	{
		stockname: "META",
		pricerange: "290-300",
		actionzone: "exit",
		targetprice: 280,
		percentage: "-4%",
		date: "2025-10-05",
		stoploss: 285,
		duration: "immediate",
	},
];

const tickerTone: Record<ResearchSignal["actionzone"], string> = {
	buy: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/40",
	hold: "bg-amber-500/10 text-amber-600 ring-amber-500/40",
	exit: "bg-rose-500/10 text-rose-500 ring-rose-500/40",
};

const actionTone: Record<ResearchSignal["actionzone"], string> = {
	buy: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
	hold: "border-amber-500/40 bg-amber-500/10 text-amber-600",
	exit: "border-rose-500/40 bg-rose-500/10 text-rose-500",
};

const priceFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 2,
});

const publishedFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric",
});

function formatPrice(value: number) {
	return priceFormatter.format(value);
}

function formatPublished(date: string) {
	return publishedFormatter.format(new Date(date));
}

function ActionBadge({ action }: { action: ResearchSignal["actionzone"] }) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase",
				actionTone[action] ??
					"border-border/60 bg-card text-muted-foreground"
			)}
		>
			{action}
		</span>
	);
}

export default function QualityResearchPage() {
	const lockedStartIndex = 2;
	const totalSignals = researchSignals.length;
	const firstLockedIndex = Math.min(lockedStartIndex, totalSignals);
	const lockedCount = Math.max(totalSignals - firstLockedIndex, 0);
	const hasLockedRows = lockedCount > 0;
	const overlayTop =
		hasLockedRows && totalSignals > 0
			? ((firstLockedIndex + lockedCount / 2) / totalSignals) * 100
			: 50;
	const overlayTopClamped = Math.min(Math.max(overlayTop, 55), 95);

	return (
		<section className="relative py-16 sm:py-20">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: true }}
					className="mx-auto max-w-4xl text-center"
				>
					<h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5">
						Highest quality research, ready before the market opens
					</h2>
					<p className="text-muted-foreground mt-5">
						Curated calls across overnight, intraday, and positional
						strategies. Unlock deeper analytics, price targets, and
						premium playbooks tailored to your desk without the
						noise.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.75,
						delay: 0.1,
						ease: [0.16, 1, 0.3, 1],
					}}
					viewport={{ once: true }}
					className="mt-12"
				>
					<div className="overflow-hidden rounded-3xl border border-border/40 bg-card/60 shadow-[0_30px_110px_-70px_rgba(15,23,42,0.6)]">
						<div className="relative overflow-x-auto px-2">
							<table className="mx-auto w-full min-w-[600px] border-collapse">
								<thead>
									<tr className="text-left text-[11px] uppercase text-muted-foreground sm:text-[12px]">
										<th className="px-4 py-4 sm:px-5">
											Ticker
										</th>
										<th className="px-4 py-4 sm:px-5">
											Price Zone
										</th>
										<th className="px-4 py-4 text-center sm:px-5">
											Action
										</th>
										<th className="px-4 py-4 text-right sm:px-5">
											Target
										</th>
										<th className="px-4 py-4 text-right sm:px-5">
											Stop Loss
										</th>
										<th className="px-4 py-4 text-right sm:px-5">
											Potential
										</th>
										<th className="px-4 py-4 text-right sm:px-5">
											Duration
										</th>
										<th className="px-4 py-4 text-right sm:px-5">
											Published
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border/50 text-xs text-foreground sm:text-sm">
									{researchSignals.map((signal, index) => {
										const reveal = index < 2;
										const isPositivePotential =
											!signal.percentage
												.trim()
												.startsWith("-");

										return (
											<tr
												key={`${signal.stockname}-${signal.date}`}
												className="transition-colors duration-200 hover:bg-foreground/[0.04]"
											>
												<td className="px-4 py-4 sm:px-5">
													<div className="flex items-center gap-3">
														<span
															className={cn(
																"inline-flex h-9 w-9 items-center justify-center rounded-2xl text-[11px] font-semibold uppercase ring-1",
																tickerTone[
																	signal
																		.actionzone
																],
																!reveal &&
																	"ring-border/50 text-foreground/80"
															)}
														>
															{signal.stockname.slice(
																0,
																3
															)}
														</span>
														<div>
															<div className="text-sm font-semibold text-foreground sm:text-base">
																{
																	signal.stockname
																}
															</div>
														</div>
													</div>
												</td>
												<td className="px-4 py-4 text-muted-foreground sm:px-5">
													<span
														aria-hidden={!reveal}
														className={cn(
															"inline-block text-sm",
															!reveal &&
																"blur-sm select-none"
														)}
													>
														{signal.pricerange}
													</span>
													{!reveal && (
														<span className="sr-only">
															Premium research —
															log in to view price
															zone for{" "}
															{signal.stockname}
														</span>
													)}
												</td>
												<td className="px-4 py-4 text-center sm:px-5">
													<div className="flex justify-center">
														<div
															aria-hidden={
																!reveal
															}
															className={cn(
																!reveal &&
																	"blur-sm select-none"
															)}
														>
															<ActionBadge
																action={
																	signal.actionzone
																}
															/>
														</div>
														{!reveal && (
															<span className="sr-only">
																Premium research
																— log in to view
																action for{" "}
																{
																	signal.stockname
																}
															</span>
														)}
													</div>
												</td>
												<td className="px-4 py-4 text-right sm:px-5">
													<span
														aria-hidden={!reveal}
														className={cn(
															"font-mono text-sm text-foreground",
															!reveal &&
																"blur-sm select-none text-muted-foreground"
														)}
													>
														{formatPrice(
															signal.targetprice
														)}
													</span>
													{!reveal && (
														<span className="sr-only">
															Premium research —
															log in to view
															target for{" "}
															{signal.stockname}
														</span>
													)}
												</td>
												<td className="px-4 py-4 text-right sm:px-5">
													<span
														aria-hidden={!reveal}
														className={cn(
															"font-mono text-sm text-foreground",
															!reveal &&
																"blur-sm select-none text-muted-foreground"
														)}
													>
														{formatPrice(
															signal.stoploss
														)}
													</span>
													{!reveal && (
														<span className="sr-only">
															Premium research —
															log in to view stop
															loss for{" "}
															{signal.stockname}
														</span>
													)}
												</td>
												<td className="px-4 py-4 text-right sm:px-5">
													<span
														aria-hidden={!reveal}
														className={cn(
															"font-mono text-sm font-semibold",
															isPositivePotential
																? "text-emerald-500"
																: "text-rose-500",
															!reveal &&
																"blur-sm select-none text-muted-foreground"
														)}
													>
														{signal.percentage}
													</span>
													{!reveal && (
														<span className="sr-only">
															Premium research —
															log in to view
															potential return for{" "}
															{signal.stockname}
														</span>
													)}
												</td>
												<td className="px-4 py-4 text-right text-muted-foreground sm:px-5">
													<span
														aria-hidden={!reveal}
														className={cn(
															!reveal &&
																"blur-sm select-none"
														)}
													>
														{signal.duration}
													</span>
													{!reveal && (
														<span className="sr-only">
															Premium research —
															log in to view
															duration for{" "}
															{signal.stockname}
														</span>
													)}
												</td>
												<td className="px-4 py-4 text-right text-muted-foreground sm:px-5">
													<span
														aria-hidden={!reveal}
														className={cn(
															!reveal &&
																"blur-sm select-none"
														)}
													>
														{formatPublished(
															signal.date
														)}
													</span>
													{!reveal && (
														<span className="sr-only">
															Premium research —
															log in to view
															published date for{" "}
															{signal.stockname}
														</span>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							{hasLockedRows && (
								<div
									className="pointer-events-none absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center"
									style={{ top: `${overlayTopClamped}%` }}
								>
									<div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/95 px-3 py-1.5 text-[11px] font-semibold uppercase text-muted-foreground shadow-sm backdrop-blur">
										<Lock
											className="h-3.5 w-3.5"
											aria-hidden="true"
										/>
										<span>Premium Research Locked</span>
									</div>
								</div>
							)}
						</div>

						<div className="flex flex-col gap-3 border-t border-border/40 bg-card/70 px-5 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
							<span className="text-xs text-muted-foreground sm:text-sm">
								Access premium notes, intraday alerts, and
								disciplined entry plans built by the Magnus
								desk.
							</span>
							<Button className="rounded-full bg-foreground px-6 py-2 text-xs font-semibold uppercase text-background hover:bg-foreground/90 sm:px-7 sm:py-2.5">
								View more research
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
