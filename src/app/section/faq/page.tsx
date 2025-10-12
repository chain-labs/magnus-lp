"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const faqItems = [
	{
		question: "What services will I receive?",
		answer: "Upon subscribing, you will receive real-time stock recommendations for buying and selling, messages for partial or full profit booking, comprehensive research reports for every recommendation, regular portfolio updates, dedicated customer support via email, and exclusive access to quarterly live webinars to address your queries.",
	},
	{
		question: "How much capital is required to begin?",
		answer: "There is no strict minimum capital requirement. Our recommendations are designed to be accessible to a wide range of investors. You can start with an amount you are comfortable with, although a larger capital base allows for better diversification.",
	},
	{
		question:
			"Other than stock recommendations, is there anything else I will receive?",
		answer: "Yes, our service is comprehensive. Beyond stock picks, you get detailed research reports justifying each recommendation, regular performance updates on your portfolio, proactive support through email, and invitations to quarterly live Q&A webinars with our research analysts.",
	},
	{
		question: "What is your investment philosophy?",
		answer: "Our investment philosophy is centered on long-term value creation. We focus on identifying fundamentally strong companies with high growth potential, durable competitive advantages, and competent management, which we believe are key to sustainable wealth creation.",
	},
	{
		question: "How will I receive the information?",
		answer: "All our communications, including buy/sell alerts, research reports, and portfolio updates, are delivered directly to you via email and through notifications on our partner mobile application, ensuring you never miss a critical update.",
	},
	{
		question: "How will I know when to renew my plan?",
		answer: "We will notify you with renewal reminders via email and app notifications well in advance of your subscription's expiry date, ensuring a seamless and uninterrupted continuation of our services.",
	},
	{
		question:
			"How can I contact the Research Analyst if I face any issues?",
		answer: "For any support or issues, you can reach our customer service team via email. For specific investment-related queries, you can interact directly with our research analysts during our exclusive quarterly live webinars.",
	},
	{
		question:
			"Would I lose my current plan if I upgrade to a longer term plan?",
		answer: "No, you won't lose any value. When you choose to upgrade, the remaining monetary value of your current plan will be adjusted on a pro-rata basis against the price of the new, longer-duration plan.",
	},
	{
		question: "How are the stock weightages determined?",
		answer: "Stock weightages are meticulously determined based on several factors, including our conviction in the investment thesis, the stock's risk-reward profile, its potential impact on portfolio diversification, and overall market conditions.",
	},
	{
		question: "Will I get support if I have questions?",
		answer: "Absolutely. We pride ourselves on providing robust support. You can email our support team with any questions, and for more in-depth discussions, our quarterly webinars provide a direct line to our research analysts.",
	},
];

export default function FAQ() {
	return (
		<section className="py-16 md:py-24">
			<div className="mx-auto max-w-[1200px] px-4 md:px-6">
				<div className="mx-auto max-w-xl text-center">
					<h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
						Frequently Asked Questions
					</h2>
					<p className="text-muted-foreground mt-4 text-balance">
						Discover quick and comprehensive answers to common
						questions about our platform, services, and features.
					</p>
				</div>

				<div className="mx-auto mt-12 w-full">
					<div className="flex flex-col lg:flex-row gap-4">
						<Accordion
							type="single"
							collapsible
							className="bg-card shadow-md w-full rounded-2xl border px-8 py-3"
						>
							{faqItems
								.slice(0, faqItems.length / 2)
								.map((item) => (
									<AccordionItem
										key={item.question}
										value={item.answer}
										className="border-dashed"
									>
										<AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline">
											{item.question}
										</AccordionTrigger>
										<AccordionContent>
											<p className="text-[14px] leading-[18px]">
												{item.answer}
											</p>
										</AccordionContent>
									</AccordionItem>
								))}
						</Accordion>
						<Accordion
							type="single"
							collapsible
							className="bg-card shadow-md w-full rounded-2xl border px-8 py-3"
						>
							{faqItems
								.slice(faqItems.length / 2, faqItems.length)
								.map((item) => (
									<AccordionItem
										key={item.question}
										value={item.answer}
										className="border-dashed"
									>
										<AccordionTrigger className="cursor-pointer text-base font-medium hover:no-underline">
											{item.question}
										</AccordionTrigger>
										<AccordionContent>
											<p className="text-[14px] leading-[18px]">
												{item.answer}
											</p>
										</AccordionContent>
									</AccordionItem>
								))}
						</Accordion>
					</div>
					<p className="text-muted-foreground mt-6 px-8 mx-auto w-full text-center">
						Can't find what you're looking for? Question us{" "}
						<Link
							href="#hero"
							className="text-primary font-medium hover:underline"
						>
							here
						</Link>
					</p>
				</div>
			</div>
		</section>
	);
}
