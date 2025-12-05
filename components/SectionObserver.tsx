"use client";

import { useEffect, useRef } from "react";
import { useHeaderTheme } from "./HeaderThemeContext";

export default function SectionObserver({
	children,
	theme,
	className,
}: {
	children: React.ReactNode;
	theme: "light" | "dark";
	className?: string;
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

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
