const leadership = [
  {
    name: "Alireza Azar",
    role: "Founder & Lead Analyst, Mr. TalkStock",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=320&q=80",
    experience: "12+ years experience in Indian capital markets",
    registration: "SEBI Registered Research Analyst (Reg. No. INH000010856)",
  },
  {
    name: "Rahul Pandey",
    role: "Co-Founder & Capital Markets Strategist",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=320&q=80",
    experience: "10+ years experience across portfolio & derivatives",
  },
];

const engineering = [
  {
    name: "Théo Balick",
    role: "Frontend Engineer",
    avatar: "https://avatars.githubusercontent.com/u/68236786?v=4",
  },
  {
    name: "Glodie Lukose",
    role: "Frontend Engineer",
    avatar: "https://avatars.githubusercontent.com/u/99137927?v=4",
  },
  {
    name: "Bernard Ngandu",
    role: "Backend Engineer",
    avatar: "https://avatars.githubusercontent.com/u/31113941?v=4",
  },
  {
    name: "Méschac Irung",
    role: "Fullstack Engineer",
    avatar: "https://avatars.githubusercontent.com/u/47919550?v=4",
  },
];

const marketing = [
  {
    name: "Isabella Garcia",
    role: "Growth Lead",
    avatar: "https://alt.tailus.io/images/team/member-three.webp",
  },
  {
    name: "Henry Lee",
    role: "Brand Strategist",
    avatar: "https://alt.tailus.io/images/team/member-four.webp",
  },
  {
    name: "Ava Williams",
    role: "Campaign Specialist",
    avatar: "https://alt.tailus.io/images/team/member-five.webp",
  },
  {
    name: "Olivia Miller",
    role: "Marketing Analyst",
    avatar: "https://alt.tailus.io/images/team/member-six.webp",
  },
];

const sections = [
  { title: "Leadership", members: leadership },
  { title: "Engineering", members: engineering },
  { title: "Marketing", members: marketing },
];

type TeamMember = {
  name: string;
  role: string;
  avatar: string;
  experience?: string;
  registration?: string;
};

export default function TeamSection() {
  return (
    <section className="py-12 md:py-32">
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <h2 className="mb-8 text-4xl font-bold md:mb-16 lg:text-5xl">Our team</h2>

        {sections.map((section) => (
          <div key={section.title} className="mt-6 first:mt-0">
            <h3 className="mb-6 text-lg font-medium">{section.title}</h3>
            <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
              {section.members.map((member: TeamMember, index) => (
                <div key={`${member.name}-${index}`}>
                  <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5">
                    <img
                      className="aspect-square rounded-full object-cover"
                      src={member.avatar}
                      alt={member.name}
                      height="160"
                      width="160"
                      loading="lazy"
                    />
                  </div>
                  <span className="mt-2 block text-sm font-medium">{member.name}</span>
                  <span className="text-muted-foreground block text-xs">{member.role}</span>
                  {member.experience ? (
                    <span className="text-muted-foreground block text-xs">
                      {member.experience}
                    </span>
                  ) : null}
                  {member.registration ? (
                    <span className="text-muted-foreground block text-xs">
                      {member.registration}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
