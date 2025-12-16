export const SECTION_VISIBILITY = {
	header: process.env.HEADER_VISIBLE === "true" ? true : false,
	hero: process.env.HERO_VISIBLE === "true" ? true : false,
	youreStuck: process.env.YOURE_STUCK_VISIBLE === "true" ? true : false,
	investorTrap: process.env.INVESTOR_TRAP_VISIBLE === "true" ? true : false,
	howMagnusChangesThis: process.env.HOW_MAGNUS_CHANGES_THIS_VISIBLE === "true" ? true : false,
	investmentPhilosophy: process.env.INVESTMENT_PHILOSOPHY_VISIBLE === "true" ? true : false,
	highestQualityResearch: process.env.HIGHEST_QUALITY_RESEARCH_VISIBLE === "true" ? true : false,
	pricing: process.env.PRICING_VISIBLE === "true" ? true : false,
	trackRecordAndTestimonials: process.env.TRACK_RECORD_AND_TESTIMONIALS_VISIBLE === "true" ? true : false,
	faq: process.env.FAQ_VISIBLE === "true" ? true : false,
	founderAndCall: process.env.FOUNDER_AND_CALL_VISIBLE === "true" ? true : false,
	footer: process.env.FOOTER_VISIBLE === "true" ? true : false,
};
