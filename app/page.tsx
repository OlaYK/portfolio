import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Experience from '@/components/Experience';
import Credentials from '@/components/Credentials';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollManager from '@/components/ScrollManager';

export default function Home() {
  return (
    <main>
      <ScrollManager />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Experience />
      <Credentials />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
