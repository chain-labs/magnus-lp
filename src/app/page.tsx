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
		<div className="flex min-h-screen flex-col  text-foreground z-0">
			<div className="fixed inset-0 h-full w-full bg-[linear-gradient(to_bottom,#C7D2FE,#F1F5F9_25%)]"></div>
			<div id="hero" className="z-20">
				<HeroSection />
			</div>

			<main className="flex-1 z-10">
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
