import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Clarity from "@/components/Clarity";
import { SanityLive } from "@/sanity/lib/live";
import Script from "next/script";

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
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				></link>

				<Script
			id="gtm-tags"
			strategy="afterInteractive"
			dangerouslySetInnerHTML={{
				__html: `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PL6D4ZPL');
        `,
			}}
		/>
			</head>
			<body className={'antialiased'}>
				<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PL6D4ZPL"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
				<Clarity />
				<SanityLive />
				{children}
			</body>
		</html>
	);
}
