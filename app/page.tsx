import BackgroundBlobsAdder from "@/components/BackgroundBlobsAdder";
import BookACall from "@/components/BookACall";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HighestQualityResearchReadyBeforeTheMarketOpens from "@/components/HighestQualityResearchReadyBeforeTheMarketOpens";
import HowMagnusHathawayChangesThis from "@/components/HowMagnusHathawayChangesThis";
import InvestmentPhilosophy from "@/components/InvestmentPhilosophy";
import InvestorTrap from "@/components/InvestorTrap";
import MeetTheFounder from "@/components/MeetTheFounder";
import OurTrackRecord from "@/components/OurTrackRecord";
import Pricing from "@/components/Pricing";
import WhatOurClientsSay from "@/components/WhatOurClientsSay";
import YoureStuckInAsystemDesignedToWorkAgainstYou from "@/components/YoureStuckInAsystemDesignedToWorkAgainstYou";
import { HeaderThemeProvider } from "@/components/HeaderThemeContext";
import SectionObserver from "@/components/SectionObserver";
import {
	HERO_QUERY,
	HEADER_QUERY,
	FAQ_QUERY,
	FOOTER_QUERY,
	PRICING_QUERY,
	MEET_THE_FOUNDER_QUERY,
	INVESTOR_TRAP_QUERY,
	HOW_MAGNUS_CHANGES_THIS_QUERY,
	INVESTMENT_PHILOSOPHY_QUERY,
	OUR_TRACK_RECORD_QUERY,
	TESTIMONIALS_QUERY,
	BOOK_A_CALL_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function Home() {
	// Fetch all Sanity data in parallel
	const [heroData, headerData, faqData, footerData, pricingData, meetTheFounderData, investorTrapData, howMagnusChangesThisData, investmentPhilosophyData, ourTrackRecordData, testimonialsData, bookACallData] = await Promise.all([
		sanityFetch({ query: HERO_QUERY }),
		sanityFetch({ query: HEADER_QUERY }),
		sanityFetch({ query: FAQ_QUERY }),
		sanityFetch({ query: FOOTER_QUERY }),
		sanityFetch({ query: PRICING_QUERY }),
		sanityFetch({ query: MEET_THE_FOUNDER_QUERY }),
		sanityFetch({ query: INVESTOR_TRAP_QUERY }),
		sanityFetch({ query: HOW_MAGNUS_CHANGES_THIS_QUERY }),
		sanityFetch({ query: INVESTMENT_PHILOSOPHY_QUERY }),
		sanityFetch({ query: OUR_TRACK_RECORD_QUERY }),
		sanityFetch({ query: TESTIMONIALS_QUERY }),
		sanityFetch({ query: BOOK_A_CALL_QUERY }),
	]);

	return (
		<HeaderThemeProvider>
			<Header data={headerData} />
			<SectionObserver theme="dark">
				<BackgroundBlobsAdder
					blobs={[
						"absolute top-[15%] left-[85%] translate-y-[-10%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.78]",
						"absolute top-[45%] left-[5%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px]",
						"absolute top-[80%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#5872BA] blur-[339.1px]",
					]}
					parentClassName="bg-[#000728]"
				>
					<Hero data={heroData} />
				</BackgroundBlobsAdder>
			</SectionObserver>
			<SectionObserver theme="light">
				<YoureStuckInAsystemDesignedToWorkAgainstYou data={undefined} />
			</SectionObserver>
			{/* <BackgroundBlobsAdder
				blobs={[
					"absolute top-[100%] left-[90%] translate-y-[-60%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.68]",
					"absolute top-[50%] left-[0%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px]",
				]}
				parentClassName="bg-[#000728]"
			></BackgroundBlobsAdder> */}
			<SectionObserver theme="dark" className="bg-[#000728]">
				<InvestorTrap data={investorTrapData} />
			</SectionObserver>

			<SectionObserver theme="light">
				<HowMagnusHathawayChangesThis data={howMagnusChangesThisData} />
			</SectionObserver>
			<SectionObserver theme="dark">
				<BackgroundBlobsAdder
					blobs={[
						"absolute top-[100%] left-[90%] translate-y-[-60%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.68]",
						"absolute top-[50%] left-[0%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px]",
						"absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#5872BA] blur-[339.1px]",
					]}
					parentClassName="bg-[#000728]"
				>
					<InvestmentPhilosophy data={investmentPhilosophyData} />
				</BackgroundBlobsAdder>
			</SectionObserver>
			<SectionObserver theme="light">
				<HighestQualityResearchReadyBeforeTheMarketOpens />
			</SectionObserver>
			<SectionObserver theme="light">
				<Pricing data={pricingData} />
			</SectionObserver>
			<SectionObserver theme="dark">
				<BackgroundBlobsAdder
					blobs={[
						"absolute top-[10%] left-[90%] translate-y-[-60%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.68]",
						"absolute top-[50%] left-[0%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px]",
					]}
					parentClassName="bg-[#000728]"
				>
				<OurTrackRecord data={ourTrackRecordData} />
				<WhatOurClientsSay data={testimonialsData} />
				</BackgroundBlobsAdder>
			</SectionObserver>
			<SectionObserver theme="light">
				<FAQ data={faqData} />
			</SectionObserver>
			<SectionObserver theme="dark">
				<BackgroundBlobsAdder
					blobs={[
						"absolute top-[10%] left-[60%] w-[571px] h-[571px] aspect-square bg-[#5872BA] blur-[339.1px] opacity-[0.9]",
						"absolute top-[10%] right-[65%] w-[571px] h-[571px] aspect-square bg-[#5872BA] blur-[339.1px] opacity-[0.9]",
						"absolute bottom-[10%] left-[80%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF] blur-[339.1px] opacity-[0.49]",
						"absolute bottom-[10%] right-[85%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF] blur-[339.1px] opacity-[0.49]",
					]}
					parentClassName="bg-[#000728]"
				>
				<MeetTheFounder data={meetTheFounderData} />
				<BookACall data={bookACallData} />
				</BackgroundBlobsAdder>
			</SectionObserver>
			<SectionObserver theme="light">
				<Footer data={footerData} />
			</SectionObserver>
		</HeaderThemeProvider>
	);
}
