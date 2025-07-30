module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", // Your website's URL
  generateRobotsTxt: true, // (Optional) Generates a robots.txt file
  sitemapSize: 7000, // Number of URLs per sitemap file
  changefreq: "weekly",
};
