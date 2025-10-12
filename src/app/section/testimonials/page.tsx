"use client";

import { motion } from "motion/react";

import { TestimonialsColumn } from "@/components/sections/testimonials/testimonials-columns-1";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
	{
		text: "Magnus gave us a unified view of finance and operations. Our teams move twice as fast because the workflows finally speak to each other.",
		image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
		name: "Asha Verma",
		role: "COO, Nimbus Retail",
	},
	{
		text: "Rolling out Magnus across four regions felt effortless. The configuration options let us mirror every local compliance rule in days, not months.",
		image: "https://images.unsplash.com/photo-1528892952291-009c663ce843?auto=format&fit=crop&w=160&q=80",
		name: "Ken Lopez",
		role: "Global Controller, Vistara Foods",
	},
	{
		text: "Our customer teams finally have one source of truth. Magnus keeps everyone aligned and the onboarding squad loves the guided playbooks.",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
		name: "Priya Dsouza",
		role: "Head of CX, Stellar Support",
	},
	{
		text: "The live dashboards Magnus ships out of the box help us spot bottlenecks before they hit the floor. It's become our morning ritual.",
		image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=160&q=80",
		name: "Marcus Bell",
		role: "Operations Lead, Forge Labs",
	},
	{
		text: "We were nervous about switching ERPs, but Magnus onboarding was crystal clear. The guided automations shaved hours off every project kickoff.",
		image: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=160&q=80",
		name: "Hannah Miles",
		role: "Program Director, Lattice Works",
	},
	{
		text: "Magnus slashed our reconciliation time from days to minutes. Finance now closes the books before the quarter ends.",
		image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=160&q=80",
		name: "Rohan Nair",
		role: "VP Finance, Horizon Logistics",
	},
	{
		text: "The integrations with our existing stack were plug-and-play. Magnus met us where we were and kept our timelines intact.",
		image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
		name: "Taylor Smith",
		role: "Director of IT, Northwind Health",
	},
	{
		text: "Our field teams finally feel supported. Magnus mobile workflows capture every detail, even when crews are offline.",
		image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=160&q=80",
		name: "Melissa Grant",
		role: "Field Ops Manager, Vertex Energy",
	},
	{
		text: "No more guessing which playbook to follow. Magnus nudges the right steps at the right time, so we finish projects with zero rework.",
		image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=160&q=80",
		name: "Daniel Chen",
		role: "Delivery Lead, Apex Build",
	},
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const testimonialsComponents = [
	<div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
		<TestimonialsColumn testimonials={firstColumn} duration={15} />
		<TestimonialsColumn
			testimonials={secondColumn}
			className="hidden md:block"
			duration={19}
		/>
		<TestimonialsColumn
			testimonials={thirdColumn}
			className="hidden lg:block"
			duration={17}
		/>
	</div>,
	<div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
		{testimonials.map((testimonial) => (
			<div
				key={testimonial.name}
				className="flex h-full bg-background flex-col justify-between rounded-2xl border p-6 text-left shadow-sm shadow-black/5"
			>
				<p className="text-muted-foreground text-base leading-relaxed">
					“{testimonial.text}”
				</p>
				<div className="mt-6">
					<p className="text-sm font-semibold text-foreground">
						{testimonial.name}
					</p>
					<p className="text-muted-foreground text-xs">
						{testimonial.role}
					</p>
				</div>
			</div>
		))}
	</div>,
];

export default function TestimonialsPage() {
	const [switcher, setSwitcher] = useState(0);
	function handleSwitch() {
		setSwitcher((prev) => (prev + 1) % testimonialsComponents.length);
	}
	return (
		<section className="my-20 relative min-h-screen">
			<Button
				variant="secondary"
				className="absolute m-4 z-10"
				onClick={handleSwitch}
			>
				Switch
			</Button>
			<div className="container z-10 mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.1,
						ease: [0.16, 1, 0.3, 1],
					}}
					viewport={{ once: true }}
					className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
				>
					<h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5 max-w-3xl">
						Teams trust Magnus to orchestrate their operations
					</h2>
					<p className="text-muted-foreground mt-5">
						Stories from operators, finance leaders, and delivery
						managers who switched to the Magnus operating layer.
					</p>
				</motion.div>
				{testimonialsComponents[switcher]}
			</div>
		</section>
	);
}
