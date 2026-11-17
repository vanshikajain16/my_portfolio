const fs = require("fs");
const path = require("path");

// next.config.js can't import TypeScript, so read the email straight from data/profile.ts (single source)
const profileSrc = fs.readFileSync(path.join(__dirname, "data", "profile.ts"), "utf8");
const email = (profileSrc.match(/\bemail:\s*"([^"]+)"/) || [])[1];
if (!email) throw new Error("Could not find `email` in data/profile.ts");

// Single source of truth for short-link redirects (edit here only)
const links = [
  { source: "/github", destination: "https://github.com/vanshikajain16" },
  { source: "/linkedin", destination: "https://www.linkedin.com/in/vanshika-j16/" },
  { source: "/resume", destination: "/resume.pdf" },
  { source: "/email", destination: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=Hello%20Vanshika` },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Turn the array above into permanent (308) redirects
  async redirects() {
    return links.map((l) => ({ ...l, permanent: true }));
  },
};

module.exports = nextConfig;
