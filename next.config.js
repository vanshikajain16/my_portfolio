// Single source of truth for short-link redirects (edit here only)
const links = [
  { source: "/github", destination: "https://github.com/vanshikajain16" },
  { source: "/linkedin", destination: "https://www.linkedin.com/in/vanshika-j16/" },
  { source: "/resume", destination: "/resume.pdf" },
  { source: "/email", destination: "mailto:vanshika1632005@gmail.com" },
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
