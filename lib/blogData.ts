export type BlogPost = {
  slug: string;
  image: string;
  date: string;
  title: string;
  description: string;
  content: string[];
};



export const blogData: BlogPost[] = [
  {
    slug: "first-time-home-buyer-guide",
    image: "/assets/img/blog-1.avif",
    date: "May 02, 2026",
    title: "First-Time Home Buyer’s Guide: Things You Must Know",
    description:
      "Buying your first home is a dream milestone — but it can also be overwhelming. Learn the key steps, loan insights, and smart checks every buyer should follow.",
    content: [
      "Buying your first home is one of the most important financial decisions you will make. While it’s exciting, it can also feel overwhelming due to the number of choices and processes involved.",
      "Start by understanding your budget clearly. Evaluate your savings, loan eligibility, and monthly EMI comfort before exploring properties.",
      "Location plays a critical role. Consider connectivity, infrastructure, future development, and nearby facilities like schools and hospitals.",
      "Always verify legal documentation, approvals, and builder credibility before making any commitment.",
      "Home loans are a major part of the journey — compare interest rates, tenure options, and hidden charges carefully.",
      "Taking a structured and informed approach ensures a smooth and confident home-buying experience.",
    ],
  },

  {
    slug: "investing-in-plots-2025",
    image: "/assets/img/blog-2.avif",
    date: "April 28, 2026",
    title: "Why Investing in Plots is a Smart Move in 2025",
    description:
      "The Indian real estate market is evolving fast. Discover why plots are becoming a high-growth investment option compared to traditional apartments.",
    content: [
      "The Indian real estate market is shifting, and plots are emerging as a highly attractive investment option.",
      "Unlike apartments, land investments offer flexibility — you can build as per your needs or hold for long-term appreciation.",
      "Plots generally have lower maintenance costs and fewer restrictions compared to built properties.",
      "With infrastructure development expanding into suburban areas, land prices are seeing strong growth potential.",
      "Investors are increasingly choosing plots for better ROI and long-term wealth creation.",
      "In 2025 and beyond, strategic land investments can deliver significant financial advantages.",
    ],
  },

  {
    slug: "badlapur-real-estate-hotspot",
    image: "/assets/img/blog-3.avif",
    date: "April 22, 2026",
    title: "Why Badlapur is the Next Hotspot for Buyers",
    description:
      "The real estate market around Mumbai is expanding rapidly, and Badlapur is gaining strong attention from homebuyers and investors alike.",
    content: [
      "Mumbai’s real estate expansion is pushing demand toward emerging suburban locations, and Badlapur is one of the fastest-growing areas.",
      "Improved connectivity through rail and road networks has made commuting easier for working professionals.",
      "Property prices in Badlapur are still relatively affordable, making it attractive for first-time buyers and investors.",
      "Upcoming infrastructure projects are expected to further boost property value in the region.",
      "The area offers a balance of affordability, growth potential, and improving lifestyle amenities.",
      "As development continues, Badlapur is positioned to become a major residential and investment hotspot.",
    ],
  },
];