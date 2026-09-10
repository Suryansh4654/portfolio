import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Achievements from './components/sections/Achievements';
import CurrentlyBuilding from './components/sections/CurrentlyBuilding';
import Contact from './components/sections/Contact';
import ChatWidget from './components/chat/ChatWidget';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative selection:bg-[var(--color-accent)] selection:text-white bg-grid-pattern bg-[var(--color-bg-primary)]">
        
        {/* Page Content Container */}
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <CurrentlyBuilding />
            <Contact />
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
