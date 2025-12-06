import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";
import type { FooterData } from "@/sanity/lib/types";

// Static data - commented out in favor of Sanity CMS
// const footerData = { ... };
// 	main: {
// 		company: {
// 			logoSrc: "/assets/logo/logo.png",
// 			title: "Magnus Hathaway",
// 		},
// 		socialLinks: [
// 			{
// 				icons: (
// 					<FaFacebook className="text-[24px] leading-[38.4px] text-[#999ca9]" />
// 				),
// 				href: "https://www.facebook.com/magnushathaway",
// 			},
// 			{
// 				icons: (
// 					<FaInstagram className="text-[24px] leading-[38.4px] text-[#999ca9]" />
// 				),
// 				href: "https://www.instagram.com/magnushathaway",
// 			},
// 			{
// 				icons: (
// 					<FaXTwitter className="text-[24px] leading-[38.4px] text-[#999ca9]" />
// 				),
// 				href: "https://www.twitter.com/magnushathaway",
// 			},
// 			{
// 				icons: (
// 					<FaLinkedin className="text-[24px] leading-[38.4px] text-[#999ca9]" />
// 				),
// 				href: "https://www.linkedin.com/in/magnushathaway",
// 			},
// 			{
// 				icons: (
// 					<FaYoutube className="text-[24px] leading-[38.4px] text-[#999ca9]" />
// 				),
// 				href: "https://www.youtube.com/magnushathaway",
// 			},
// 		],
// 		disclosuresLinks: [
// 			{
// 				label: "Investor Charter (Annexure A)",
// 				link: "https://www.magnushathaway.com/investor-charter",
// 			},
// 			{
// 				label: "Investor Complaints (Annexure B)",
// 				link: "https://www.magnushathaway.com/investor-complaints",
// 			},
// 			{
// 				label: "Grievance Redressal Process",
// 				link: "https://www.magnushathaway.com/grievance-redressal-process",
// 			},
// 			{
// 				label: "Disclaimer",
// 				link: "https://www.magnushathaway.com/disclaimer",
// 			},
// 			{
// 				label: "Disclosures",
// 				link: "https://www.magnushathaway.com/disclosures",
// 			},
// 			{
// 				label: "Escalation Matrix",
// 				link: "https://www.magnushathaway.com/escalation-matrix",
// 			},
// 			{
// 				label: "Audit Report",
// 				link: "https://www.magnushathaway.com/audit-report",
// 			},
// 			{
// 				label: "PMLA Policy",
// 				link: "https://www.magnushathaway.com/pmla-policy",
// 			},
// 		],
// 		disclosureStatement:
// 			"Past performance is not indicative of future results. Investing in equities involves risk. We provide research, not guarantees.",
// 		SEBIRegistrationNumber: "INH000016588",
// 	},
// 	officeDetails: {
// 		researchAnalyst: {
// 			name: "Alireza Azar",
// 			SEBIRegistrationNumber: "INH000016588",
// 			registeredOfficeAddress:
// 				"No. 15/A904, Varthur Road, C V Raman Nagar, Nagavara Palya, Bangalore, Karnataka - 560093",
// 		},
// 		SEBIOffice: {
// 			headOfficeAddress:
// 				"Plot No. C4-A, ‘G’ Block Bandra-Kurla Complex, Bandra (East), Mumbai, Maharashtra - 400051",
// 			localOfficeAddress:
// 				"7th Floor, 756-L, Anna Salai, Chennai - 600002, Tamil Nadu",
// 		},
// 		grievanceOfficer: {
// 			name: "Abdul Ahad Khan",
// 			telephoneNumber: "+91 9636336788",
// 			emailID: "ahad@magnushathaway.com",
// 		},
// 		complianceOfficer: {
// 			name: "Alireza Azar",
// 			telephoneNumber: "+91 99834 51155",
// 			emailID: "ali_azar@live.com",
// 		},
// 	},
// 	disclosures: [
// 		"Investment in securities market are subject to market risks. Read all the related documents carefully before investing.",
// 		"Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.",
// 	],
// 	footer: {
// 		rights: "© 2024 Magnus Hathaway. All rights reserved.",
// 		links: [
// 			{
// 				label: "Privacy Policy",
// 				link: "https://www.magnushathaway.com/privacy-policy",
// 			},
// 			{
// 				label: "Terms of Service",
// 				link: "https://www.magnushathaway.com/terms-of-service",
// 			},
// 			{
// 				label: "Cookie settings",
// 				link: "https://www.magnushathaway.com/cookie-settings",
// 			},
// 		],
// 	},
// };

