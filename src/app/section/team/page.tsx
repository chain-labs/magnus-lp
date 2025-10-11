import TeamGridSection from "@/components/sections/team/team";
import TeamShowcase from "@/components/sections/team/demo";

const communityTestimonials = [
  {
    quote:
      "Alireza’s research notes have transformed the way our desk evaluates mid-cap opportunities. The clarity and conviction behind every call is unmatched.",
    name: "Anita Sharma",
    role: "Portfolio Manager, Zenith Wealth",
  },
  {
    quote:
      "Rahul’s weekly options breakdown is now mandatory reading for our trading squad. His frameworks help us stay disciplined even on volatile days.",
    name: "Prakash Nair",
    role: "Lead Derivatives Analyst, Stratos Securities",
  },
  {
    quote:
      "The Magnus LP team pairs deep market insight with storytelling that resonates. Our community trusts them to make complex moves feel accessible.",
    name: "Divya Rao",
    role: "Founder, AlphaCircle Community",
  },
];

export default function TeamPage() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="border py-1 px-4 rounded-lg text-sm tracking-tight uppercase">
            Team
          </div>
          <h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mt-5 max-w-3xl">
            The operators helping investors navigate every market cycle
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl">
            Led by SEBI-registered analyst Alireza Azar and capital-markets strategist Rahul Pandey, Magnus LP blends rigorous research, options mastery, and community-first storytelling.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <TeamGridSection />
      </div>

      <div className="mt-8">
        <TeamShowcase showIntro={false} className="bg-background dark:bg-background pt-0 md:pt-8" />
      </div>
    </section>
  );
}
