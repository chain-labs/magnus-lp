import Link from "next/link";

import { cn } from "@/lib/utils";

type Social = {
	href: string;
	label: string;
};

type Member = {
	name: string;
	role: string;
	avatar: string;
	social: Social;
	experience?: string;
	registration?: string;
	bio?: string;
};

const members: Member[] = [
	{
		name: "Alireza Azar",
		role: "Founder & Lead Analyst",
		avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=720&q=80",
		social: {
			href: "https://www.instagram.com/mrtalkstock/",
			label: "Instagram",
		},
		experience: "12+ years experience",
		registration:
			"SEBI Registered Research Analyst (Reg. No. INH000010856)",
		bio: "Alireza Azar is a seasoned finance professional and the voice behind Mr. TalkStock. With a Chartered Accountant background and over a decade in the Indian stock market, Alireza pairs deep market insight with practical strategies that empower retail investors.",
	},
	{
		name: "Rahul Pandey",
		role: "Co-Founder & Capital Markets Strategist",
		avatar: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=720&q=80",
		social: { href: "https://twitter.com/rahul_pandey", label: "Twitter" },
		experience: "10+ years experience",
		bio: "Rahul Pandey is an NSE Certified Analyst with a decade spent decoding portfolio strategies, options writing, and quantitative research. His capital-markets commentary reaches more than 185,000 followers across social media.",
	},
];

interface TeamShowcaseProps {
	className?: string;
	showIntro?: boolean;
}

export default function TeamSection({
	className,
	showIntro = true,
}: TeamShowcaseProps) {
	const listSpacing = showIntro ? "mt-12 md:mt-24" : "pt-12 md:pt-16";

	return (
		<section className={cn("", className)}>
			<div className="mx-auto max-w-5xl px-6">
				<div
					className={cn(
						"grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
            members.length == 2 && "lg:grid-cols-2",
            members.length == 1 && "sm:grid-cols-1 lg:grid-cols-1",
						listSpacing
					)}
				>
					{members.map((member, index) => (
						<div
							key={member.name}
							className="group overflow-hidden"
						>
							<img
								className="h-96 w-full rounded-md object-cover object-top grayscale transition-all duration-500 hover:grayscale-0 group-hover:h-[22.5rem] group-hover:rounded-xl"
								src={member.avatar}
								alt={member.name}
								width="826"
								height="1239"
								loading="lazy"
							/>
							<div className="px-2 pt-2 sm:pb-0 sm:pt-4">
								<div className="flex justify-between">
									<h3 className="text-title text-base font-medium transition-all duration-500 group-hover:tracking-wider">
										{member.name}
									</h3>
									<span className="text-xs">
										_0{index + 1}
									</span>
								</div>
								<div className="mt-1 flex flex-col space-y-3">
									<span className="text-muted-foreground text-sm">
										{member.role}
									</span>
									{member.bio ? (
										<p className="text-muted-foreground text-sm leading-relaxed">
											{member.bio}
										</p>
									) : null}
									<div className="flex flex-wrap items-center justify-between gap-2 text-sm">
										{member.experience ? (
											<span className="text-muted-foreground">
												{member.experience}
											</span>
										) : null}
										{member.registration ? (
											<span className="text-muted-foreground">
												{member.registration}
											</span>
										) : null}
										<Link
											href={member.social.href}
											className="group-hover:text-primary inline-block font-medium text-xs uppercase tracking-wide opacity-70 transition-all duration-500 hover:opacity-100"
										>
											{member.social.label}
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
