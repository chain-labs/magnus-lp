"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";
import type { TestimonialsData } from "@/sanity/lib/types";

// Static data - commented out in favor of Sanity CMS
// const testimonials = [
// 	{
// 		id: 1,
// 		name: "Name Surname",
// 		imageUrl: "/images/testimonials/1.jpg",
// 		positionAndCompany: "Position, Company name",
// 		companyLogo: "/images/testimonials/1.jpg",
// 		testimonial: `"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."`,
// 	},
// 	... more testimonials
// ];

// Default fallback data
const defaultTestimonialsData: TestimonialsData = {
	title: "What Our Clients Say",
	items: [
		{
			name: "Name Surname",
			imageUrl: "/images/testimonials/1.jpg",
			positionAndCompany: "Position, Company name",
			companyLogo: "/images/testimonials/1.jpg",
			testimonial: `"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."`,
		},
		{
			name: "Name Surname",
			imageUrl: "/images/testimonials/2.jpg",
			positionAndCompany: "Position, Company name",
			companyLogo: "/images/testimonials/2.jpg",
			testimonial: `"I had money stuck in laggard stocks. The team helped me reallocate based on research. Now I invest with confidence, not fear."`,
		},
		{
			name: "Name Surname",
			imageUrl: "/images/testimonials/1.jpg",
			positionAndCompany: "Position, Company name",
			companyLogo: "/images/testimonials/1.jpg",
			testimonial: `"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."`,
		},
		{
			name: "Name Surname",
			imageUrl: "/images/testimonials/2.jpg",
			positionAndCompany: "Position, Company name",
			companyLogo: "/images/testimonials/2.jpg",
			testimonial: `"I had money stuck in laggard stocks. The team helped me reallocate based on research. Now I invest with confidence, not fear."`,
		},
		{
			name: "Name Surname",
			imageUrl: "/images/testimonials/1.jpg",
			positionAndCompany: "Position, Company name",
			companyLogo: "/images/testimonials/1.jpg",
			testimonial: `"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."`,
		},
		{
			name: "Name Surname",
			imageUrl: "/images/testimonials/2.jpg",
			positionAndCompany: "Position, Company name",
			companyLogo: "/images/testimonials/2.jpg",
			testimonial: `"I had money stuck in laggard stocks. The team helped me reallocate based on research. Now I invest with confidence, not fear."`,
		},
	],
};

interface WhatOurClientsSayProps {
	data?: {data: TestimonialsData | null;}
}

export default function WhatOurClientsSay({ data }: WhatOurClientsSayProps) {
	const testimonialsData = data?.data || defaultTestimonialsData;
	const testimonials = testimonialsData.items;
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		const snapListLength = api.scrollSnapList().length;
		requestAnimationFrame(() => {
			setCount(snapListLength);
			setCurrent(api.selectedScrollSnap() + 1);
		});

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});

		api.on("reInit", () => {
			setCount(api.scrollSnapList().length);
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<section className="w-full pb-[80px] md:py-[112px] px-[20px] md:px-[80px]">
			<div className="flex flex-col gap-[24px] md:gap-[80px] max-w-7xl mx-auto">
				<h2 className="text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-white">
					{testimonialsData.title}
				</h2>
				<Carousel
					setApi={setApi}
					opts={{
						align: "start",
						slidesToScroll: 1,
						breakpoints: {
							"(min-width: 768px)": {
								slidesToScroll: 2,
							},
						},
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-2 md:-ml-4">
						{testimonials.map((testimonial) => (
							<CarouselItem
								key={testimonial.name}
								className="pl-2 md:pl-4 basis-full md:basis-1/2"
							>
								<div className="rounded-lg bg-transparent">
									<blockquote className="space-y-12">
										<p className="text-[16px] md:text-[20px] leading-[24px] md:leading-[32px] text-white">
											{testimonial.testimonial}
										</p>

										<div className="mt-[32px] flex flex-col md:flex-row md:items-center gap-6">
											<Image
												className="h-7 w-fit dark:invert"
												src={testimonial.companyLogo || "/images/testimonials/default-logo.png"}
												alt="Nvidia Logo"
												height={20}
												width={20}
											/>
											<div className="flex flex-col md:border-l md:pl-6">
												<cite className="normal text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-white">
													{testimonial.name}
												</cite>
												<span className="text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] text-white">
													{
														testimonial.positionAndCompany
													}
												</span>
											</div>
										</div>
									</blockquote>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="flex items-center justify-between mt-12">
						<div className="flex gap-2">
							{Array.from({ length: count }).map((_, index) => (
								<button
									key={index}
									onClick={() => {
										api?.scrollTo(index);
									}}
									className={`h-2 w-2 rounded-full transition-colors ${
										current - 1 === index
											? "bg-white"
											: "bg-gray-600"
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
						<div className="flex gap-2">
							<CarouselPrevious className="!relative !top-0 !left-0 border-white/20 h-[48px] w-[48px] text-white bg-transparent text-[16px] [&_svg]:height-8 [&_svg]:width-8 translate-0" />
							<CarouselNext className="!relative !top-0 !right-0 border-white/20 h-[48px] w-[48px] text-white bg-transparent text-[16px] [&_svg]:height-8 [&_svg]:width-8 translate-0" />
						</div>
					</div>
				</Carousel>
			</div>
		</section>
	);
}
