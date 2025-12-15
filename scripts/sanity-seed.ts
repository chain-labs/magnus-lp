/**
 * Sanity Data Seeding Script - Complete Migration Data
 * 
 * This script seeds all content data into your Sanity dataset.
 * 
 * Usage:
 *   npx tsx scripts/sanity-seed.ts
 * 
 * Required environment variables:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID
 *   - NEXT_PUBLIC_SANITY_DATASET
 *   - SANITY_API_TOKEN (with write access - create at https://sanity.io/manage)
 */

import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local and .env
config({ path: resolve(process.cwd(), '.env.local') })
config({ path: resolve(process.cwd(), '.env') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET')
  process.exit(1)
}

if (!token) {
  console.error('Missing SANITY_API_TOKEN. Create a token with write access at: https://sanity.io/manage')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-12-06',
  useCdn: false,
})

// ============================================================================
// TYPES
// ============================================================================

interface SanityDocument {
  _id: string
  _type: string
  [key: string]: unknown
}

// ============================================================================
// COMPLETE MIGRATION DATA
// ============================================================================

const initialData = [
  // -------------------------------------------------------------------------
  // HEADER
  // -------------------------------------------------------------------------
  {
    _id: 'header',
    _type: 'header',
    visible: true,
    brandName: 'Magnus Hathaway',
    navLinks: [
      { _key: 'nav1', label: 'About', href: '#meet-the-founder' },
      { _key: 'nav2', label: 'Offerings', href: '#pricing' },
    ],
    ctaButtonText: 'Get Started',
    ctaButtonLink: 'https://cal.com/magnushathaway/30min',
  },

  // -------------------------------------------------------------------------
  // HERO SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'hero',
    _type: 'hero',
    visible: true,
    subtitle: 'Stock Picking, Simplified',
    headline: 'HNIs get analysts. You get YouTube. That gap costs you.',
  },

  // -------------------------------------------------------------------------
  // YOU'RE STUCK SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'youreStuck',
    _type: 'youreStuck',
    visible: true,
    title: "You're stuck in a system designed to work against you",
    items: [
      {
        _key: 'stuck1',
        iconType: 'no-guidance',
        title: 'No real guidance',
        description: "You have access to the markets. You don't have time to find and evaluate quality stocks alongside your job. So you settle for whatever shows up on your feed. YouTube picks. Telegram tips. Your colleague's hot stock idea. You're picking stocks you haven't vetted, hoping you made the right call.",
      },
      {
        _key: 'stuck2',
        iconType: 'drowning',
        title: 'Drowning in information without understanding',
        description: "You see a stock recommendation. You don't understand the valuation. You don't know when to exit. So you hold too long. You panic sell at the bottom. You miss the rebounds. The information exists. The clarity doesn't.",
      },
      {
        _key: 'stuck3',
        iconType: 'class-gap',
        title: 'The class gap is real',
        description: "HNI investors have research teams. You have X/twitter threads. They're building generational wealth. Your stocks aren't moving. Theirs are compounding Hoping you made the right call.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // INVESTOR TRAP SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'investorTrap',
    _type: 'investorTrap',
    visible: true,
    title: "The retail investor's trap.",
    cardPairs: [
      {
        _key: 'pair1',
        left: {
          title: 'Emotional Trading',
          subtitle: '(Fear & Greed)',
        },
        right: {
          title: 'Hero Mentality',
          subtitle: '(Following the crowd)',
        },
        topPosition: '22%',
      },
      {
        _key: 'pair2',
        left: {
          title: 'Timing the Market',
          subtitle: '(Buying high, selling low)',
        },
        right: {
          title: 'Lack of Diversification',
          subtitle: '(Only investing on similar stocks)',
        },
        topPosition: '50%',
      },
      {
        _key: 'pair3',
        left: {
          title: 'Chasing Past Performance',
          subtitle: '(Assuming old ways always works)',
        },
        right: {
          title: 'Ignoring Fees and Expenses',
          subtitle: '(Buying high, selling low)',
        },
        topPosition: '80%',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // HOW MAGNUS CHANGES THIS SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'howMagnusChangesThis',
    _type: 'howMagnusChangesThis',
    visible: true,
    title: 'How Magnus Hathaway Changes This',
    items: [
      {
        _key: 'magnus1',
        tag: 'Gives clarity',
        title: 'You get expert research. Clearly explained.',
        description: "Every stock recommendation comes with a detailed research report. Not a hot tip. Not a chart pattern. Real analysis. Real reasoning. Real clarity on why we think this stock matters. You understand the business. You understand the valuation. You understand what could go wrong.",
        imageDirection: 'left',
      },
      {
        _key: 'magnus2',
        tag: 'Clear Reasoning',
        title: 'You get what HNI investors have always had.',
        description: "Just like discount brokers democratized trading, Magnus Hathaway democratizes quality investment advice.  Stock recommendations you can act on. Clear reasoning behind every pick. No conflicts. No pressure to buy. You stay in control. You make the final call.",
        imageDirection: 'right',
      },
      {
        _key: 'magnus3',
        tag: 'Frequent updates',
        title: 'You get regular updates. Not daily noise.',
        description: "Quarterly updates on each holding. We explain what changed. We tell you when to hold and when to exit. You're not left wondering if this is still a good idea. Over time, you learn to spot opportunities yourself. You learn to think like an investor. Eventually, you won't need to rely on us. You'll have the confidence to invest on your own.",
        imageDirection: 'left',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // INVESTMENT PHILOSOPHY SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'investmentPhilosophy',
    _type: 'investmentPhilosophy',
    visible: true,
    sectionLabel: 'Investment Philosophy',
    title: 'How We Think About Investing',
    items: [
      {
        _key: 'phil1',
        iconType: 'chart',
        title: 'Markets Keep Changing',
        description: "The market doesn't care about your old playbook. What worked in 2019 might not work today. We adapt. We stay flexible. And we never fall in love with a single approach.",
      },
      {
        _key: 'phil2',
        iconType: 'search',
        title: 'Rigorous, Not Random',
        description: "We don't pick stocks based on gut feelings or hot tips. Every recommendation is backed by research. Every call is thought through. If we can't explain it clearly, we don't recommend it.",
      },
      {
        _key: 'phil3',
        iconType: 'lightning',
        title: 'Moving at Market Speed',
        description: "Markets don't wait for quarterly reports. When something changes, you need to know. We send updates when they matter—not on a schedule, but when the situation demands it.",
      },
      {
        _key: 'phil4',
        iconType: 'book',
        title: 'Market as Teacher',
        description: "We don't claim to know everything. The market humbles everyone eventually. But we've been at this long enough to know what works, what doesn't, and when to pivot.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // HIGHEST QUALITY RESEARCH SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'highestQualityResearch',
    _type: 'highestQualityResearch',
    visible: true,
    title: 'Highest quality research, ready before the market opens',
    description: "Curated calls across overnight, intraday, and positional strategies. Unlock deeper analytics, price targets, and premium playbooks tailored to your desk without the noise.",
    displayLimit: 5,
    tableHeaders: [
      { _key: 'th1', label: 'Ticker', align: 'left' },
      { _key: 'th2', label: 'Price Zone', align: 'left' },
      { _key: 'th3', label: 'Action', align: 'left' },
      { _key: 'th4', label: 'Target', align: 'left' },
      { _key: 'th5', label: 'Stop-Loss', align: 'left' },
      { _key: 'th6', label: 'Potential', align: 'left' },
      { _key: 'th7', label: 'Duration', align: 'left' },
      { _key: 'th8', label: 'Published', align: 'left' },
    ],
    stockData: [
      {
        _key: 'stock1',
        ticker: 'PEP',
        priceZone: '165-180',
        action: 'BUY',
        target: '$205.50',
        stopLoss: '$178.50',
        potential: '15 %',
        duration: '3 WEEKS',
        published: 'JAN 5, 2026',
      },
      {
        _key: 'stock2',
        ticker: 'STRBKS',
        priceZone: '172-178',
        action: 'HOLD',
        target: '$202.00',
        stopLoss: '$180.00',
        potential: '8 %',
        duration: '4 WEEKS',
        published: 'FEB 20, 2026',
      },
      {
        _key: 'stock3',
        ticker: 'STRBKS',
        priceZone: '172-178',
        action: 'HOLD',
        target: '$202.00',
        stopLoss: '$180.00',
        potential: '8 %',
        duration: '4 WEEKS',
        published: 'FEB 20, 2026',
      },
      {
        _key: 'stock4',
        ticker: 'STRBKS',
        priceZone: '172-178',
        action: 'HOLD',
        target: '$202.00',
        stopLoss: '$180.00',
        potential: '8 %',
        duration: '4 WEEKS',
        published: 'FEB 20, 2026',
      },
      {
        _key: 'stock5',
        ticker: 'STRBKS',
        priceZone: '172-178',
        action: 'HOLD',
        target: '$202.00',
        stopLoss: '$180.00',
        potential: '8 %',
        duration: '4 WEEKS',
        published: 'FEB 20, 2026',
      },
    ],
    ctaTitle: 'Get access to premium research',
    ctaDescription: 'Join thousands of investors who trust Magnus Hathaway for research-backed stock recommendations.',
    ctaButtonText: 'Get Started',
    ctaButtonLink: 'https://cal.com/magnushathaway/30min',
  },

  // -------------------------------------------------------------------------
  // PRICING SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'pricing',
    _type: 'pricing',
    visible: true,
    sectionLabel: 'Pricing',
    title: 'Pricing plan',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    billingOptions: [
      {
        _key: 'option1',
        periodKey: 'monthly',
        periodLabel: 'Monthly',
        priceSuffix: '/mo',
        plans: [
          {
            _key: 'plan1',
            title: 'Basic plan',
            description: 'Lorem ipsum dolor sit amet',
            badge: '',
            price: 19,
            ctaText: 'Get Started',
            ctaLink: 'https://cal.com/magnushathaway/30min',
            features: [
              { _key: 'f1', text: 'Feature text goes here', included: true },
              { _key: 'f2', text: 'Feature text goes here', included: true },
              { _key: 'f3', text: 'Feature text goes here', included: true },
              { _key: 'f4', text: 'Feature text goes here', included: false },
              { _key: 'f5', text: 'Feature text goes here', included: false },
            ],
            primary: false,
          },
          {
            _key: 'plan2',
            title: 'Business plan',
            description: 'Lorem ipsum dolor sit amet',
            badge: 'Most Popular',
            price: 29,
            ctaText: 'Get Started',
            ctaLink: 'https://cal.com/magnushathaway/30min',
            features: [
              { _key: 'f1', text: 'Feature text goes here', included: true },
              { _key: 'f2', text: 'Feature text goes here', included: true },
              { _key: 'f3', text: 'Feature text goes here', included: true },
              { _key: 'f4', text: 'Feature text goes here', included: true },
              { _key: 'f5', text: 'Feature text goes here', included: true },
            ],
            primary: true,
          },
          {
            _key: 'plan3',
            title: 'Enterprise plan',
            description: 'Lorem ipsum dolor sit amet',
            badge: '',
            price: 49,
            ctaText: 'Contact Sales',
            ctaLink: 'https://cal.com/magnushathaway/30min',
            features: [
              { _key: 'f1', text: 'Feature text goes here', included: true },
              { _key: 'f2', text: 'Feature text goes here', included: true },
              { _key: 'f3', text: 'Feature text goes here', included: true },
              { _key: 'f4', text: 'Feature text goes here', included: true },
              { _key: 'f5', text: 'Feature text goes here', included: true },
            ],
            primary: false,
          },
        ],
      },
      {
        _key: 'option2',
        periodKey: 'quarterly',
        periodLabel: 'Quarterly',
        priceSuffix: '/quarter',
        plans: [
          {
            _key: 'plan1',
            title: 'Basic plan',
            description: 'Lorem ipsum dolor sit amet',
            badge: '',
            price: 49,
            originalPrice: 57,
            ctaText: 'Get Started',
            ctaLink: 'https://cal.com/magnushathaway/30min',
            features: [
              { _key: 'f1', text: 'Feature text goes here', included: true },
              { _key: 'f2', text: 'Feature text goes here', included: true },
              { _key: 'f3', text: 'Feature text goes here', included: true },
              { _key: 'f4', text: 'Feature text goes here', included: false },
              { _key: 'f5', text: 'Feature text goes here', included: false },
            ],
            primary: false,
          },
          {
            _key: 'plan2',
            title: 'Business plan',
            description: 'Lorem ipsum dolor sit amet',
            badge: 'Most Popular',
            price: 79,
            originalPrice: 87,
            ctaText: 'Get Started',
            ctaLink: 'https://cal.com/magnushathaway/30min',
            features: [
              { _key: 'f1', text: 'Feature text goes here', included: true },
              { _key: 'f2', text: 'Feature text goes here', included: true },
              { _key: 'f3', text: 'Feature text goes here', included: true },
              { _key: 'f4', text: 'Feature text goes here', included: true },
              { _key: 'f5', text: 'Feature text goes here', included: true },
            ],
            primary: true,
          },
          {
            _key: 'plan3',
            title: 'Enterprise plan',
            description: 'Lorem ipsum dolor sit amet',
            badge: '',
            price: 129,
            originalPrice: 147,
            ctaText: 'Contact Sales',
            ctaLink: 'https://cal.com/magnushathaway/30min',
            features: [
              { _key: 'f1', text: 'Feature text goes here', included: true },
              { _key: 'f2', text: 'Feature text goes here', included: true },
              { _key: 'f3', text: 'Feature text goes here', included: true },
              { _key: 'f4', text: 'Feature text goes here', included: true },
              { _key: 'f5', text: 'Feature text goes here', included: true },
            ],
            primary: false,
          },
        ],
      },
      {
        _key: 'option3',
        periodKey: 'yearly',
        periodLabel: 'Yearly',
        priceSuffix: '/year',
        plans: [
          {
            _key: 'plan1',
            title: 'Basic plan',
            description: 'Lorem ipsum dolor sit amet',
            badge: '',
            price: 199,
            originalPrice: 228,
            ctaText: 'Get Started',
            ctaLink: 'https://cal.com/magnushathaway/30min',
            features: [
              { _key: 'f1', text: 'Feature text goes here', included: true },
              { _key: 'f2', text: 'Feature text goes here', included: true },
              { _key: 'f3', text: 'Feature text goes here', included: true },
              { _key: 'f4', text: 'Feature text goes here', included: false },
              { _key: 'f5', text: 'Feature text goes here', included: false },
            ],
            primary: false,
          },
          {
            _key: 'plan2',
            title: 'Business plan',
            description: 'Lorem ipsum dolor sit amet',
            badge: 'Most Popular',
            price: 299,
            originalPrice: 348,
            ctaText: 'Get Started',
            ctaLink: 'https://cal.com/magnushathaway/30min',
            features: [
              { _key: 'f1', text: 'Feature text goes here', included: true },
              { _key: 'f2', text: 'Feature text goes here', included: true },
              { _key: 'f3', text: 'Feature text goes here', included: true },
              { _key: 'f4', text: 'Feature text goes here', included: true },
              { _key: 'f5', text: 'Feature text goes here', included: true },
            ],
            primary: true,
          },
          {
            _key: 'plan3',
            title: 'Enterprise plan',
            description: 'Lorem ipsum dolor sit amet',
            badge: '',
            price: 499,
            originalPrice: 588,
            ctaText: 'Contact Sales',
            ctaLink: 'https://cal.com/magnushathaway/30min',
            features: [
              { _key: 'f1', text: 'Feature text goes here', included: true },
              { _key: 'f2', text: 'Feature text goes here', included: true },
              { _key: 'f3', text: 'Feature text goes here', included: true },
              { _key: 'f4', text: 'Feature text goes here', included: true },
              { _key: 'f5', text: 'Feature text goes here', included: true },
            ],
            primary: false,
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // OUR TRACK RECORD SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'ourTrackRecord',
    _type: 'ourTrackRecord',
    visible: true,
    title: 'Our track record',
    subtitle: "We don't promise returns. We promise clarity.",
    stats: [
      {
        _key: 'stat1',
        value: '4,000+',
        description: 'Retail Investors Trust Our Research',
      },
      {
        _key: 'stat2',
        value: '25+',
        description: 'Years Cumulative Team Experience',
      },
      {
        _key: 'stat3',
        value: '500k+',
        description: 'Social Media Following',
      },
      {
        _key: 'stat4',
        value: 'High',
        description: 'Renewal Rate Through Oct 2024— Apr 2025 Crash',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // TESTIMONIALS SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'testimonials',
    _type: 'testimonials',
    visible: true,
    title: 'What Our Clients Say',
    items: [
      {
        _key: 'test1',
        name: 'Name Surname',
        positionAndCompany: 'Position, Company name',
        testimonial: '"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."',
      },
      {
        _key: 'test2',
        name: 'Name Surname',
        positionAndCompany: 'Position, Company name',
        testimonial: '"I had money stuck in laggard stocks. The team helped me reallocate based on research. Now I invest with confidence, not fear."',
      },
      {
        _key: 'test3',
        name: 'Name Surname',
        positionAndCompany: 'Position, Company name',
        testimonial: '"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."',
      },
      {
        _key: 'test4',
        name: 'Name Surname',
        positionAndCompany: 'Position, Company name',
        testimonial: '"I had money stuck in laggard stocks. The team helped me reallocate based on research. Now I invest with confidence, not fear."',
      },
      {
        _key: 'test5',
        name: 'Name Surname',
        positionAndCompany: 'Position, Company name',
        testimonial: '"Magnus Hathaway was there during the crash when others disappeared. The research reports helped me understand fundamentals, not just follow tips."',
      },
      {
        _key: 'test6',
        name: 'Name Surname',
        positionAndCompany: 'Position, Company name',
        testimonial: '"I had money stuck in laggard stocks. The team helped me reallocate based on research. Now I invest with confidence, not fear."',
      },
    ],
  },

  // -------------------------------------------------------------------------
  // FAQ SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'faq',
    _type: 'faq',
    visible: true,
    title: 'FAQs',
    description: "Got questions about investing? We're here to help! Explore our FAQ section for answers to common queries and tips to make informed decisions.",
    contactButtonText: 'Contact',
    items: [
      {
        _key: 'faq1',
        question: 'What services will I receive?',
        answer: "Our platform provides stock recommendations aimed at medium to long-term growth, typically held for 6 - 12 months. In addition, you'll receive high-conviction swing trading calls occasionally, with a shorter holding period of 7 - 30 days. This gives you a mix of stable growth and quick opportunities. You will also be informed about the correct time to sell your investments and book profits.",
      },
      {
        _key: 'faq2',
        question: 'How much capital is required to begin?',
        answer: "You can start with as little as ₹50,000, and gradually increase your investment over time. However, we recommend starting with ₹2,00,000 or more to effectively build a diversified portfolio of high-quality stocks through our recommendations.",
      },
      {
        _key: 'faq3',
        question: 'Other than stock recommendations, is there anything else I will receive?',
        answer: "Absolutely! In addition to stock recommendations, you'll gain access to timely market updates, insights into trending sectors, and our in-house research reports. You'll also be invited to exclusive webinars, where we explain the reasoning behind our stock picks, when to buy or sell, and highlight key sectors to watch. These resources will give you a deeper understanding of market trends and help you make more informed investment decisions.",
      },
      {
        _key: 'faq4',
        question: 'What is your investment philosophy?',
        answer: "Our investment philosophy is centered around identifying high-quality, high-growth stocks with strong sectoral tailwinds, and recommending them at the most opportune time, giving you the advantage of early entry. We focus on fundamentally sound companies, potential turnarounds, and special situations that have the potential to deliver significant returns. Our approach is designed to provide you with the best possible chance to grow your wealth while minimizing risks, through well-researched and timely stock picks.",
      },
      {
        _key: 'faq5',
        question: 'How will I receive the information?',
        answer: "All information will be delivered directly to your phone via WhatsApp messages under our branding. Stock recommendations will come in a standardized format, allowing you to easily approve the transaction. You'll be automatically redirected to your brokerage app (e.g., Zerodha, Angel One) to place the trade seamlessly. Additionally, you'll receive regular updates, sector insights, and educational content through the same WhatsApp chat, ensuring everything is conveniently in one place.",
      },
      {
        _key: 'faq6',
        question: 'How will I know when to renew my plan?',
        answer: "You will receive an email notification before your plan expires so that you can renew. You can also opt for auto renewal if you take a recurring subscription payment.",
      },
      {
        _key: 'faq7',
        question: 'How can I contact the Research Analyst if I face any issues?',
        answer: "Once you have purchased a plan, please log in to the investor portal. On the bottom-right side, you will find a chat icon. You can leave your contact information, and our customer care team will get back to you within 24-48 hours to resolve the issue.",
      },
      {
        _key: 'faq8',
        question: 'Would I lose my current plan if I upgrade to a longer term plan?',
        answer: "No worries! Purchase the longer term plan now, and your remaining subscription time will be added at the end, so you don't waste a single rupee.",
      },
      {
        _key: 'faq9',
        question: 'How are the stock weightages determined?',
        answer: "Weightages are carefully allocated to ensure diversification, stability, and growth potential. Adjustments may be made periodically to reflect our latest views on individual stocks and their role in the overall portfolio",
      },
      {
        _key: 'faq10',
        question: 'Will I get support if I have questions?',
        answer: "If you have any technical queries with regards to broker connection or other technical issues, reach out to our technical team at magnushathawayinvestments@gmail.com – they will schedule a discussion with you.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // MEET THE FOUNDER SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'meetTheFounder',
    _type: 'meetTheFounder',
    visible: true,
    sectionTitle: 'Meet the founder',
    sectionSubtitle: 'The team behind the research. The people you can trust.',
    storyParagraphs: [
      "Magnus Hathaway exists because of a simple observation: retail investors aren't losing money because they lack intelligence. They're losing money because they lack time. HNI investors have dedicated teams tracking stocks full-time. Retail investors are juggling day jobs and responsibilities. By the time they research a stock, the opportunity has passed. Or they chase tips from YouTube and Telegram, hoping they picked right.",
      "So Ali Azar built Magnus Hathaway to fill that gap. To do the full-time work of stock research and tracking that retail investors can't do themselves. Not to make them analysts. But to give them what HNI investors have always had: quality stock recommendations, explained clearly, with ongoing support.",
      "Just like discount brokers freed people from expensive middlemen, Magnus Hathaway frees people from having to be full-time analysts.",
    ],
    founderDetails: {
      name: 'Alireza Azar',
      position: 'Founder & SEBI Registered Research Analyst',
      bio: "Ali started Magnus Hathaway after seeing too many retail investors lose money to bad advice half-baked Telegram tips, influencer-led chart patterns, random YouTube calls with no accountability. He believed retail investors deserved better. Not tips. Not hype. Just honest, research-backed guidance that explains why, not just what.",
      credentials: [
        'SEBI Registered Research Analyst (INH000016588)',
        'Chartered Accountant (CA)',
        '15+ years in equity research and analysis',
      ],
    },
  },

  // -------------------------------------------------------------------------
  // BOOK A CALL SECTION
  // -------------------------------------------------------------------------
  {
    _id: 'bookACall',
    _type: 'bookACall',
    visible: true,
    title: 'Want research-backed clarity for your portfolio?',
    subtitle: 'No hype. No pressure. Just research.',
    contactUsLink: 'https://cal.com/magnushathaway/30min',
    bookACallLink: 'https://cal.com/magnushathaway/30min',
    contactUsButtonText: 'Contact Us',
    bookACallButtonText: 'Book a Call',
  },

  // -------------------------------------------------------------------------
  // FOOTER
  // -------------------------------------------------------------------------
  {
    _id: 'footer',
    _type: 'footer',
    visible: true,
    company: {
      title: 'Magnus Hathaway',
    },
    socialLinks: [
      { _key: 'social1', platform: 'facebook', href: 'https://www.facebook.com/magnushathaway' },
      { _key: 'social2', platform: 'instagram', href: 'https://www.instagram.com/magnushathaway' },
      { _key: 'social3', platform: 'twitter', href: 'https://www.twitter.com/magnushathaway' },
      { _key: 'social4', platform: 'linkedin', href: 'https://www.linkedin.com/in/magnushathaway' },
      { _key: 'social5', platform: 'youtube', href: 'https://www.youtube.com/magnushathaway' },
    ],
    disclosuresLinks: [
      { _key: 'disc1', label: 'Investor Charter (Annexure A)', link: 'https://magnushathaway.b-cdn.net/1.%20Annexure%20A-%20Investor%20Charter.docx.pdf' },
      { _key: 'disc2', label: 'Investor Complaints (Annexure B)', link: 'https://magnushathaway.b-cdn.net/2.%20Annexure%20B%20-%20Complaint%20Data.xlsx%20-%20Annexure-%20B.pdf' },
      { _key: 'disc3', label: 'Grievance Redressal Process', link: 'https://magnushathaway.b-cdn.net/3.%20Redressal%20Grievance.docx.pdf' },
      { _key: 'disc4', label: 'Disclaimers', link: 'https://magnushathaway.b-cdn.net/4.%20Disclaimer.docx.pdf' },
      { _key: 'disc5', label: 'Disclosures', link: 'https://magnushathaway.b-cdn.net/5.%20Disclosures.docx.pdf' },
      { _key: 'disc6', label: 'Escalation Matrix', link: 'https://magnushathaway.b-cdn.net/6.%20Escalation%20Matrix.docx.pdf' },
      { _key: 'disc7', label: 'Audit Report', link: 'https://magnushathaway.b-cdn.net/8.%20Audit%20Status.docx.pdf' },
      { _key: 'disc8', label: 'Code of Conduct', link: 'https://magnushathaway.b-cdn.net/10.%20Code%20of%20Conduct.docx.pdf' },
      { _key: 'disc9', label: 'PMLA Policy', link: 'https://magnushathaway.b-cdn.net/11.%20PMLA%20Policy.docx.pdf' },
    ],
    disclosureStatement: 'Past performance is not indicative of future results. Investing in equities involves risk. We provide research, not guarantees.',
    SEBIRegistrationNumber: 'INH000016588',
    officeDetails: {
      researchAnalyst: {
        name: 'Alireza Azar',
        SEBIRegistrationNumber: 'INH000016588',
        registeredOfficeAddress: 'No. 15/A904, Varthur Road, C V Raman Nagar, Nagavara Palya, Bangalore, Karnataka - 560093',
      },
      SEBIOffice: {
        headOfficeAddress: "Plot No. C4-A, 'G' Block Bandra-Kurla Complex, Bandra (East), Mumbai, Maharashtra - 400051",
        localOfficeAddress: '7th Floor, 756-L, Anna Salai, Chennai - 600002, Tamil Nadu',
      },
      grievanceOfficer: {
        name: 'Abdul Ahad Khan',
        telephoneNumber: '+91 9636336788',
        emailID: 'ahad@magnushathaway.com',
      },
      complianceOfficer: {
        name: 'Alireza Azar',
        telephoneNumber: '+91 99834 51155',
        emailID: 'ali_azar@live.com',
      },
    },
    disclosures: [
      'Investment in securities market are subject to market risks. Read all the related documents carefully before investing.',
      'Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.',
    ],
    footerBottom: {
      rights: '© 2024 Magnus Hathaway. All rights reserved.',
      links: [
        { _key: 'foot1', label: 'Privacy Policy', link: 'https://www.magnushathaway.com/privacy-policy' },
        { _key: 'foot2', label: 'Terms of Service', link: 'https://www.magnushathaway.com/terms-of-service' },
        { _key: 'foot3', label: 'Cookie settings', link: 'https://www.magnushathaway.com/cookie-settings' },
      ],
    },
  },
]

// ============================================================================
// SEED FUNCTION
// ============================================================================

async function seedData() {
  console.log('╔════════════════════════════════════════════════════════════════╗')
  console.log('║          SANITY DATA MIGRATION - Magnus Hathaway LP            ║')
  console.log('╚════════════════════════════════════════════════════════════════╝')
  console.log('')
  console.log(`📦 Project: ${projectId}`)
  console.log(`📂 Dataset: ${dataset}`)
  console.log('')
  console.log('Starting migration...')
  console.log('')
  
  const transaction = client.transaction()
  
  for (const doc of initialData) {
    transaction.createOrReplace(doc as SanityDocument)
    console.log(`  ✓ Preparing: ${doc._type} (${doc._id})`)
  }
  
  try {
    console.log('')
    console.log('Committing transaction...')
    const result = await transaction.commit()
    console.log('')
    console.log('╔════════════════════════════════════════════════════════════════╗')
    console.log('║                    ✅ MIGRATION COMPLETE                       ║')
    console.log('╚════════════════════════════════════════════════════════════════╝')
    console.log('')
    console.log(`   Documents migrated: ${initialData.length}`)
    console.log(`   Transaction ID: ${result.transactionId}`)
    console.log('')
    console.log('You can now view your content in Sanity Studio at:')
    console.log('   http://localhost:3000/studio')
    console.log('')
  } catch (error) {
    console.error('')
    console.error('╔════════════════════════════════════════════════════════════════╗')
    console.error('║                    ❌ MIGRATION FAILED                         ║')
    console.error('╚════════════════════════════════════════════════════════════════╝')
    console.error('')
    console.error('Error details:', error)
    process.exit(1)
  }
}

seedData()