// Default fallback data
const defaultFooterData: FooterData = {
	company: {
		logoSrc: "/assets/logo/logo.png",
		title: "Magnus Hathaway",
	},
	socialLinks: [
		{
			platform: "Facebook",
			href: "https://www.facebook.com/magnushathaway",
		},
		{
			platform: "Instagram",
			href: "https://www.instagram.com/magnushathaway",
		},
		{
			platform: "Twitter",
			href: "https://www.twitter.com/magnushathaway",
		},
		{
			platform: "LinkedIn",
			href: "https://www.linkedin.com/in/magnushathaway",
		},
		{
			platform: "YouTube",
			href: "https://www.youtube.com/magnushathaway",
		},
	],
	disclosuresLinks: [
		{
			label: "Investor Charter (Annexure A)",
			link: "https://www.magnushathaway.com/investor-charter",
		},
		{
			label: "Investor Complaints (Annexure B)",
			link: "https://www.magnushathaway.com/investor-complaints",
		},
		{
			label: "Grievance Redressal Process",
			link: "https://www.magnushathaway.com/grievance-redressal-process",
		},
		{
			label: "Disclaimer",
			link: "https://www.magnushathaway.com/disclaimer",
		},
		{
			label: "Disclosures",
			link: "https://www.magnushathaway.com/disclosures",
		},
		{
			label: "Escalation Matrix",
			link: "https://www.magnushathaway.com/escalation-matrix",
		},
		{
			label: "Audit Report",
			link: "https://www.magnushathaway.com/audit-report",
		},
		{
			label: "PMLA Policy",
			link: "https://www.magnushathaway.com/pmla-policy",
		},
	],
	disclosureStatement:
		"Past performance is not indicative of future results. Investing in equities involves risk. We provide research, not guarantees.",
	SEBIRegistrationNumber: "INH000016588",
	officeDetails: {
		researchAnalyst: {
			name: "Alireza Azar",
			SEBIRegistrationNumber: "INH000016588",
			registeredOfficeAddress:
				"No. 15/A904, Varthur Road, C V Raman Nagar, Nagavara Palya, Bangalore, Karnataka - 560093",
		},
		SEBIOffice: {
			headOfficeAddress:
				"Plot No. C4-A, 'G' Block Bandra-Kurla Complex, Bandra (East), Mumbai, Maharashtra - 400051",
			localOfficeAddress:
				"7th Floor, 756-L, Anna Salai, Chennai - 600002, Tamil Nadu",
		},
		grievanceOfficer: {
			name: "Abdul Ahad Khan",
			telephoneNumber: "+91 9636336788",
			emailID: "ahad@magnushathaway.com",
		},
		complianceOfficer: {
			name: "Alireza Azar",
			telephoneNumber: "+91 99834 51155",
			emailID: "ali_azar@live.com",
		},
	},
	disclosures: [
		"Investment in securities market are subject to market risks. Read all the related documents carefully before investing.",
		"Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.",
	],
	footerBottom: {
		rights: "© 2024 Magnus Hathaway. All rights reserved.",
		links: [
			{
				label: "Privacy Policy",
				link: "https://www.magnushathaway.com/privacy-policy",
			},
			{
				label: "Terms of Service",
				link: "https://www.magnushathaway.com/terms-of-service",
			},
			{
				label: "Cookie settings",
				link: "https://www.magnushathaway.com/cookie-settings",
			},
		],
	},
};

interface FooterProps {
	data?: { data: FooterData | null };
}

