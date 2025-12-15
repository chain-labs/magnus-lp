"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import type { FAQData } from "@/sanity/lib/types";

// Static data - commented out in favor of Sanity CMS
// const faqData = [
// 	{
// 		id: "item-1",
// 		question: "What services will I receive?",
// 		answer: "Our platform provides stock recommendations aimed at medium to long-term growth, typically held for 6 - 12 months. In addition, you'll receive high-conviction swing trading calls occasionally, with a shorter holding period of 7 - 30 days. This gives you a mix of stable growth and quick opportunities. You will also be informed about the correct time to sell your investments and book profits.",
// 	},
// 	{
// 		id: "item-2",
// 		question: "How much capital is required to begin?",
// 		answer: "You can start with as little as ₹50,000, and gradually increase your investment over time. However, we recommend starting with ₹2,00,000 or more to effectively build a diversified portfolio of high-quality stocks through our recommendations.",
// 	},
// 	{
// 		id: "item-3",
// 		question:
// 			"Other than stock recommendations, is there anything else I will receive?",
// 		answer: "Absolutely! In addition to stock recommendations, you'll gain access to timely market updates, insights into trending sectors, and our in-house research reports. You'll also be invited to exclusive webinars, where we explain the reasoning behind our stock picks, when to buy or sell, and highlight key sectors to watch. These resources will give you a deeper understanding of market trends and help you make more informed investment decisions.",
// 	},
// 	{
// 		id: "item-4",
// 		question: "What is your investment philosophy?",
// 		answer: "Our investment philosophy is centered around identifying high-quality, high-growth stocks with strong sectoral tailwinds, and recommending them at the most opportune time, giving you the advantage of early entry. We focus on fundamentally sound companies, potential turnarounds, and special situations that have the potential to deliver significant returns. Our approach is designed to provide you with the best possible chance to grow your wealth while minimizing risks, through well-researched and timely stock picks.",
// 	},
// 	{
// 		id: "item-5",
// 		question: "How will I receive the information?",
// 		answer: "All information will be delivered directly to your phone via WhatsApp messages under our branding. Stock recommendations will come in a standardized format, allowing you to easily approve the transaction. You'll be automatically redirected to your brokerage app (e.g., Zerodha, Angel One) to place the trade seamlessly. Additionally, you'll receive regular updates, sector insights, and educational content through the same WhatsApp chat, ensuring everything is conveniently in one place.",
// 	},
// 	{
// 		id: "item-6",
// 		question: "How will I know when to renew my plan?",
// 		answer: "You will receive an email notification before your plan expires so that you can renew. You can also opt for auto renewal if you take a recurring subscription payment.",
// 	},
// 	{
// 		id: "item-7",
// 		question:
// 			"How can I contact the Research Analyst if I face any issues?",
// 		answer: "Once you have purchased a plan, please log in to the investor portal. On the bottom-right side, you will find a chat icon. You can leave your contact information, and our customer care team will get back to you within 24-48 hours to resolve the issue.",
// 	},
// 	{
// 		id: "item-8",
// 		question:
// 			"Would I lose my current plan if I upgrade to a longer term plan?",
// 		answer: "No worries! Purchase the longer term plan now, and your remaining subscription time will be added at the end, so you don't waste a single rupee.",
// 	},
// 	{
// 		id: "item-9",
// 		question: "How are the stock weightages determined?",
// 		answer: "Weightages are carefully allocated to ensure diversification, stability, and growth potential. Adjustments may be made periodically to reflect our latest views on individual stocks and their role in the overall portfolio",
// 	},
// 	{
// 		id: "item-10",
// 		question: "Will I get support if I have questions?",
// 		answer: "If you have any technical queries with regards to broker connection or other technical issues, reach out to our technical team at magnushathawayinvestments@gmail.com – they will schedule a discussion with you.",
// 	},
// ];

