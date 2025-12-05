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

const testimonials = [
	{
		id: 1,
		name: "Name Surname",
		imageUrl: "/images/testimonials/1.jpg",
		positionAndCompany: "Position, Company name",
		companyLogo: "/images/testimonials/1.jpg",
		testimonial: `"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."`,
	},
	{
		id: 2,
		name: "Name Surname",
		imageUrl: "/images/testimonials/2.jpg",
		positionAndCompany: "Position, Company name",
		companyLogo: "/images/testimonials/2.jpg",
		testimonial: `"I had money stuck in laggard stocks. The team helped me reallocate based on research. Now I invest with confidence, not fear."`,
	},
	{
		id: 3,
		name: "Name Surname",
		imageUrl: "/images/testimonials/1.jpg",
		positionAndCompany: "Position, Company name",
		companyLogo: "/images/testimonials/1.jpg",
		testimonial: `"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."`,
	},
	{
		id: 4,
		name: "Name Surname",
		imageUrl: "/images/testimonials/2.jpg",
		positionAndCompany: "Position, Company name",
		companyLogo: "/images/testimonials/2.jpg",
		testimonial: `"I had money stuck in laggard stocks. The team helped me reallocate based on research. Now I invest with confidence, not fear."`,
	},
	{
		id: 5,
		name: "Name Surname",
		imageUrl: "/images/testimonials/1.jpg",
		positionAndCompany: "Position, Company name",
		companyLogo: "/images/testimonials/1.jpg",
		testimonial: `"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."`,
	},
	{
		id: 6,
		name: "Name Surname",
		imageUrl: "/images/testimonials/2.jpg",
		positionAndCompany: "Position, Company name",
		companyLogo: "/images/testimonials/2.jpg",
		testimonial: `"I had money stuck in laggard stocks. The team helped me reallocate based on research. Now I invest with confidence, not fear."`,
	},
];

export default function WhatOurClientsSay() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<section className="w-full py-[112px] px-[80px]">
			<div className="flex flex-col gap-[80px] max-w-7xl mx-auto">
				<h2 className="text-[40px] leading-[48px] text-white">
					What Our Clients Say
				</h2>
				<Carousel
					setApi={setApi}
					opts={{
						align: "start",
						slidesToScroll: 2,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-2 md:-ml-4">
						{testimonials.map((testimonial) => (
							<CarouselItem
								key={testimonial.id}
								className="pl-2 md:pl-4 basis-full md:basis-1/2"
							>
								<div className="rounded-lg bg-transparent">
									<blockquote className="space-y-12">
										<p className="text-[20px] leading-[32px] text-white">
											{testimonial.testimonial}
										</p>

										<div className="mt-[32px] flex items-center gap-6">
											<Image
												className="h-7 w-fit dark:invert"
												src={testimonial.companyLogo}
												alt="Nvidia Logo"
												height={20}
												width={20}
											/>
											<div className="flex flex-col border-l pl-6">
												<cite className="text-[16px] leading-[24px] text-white">
													{testimonial.name}
												</cite>
												<span className="text-[16px] leading-[24px] text-white">
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
							<CarouselPrevious className="!relative !top-0 !left-0 border-white/20 h-[48px] w-[48px] text-white bg-transparent text-[16px] [&_svg]:height-8 [&_svg]:width-8" />
							<CarouselNext className="!relative !top-0 !right-0 border-white/20 h-[48px] w-[48px] text-white bg-transparent text-[16px] [&_svg]:height-8 [&_svg]:width-8" />
						</div>
					</div>
				</Carousel>
			</div>
		</section>
	);
}