export default function Footer({ data }: FooterProps) {
	const footerData = data?.data || defaultFooterData;
	return (
		<footer className="w-full py-[80px] px-[20px]">
			{/* Top Section - Dark Blue Background */}
			<div className="w-full bg-[#000728] max-w-7xl mx-auto py-[40px] md:py-[32px] px-[20px] md:px-[108px] rounded-[24px] text-white">
				<div className="w-full mx-auto flex flex-col gap-[20px] md:gap-[24px]">
					{/* Header with Logo, Company Name, and Social Icons */}
					<div className="flex flex-col md:flex-row justify-between items-center gap-[24px] md:mb-6">
						<div className="flex items-center gap-[18px]">
							<Image
								src={footerData.company.logoSrc || ""}
								alt={footerData.company.title}
								width={57}
								height={57}
								className="rounded-full w-[45.15303039550781px] md:w-[57px] h-[45.15303039550781px] md:h-[57px] object-cover"
							/>
							<h1 className="text-[22.64px] md:text-[28.62px] leading-[36.22px] md:leading-[45.79px] font-normal text-white">
								{footerData.company.title}
							</h1>
						</div>
						<div className="flex gap-4">
							{footerData.socialLinks.map((social, index) => (
								<a
									key={index}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-white text-xl hover:opacity-80 transition-opacity"
								>
									{social.platform === "Facebook" && (
										<FaFacebook />
									)}
									{social.platform === "Instagram" && (
										<FaInstagram />
									)}
									{social.platform === "Twitter" && (
										<FaXTwitter />
									)}
									{social.platform === "LinkedIn" && (
										<FaLinkedin />
									)}
								</a>
							))}
						</div>
					</div>

					{/* Navigation Links - Two Rows */}
					<div className="flex flex-wrap justify-center items-center gap-[16px] md:mb-6 border-y border-[#FFFFFF4D] py-[16px] md:p-[32px]">
						{footerData.disclosuresLinks.map((link, index) => (
							<a
								key={index}
								href={link.link}
								className="text-white underline hover:opacity-80 transition-opacity text-[14px]"
							>
								{link.label}
							</a>
						))}
					</div>

					{/* Disclaimer Statement - Centered */}
					<div className="text-center text-white text-[16px] leading-[24px] opacity-50">
						{footerData.disclosureStatement} <br />
						SEBI Registration No:{" "}
						{footerData.SEBIRegistrationNumber}
					</div>
				</div>
			</div>

			{/* Middle Section - White Background */}
			<div className="w-full max-w-[1059px] mx-auto">
				<div className="w-full mx-auto flex flex-col gap-[32px]">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-y-[32px] md:gap-[32px] md:mb-[64px] border-b border-[#040D2633] py-[32px]">
						{/* Left Column */}
						<div className="flex flex-col gap-[32px] col-span-2 text-center md:text-left">
							{/* Research Analyst Information */}
							<div className="flex flex-col gap-[18px]">
								<h2 className="font-bold text-[16px] leading-[24px] text-[#040D26] opacity-80">
									Research Analyst Information
								</h2>
								<div className="text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#040D26] opacity-60">
									<p>
										Name:{" "}
										{
											footerData.officeDetails
												.researchAnalyst.name
										}
									</p>
									<p>
										SEBI Registration Number:{" "}
										{
											footerData.officeDetails
												.researchAnalyst
												.SEBIRegistrationNumber
										}
									</p>
									<p>
										Registered Office Address:{" "}
										{
											footerData.officeDetails
												.researchAnalyst
												.registeredOfficeAddress
										}
									</p>
								</div>
							</div>

							{/* SEBI Office Details */}
							<div className="flex flex-col gap-[18px]">
								<h2 className="font-bold text-[16px] leading-[24px] text-[#040D26] opacity-80">
									SEBI Office Details
								</h2>
								<div className="text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#040D26] opacity-60">
									<p>
										Head Office Address:{" "}
										{
											footerData.officeDetails.SEBIOffice
												.headOfficeAddress
										}
									</p>
									<p>
										Local Office Address:{" "}
										{
											footerData.officeDetails.SEBIOffice
												.localOfficeAddress
										}
									</p>
								</div>
							</div>
						</div>

						{/* Right Column */}
						<div className="flex flex-col justify-between gap-[32px] col-span-1 text-center md:text-left">
							{/* Grievance Officer Details */}
							<div className="flex flex-col gap-[18px]">
								<h2 className="font-bold text-[16px] leading-[24px] text-[#040D26] opacity-80">
									Grievance Officer Details
								</h2>
								<div className="text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#040D26] opacity-60">
									<p>
										Name:{" "}
										{
											footerData.officeDetails
												.grievanceOfficer.name
										}
									</p>
									<p>
										Telephone Number:{" "}
										<a
											href={`tel:${footerData.officeDetails.grievanceOfficer.telephoneNumber}`}
											className="underline"
										>
											{
												footerData.officeDetails
													.grievanceOfficer
													.telephoneNumber
											}
										</a>
									</p>
									<p>
										Email ID:{" "}
										<a
											href={`mailto:${footerData.officeDetails.grievanceOfficer.emailID}`}
											className="underline"
										>
											{
												footerData.officeDetails
													.grievanceOfficer.emailID
											}
										</a>
									</p>
								</div>
							</div>

							{/* Principal / Compliance Officer Details */}
							<div className="flex flex-col gap-[18px]">
								<h2 className="font-bold text-[16px] leading-[24px] text-[#040D26] opacity-80">
									Principal / Compliance Officer Details
								</h2>
								<div className="text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#040D26] opacity-60">
									<p>
										Name:{" "}
										{
											footerData.officeDetails
												.complianceOfficer.name
										}
									</p>
									<p>
										Telephone Number:{" "}
										<a
											href={`tel:${footerData.officeDetails.complianceOfficer.telephoneNumber}`}
											className="underline"
										>
											{
												footerData.officeDetails
													.complianceOfficer
													.telephoneNumber
											}
										</a>
									</p>
									<p>
										Email ID:{" "}
										<a
											href={`mailto:${footerData.officeDetails.complianceOfficer.emailID}`}
											className="underline"
										>
											{
												footerData.officeDetails
													.complianceOfficer.emailID
											}
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Additional Disclaimers - Numbered List */}
					<div className="mb-8">
						{footerData.disclosures.map((disclosure, index) => (
							<p
								key={index}
								className="text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-[#040D26] opacity-60 text-center"
							>
								{index + 1}. {disclosure}
							</p>
						))}
					</div>
				</div>
			</div>

			{/* Bottom Footer - White Background */}
			<div className="w-full max-w-[1059px] mx-auto pt-[32px] border-t border-[#040D2633]">
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#040D26] opacity-70 text-[16px] leading-[24px]">
					<p className="text-[14px] md:text-[16px] leading-[20px] md:leading-[24px]">
						{footerData.footerBottom.rights}
					</p>
					<div className="flex justify-center items-center gap-[16px] md:gap-[24px] text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-nowrap">
						{footerData.footerBottom.links.map((link, index) => (
							<a
								key={index}
								href={link.link}
								className="text-sm hover:underline"
							>
								{link.label}
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
