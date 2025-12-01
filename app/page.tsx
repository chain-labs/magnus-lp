import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import MeetTheFounder from "@/components/MeetTheFounder";
import OurTrackRecord from "@/components/OurTrackRecord";
import WhatOurClientsSay from "@/components/WhatOurClientsSay";

export default function Home() {
	return (
		<>
			<MeetTheFounder />
			<OurTrackRecord />
			<WhatOurClientsSay />
			<FAQ />
			<Footer />
		</>
	);
}