// Default fallback data
const defaultFaqData: FAQData = {
	title: "FAQs",
	description:
		"Got questions about investing? We're here to help! Explore our FAQ section for answers to common queries and tips to make informed decisions.",
	contactButtonText: "Contact",
	items: [
		{
			question: "What services will I receive?",
			answer: "Our platform provides stock recommendations aimed at medium to long-term growth, typically held for 6 - 12 months. In addition, you'll receive high-conviction swing trading calls occasionally, with a shorter holding period of 7 - 30 days. This gives you a mix of stable growth and quick opportunities. You will also be informed about the correct time to sell your investments and book profits.",
		},
		{
			question: "How much capital is required to begin?",
			answer: "You can start with as little as ₹50,000, and gradually increase your investment over time. However, we recommend starting with ₹2,00,000 or more to effectively build a diversified portfolio of high-quality stocks through our recommendations.",
		},
		{
			question:
				"Other than stock recommendations, is there anything else I will receive?",
			answer: "Absolutely! In addition to stock recommendations, you'll gain access to timely market updates, insights into trending sectors, and our in-house research reports. You'll also be invited to exclusive webinars, where we explain the reasoning behind our stock picks, when to buy or sell, and highlight key sectors to watch. These resources will give you a deeper understanding of market trends and help you make more informed investment decisions.",
		},
		{
			question: "What is your investment philosophy?",
			answer: "Our investment philosophy is centered around identifying high-quality, high-growth stocks with strong sectoral tailwinds, and recommending them at the most opportune time, giving you the advantage of early entry. We focus on fundamentally sound companies, potential turnarounds, and special situations that have the potential to deliver significant returns. Our approach is designed to provide you with the best possible chance to grow your wealth while minimizing risks, through well-researched and timely stock picks.",
		},
		{
			question: "How will I receive the information?",
			answer: "All information will be delivered directly to your phone via WhatsApp messages under our branding. Stock recommendations will come in a standardized format, allowing you to easily approve the transaction. You'll be automatically redirected to your brokerage app (e.g., Zerodha, Angel One) to place the trade seamlessly. Additionally, you'll receive regular updates, sector insights, and educational content through the same WhatsApp chat, ensuring everything is conveniently in one place.",
		},
		{
			question: "How will I know when to renew my plan?",
			answer: "You will receive an email notification before your plan expires so that you can renew. You can also opt for auto renewal if you take a recurring subscription payment.",
		},
		{
			question:
				"How can I contact the Research Analyst if I face any issues?",
			answer: "Once you have purchased a plan, please log in to the investor portal. On the bottom-right side, you will find a chat icon. You can leave your contact information, and our customer care team will get back to you within 24-48 hours to resolve the issue.",
		},
		{
			question:
				"Would I lose my current plan if I upgrade to a longer term plan?",
			answer: "No worries! Purchase the longer term plan now, and your remaining subscription time will be added at the end, so you don't waste a single rupee.",
		},
		{
			question: "How are the stock weightages determined?",
			answer: "Weightages are carefully allocated to ensure diversification, stability, and growth potential. Adjustments may be made periodically to reflect our latest views on individual stocks and their role in the overall portfolio",
		},
		{
			question: "Will I get support if I have questions?",
			answer: "If you have any technical queries with regards to broker connection or other technical issues, reach out to our technical team at magnushathawayinvestments@gmail.com – they will schedule a discussion with you.",
		},
	],
};

interface FAQProps {
	data?: { data: FAQData | null };
}

export default function FAQ({ data }: FAQProps) {
	const faqData = data?.data || defaultFaqData;
	return (
		<section id="faq" className="px-[20px] md:px-[64px] py-[80px] md:py-[112px]">
			<div className="grid gap-y-[48px] md:gap-[80px] grid-cols-1 md:grid-cols-3 w-full max-w-7xl mx-auto">
				<div className="flex flex-col gap-[40px] md:gap-[24px] w-full col-span-1">
					<h1 className="text-[40px] md:text-[48px] leading-[48px] md:leading-[64px]">
						{faqData.title}
					</h1>
					<p className="text-[16px] leading-[24px]">
						{faqData.description}
					</p>
					<Link href="#book-a-call">
						<button className="px-[24px] py-[12px] bg-[#00177C] text-white rounded-[8px] w-fit font-bold text-[16px] leading-[24px] min-w-[160px] cursor-pointer">
							{" "}
							{faqData.contactButtonText}
						</button>
					</Link>
				</div>
				<div className="col-span-2 border-t border-[#040D261F]">
					<Accordion type="single" collapsible>
						{faqData.items.map((item, index) => (
							<AccordionItem
								key={`faq-item-${index}`}
								value={`item-${index}`}
							>
								<AccordionTrigger className="cursor-pointer text-[16px] leading-[24px] font-bold hover:no-underline text-[#030919] py-[20px] text-left">
									{item.question}
								</AccordionTrigger>
								<AccordionContent>
									<p className="text-[#030919] text-[16px] leading-[24px] opacity-60 pb-[24px]">
										{item.answer}
									</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</section>
	);
}
