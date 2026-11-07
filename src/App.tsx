import { lazy, Suspense, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MousePointer2,
  Send,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';
import TiltCard from '@/components/TiltCard';
const Scene3DCanvas = lazy(() => import('@/components/Scene3DCanvas'));

type SkillGroup = {
  label: string;
  icon: typeof Code2;
  skills: string[];
};

type Project = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  number: string;
  accent: string;
  url: string;
  linkLabel: string;
};

const skillGroups: SkillGroup[] = [
  { label: 'Programming languages', icon: Terminal, skills: ['Python', 'JavaScript', 'TypeScript', 'Java', 'PHP', 'C', 'C++', 'Assembly', 'SQL'] },
  { label: 'Frontend development', icon: MousePointer2, skills: ['HTML', 'CSS', 'React', 'Vue', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Backend development', icon: Code2, skills: ['Node.js', 'Express', 'Laravel', 'Flask', 'FastAPI', 'Django'] },
  { label: 'Databases', icon: Database, skills: ['MySQL', 'MongoDB', 'Oracle'] },
  { label: 'Mobile development', icon: Layers3, skills: ['Flutter', 'Kotlin'] },
  { label: 'Game development', icon: Layers3, skills: ['Java game dev', 'PyGame'] },
  { label: 'AI / data science', icon: Cpu, skills: ['Machine learning', 'Kaggle', 'Python', 'Jupyter'] },
  { label: 'Tools & OS', icon: Layers3, skills: ['Git', 'GitHub', 'VS Code', 'Linux', 'Kali Linux', 'Windows', 'VirtualBox', 'Figma'] },
];

const projects: Project[] = [
  {
    title: 'Why Not Travel',
    eyebrow: '01 / TRAVEL PLATFORM',
    description: 'A travel discovery platform for exploring destinations, with curated experiences and a smooth booking-ready interface.',
    tags: ['React', 'Vite', 'Tailwind'],
    number: '01',
    accent: 'orange',
    url: 'https://why-not-travel-git-main-melissa12.vercel.app/',
    linkLabel: 'why-not-travel.vercel.app',
  },
  {
    title: 'Altava Travel',
    eyebrow: '02 / TRAVEL PLATFORM',
    description: 'A second travel experience built with a different visual language — focused on immersive destination browsing.',
    tags: ['React', 'Vercel', 'UI'],
    number: '02',
    accent: 'blue',
    url: 'https://altava-travel.vercel.app/',
    linkLabel: 'altava-travel.vercel.app',
  },
  {
    title: 'Weather Website',
    eyebrow: '03 / UTILITY APP',
    description: 'A weather application that pulls live data to display current conditions and forecasts in a clean, responsive layout.',
    tags: ['JavaScript', 'API', 'CSS'],
    number: '03',
    accent: 'green',
    url: 'https://meliisse.github.io/weather-website/weather.html',
    linkLabel: 'meliisse.github.io/weather',
  },
  {
    title: '2048 Game',
    eyebrow: '04 / GAME',
    description: 'A browser-based 2048 puzzle game with smooth tile animations and keyboard / touch controls.',
    tags: ['JavaScript', 'Game', 'DOM'],
    number: '04',
    accent: 'orange',
    url: 'https://meliisse.github.io/game-2048/game.html',
    linkLabel: 'meliisse.github.io/game-2048',
  },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [copied, setCopied] = useState(false);
  const [available, setAvailable] = useState(true);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const heroRef = useRef<HTMLDivElement>(null);

  useReveal();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const filters = ['All', 'Frontend', 'Backend', 'AI / data', 'Mobile', 'Tools'];
  const filteredSkills = useMemo(() => {
    if (activeFilter === 'All') return skillGroups;
    const matched = activeFilter === 'Frontend'
      ? ['Frontend development']
      : activeFilter === 'Backend'
        ? ['Backend development', 'Databases']
        : activeFilter === 'AI / data'
          ? ['AI / data science']
          : activeFilter === 'Mobile'
            ? ['Mobile development', 'Game development']
            : ['Tools & OS', 'Programming languages'];
    return skillGroups.filter((group) => matched.includes(group.label));
  }, [activeFilter]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText('Let’s build something thoughtful together.');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <div className="bg-3d-canvas">
        <Suspense fallback={<div className="scene-fallback" />}>
          <Scene3DCanvas />
        </Suspense>
      </div>
      <div className="cursor-spotlight" style={{ '--cx': `${cursor.x}px`, '--cy': `${cursor.y}px` } as CSSProperties} />

      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Melissa Mokhbat home">
          <span className="brand-mark">M</span>
          <span>Melissa<span className="brand-dot">.</span></span>
        </a>

        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#stack" onClick={closeMenu}>Stack</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-frame" ref={heroRef}>
          <div className="hero-copy reveal-up">
            <div className="eyebrow"><span className="eyebrow-line" /> Based in Algeria · Working worldwide</div>
            <h1>Building the <em>next</em><br />useful thing.</h1>
            <p className="hero-lead">I&apos;m <strong>Melissa Mokhbat</strong>, a full stack developer blending software, artificial intelligence and thoughtful design.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">See my projects <ArrowDownRight size={17} /></a>
              <a className="text-link" href="#about">More about me <ChevronRight size={16} /></a>
            </div>
            <div className="hero-note"><span className="pulse-dot" /> Currently open to meaningful collaborations</div>
          </div>

          <div className="hero-visual" aria-label="Melissa's profile visual">
            <div className="parallax-layer" data-depth="0.3">
              <TiltCard className="visual-card main-card" maxTilt={18}>
                <div className="card-topline"><span>MM / 2026</span><span>01—04</span></div>
                <div className="portrait-placeholder">
                  <img className="portrait-image" src="/image.png" alt="Melissa Mokhbat wearing her graduation stole" />
                  <span className="portrait-caption">full stack<br />developer</span>
                </div>
                <div className="card-bottomline"><span>ALGIERS, DZ</span><span>AVAILABLE</span></div>
              </TiltCard>
            </div>
            <div className="floating-card floating-card-top"><Sparkles size={15} /><span>Curious<br /><b>by default.</b></span></div>
            <div className="floating-card floating-card-bottom"><Globe2 size={16} /><span>Remote<br /><b>friendly.</b></span></div>
            <div className="visual-index">scroll to<br />explore <ArrowDownRight size={16} /></div>
          </div>
        </section>

        <section className="marquee-strip" aria-label="Areas of focus">
          <div className="marquee-track"><span>FULL STACK</span><i>✳</i><span>ARTIFICIAL INTELLIGENCE</span><i>✳</i><span>UX / UI</span><i>✳</i><span>DATA SCIENCE</span><i>✳</i><span>FULL STACK</span><i>✳</i><span>ARTIFICIAL INTELLIGENCE</span><i>✳</i></div>
        </section>

        <section className="about section-frame reveal" id="about">
          <div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>About me</span></div>
          <div className="about-grid">
            <h2>Curious mind.<br /><span>Builder&apos;s hands.</span></h2>
            <div className="about-content">
              <p className="large-copy">I like the space where logic meets imagination. My work moves between robust full stack foundations, intelligent systems and interfaces that make people feel instantly at home.</p>
              <p>Currently pursuing a Master&apos;s degree in Intelligent Computer Systems, after a Bachelor&apos;s degree in Information Systems and Software Engineering. I&apos;m especially interested in the moment an idea becomes something people can actually use.</p>
              <a className="text-link" href="#stack">See what I work with <ChevronRight size={16} /></a>
            </div>
          </div>
          <div className="facts-row">
            <div><span className="fact-number">01</span><span>Intelligent computer<br />systems</span></div>
            <div><span className="fact-number">02</span><span>Information systems<br />& software engineering</span></div>
            <div><span className="fact-number">03</span><span>Learning, always<br />in progress</span></div>
          </div>
        </section>

        <section className="stack section-frame reveal" id="stack">
          <div className="section-kicker"><span>02</span><span className="kicker-rule" /><span>Toolbox</span></div>
          <div className="stack-heading"><h2>The stack<br /><span>behind the ideas.</span></h2><div className="filter-row">{filters.map((filter) => <button key={filter} className={activeFilter === filter ? 'filter-button active' : 'filter-button'} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div></div>
          <div className="skill-grid">{filteredSkills.map(({ label, icon: Icon, skills }, index) => <div className="skill-group" key={label}><div className="skill-title"><Icon size={16} /><span>{String(index + 1).padStart(2, '0')}</span><h3>{label}</h3></div><div className="skill-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div>
        </section>

        <section className="work section-frame reveal" id="work">
          <div className="section-kicker"><span>03</span><span className="kicker-rule" /><span>Selected work</span></div>
          <div className="work-heading"><h2>Real projects.<br /><span>Live links.</span></h2><p>Each project below is deployed and clickable — explore them directly.</p></div>
          <div className="project-grid">
            {projects.map((project) => (
              <a className={`project-card-link ${project.accent}`} key={project.title} href={project.url} target="_blank" rel="noopener noreferrer">
                <TiltCard className={`project-card ${project.accent}`} maxTilt={10}>
                  <div className="project-number">{project.number}</div>
                  <div className="project-body">
                    <span className="project-eyebrow">{project.eyebrow}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="project-link"><ExternalLink size={13} /> {project.linkLabel}</div>
                  </div>
                  <ArrowUpRight className="project-arrow" size={22} />
                </TiltCard>
              </a>
            ))}
          </div>
        </section>

        <section className="contact section-frame reveal" id="contact">
          <div className="contact-card"><div className="contact-decoration">LET&apos;S<br />MAKE<br /><span>IT.</span></div><div className="contact-content"><div className="section-kicker light"><span>04</span><span className="kicker-rule" /><span>Start a conversation</span></div><h2>Have a good<br /><em>idea?</em></h2><p>I&apos;m always up for exploring thoughtful products, clever systems and ambitious little experiments.</p><div className="contact-actions"><a className="button button-light" href="mailto:mokhbatmelissa2@gmail.com">Send a message <Send size={16} /></a><button className="copy-button" onClick={handleCopy}>{copied ? <Check size={15} /> : <Download size={15} />} {copied ? 'Copied to clipboard' : 'Copy a little note'}</button></div></div></div>
        </section>
      </main>

      <footer className="site-footer section-frame"><div className="footer-brand"><span className="brand-mark">M</span><span>Melissa Mokhbat</span></div><button className="availability" onClick={() => setAvailable((value) => !value)}><span className={available ? 'pulse-dot' : 'pulse-dot off'} /> {available ? 'Available for select work' : 'Currently in focus mode'}</button><div className="socials"><a href="mailto:mokhbatmelissa2@gmail.com" aria-label="Email"><Mail size={18} /></a><a href="https://www.linkedin.com/in/melissa-mokhbat-120a90333/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="https://github.com/meliisse" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a></div><span className="footer-year">© 2026</span></footer>
    </div>
  );
}

export default App;
