"use client";
import TeamGridSection from "@/components/sections/team/team";
import TeamShowcase from "@/components/sections/team/demo";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const communityTestimonials = [
	{
		quote: "Alireza’s research notes have transformed the way our desk evaluates mid-cap opportunities. The clarity and conviction behind every call is unmatched.",
		name: "Anita Sharma",
		role: "Portfolio Manager, Zenith Wealth",
	},
	{
		quote: "Rahul’s weekly options breakdown is now mandatory reading for our trading squad. His frameworks help us stay disciplined even on volatile days.",
		name: "Prakash Nair",
		role: "Lead Derivatives Analyst, Stratos Securities",
	},
	{
		quote: "The Magnus LP team pairs deep market insight with storytelling that resonates. Our community trusts them to make complex moves feel accessible.",
		name: "Divya Rao",
		role: "Founder, AlphaCircle Community",
	},
];

const teams = [<TeamGridSection />, <TeamShowcase />];

export default function TeamPage() {
	const [switcher, setSwitcher] = useState(0);
	function handleSwitch() {
		setSwitcher((prev) => (prev + 1) % teams.length);
	}
	return (
		<section className="min-h-screen w-full relative">
			<Button
				variant="secondary"
				className="absolute m-4 z-10"
				onClick={handleSwitch}
			>
				Switch
			</Button>
			<div className="container mx-auto px-4">
				<div className="flex flex-col items-center justify-center text-center">
					<h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5 max-w-3xl">
						The operators helping investors navigate every market
						cycle
					</h1>
					<p className="text-muted-foreground mt-5 max-w-2xl">
						Led by SEBI-registered analyst Alireza Azar and
						capital-markets strategist Rahul Pandey, Magnus LP
						blends rigorous research, options mastery, and
						community-first storytelling.
					</p>
				</div>
			</div>

			<div className="mt-16">{teams[switcher]}</div>
		</section>
	);
}
