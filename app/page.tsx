import BackgroundBlobsAdder from "@/components/BackgroundBlobsAdder";
import BookACall from "@/components/BookACall";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HighestQualityResearchReadyBeforeTheMarketOpens from "@/components/HighestQualityResearchReadyBeforeTheMarketOpens";
import HowMagnusHathawayChangesThis from "@/components/HowMagnusHathawayChangesThis";
import InvestmentPhilosophy from "@/components/InvestmentPhilosophy";
import MeetTheFounder from "@/components/MeetTheFounder";
import OurTrackRecord from "@/components/OurTrackRecord";
import Pricing from "@/components/Pricing";
import WhatOurClientsSay from "@/components/WhatOurClientsSay";
import YoureStuckInAsystemDesignedToWorkAgainstYou from "@/components/YoureStuckInAsystemDesignedToWorkAgainstYou";

export default function Home() {
	return (
		<>
			<BackgroundBlobsAdder
				blobs={[
					"absolute top-[100%] left-[90%] translate-y-[-60%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.68]",
					"absolute top-[50%] left-[0%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px]",
				]}
				parentClassName="bg-[#000728]"
			>
				<Hero />
			</BackgroundBlobsAdder>
			<Pricing />
			<HowMagnusHathawayChangesThis />
			<YoureStuckInAsystemDesignedToWorkAgainstYou />
			<BackgroundBlobsAdder
				blobs={[
					"absolute top-[100%] left-[90%] translate-y-[-60%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.68]",
					"absolute top-[50%] left-[0%] translate-x-[-50%] translate-y-[-50%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px]",
				]}
				parentClassName="bg-[#000728]"
			>
				<InvestmentPhilosophy />
			</BackgroundBlobsAdder>
			<HighestQualityResearchReadyBeforeTheMarketOpens />
			<OurTrackRecord />
			<WhatOurClientsSay />
			<FAQ />
			<BackgroundBlobsAdder
				blobs={[
					"absolute bottom-[10%] left-[80%] w-[571px] h-[571px] aspect-square bg-[#A12FFF] blur-[339.1px] opacity-[0.29]",
					"absolute bottom-[10%] right-[85%] w-[571px] h-[571px] aspect-square bg-[#2FFCFF8A] blur-[339.1px] opacity-[0.29]",
				]}
				parentClassName="bg-[#000728]"
			>
				<MeetTheFounder />
				<BookACall />
			</BackgroundBlobsAdder>
			<Footer />
		</>
	);
}
