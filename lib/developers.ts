export type Developer = {
  id: number;
  name: string;
  experience: string;
  image: string;
  description: string;
  slug: string;
  about: string;
  vision: string;
  gallery: string[];
};

export const developers: Developer[] = [
  {
    id: 1,
    name: "Pinnacle Group",
    experience: "12+ Years Experience",
    image: "/assets/img/pinnacle.avif",
    slug: "pinnacle-group",

    description:
      "Pinnacle Group is a growing real estate developer known for delivering well-planned residential projects.",

    about:
      "Pinnacle SPM Group is a real estate developer based in Badlapur, Maharashtra, focused on creating quality residential spaces tailored for modern living. Established with the vision of delivering value-driven and well-planned homes, the company has quickly become a recognized name in the local property market through its strategic developments and customer-centric approach.",

    vision:
      "Pinnacle SPM Group is committed to building homes that meet the evolving needs of homebuyers while maintaining high standards of construction, safety, and design.",

    gallery: [
      "/assets/img/p1.avif",
      "/assets/img/p2.avif",
      "/assets/img/p3.avif",
    ],
  },

  {
    id: 2,
    name: "JP Corp",
    experience: "12+ Years Experience",
    image: "/assets/img/JP-Corp.avif",
    slug: "jp-corp",

    description:
      "JP Corporate is a real estate development company focused on creating well-planned residential projects.",

    about:
      "JP Corp focuses on creating premium living spaces that combine innovative architecture, functional layouts and superior construction standards.",

    vision:
      "The company strives to create sustainable and customer-centric developments that provide lasting value.",

    gallery: [
      "/assets/img/p1.avif",
      "/assets/img/p2.avif",
      "/assets/img/p3.avif",
    ],
  },

  {
    id: 3,
    name: "Audumber",
    experience: "12+ Years Experience",
    image: "/assets/img/audumber.avif",
    slug: "audumber",

    description:
      "Audumber Flower Valley is a thoughtfully planned residential project designed to offer peaceful living.",

    about:
      "Audumber Flower Valley combines greenery, quality construction, and modern amenities to create a peaceful lifestyle.",

    vision:
      "Delivering exceptional value with a focus on comfort, design and community living.",

    gallery: [
      "/assets/img/p1.avif",
      "/assets/img/p2.avif",
      "/assets/img/p3.avif",
    ],
  },
];