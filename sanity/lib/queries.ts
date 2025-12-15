import { defineQuery } from "next-sanity";

// Hero Section Query
export const HERO_QUERY = defineQuery(`*[_type == "hero"][0]{
  visible,
  subtitle,
  headline
}`);

// Header Query
export const HEADER_QUERY = defineQuery(`*[_type == "header"][0]{
  visible,
  "logoImage": logoImage.asset->url,
  brandName,
  navLinks[]{
    label,
    href
  },
  ctaButtonText,
  ctaButtonLink
}`);

// FAQ Query
export const FAQ_QUERY = defineQuery(`*[_type == "faq"][0]{
  visible,
  title,
  description,
  contactButtonText,
  items[]{
    question,
    answer
  }
}`);

// Footer Query
export const FOOTER_QUERY = defineQuery(`*[_type == "footer"][0]{
  visible,
  company{
    "logoSrc": logoSrc.asset->url,
    title
  },
  socialLinks[]{
    platform,
    href
  },
  disclosuresLinks[]{
    label,
    link
  },
  disclosureStatement,
  SEBIRegistrationNumber,
  officeDetails{
    researchAnalyst{
      name,
      SEBIRegistrationNumber,
      registeredOfficeAddress
    },
    SEBIOffice{
      headOfficeAddress,
      localOfficeAddress
    },
    grievanceOfficer{
      name,
      telephoneNumber,
      emailID
    },
    complianceOfficer{
      name,
      telephoneNumber,
      emailID
    }
  },
  disclosures,
  footerBottom{
    rights,
    links[]{
      label,
      link
    }
  }
}`);

// Pricing Query
export const PRICING_QUERY = defineQuery(`*[_type == "pricing"][0]{
  visible,
  sectionLabel,
  title,
  description,
  billingPeriods[]{
    key,
    label,
    suffix
  },
  plans[]{
    title,
    description,
    badge,
    prices[]{
      periodKey,
      amount,
      originalAmount
    },
    ctaText,
    ctaLink,
    features[]{
      text,
      included
    },
    primary
  }
}`);

// Meet The Founder Query
export const MEET_THE_FOUNDER_QUERY = defineQuery(`*[_type == "meetTheFounder"][0]{
  visible,
  sectionTitle,
  sectionSubtitle,
  "heroImage": heroImage.asset->url,
  storyParagraphs[]{
    highlightedText,
    regularText
  },
  "founderImage": founderImage.asset->url,
  founderDetails{
    name,
    position,
    bio,
    credentials
  }
}`);

// Investor Trap Query
export const INVESTOR_TRAP_QUERY = defineQuery(`*[_type == "investorTrap"][0]{
  visible,
  title,
  cardPairs[]{
    left{
      title,
      subtitle
    },
    right{
      title,
      subtitle
    },
    topPosition
  }
}`);

// How Magnus Changes This Query
export const HOW_MAGNUS_CHANGES_THIS_QUERY = defineQuery(`*[_type == "howMagnusChangesThis"][0]{
  visible,
  title,
  items[]{
    tag,
    title,
    description,
    "image": image.asset->url,
    imageDirection
  }
}`);

// Investment Philosophy Query
export const INVESTMENT_PHILOSOPHY_QUERY = defineQuery(`*[_type == "investmentPhilosophy"][0]{
  visible,
  sectionLabel,
  title,
  items[]{
    iconType,
    title,
    description
  }
}`);

// Our Track Record Query
export const OUR_TRACK_RECORD_QUERY = defineQuery(`*[_type == "ourTrackRecord"][0]{
  visible,
  title,
  subtitle,
  "heroImage": heroImage.asset->url,
  stats[]{
    value,
    description
  }
}`);

// Testimonials Query
export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonials"][0]{
  visible,
  title,
  items[]{
    name,
    "imageUrl": imageUrl.asset->url,
    positionAndCompany,
    "companyLogo": companyLogo.asset->url,
    testimonial
  }
}`);

// Highest Quality Research Query
export const HIGHEST_QUALITY_RESEARCH_QUERY = defineQuery(`*[_type == "highestQualityResearch"][0]{
  visible,
  title,
  description,
  displayLimit,
  tableHeaders[]{
    label,
    align
  },
  ctaTitle,
  ctaDescription,
  ctaButtonText,
  ctaButtonLink
}`);

// You're Stuck Query
export const YOURE_STUCK_QUERY = defineQuery(`*[_type == "youreStuck"][0]{
  visible,
  title,
  items[]{
    iconType,
    title,
    description
  }
}`);

// Book A Call Query
export const BOOK_A_CALL_QUERY = defineQuery(`*[_type == "bookACall"][0]{
  visible,
  title,
  subtitle,
  contactUsLink,
  bookACallLink,
  contactUsButtonText,
  bookACallButtonText
}`);
