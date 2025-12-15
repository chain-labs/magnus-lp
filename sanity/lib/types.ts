// Hero Types
export interface HeroData {
	visible: boolean;
	subtitle: string;
	headline: string;
}

// Header Types
export interface HeaderData {
	visible: boolean;
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
	visible: boolean;
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
	visible: boolean;
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
export interface PlanFeature {
	text: string;
	included: boolean;
}

export interface PricingPlan {
	title: string;
	description?: string;
	badge?: string;
	price: number;
	originalPrice?: number;
	ctaText: string;
	ctaLink: string;
	features: PlanFeature[];
	primary: boolean;
}

export interface BillingOption {
	periodKey: string;
	periodLabel: string;
	priceSuffix: string;
	plans: PricingPlan[];
}

export interface PricingData {
	visible: boolean;
	sectionLabel: string;
	title: string;
	description: string;
	billingOptions: BillingOption[];
}

// Meet The Founder Types
export interface MeetTheFounderData {
	visible: boolean;
	sectionTitle: string;
	sectionSubtitle: string;
	heroImage?: string;
	storyParagraphs: string[];
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
	visible: boolean;
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
	visible: boolean;
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
	visible: boolean;
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
	visible: boolean;
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
	visible: boolean;
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
	visible: boolean;
	title: string;
	description: string;
	displayLimit: number;
	tableHeaders: {
		label: string;
		align: string;
	}[];
}

// You're Stuck Types
export interface YoureStuckData {
	visible: boolean;
	title: string;
	items: {
		iconType: string;
		title: string;
		description: string;
	}[];
}

// Book A Call Types
export interface BookACallData {
	visible: boolean;
	title: string;
	subtitle: string;
	contactUsLink: string;
	bookACallLink: string;
	contactUsButtonText: string;
	bookACallButtonText: string;
}
