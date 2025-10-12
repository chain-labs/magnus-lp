import HeroSection from "./section/hero/page";
import QualityResearchSection from "./section/quality-research/page";
import DiyVideosSection from "./section/diy/page";
import PricingSection from "./section/pricing/page";
import TeamSection from "./section/team/page";
import TestimonialsSection from "./section/testimonials/page";
import FaqSection from "./section/faq/page";
import FooterSection from "./section/footer/page";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			<div id="hero">
				<HeroSection />
			</div>

			<main className="flex-1">
				<div id="research">
					<QualityResearchSection />
				</div>

				<div id="diy">
					<DiyVideosSection />
				</div>

				<div id="pricing">
					<PricingSection />
				</div>

				<div id="team">
					<TeamSection />
				</div>

				<div id="testimonials">
					<TestimonialsSection />
				</div>

				<div id="faq">
					<FaqSection />
				</div>
			</main>

			<div id="contact" />

			<FooterSection />
		</div>
	);
}
