import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CloudCog,
  Fingerprint,
  Link,
  Mail,
  Menu,
  Network,
  Play,
  Radar,
  ShieldCheck,
  X,
} from "lucide-react";
import { Suspense, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import * as THREE from "three";

const services = [
  {
    number: "01",
    icon: Radar,
    title: "Governance, Risk & Compliance",
    description: "Turn complex requirements into a clear, durable security program built around your business.",
  },
  {
    number: "02",
    icon: CloudCog,
    title: "Regulatory Readiness",
    description: "Prepare for SOC 2, ISO 27001, FedRAMP, CMMC, NIST and evolving privacy obligations.",
  },
  {
    number: "03",
    icon: Fingerprint,
    title: "Security Testing",
    description: "Expose meaningful risk through structured assessment, validation and remediation guidance.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Cloud Assurance",
    description: "Build secure, scalable cloud controls without slowing the teams responsible for growth.",
  },
];

const solutions = [
  {
    number: "01",
    title: "SOC 2 & ISO 27001",
    short: "Build a trustworthy security foundation and move from readiness to audit with confidence.",
    image: "https://images.pexels.com/photos/1181320/pexels-photo-1181320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1100",
  },
  {
    number: "02",
    title: "FedRAMP & CMMC",
    short: "Navigate high-assurance public sector requirements with experienced, practical guidance.",
    image: "https://images.pexels.com/photos/5480781/pexels-photo-5480781.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1100",
  },
  {
    number: "03",
    title: "Privacy & Data Protection",
    short: "Align privacy operations with GDPR, DPDPA, PDPA and the expectations of your customers.",
    image: "https://images.pexels.com/photos/17489156/pexels-photo-17489156.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1100",
  },
  {
    number: "04",
    title: "Third-Party Risk",
    short: "See risk across your ecosystem and make vendor oversight a source of resilience.",
    image: "https://images.pexels.com/photos/17323801/pexels-photo-17323801.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1100",
  },
];

const caseStudies = [
  {
    sector: "Cloud SaaS",
    title: "A clear path from early-stage controls to enterprise trust.",
    result: "SOC 2 readiness",
    image: "https://images.pexels.com/photos/1181330/pexels-photo-1181330.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1200",
  },
  {
    sector: "Financial Services",
    title: "A unified risk model for a fast-moving technology estate.",
    result: "Risk program design",
    image: "https://images.pexels.com/photos/17489157/pexels-photo-17489157.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1100",
  },
  {
    sector: "Enterprise Cloud",
    title: "Security controls that scale across infrastructure and teams.",
    result: "Cloud assurance",
    image: "https://images.pexels.com/photos/1181335/pexels-photo-1181335.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=760&w=1100",
  },
];

function BrandMark() {
  return (
    <a href="#top" className="brand" aria-label="SecureKnots home">
      <svg className="brand-mark" viewBox="0 0 52 52" fill="none" aria-hidden="true">
        <path d="M17 8.5c-4.8 0-8.5 3.6-8.5 8.2 0 2.4 1 4.6 2.9 6.2L29.7 39c1.7 1.5 3.7 2.3 5.9 2.3 4.6 0 8-3.5 8-8 0-2.4-1-4.6-2.9-6.2L22.5 10.8A8.3 8.3 0 0 0 17 8.5Z" stroke="url(#knotGradient)" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M35.2 8.5c4.7 0 8.3 3.6 8.3 8.2 0 2.4-1 4.6-2.8 6.2L22.4 39a8.3 8.3 0 0 1-5.5 2.3c-4.7 0-8.4-3.5-8.4-8 0-2.4 1-4.6 2.9-6.2l18.3-16.3a8.2 8.2 0 0 1 5.5-2.3Z" stroke="url(#knotGradient)" strokeWidth="4.2" strokeLinecap="round" />
        <defs>
          <linearGradient id="knotGradient" x1="7" y1="8" x2="45" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b7d8ff" />
            <stop offset=".45" stopColor="#7b87ff" />
            <stop offset="1" stopColor="#4463ff" />
          </linearGradient>
        </defs>
      </svg>
      <span className="brand-copy"><strong>SecureKnots</strong><small>Security by design.</small></span>
    </a>
  );
}

function SmoothKnot() {
  const knot = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Group>(null);
  const outerPoints = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial>>(null);
  const { pointer, size } = useThree();
  const reduceMotion = useReducedMotion();
  const mobile = size.width < 760;

  useFrame((state, delta) => {
    if (!knot.current) return;
    const time = state.clock.elapsedTime;
    knot.current.rotation.x = THREE.MathUtils.lerp(knot.current.rotation.x, 0.45 + pointer.y * 0.15 + Math.sin(time * 0.5) * 0.04, delta * 1.5);
    knot.current.rotation.y += reduceMotion ? 0 : delta * 0.14;
    knot.current.rotation.z = THREE.MathUtils.lerp(knot.current.rotation.z, -0.24 - pointer.x * 0.11, delta * 1.5);
    knot.current.position.y = reduceMotion ? 0 : Math.sin(time * 0.72) * 0.075;
    if (halo.current && !reduceMotion) {
      halo.current.rotation.z -= delta * 0.045;
      halo.current.rotation.x = Math.sin(time * 0.34) * 0.09;
    }
    if (outerPoints.current && !reduceMotion) {
      outerPoints.current.material.opacity = 0.56 + Math.sin(time * 1.35) * 0.12;
    }
  });

  return (
    <group position={[0, mobile ? -0.98 : -0.68, 0]}>
      <Float speed={reduceMotion ? 0 : 1.1} floatIntensity={0.17} rotationIntensity={0.04}>
        <group ref={knot} scale={mobile ? 0.67 : 0.94} rotation={[0.45, -0.28, -0.24]}>
          <mesh castShadow>
            <torusKnotGeometry args={[1.2, 0.44, 420, 76, 2, 3]} />
            <meshPhysicalMaterial
              color="#2858dc"
              emissive="#061955"
              emissiveIntensity={0.65}
              metalness={0.6}
              roughness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.07}
              iridescence={0.72}
              iridescenceIOR={1.45}
              iridescenceThicknessRange={[180, 520]}
            />
          </mesh>
          <mesh scale={1.014}>
            <torusKnotGeometry args={[1.2, 0.44, 320, 54, 2, 3]} />
            <meshBasicMaterial color="#8c72ff" wireframe transparent opacity={0.12} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh scale={1.026}>
            <torusKnotGeometry args={[1.2, 0.44, 260, 40, 2, 3]} />
            <meshBasicMaterial color="#f5f8ff" wireframe transparent opacity={0.055} blending={THREE.AdditiveBlending} />
          </mesh>
          <points ref={outerPoints} scale={1.045}>
            <torusKnotGeometry args={[1.2, 0.44, 300, 34, 2, 3]} />
            <pointsMaterial color="#f7fbff" size={mobile ? 0.018 : 0.022} transparent opacity={0.62} sizeAttenuation toneMapped={false} blending={THREE.AdditiveBlending} />
          </points>
          <points scale={1.052}>
            <torusKnotGeometry args={[1.2, 0.44, 130, 20, 2, 3]} />
            <pointsMaterial color="#e7b968" size={mobile ? 0.012 : 0.015} transparent opacity={0.48} sizeAttenuation toneMapped={false} blending={THREE.AdditiveBlending} />
          </points>
        </group>
      </Float>
      <group ref={halo} rotation={[0.2, 0.3, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.18, 0.008, 8, 180]} /><meshBasicMaterial color="#6689ff" transparent opacity={0.28} /></mesh>
        <mesh rotation={[Math.PI / 2.7, 0.4, 0.5]}><torusGeometry args={[2.64, 0.006, 8, 180]} /><meshBasicMaterial color="#f3c16f" transparent opacity={0.22} /></mesh>
      </group>
    </group>
  );
}

function KnotScene() {
  return (
    <div className="knot-canvas" aria-label="Animated smooth three-dimensional knot">
      <Canvas camera={{ position: [0, 0, 7.2], fov: 38 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.72} color="#7a8dff" />
        <pointLight position={[-4, 4, 5]} intensity={35} color="#b7dcff" distance={12} />
        <spotLight position={[4, 5, 5]} intensity={74} color="#8b75ff" angle={0.27} penumbra={1} distance={15} />
        <spotLight position={[-2, -1, 5]} intensity={36} color="#e8b45f" angle={0.22} penumbra={1} distance={11} />
        <pointLight position={[3, -3, 3]} intensity={28} color="#4aa8ff" distance={10} />
        <Suspense fallback={null}><SmoothKnot /></Suspense>
      </Canvas>
    </div>
  );
}

function AnimatedField({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  const reduceMotion = useReducedMotion();
  const paths = variant === "hero"
    ? ["M-80 560 C220 380 330 690 650 500 S1040 250 1540 440", "M-100 180 C260 360 420 40 760 220 S1160 500 1540 160", "M180 -40 C300 230 260 520 40 780"]
    : ["M-100 260 C210 20 380 520 720 235 S1170 -20 1540 220", "M-80 80 C280 300 470 -80 790 170 S1220 410 1540 80", "M80 420 C420 190 600 510 940 275 S1280 120 1540 310"];

  return (
    <div className={`animated-field animated-field-${variant}`} aria-hidden="true">
      <svg viewBox="0 0 1440 620" preserveAspectRatio="none">
        {paths.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke={index === 1 ? "#8b78ff" : "#63a8ff"}
            strokeWidth={index === 0 ? 1.4 : 0.8}
            strokeDasharray={index === 0 ? "2 13" : "1 18"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: variant === "hero" ? 0.3 : 0.5, strokeDashoffset: reduceMotion ? 0 : -180 }}
            transition={{ pathLength: { duration: 1.7, delay: 0.2 + index * 0.16 }, opacity: { duration: 0.8 }, strokeDashoffset: { duration: 12 + index * 4, repeat: Infinity, ease: "linear" } }}
          />
        ))}
      </svg>
      <motion.span className="field-orb field-orb-one" animate={reduceMotion ? {} : { x: [0, 45, -15, 0], y: [0, -25, 20, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
      <motion.span className="field-orb field-orb-two" animate={reduceMotion ? {} : { x: [0, -35, 18, 0], y: [0, 22, -12, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

function Reveal({ children, className = "", delay = 0, x = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; x?: number; y?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>;
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <motion.a href={href} className="arrow-link" whileHover={{ x: 4 }}><span>{children}</span><ArrowRight size={15} /></motion.a>;
}

function ServiceCard({ service, index, onOpen }: { service: (typeof services)[number]; index: number; onOpen: () => void }) {
  const Icon = service.icon;
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      className="service-card"
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: reduceMotion ? 0 : index * 0.09, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
    >
      <span className="service-number">{service.number}</span>
      <span className="service-icon"><Icon size={24} strokeWidth={1.45} /></span>
      <span className="service-title">{service.title}</span>
      <span className="service-description">{service.description}</span>
      <span className="service-action"><ArrowRight size={19} strokeWidth={1.45} /></span>
    </motion.button>
  );
}

function LoadingScreen() {
  return (
    <motion.div className="loading-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}><BrandMark /></motion.div>
      <div className="loading-track"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }} /></div>
    </motion.div>
  );
}

function ContactPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`SecureKnots consultation: ${String(form.get("company") || "New inquiry")}`);
    const body = encodeURIComponent(`Name: ${String(form.get("name") || "")}\nCompany: ${String(form.get("company") || "")}\nEmail: ${String(form.get("email") || "")}\n\n${String(form.get("message") || "")}`);
    setSent(true);
    window.location.href = `mailto:Contact@Secureknots.com?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="contact-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="contact-backdrop" aria-label="Close contact panel" onClick={onClose} />
          <motion.aside className="contact-panel" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 220, damping: 28 }} role="dialog" aria-modal="true" aria-labelledby="contact-title">
            <button className="panel-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
            <p className="eyebrow">Start a conversation</p>
            <h2 id="contact-title">Tell us where trust needs to grow.</h2>
            <p>Share a little about your organization and the team will continue the conversation by email.</p>
            <form onSubmit={handleSubmit}>
              <label>Your name<input name="name" autoComplete="name" required placeholder="Jane Smith" /></label>
              <label>Work email<input name="email" type="email" autoComplete="email" required placeholder="jane@company.com" /></label>
              <label>Company<input name="company" autoComplete="organization" required placeholder="Company name" /></label>
              <label>How can we help?<textarea name="message" rows={4} required placeholder="Tell us about your security or compliance goal." /></label>
              <button type="submit" className="primary-button panel-submit">{sent ? "Open email again" : "Prepare email"}<ArrowRight size={16} /></button>
            </form>
            <div className="direct-contact"><Mail size={17} /><a href="mailto:Contact@Secureknots.com">Contact@Secureknots.com</a></div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), reduceMotion ? 50 : 950);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reduceMotion]);

  const openContact = () => { setMenuOpen(false); setContactOpen(true); };
  const changeSolution = (direction: number) => setActiveSolution((current) => (current + direction + solutions.length) % solutions.length);

  return (
    <main id="top" className="site-page">
      <AnimatePresence>{!ready && <LoadingScreen />}</AnimatePresence>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className={`site-header ${scrolled ? "site-header-scrolled" : ""}`}>
        <div className="nav-shell">
          <BrandMark />
          <nav className="desktop-nav" aria-label="Main navigation"><a href="#about">About</a><a href="#services">Services</a><a href="#solutions">Solutions</a><a href="#work">Case Studies</a></nav>
          <div className="nav-actions">
            <button className="nav-cta" onClick={openContact}>Get Started <ArrowRight size={14} /></button>
            <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu" aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav className="mobile-nav" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
              <a onClick={() => setMenuOpen(false)} href="#about">About</a><a onClick={() => setMenuOpen(false)} href="#services">Services</a><a onClick={() => setMenuOpen(false)} href="#solutions">Solutions</a><a onClick={() => setMenuOpen(false)} href="#work">Case Studies</a><button onClick={openContact}>Start a conversation</button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <AnimatedField />
        <KnotScene />
        <div className="hero-shell">
          <motion.div className="hero-copy-left" initial={{ opacity: 0, x: -35 }} animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -35 }} transition={{ duration: 0.9, delay: 0.12 }}>
            <p className="hero-kicker">Cybersecurity / GRC / Assurance</p>
            <h1 id="hero-title">SecureKnots.</h1>
            <p className="hero-manifesto">Security that connects every part of your business.</p>
          </motion.div>
          <motion.div className="hero-copy-right" initial={{ opacity: 0, x: 35 }} animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 35 }} transition={{ duration: 0.9, delay: 0.22 }}>
            <h2>Your trusted <em>cybersecurity partner.</em></h2>
            <p>Security, compliance and engineering connected into one practical path forward.</p>
            <div className="hero-actions">
              <motion.button className="primary-button" onClick={openContact} whileHover={{ x: 4 }}>Start a conversation <ArrowRight size={16} /></motion.button>
              <a className="story-link" href="#about"><span><Play size={12} fill="currentColor" /></span>See how we work</a>
            </div>
          </motion.div>
          <a className="scroll-cue" href="#about"><span>Explore SecureKnots</span><ArrowDown size={15} /></a>
        </div>
      </section>

      <section className="about-section light-section" id="about">
        <div className="section-shell">
          <Reveal className="section-intro"><span className="section-number">01</span><SectionHeading eyebrow="About SecureKnots" title={<>Security that clears the way for <em>growth.</em></>} /></Reveal>
          <div className="about-layout">
            <Reveal className="about-copy" x={-35}>
              <p className="lead-copy">We turn cybersecurity governance, risk and compliance into a business advantage, not another layer of friction.</p>
              <p>Our team works from strategy through implementation, aligning controls with how your people, systems and customers actually operate.</p>
              <div className="about-frameworks"><span>SOC 2</span><span>ISO 27001</span><span>NIST</span><span>FedRAMP</span></div>
              <ArrowLink href="#services">Meet our capabilities</ArrowLink>
            </Reveal>
            <Reveal className="about-visual" x={45} delay={0.08}>
              <motion.img src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1500" alt="Security engineer working inside a modern data center" whileHover={{ scale: 1.025 }} transition={{ duration: 0.6 }} />
              <div className="about-caption"><span>Built around your reality</span><span>Designed to endure</span></div>
            </Reveal>
          </div>
          <div className="principle-line">
            {["Clarity before complexity", "Controls that fit operations", "Confidence beyond the audit"].map((item, index) => <Reveal key={item} delay={index * 0.08}><span>0{index + 1}</span><strong>{item}</strong></Reveal>)}
          </div>
        </div>
      </section>

      <section className="services-section light-section" id="services">
        <div className="section-shell">
          <Reveal className="section-intro section-intro-split"><span className="section-number">02</span><SectionHeading eyebrow="Capabilities" title={<>One connected security <em>practice.</em></>} copy="Focused expertise where governance, regulation, testing and cloud assurance meet." /></Reveal>
          <div className="services-list">{services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} onOpen={openContact} />)}</div>
        </div>
      </section>

      <section className="solutions-section" id="solutions">
        <div className="section-shell">
          <Reveal className="section-intro section-intro-split"><span className="section-number">03</span><SectionHeading eyebrow="Solutions" title={<>A clear path for every stage of the <em>journey.</em></>} /></Reveal>
          <Reveal className="solution-showcase" y={45}>
            <div className="solution-menu" role="tablist" aria-label="Security solutions">
              {solutions.map((solution, index) => <button key={solution.title} className={activeSolution === index ? "active" : ""} onClick={() => setActiveSolution(index)} role="tab" aria-selected={activeSolution === index}><span>{solution.number}</span>{solution.title}</button>)}
            </div>
            <div className="solution-frame">
              <AnimatePresence mode="wait"><motion.img key={solutions[activeSolution].image} src={solutions[activeSolution].image} alt="Cybersecurity infrastructure" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} /></AnimatePresence>
              <div className="solution-frame-index">{solutions[activeSolution].number} / 04</div>
            </div>
            <div className="solution-detail">
              <AnimatePresence mode="wait"><motion.div key={solutions[activeSolution].title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><p className="eyebrow">Selected solution</p><h3>{solutions[activeSolution].title}</h3><p>{solutions[activeSolution].short}</p></motion.div></AnimatePresence>
              <div className="solution-controls"><button onClick={() => changeSolution(-1)} aria-label="Previous solution"><ChevronLeft size={19} /></button><button onClick={() => changeSolution(1)} aria-label="Next solution"><ChevronRight size={19} /></button></div>
              <button className="text-button" onClick={openContact}>Discuss this solution <ArrowRight size={16} /></button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-shell">
          <Reveal className="section-intro section-intro-split"><span className="section-number">04</span><SectionHeading eyebrow="Selected engagements" title={<>Real challenges. Measurable <em>protection.</em></>} copy="See how strategy becomes practical security across industries and operating models." /></Reveal>
          <div className="case-grid">
            {caseStudies.map((study, index) => (
              <motion.button className="case-study" key={study.title} onClick={openContact} initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.8, delay: reduceMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                <span className="case-image"><img src={study.image} alt="" /></span>
                <span className="case-info"><span className="case-meta"><span>{study.sector}</span><span>0{index + 1}</span></span><span className="case-title">{study.title}</span><span className="case-result">{study.result}<ArrowRight size={17} /></span></span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <AnimatedField variant="cta" />
        <Reveal className="cta-content" x={-30} y={0}><p className="eyebrow">Your next move</p><h2>Build trust into what comes <em>next.</em></h2><p>Bring us the security or compliance challenge. We will help make the path clear.</p><button className="primary-button" onClick={openContact}>Talk to SecureKnots <ArrowRight size={16} /></button></Reveal>
      </section>

      <footer className="site-footer">
        <div className="footer-main"><BrandMark /><nav aria-label="Footer navigation"><a href="#about">About</a><a href="#services">Services</a><a href="#solutions">Solutions</a><a href="#work">Case Studies</a></nav><div className="footer-socials"><a href="https://www.linkedin.com/company/secureknotsllc/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Link size={17} /></a><a href="mailto:Contact@Secureknots.com" aria-label="Email"><Mail size={17} /></a><a href="https://secureknots.com" target="_blank" rel="noreferrer" aria-label="SecureKnots website"><Network size={17} /></a></div></div>
        <div className="footer-bottom"><span>© 2026 SecureKnots. All rights reserved.</span><span>Security by design. Trust by connection.</span></div>
      </footer>

      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}