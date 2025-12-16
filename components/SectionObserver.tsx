"use client";

import { useEffect, useRef } from "react";
import { useHeaderTheme } from "./HeaderThemeContext";

declare global {
	interface Window {
		clarity: (event: string, action: string, params?: Record<string, unknown>) => void;
	}
}

export default function SectionObserver({
	children,
	theme,
	className,
	sectionName,
}: {
	children: React.ReactNode;
	theme: "light" | "dark";
	className?: string;
	sectionName?: string;
}) {
	const { setTheme } = useHeaderTheme();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTheme(theme);
					}
				});
			},
			{
				// Trigger when the element is near the top of the viewport (where the header is)
				// The header is roughly 80px tall and 24px from top.
				// We want to detect what's behind it.
				// rootMargin: top right bottom left
				// Negative values shrink the root's bounding box.
				// We want a thin strip near the top.
				rootMargin: "-50px 0px -90% 0px",
				threshold: 0,
			}
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, [theme, setTheme]);

	useEffect(() => {
		if (!sectionName) return;

		let startTime: number | null = null;

		const timeObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						startTime = Date.now();
					} else {
						if (startTime) {
							const duration = Date.now() - startTime;
							if (window.clarity) {
								window.clarity("event", "section_view", {
									section: sectionName,
									duration: duration,
								});
							}
							startTime = null;
						}
					}
				});
			},
			{ threshold: 0.5 }
		);

		if (ref.current) {
			timeObserver.observe(ref.current);
		}

		return () => {
			if (ref.current) {
				timeObserver.unobserve(ref.current);
			}
		};
	}, [sectionName]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
