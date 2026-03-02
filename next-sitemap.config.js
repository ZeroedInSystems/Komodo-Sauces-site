/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://komodosauces.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/"] },
    ],
  },
  /** @param {import('next-sitemap').IConfig} config @param {string} path */
  transform: async (config, path) => {
    /** @type {Record<string, number>} */
    const priorities = {
      "/": 1.0,
      "/our-story": 0.7,
      "/mission": 0.7,
      "/blog": 0.8,
      "/faq": 0.5,
      "/ask": 0.5,
    };

    /** @type {Record<string, string>} */
    const changefreqs = {
      "/": "weekly",
      "/blog": "weekly",
    };

    const isProductPage = path.startsWith("/products/");
    const isBlogPost = path.startsWith("/blog/") && path !== "/blog";

    return {
      loc: path,
      changefreq:
        changefreqs[path] ??
        (isProductPage ? "daily" : isBlogPost ? "weekly" : "monthly"),
      priority:
        priorities[path] ??
        (isProductPage ? 0.9 : isBlogPost ? 0.7 : 0.5),
      lastmod: new Date().toISOString(),
    };
  },
};
