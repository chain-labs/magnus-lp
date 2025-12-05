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

export default function Home() {
	return (
		<HeaderThemeProvider>
			<Header />
			<SectionObserver theme="dark">
				<BackgroundBlobsAdder
					blobs={[
						"absolute top-[15%] left-[85%] translate-y-[-10%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.78]",
						"absolute top-[45%] left-[5%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px]",
						"absolute top-[80%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#5872BA] blur-[339.1px]",
					]}
					parentClassName="bg-[#000728]"
				>
					<Hero />
				</BackgroundBlobsAdder>
			</SectionObserver>
			<BackgroundBlobsAdder
				blobs={[
					"absolute top-[100%] left-[90%] translate-y-[-60%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.68]",
					"absolute top-[50%] left-[0%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px]",
				]}
				parentClassName="bg-[#000728]"
			>
				<SectionObserver theme="light">
					<YoureStuckInAsystemDesignedToWorkAgainstYou />
				</SectionObserver>
				<SectionObserver theme="dark">
					<InvestorTrap />
				</SectionObserver>
			</BackgroundBlobsAdder>

			<SectionObserver theme="light">
				<HowMagnusHathawayChangesThis />
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
					<InvestmentPhilosophy />
				</BackgroundBlobsAdder>
			</SectionObserver>
			<SectionObserver theme="light">
				<HighestQualityResearchReadyBeforeTheMarketOpens />
			</SectionObserver>
			<SectionObserver theme="light">
				<Pricing />
			</SectionObserver>
			<SectionObserver theme="dark">
				<BackgroundBlobsAdder
					blobs={[
						"absolute top-[10%] left-[90%] translate-y-[-60%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.68]",
						"absolute top-[50%] left-[0%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px]",
					]}
					parentClassName="bg-[#000728]"
				>
					<OurTrackRecord />
					<WhatOurClientsSay />
				</BackgroundBlobsAdder>
			</SectionObserver>
			<SectionObserver theme="light">
				<FAQ />
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
					<MeetTheFounder />
					<BookACall />
				</BackgroundBlobsAdder>
			</SectionObserver>
			<SectionObserver theme="light">
				<Footer />
			</SectionObserver>
		</HeaderThemeProvider>
	);
}
