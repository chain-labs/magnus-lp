"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import useMeasure from "react-use-measure";
import { ProgressiveBlur } from "./progressive-blur";

export type InfiniteSliderProps = {
	children: React.ReactNode;
	gap?: number;
	speed?: number;
	speedOnHover?: number;
	direction?: "horizontal" | "vertical";
	reverse?: boolean;
	className?: string;
	stopOnInteraction?: boolean;
	blurEdges?: boolean;
	blurWidth?: number;
};

export function InfiniteSlider({
	children,
	gap = 16,
	speed = 100,
	speedOnHover,
	direction = "horizontal",
	reverse = false,
	className,
	stopOnInteraction = false,
	blurEdges = false,
	blurWidth = 48,
}: InfiniteSliderProps) {
	const [currentSpeed, setCurrentSpeed] = useState(speed);
	const [ref, { width, height }] = useMeasure();
	const translation = useMotionValue(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [key, setKey] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	// Detect touch device on mount
	useEffect(() => {
		setIsTouchDevice(
			"ontouchstart" in window || navigator.maxTouchPoints > 0
		);
	}, []);

	useEffect(() => {
		// Don't animate when paused
		if (isPaused) {
			return;
		}

		let controls;
		const size = direction === "horizontal" ? width : height;
		const contentSize = size + gap;
		const from = reverse ? -contentSize / 2 : 0;
		const to = reverse ? 0 : -contentSize / 2;

		const distanceToTravel = Math.abs(to - from);
		const duration = distanceToTravel / currentSpeed;

		if (isTransitioning) {
			const remainingDistance = Math.abs(translation.get() - to);
			const transitionDuration = remainingDistance / currentSpeed;

			controls = animate(translation, [translation.get(), to], {
				ease: "linear",
				duration: transitionDuration,
				onComplete: () => {
					setIsTransitioning(false);
					setKey((prevKey) => prevKey + 1);
				},
			});
		} else {
			controls = animate(translation, [from, to], {
				ease: "linear",
				duration: duration,
				repeat: Infinity,
				repeatType: "loop",
				repeatDelay: 0,
				onRepeat: () => {
					translation.set(from);
				},
			});
		}

		return controls?.stop;
	}, [
		key,
		translation,
		currentSpeed,
		width,
		height,
		gap,
		isTransitioning,
		direction,
		reverse,
		isPaused,
	]);

	// Handle hover for desktop (non-touch devices)
	const handleHoverStart = useCallback(() => {
		if (stopOnInteraction && !isTouchDevice) {
			setIsPaused(true);
		} else if (speedOnHover) {
			setIsTransitioning(true);
			setCurrentSpeed(speedOnHover);
		}
	}, [stopOnInteraction, isTouchDevice, speedOnHover]);

	const handleHoverEnd = useCallback(() => {
		if (stopOnInteraction && !isTouchDevice) {
			setIsTransitioning(true);
			setIsPaused(false);
		} else if (speedOnHover) {
			setIsTransitioning(true);
			setCurrentSpeed(speed);
		}
	}, [stopOnInteraction, isTouchDevice, speedOnHover, speed]);

	// Handle tap/click for mobile (touch devices)
	const handleClick = useCallback(() => {
		if (stopOnInteraction && isTouchDevice) {
			setIsPaused((prev) => {
				if (prev) {
					// Resuming - enable smooth transition
					setIsTransitioning(true);
				}
				return !prev;
			});
		}
	}, [stopOnInteraction, isTouchDevice]);

	const isHorizontal = direction === "horizontal";

	return (
		<div className={cn("overflow-hidden relative", className)}>
			{/* Left/Top blur gradient */}
			{blurEdges && (
				<div
					className={cn(
						"absolute z-10 pointer-events-none",
						isHorizontal
							? "left-0 top-0 h-full"
							: "top-0 left-0 w-full"
					)}
					style={{
						[isHorizontal ? "width" : "height"]: `${blurWidth}px`,
						background: isHorizontal
							? "linear-gradient(to right, #000728, #00072800, transparent)"
							: "linear-gradient(to bottom, #000728, #00072800, transparent)",
					}}
				/>
			)}

			<motion.div
				className="flex w-max"
				style={{
					...(direction === "horizontal"
						? { x: translation }
						: { y: translation }),
					gap: `${gap}px`,
					flexDirection:
						direction === "horizontal" ? "row" : "column",
				}}
				ref={ref}
				onHoverStart={handleHoverStart}
				onHoverEnd={handleHoverEnd}
				onClick={handleClick}
			>
				{children}
				{children}
			</motion.div>

			{/* Right/Bottom blur gradient */}
			{blurEdges && (
				<div
					className={cn(
						"absolute z-10 pointer-events-none",
						isHorizontal
							? "right-0 top-0 h-full"
							: "bottom-0 left-0 w-full"
					)}
					style={{
						[isHorizontal ? "width" : "height"]: `${blurWidth}px`,
						background: isHorizontal
							? "linear-gradient(to left, #000728, #00072800, transparent)"
							: "linear-gradient(to top, #000728, #00072800, transparent)",
					}}
				/>
			)}

			<ProgressiveBlur
				className={`pointer-events-none absolute top-0 left-0 h-full w-[${blurWidth}px]`}
				direction="left"
				blurIntensity={1}
			/>
			<ProgressiveBlur
				className={`pointer-events-none absolute top-0 right-0 h-full w-[${blurWidth}px]`}
				direction="right"
				blurIntensity={1}
			/>
		</div>
	);
}
