import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import OurTrackRecord from "@/components/OurTrackRecord";
import WhatOurClientsSay from "@/components/WhatOurClientsSay";

export default function Home() {
	return (
		<>
			<OurTrackRecord />
			<WhatOurClientsSay />
			<FAQ />
			<Footer />
		</>
	);
}
