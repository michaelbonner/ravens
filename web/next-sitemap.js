module.exports = {
  siteUrl: process.env.SITE_URL || "https://ravensfilmworks.com",
  generateRobotsTxt: true,
  transform: async (config, path) => {
    // custom function to ignore the path
    if (path.includes("obfuscated")) {
      return null;
    }

    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
