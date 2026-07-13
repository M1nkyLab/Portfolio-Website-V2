import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import PagePeelLayout from "@/components/common/PagePeelLayout";

export default function Home() {
  return (
    <main className="font-body selection:bg-syedhaziq-gold/30 selection:text-syedhaziq-gold">
      <PagePeelLayout 
        topLayer={<Hero />}
        sections={{
          "top-left": <About />,
          "top-right": <FeaturedWork />,
          "bottom-left": <Experience />,
          "bottom-right": <Contact />
        }}
        labels={{
          "top-left": "ABOUT",
          "top-right": "WORK",
          "bottom-left": "BACKGROUND",
          "bottom-right": "CONTACT"
        }}
      />
    </main>
  );
}
