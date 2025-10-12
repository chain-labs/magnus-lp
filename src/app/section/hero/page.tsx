"use client";

import Prism from "@/components/manually-addded/prism";
import DarkVeil from "@/components/sections/hero/dark-veil";
import LightRays from "@/components/sections/hero/light-rays";
import MarqueeBackground from "@/components/sections/hero/marquee-background";
import Orb from "@/components/sections/hero/orb";
import PrismaticBurst from "@/components/sections/hero/prismatic-burst";
import QuestionInput from "@/components/sections/hero/question-input";
import { useState } from "react";

const initialQuestions = [
	{
		question: "What's the best strategy for retirement planning in my 40s?",
		answer: "Focus on maximizing retirement contributions, diversifying investments, and setting clear retirement goals. Consider catch-up contributions as you approach 50.",
		postedAt: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
	},
	{
		question:
			"Should I pay off my mortgage early or invest the extra money?",
		answer: "It depends on your mortgage rate vs. potential investment returns. Generally, if your mortgage rate is below 4%, investing may provide better long-term growth.",
		postedAt: Date.now() - 5 * 60 * 60 * 1000, // 5 hours ago
	},
	{
		question: "How much should I have in my emergency fund?",
		answer: "Aim for 3-6 months of living expenses in a high-yield savings account. If you're self-employed or have variable income, consider 6-12 months.",
		postedAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
	},
	{
		question: "Is now a good time to invest in the stock market?",
		answer: "Time in the market beats timing the market. Focus on consistent investing through dollar-cost averaging rather than trying to predict market movements.",
		postedAt: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
	},
	{
		question:
			"What's the difference between a Roth IRA and Traditional IRA?",
		answer: "Roth IRA contributions are after-tax with tax-free withdrawals in retirement. Traditional IRA offers tax deductions now but taxed withdrawals later. Choice depends on current vs. future tax bracket.",
		postedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
	},
	{
		question: "How can I reduce my tax liability legally?",
		answer: "Maximize retirement contributions, utilize HSAs, consider tax-loss harvesting, donate to charity, and explore business deductions if self-employed. Always consult with a tax professional.",
		postedAt: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
	},
	{
		question: "Should I invest in real estate or stocks?",
		answer: "Both have merits. Stocks offer liquidity and diversification. Real estate provides tangible assets and potential rental income. A balanced approach often works best based on your goals and risk tolerance.",
		postedAt: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
	},
	{
		question: "How do I start investing with a small amount of money?",
		answer: "Start with low-cost index funds or ETFs through apps like Vanguard or Fidelity. Many platforms now allow fractional shares. Focus on consistent contributions over time.",
		postedAt: Date.now() - 12 * 60 * 60 * 1000, // 12 hours ago
	},
];
export default function Hero() {
	const [questions, setQuestions] = useState(initialQuestions);
	const handleQuestionSubmit = (question: string, email?: string) => {
		const newQuestion = {
			question,
			answer: "Thank you for your question! Our financial advisors will answer it soon.",
			postedAt: Date.now(),
		};
		setQuestions([newQuestion, ...questions]);
	};
	return (
		<div className="min-h-screen z-0 relative">
			<div className="relative min-h-screen overflow-hidden pt-16">
				<div className="relative z-10 md:min-h-screen flex flex-col items-center justify-center px-4 py-4 md:py-20">
					<div className="text-center mb-12 md:space-y-4">
						<h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5 max-w-3xl">
							Ask Your Financial Questions
						</h1>
						<p className="text-muted-foreground mt-5">
							Get expert answers to your financial planning
							questions from our advisors
						</p>
					</div>

					<div className="w-full px-4">
						<QuestionInput onSubmit={handleQuestionSubmit} />
					</div>
				</div>
				<MarqueeBackground />
			</div>
			<div className="pointer-events-none w-full h-full absolute inset-0 z-[-1] mix-blend-color bg-white">
				{/* <Prism
					animationType="rotate"
					timeScale={0.5}
					height={3.5}
					baseWidth={5.5}
					scale={3.6}
					hueShift={0}
					colorFrequency={1}
					noise={0}
					glow={1}
				/> */}
				{/* <DarkVeil hueShift={190} /> */}
				{/* <LightRays
					raysOrigin="top-center"
					raysColor="#407BFF"
					raysSpeed={1.5}
					lightSpread={1}
					rayLength={1.2}
					followMouse={true}
					mouseInfluence={0.1}
					noiseAmount={0}
					distortion={0.05}
					className="custom-rays"
				/> */}
				{/* <PrismaticBurst
					animationType="rotate3d"
					intensity={2}
					speed={0.5}
					distort={1.0}
					paused={false}
					offset={{ x: 0, y: 0 }}
					hoverDampness={0.25}
					rayCount={24}
					mixBlendMode="multiply"
					colors={["#ff007a", "#4d3dff", "#ffffff"]}
				/> */}
				<Orb
					hoverIntensity={0.5}
					rotateOnHover={true}
					hue={0}
					forceHoverState={false}
				/>
			</div>
		</div>
	);
}
