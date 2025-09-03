/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.ngodingin-assist.tech",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: [
    "/api/*",
    "/admin/*",
    "/private/*",
    "/pricing",
    "/about",
    "/services",
    "/blog",
    "/docs",
  ],

  // Custom robots.txt rules
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/pricing",
          "/about",
          "/services",
          "/blog",
          "/docs",
        ],
      },
    ],
    additionalSitemaps: ["https://www.ngodingin-assist.tech/sitemap.xml"],
  },

  // Transform function to customize URLs
  transform: async (config, path) => {
    // Custom priority and changefreq based on path
    let priority = 0.7;
    let changefreq = "weekly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "daily";
    } else if (path.includes("/blog")) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (path.includes("/about") || path.includes("/pricing")) {
      priority = 0.9;
      changefreq = "monthly";
    }

    return {
      loc: path, // The URL
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },

  // Generate additional sitemaps for anchor sections
  additionalPaths: async (config) => [
    await config.transform(config, "/#services"),
    await config.transform(config, "/#portfolio"),
    await config.transform(config, "/#team"),
    await config.transform(config, "/#pricing"),
    await config.transform(config, "/#contact"),
  ],
};
