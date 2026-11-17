import PortfolioShell from "@/components/PortfolioShell";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Single static page: server component composing the client sections
export default function Home() {
  return (
    <PortfolioShell>
      <Hero />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Contact />
      <Footer />
    </PortfolioShell>
  );
}
