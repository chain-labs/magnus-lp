"use client";

import Prism from "@/components/manually-addded/prism";
import DarkVeil from "@/components/sections/hero/dark-veil";
import LightRays from "@/components/sections/hero/light-rays";
import MarqueeBackground from "@/components/sections/hero/marquee-background";
import Orb from "@/components/sections/hero/orb";
import PrismaticBurst from "@/components/sections/hero/prismatic-burst";
import QuestionInput from "@/components/sections/hero/question-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Bgs = [
	<div className="absolute inset-0 w-full h-full flex justify-center items-center opacity-15">
		<img
			src="/assets/branding/logo.svg"
			alt="logo"
			className="h-[95vh] mb-42 aspect-square animate-"
			style={{
				animationDuration: "90s",
			}}
		/>
	</div>,
	<></>,
	<picture className="w-full h-full inset-0">
		<source
			media="(min-width: 768px)"
			srcSet="/assets/branding/Horizontal.png"
		/>
		<source
			media="(max-width: 767px)"
			srcSet="/assets/branding/Vertical mobile.png"
		/>
		<img
			src="/assets/branding/Horizontal.png"
			alt="Background"
			className="w-full h-full inset-0 object-cover transition-all duration-300 ease-in-out"
			style={{
				width: "100%",
				height: "auto",
				objectFit: "cover",
			}}
		/>
	</picture>,
	<Prism
		animationType="rotate"
		timeScale={0.5}
		height={3.5}
		baseWidth={5.5}
		scale={3.6}
		hueShift={0}
		colorFrequency={1}
		noise={0}
		glow={1}
	/>,
	<DarkVeil hueShift={190} />,
	<LightRays
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
	/>,
	<PrismaticBurst
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
	/>,
	<div className="absolute inset-0 w-full h-full opacity-30">
		<Orb
			hoverIntensity={0.5}
			rotateOnHover={true}
			hue={0}
			forceHoverState={false}
		/>
	</div>,
];
export default function Hero() {
	const handleQuestionSubmit = async (question: string, email?: string) => {
		const response = await fetch("/api/questions/submit", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				questionText: question,
				userName: "Test User",
				userEmail: email || undefined,
			}),
		});
		console.log("response", response);
	};
	const [switcher, setSwitcher] = useState(0);
	function handleSwitch() {
		setSwitcher((prev) => (prev + 1) % Bgs.length);
	}
	return (
		<div className="min-h-screen z-0 relative">
			<div className="relative min-h-screen flex flex-col justify-between items-center">
				<div className="text-center flex justify-start items-center w-full font-medium text-[24px] mt-4 px-6 absolute text-[#1a378d]">
					<img
						src="/assets/branding/logo.svg"
						alt="logo"
						className="w-[80px] aspect-square"
					/>
					Magnus Hathaway
				</div>
				<div className="relative z-10 flex flex-col items-center justify-center px-4">
					<div className="text-center mb-12 md:space-y-4">
						{/* <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter max-w-3xl mt-3 text-[#1a378d]">
							Ask Your Stock Market Queries
						</h1> */}
						{/* <p className="text-muted-foreground mt-5">
							Get expert answers to your financial planning
							questions from our advisors
						</p> */}
					</div>

					<div className="w-full px-4 mt-[120px] absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 min-w-[50vw]">
						<QuestionInput onSubmit={handleQuestionSubmit} />
					</div>
				</div>
				<MarqueeBackground />
			</div>
			<div className="w-full h-full absolute inset-0">
				<div className="pointer-events-none w-full h-full absolute inset-0 z-[-1]">
					{Bgs[switcher]}
				</div>
				{/* <Button
					variant="secondary"
					className="abolute m-4 cursor-pointer"
					onClick={handleSwitch}
				>
					Switch Background
				</Button> */}
			</div>
		</div>
	);
}
