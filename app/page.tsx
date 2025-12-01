import BookACall from "@/components/BookACall";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import InvestmentPhilosophy from "@/components/InvestmentPhilosophy";
import MeetTheFounder from "@/components/MeetTheFounder";
import OurTrackRecord from "@/components/OurTrackRecord";
import WhatOurClientsSay from "@/components/WhatOurClientsSay";
import YoureStuckInAsystemDesignedToWorkAgainstYou from "@/components/YoureStuckInAsystemDesignedToWorkAgainstYou";

export default function Home() {
	return (
		<>
			<YoureStuckInAsystemDesignedToWorkAgainstYou />
			<InvestmentPhilosophy />
			<OurTrackRecord />
			<WhatOurClientsSay />
			<FAQ />
			<MeetTheFounder />
			<BookACall />
			<Footer />
		</>
	);
}
