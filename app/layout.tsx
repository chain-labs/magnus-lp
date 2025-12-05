import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helvetica = localFont({
	src: "../public/assets/fonts/Helvetica.ttf",
	variable: "--font-helvetica",
});

export const metadata: Metadata = {
	title: {
		default: "Magnus Hathaway | Expert Stock Research & Investment Advice",
		template: "%s | Magnus Hathaway",
	},
	description:
		"Unlock expert stock research, curated calls, and premium playbooks. Magnus Hathaway provides clear, actionable investment advice and detailed analysis for overnight, intraday, and positional strategies.",
	keywords: [
		"stock research",
		"investment advice",
		"stock market",
		"equity research",
		"trading strategies",
		"Magnus Hathaway",
		"financial analysis",
		"stock recommendations",
	],
	authors: [{ name: "Magnus Hathaway" }],
	creator: "Magnus Hathaway",
	publisher: "Magnus Hathaway",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://www.magnushathaway.com",
		title: "Magnus Hathaway | Expert Stock Research & Investment Advice",
		description:
			"Unlock expert stock research, curated calls, and premium playbooks. Magnus Hathaway provides clear, actionable investment advice.",
		siteName: "Magnus Hathaway",
		images: [
			{
				url: "/assets/logo/logo.png",
				width: 800,
				height: 600,
				alt: "Magnus Hathaway Logo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Magnus Hathaway | Expert Stock Research & Investment Advice",
		description:
			"Unlock expert stock research, curated calls, and premium playbooks. Magnus Hathaway provides clear, actionable investment advice.",
		images: ["/assets/logo/logo.png"],
	},
	icons: {
		icon: "/assets/logo/logo.png",
		apple: "/assets/logo/logo.png",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${helvetica.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
