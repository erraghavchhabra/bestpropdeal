const BASE_URL = "https://propertydeal.alohomorasol.com/wp-json/bap/v1";
const BASE_URL2 ="https://propertydeal.alohomorasol.com/wp-json/wp/v2";

export const API = {
  // Static endpoints
  fastSelling: `${BASE_URL}/properties?status=fast-selling`,
  assured:     `${BASE_URL}/properties?status=blox-assured`,
   // New Status APIs
  ongoing: `${BASE_URL}/properties?status=ongoing`,
  upcoming: `${BASE_URL}/properties?status=upcoming`,
  completed: `${BASE_URL}/properties?status=completed`,

  cities:      `${BASE_URL}/taxonomies/cities`,
  statuses:    `${BASE_URL}/taxonomies/statuses`,
  bhk:         `${BASE_URL}/taxonomies/bhk`,
  settings:    `${BASE_URL}/settings`,
  teamMembers: `${BASE_URL2}/team-members`,
  
  blogs:    `${BASE_URL2}/posts`,
  contactForm: `${BASE_URL2}/contact`,
   theme_settings:    `${BASE_URL2}/theme-settings`,
   aboutPage: `${BASE_URL2}/about-page`,
  
testimonials: (params = {}) => {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v != null && v !== "")
  );
  const query = new URLSearchParams(clean);
  return `${BASE_URL2}/testimonial${query.toString() ? `?${query}` : ""}`;
},

  partners: (params = {}) => {
    const clean = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v != null && v !== "")
    );
    const query = new URLSearchParams(clean);
    return `${BASE_URL2}/partner${query.toString() ? `?${query}` : ""}`;
  },

  virtualTours: (params = {}) => {
    const clean = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v != null && v !== "")
    );
    const query = new URLSearchParams(clean);
    return `${BASE_URL2}/virtual_tour${query.toString() ? `?${query}` : ""}`;
  },

    blogById:    (id)   => `${BASE_URL2}/posts/${id}?_embed`,

     
  // Dynamic endpoints
  property:  (slug)             => `${BASE_URL}/properties/${slug}`,
  similar:   (slug, limit = 4)  => `${BASE_URL}/properties/${slug}/similar?limit=${limit}`,
  search:    (q, params = {})   => {
    const query = new URLSearchParams({ q, ...params });
    return `${BASE_URL}/search?${query}`;
  },

  // Listing with optional filters/pagination
  properties: (params = {}) => {
    const clean = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v != null && v !== "")
    );
    const query = new URLSearchParams(clean);
    return `${BASE_URL}/properties${query.toString() ? `?${query}` : ""}`;
  },
};