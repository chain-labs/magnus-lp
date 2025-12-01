import BookACall from "@/components/BookACall";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HighestQualityResearchReadyBeforeTheMarketOpens from "@/components/HighestQualityResearchReadyBeforeTheMarketOpens";
import HowMagnusHathawayChangesThis from "@/components/HowMagnusHathawayChangesThis";
import InvestmentPhilosophy from "@/components/InvestmentPhilosophy";
import MeetTheFounder from "@/components/MeetTheFounder";
import OurTrackRecord from "@/components/OurTrackRecord";
import WhatOurClientsSay from "@/components/WhatOurClientsSay";
import YoureStuckInAsystemDesignedToWorkAgainstYou from "@/components/YoureStuckInAsystemDesignedToWorkAgainstYou";

export default function Home() {
	return (
		<>
			<HowMagnusHathawayChangesThis />
			<YoureStuckInAsystemDesignedToWorkAgainstYou />
			<InvestmentPhilosophy />
			<HighestQualityResearchReadyBeforeTheMarketOpens />
			<OurTrackRecord />
			<WhatOurClientsSay />
			<FAQ />
			<MeetTheFounder />
			<BookACall />
			<Footer />
		</>
	);
}
