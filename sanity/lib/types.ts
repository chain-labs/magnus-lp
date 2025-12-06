// Hero Types
export interface HeroData {
	subtitle: string;
	headline: string;
	frequentlyAskedQuestions: {
		question: string;
		answer: string;
	}[];
	skewedGridImage?: string;
}

// Header Types
export interface HeaderData {
	logoImage?: string;
	brandName: string;
	navLinks: {
		label: string;
		href: string;
	}[];
	ctaButtonText: string;
	ctaButtonLink: string;
}

// FAQ Types
export interface FAQData {
	title: string;
	description: string;
	contactButtonText: string;
	items: {
		question: string;
		answer: string;
	}[];
}

// Footer Types
export interface FooterData {
	company: {
		logoSrc?: string;
		title: string;
	};
	socialLinks: {
		platform: string;
		href: string;
	}[];
	disclosuresLinks: {
		label: string;
		link: string;
	}[];
	disclosureStatement: string;
	SEBIRegistrationNumber: string;
	officeDetails: {
		researchAnalyst: {
			name: string;
			SEBIRegistrationNumber: string;
			registeredOfficeAddress: string;
		};
		SEBIOffice: {
			headOfficeAddress: string;
			localOfficeAddress: string;
		};
		grievanceOfficer: {
			name: string;
			telephoneNumber: string;
			emailID: string;
		};
		complianceOfficer: {
			name: string;
			telephoneNumber: string;
			emailID: string;
		};
	};
	disclosures: string[];
	footerBottom: {
		rights: string;
		links: {
			label: string;
			link: string;
		}[];
	};
}

// Pricing Types
export interface PricingPlan {
	title: string;
	description: string;
	monthlyPrice: number;
	yearlyPrice: number;
	link: string;
	features: string[];
	primary: boolean;
}

export interface PricingData {
	sectionLabel: string;
	title: string;
	description: string;
	plans: PricingPlan[];
}

// Meet The Founder Types
export interface MeetTheFounderData {
	sectionTitle: string;
	sectionSubtitle: string;
	heroImage?: string;
	storyParagraphs: {
		highlightedText?: string;
		regularText?: string;
	}[];
	founderImage?: string;
	founderDetails: {
		name: string;
		position: string;
		bio: string;
		credentials: string[];
	};
}

// Investor Trap Types
export interface InvestorTrapData {
	title: string;
	subtitle: string;
	cardPairs: {
		left: {
			title: string;
			subtitle: string;
		};
		right: {
			title: string;
			subtitle: string;
		};
		topPosition: string;
	}[];
}

// How Magnus Changes This Types
export interface HowMagnusChangesThisData {
	title: string;
	items: {
		tag: string;
		title: string;
		description: string;
		image?: string;
		imageDirection: "left" | "right";
	}[];
}

// Investment Philosophy Types
export interface InvestmentPhilosophyData {
	sectionLabel: string;
	title: string;
	items: {
		iconType: string;
		title: string;
		description: string;
	}[];
}

// Our Track Record Types
export interface OurTrackRecordData {
	title: string;
	subtitle: string;
	heroImage?: string;
	stats: {
		value: string;
		description: string;
	}[];
}

// Testimonials Types
export interface TestimonialsData {
	title: string;
	items: {
		name: string;
		imageUrl?: string;
		positionAndCompany: string;
		companyLogo?: string;
		testimonial: string;
	}[];
}

// Highest Quality Research Types
export interface HighestQualityResearchData {
	title: string;
	description: string;
	tableHeaders: {
		label: string;
		align: string;
	}[];
	stockData: {
		ticker: string;
		logo?: string;
		priceZone: string;
		action: string;
		target: string;
		stopLoss: string;
		potential: string;
		duration: string;
		published: string;
	}[];
	ctaTitle: string;
	ctaDescription: string;
	ctaButtonText: string;
	ctaButtonLink: string;
}

// You're Stuck Types
export interface YoureStuckData {
	title: string;
	items: {
		iconType: string;
		title: string;
		description: string;
	}[];
}

// Book A Call Types
export interface BookACallData {
	title: string;
	subtitle: string;
	contactUsLink: string;
	bookACallLink: string;
	contactUsButtonText: string;
	bookACallButtonText: string;
}
