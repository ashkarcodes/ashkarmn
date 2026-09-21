import { createFileRoute } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { z } from "zod";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight, ArrowUp, Braces, Check, ChevronRight, Code2, Database, Download,
  ExternalLink, Github, Globe2, Layers3, Linkedin, Mail, MapPin, Menu, Phone,
  Server, ShieldCheck, Smartphone, Sparkles, TestTube2, X,
} from "lucide-react";
import resumeAsset from "../assets/ashkar-resume.pdf.asset.json";
import profilePortrait from "../assets/ashkar-portrait-transparent.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ashkar M N — Software Engineer & Full-Stack Developer" },
      { name: "description", content: "Portfolio of Ashkar M N, an MCA graduate and software engineer focused on full-stack, backend, API, database, and mobile development." },
      { property: "og:title", content: "Ashkar M N — Software Engineer" },
      { property: "og:description", content: "Full-stack and backend developer building practical, reliable web and mobile applications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const nav = ["Home", "About", "Experience", "Skills", "Services", "Projects", "Education", "Contact"];
const specializations = ["Python Developer", "Django Developer", "Full-Stack Developer", "Backend Developer"];

const skills = [
  { icon: Code2, title: "Programming Languages", items: ["Python", "Java", "JavaScript", "TypeScript", "PHP", "C", "C++", "Dart"] },
  { icon: Server, title: "Backend & APIs", items: ["Django", "REST APIs", "API Integration", "Authentication", "RBAC"] },
  { icon: Globe2, title: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Responsive Design"] },
  { icon: Database, title: "Databases", items: ["MySQL", "MongoDB", "SQL", "Relational Design", "NoSQL Design"] },
  { icon: Smartphone, title: "Mobile Development", items: ["Flutter", "Dart", "API Integration"] },
  { icon: TestTube2, title: "Testing & Automation", items: ["Playwright", "Postman", "JMeter", "API Testing", "E2E Testing", "POM"] },
  { icon: Braces, title: "Tools & DevOps", items: ["Git", "GitHub", "GitHub Actions", "CI/CD", "JIRA", "Linux"] },
  { icon: Layers3, title: "Core Concepts", items: ["OOP", "Data Structures", "SDLC", "STLC", "Agile / Scrum"] },
];

const services = [
  { icon: Layers3, title: "Full-Stack Web Development", text: "Responsive, database-driven applications with clean interfaces and reliable backend functionality." },
  { icon: Server, title: "Backend & REST APIs", text: "Python and Django systems with REST APIs, authentication, RBAC, and database integration." },
  { icon: Globe2, title: "API Integration", text: "Third-party services connected to web and mobile products for practical, automated workflows." },
  { icon: Database, title: "Database Design", text: "Efficient MySQL and MongoDB structures designed around real application workflows." },
  { icon: Smartphone, title: "Flutter Development", text: "Cross-platform mobile functionality using Flutter, Dart, and backend API integration." },
  { icon: TestTube2, title: "Testing & Automation", text: "Manual, API, end-to-end, performance, and load testing for dependable software delivery." },
];

type Project = { title: string; category: string; summary: string; stack: string[]; contribution: string; tone: string; features: string[]; problem: string; solution: string };
const projects: Project[] = [
  { title: "AI CyberShield", category: "Cybersecurity Web Application", summary: "A full-stack security platform for checking phishing URLs, malicious files, unsafe networks, and compromised credentials.", stack: ["Python", "Django", "Flutter", "MySQL", "REST APIs"], contribution: "Designed the architecture and built authentication, RBAC, database integration, security checks, and VirusTotal and LeakCheck integrations.", tone: "shield", features: ["Phishing URL analysis", "Malicious file scanning", "Credential breach checks", "User, expert, and admin roles"], problem: "Security checks are often fragmented across technical tools that are difficult for everyday users to navigate.", solution: "A unified role-based platform presents real-time checks in a clearer web and mobile workflow." },
  { title: "NewsRater", category: "Digital News Marketplace", summary: "A database-driven platform connecting user-generated real-time news video with media organizations.", stack: ["Python", "MySQL", "MongoDB"], contribution: "Built authentication, content management, database integration, and upload, verification, and purchase workflows.", tone: "news", features: ["Video submission", "Content verification", "Media marketplace", "Purchase workflow"], problem: "Citizen footage lacks a structured path from capture to verification and media distribution.", solution: "A managed marketplace workflow connects uploaders with media organizations." },
  { title: "E-Learning Platform", category: "Academic Management", summary: "A role-based web platform for courses, assessments, reporting, and digital academic workflows.", stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"], contribution: "Developed application functionality, database workflows, and student, teacher, and administrator access.", tone: "learn", features: ["Course management", "Assessments", "Progress reporting", "Role-based portals"], problem: "Academic tasks spread across disconnected manual processes are difficult to track.", solution: "A central database-backed application organizes learning and administration." },
  { title: "Online Car Parking", category: "Search & Reservation App", summary: "A responsive application for finding available parking and reserving slots digitally.", stack: ["PHP", "MySQL", "HTML", "CSS"], contribution: "Implemented availability, reservation, SQL-based tracking, database integration, and booking management.", tone: "parking", features: ["Live availability", "Parking search", "Digital reservation", "Booking management"], problem: "Drivers lose time finding parking while operators lack a clear reservation view.", solution: "A responsive search and booking flow connects availability data with reservations." },
  { title: "SpreeCommerce Storefront", category: "QA Automation & Quality", summary: "A comprehensive e-commerce testing project covering core customer journeys and automated regression testing.", stack: ["Playwright", "TypeScript", "Postman", "JMeter", "POM"], contribution: "Designed manual and E2E scenarios, Playwright POM automation, API validation, and performance/load tests.", tone: "test", features: ["Regression automation", "API validation", "Performance testing", "Test reporting"], problem: "Commerce regressions can break high-value customer journeys across UI, API, and load conditions.", solution: "A layered quality strategy combines repeatable automation, API checks, and performance evidence." },
];

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [typed, setTyped] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setTyped((value) => (value + 1) % specializations.length), 2400);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1)); }), { rootMargin: "-35% 0px -55%" });
    nav.forEach((item) => { const el = document.getElementById(item.toLowerCase()); if (el) observer.observe(el); });
    return () => { window.clearInterval(timer); observer.disconnect(); };
  }, []);

  const jump = (item: string) => { document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/25">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 lg:px-8">
        <button onClick={() => jump("Home")} className="flex min-w-0 items-center gap-3 text-left" aria-label="Go to home">
          <span className="grid size-9 shrink-0 place-items-center rounded-md border border-primary/40 bg-primary/10 font-mono text-sm font-bold text-primary">AM</span>
          <span className="truncate font-semibold">Ashkar M N</span>
        </button>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {nav.map((item) => <button key={item} onClick={() => jump(item)} className={`nav-link ${active === item ? "nav-link-active" : ""}`}>{item}</button>)}
          <a className="btn-primary ml-3" href={resumeAsset.url} download="Ashkar-M-N-Resume.pdf"><Download size={15}/> Resume</a>
        </nav>
        <button className="icon-btn lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      {menuOpen && <nav className="border-t border-border bg-background px-5 py-4 lg:hidden">{nav.map((item) => <button key={item} onClick={() => jump(item)} className="block w-full border-b border-border/60 py-3 text-left text-sm">{item}</button>)}<a className="btn-primary mt-4 w-full" href={resumeAsset.url} download><Download size={15}/> Download Resume</a></nav>}
    </header>

    <main>
      <section id="home" className="relative flex min-h-[760px] items-center overflow-hidden border-b border-border pt-24">
        <div className="hero-grid absolute inset-0" aria-hidden="true"/><div className="hero-glow absolute right-0 top-0 size-[40rem]" aria-hidden="true"/>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-[minmax(0,3fr)_minmax(15rem,2fr)] md:gap-8 lg:gap-14 lg:px-8">
          <div className="max-w-3xl animate-enter">
            <p className="eyebrow"><span className="status-dot"/> Available for software engineering opportunities</p>
            <h1 className="mt-7 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">Hi, I'm <span className="text-primary">Ashkar M N</span></h1>
            <p className="mt-6 text-xl font-medium text-foreground sm:text-2xl">Software Engineer <span className="text-muted-foreground">| Full-Stack & Backend Developer</span></p>
            <div className="mt-4 h-7 font-mono text-sm text-primary" aria-live="polite"><span className="text-muted-foreground">&gt; </span>{specializations[typed]}<span className="typing-cursor">_</span></div>
            <HeroPortrait className="hero-portrait-mobile" />
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">I'm an MCA graduate and aspiring Software Engineer with hands-on experience building full-stack and backend applications using Python, Django, JavaScript, REST APIs, MySQL, and MongoDB. My testing and automation experience adds a strong focus on quality and reliability.</p>
            <div className="mt-9 flex flex-wrap gap-3"><button onClick={() => jump("Projects")} className="btn-primary">View My Work <ArrowRight size={16}/></button><a className="btn-secondary" href={resumeAsset.url} download="Ashkar-M-N-Resume.pdf"><Download size={16}/> Download Resume</a></div>
            <div className="mt-8 flex items-center gap-3"><a className="icon-btn" href="https://linkedin.com/in/ashkarmn" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a><span className="icon-btn opacity-40" aria-label="GitHub profile not yet available"><Github size={18}/></span><a className="icon-btn" href="mailto:ashkarbinnazar@gmail.com" aria-label="Email Ashkar"><Mail size={18}/></a></div>
          </div>
          <HeroPortrait className="hero-portrait-desktop" />
        </div>
      </section>

      <Section id="about" eyebrow="About me" title="Engineering practical software for real users." intro="My focus is becoming a well-rounded software engineer across web, backend, mobile, databases, and software quality.">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div className="code-panel"><div className="code-panel-bar"><span/><span/><span/></div><pre><code><b>class</b> SoftwareEngineer:{"\n"}  focus = ["backend", "full-stack"]{"\n"}  mindset = "quality-first"{"\n"}  goal = "build useful software"</code></pre></div>
          <div><p className="text-lg leading-8 text-muted-foreground">As an MCA graduate, I have built practical experience across backend systems, API integrations, responsive interfaces, database-driven products, and Flutter applications. I enjoy translating real-world needs into maintainable software and continuously learning modern technologies.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{["Full-Stack Development", "Backend Engineering", "REST API Development", "Database Applications", "Mobile Development", "Quality-Focused Engineering"].map(x=><div className="attribute" key={x}><Check size={15}/>{x}</div>)}</div></div>
        </div>
      </Section>

      <Section id="experience" eyebrow="Experience" title="Building software. Validating quality." intro="Two complementary internships shaped how I design, implement, and verify dependable applications." muted>
        <div className="timeline">
          <Experience date="Feb — May 2026" title="Python Django & Flutter Developer Intern" company="Regional Institute" text="Worked on full-stack application development using Python, Django, MySQL, Flutter, and Dart." items={["Backend REST API development", "Authentication and RBAC", "Database schema design", "Third-party API integration", "Cross-platform Flutter development"]}/>
          <Experience date="Jun — Aug 2026" title="Software Testing / QA Engineer Intern" company="Testing Mavens" text="Developed hands-on experience validating web applications in Agile development environments." items={["Manual, functional, and E2E testing", "Playwright with TypeScript and POM", "Postman API testing", "Apache JMeter performance testing", "JIRA and GitHub Actions"]}/>
        </div>
      </Section>

      <Section id="skills" eyebrow="Technical toolkit" title="Technologies I work with." intro="A practical toolkit covering the full delivery path—from application logic and data to interfaces and validation.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{skills.map(({icon:Icon,title,items})=><article className="skill-card" key={title}><Icon className="text-primary"/><h3>{title}</h3><div className="flex flex-wrap gap-2">{items.map(x=><span className="badge" key={x}>{x}</span>)}</div></article>)}</div>
      </Section>

      <Section id="services" eyebrow="Capabilities" title="How I can contribute." intro="Development-first capabilities for teams building reliable web, backend, and mobile products." muted>
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">{services.map(({icon:Icon,title,text},i)=><article className={`service-card ${i===5 ? "service-secondary" : ""}`} key={title}><span className="service-index">0{i+1}</span><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div>
      </Section>

      <Section id="projects" eyebrow="Selected work" title="Applications built around real problems." intro="Development projects lead this collection, supported by one quality engineering case study.">
        <div className="project-grid">{projects.map((item,index)=><article className={`project-card ${index===0 ? "project-featured" : ""}`} key={item.title}>
          <ProjectVisual project={item}/><div className="p-6 sm:p-7"><p className="eyebrow">{item.category}</p><h3 className="mt-3 text-2xl font-semibold">{item.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{item.summary}</p><div className="mt-5 flex flex-wrap gap-2">{item.stack.map(x=><span className="badge" key={x}>{x}</span>)}</div><button onClick={()=>setProject(item)} className="text-link mt-6">View case study <ChevronRight size={16}/></button></div>
        </article>)}</div>
      </Section>

      <Section id="education" eyebrow="Education" title="Academic foundation." intro="Formal computer application study supported by practical project and internship experience." muted>
        <div className="grid gap-5 md:grid-cols-2"><Education years="2024 — 2026" degree="Master of Computer Applications (MCA)" school="APJ Abdul Kalam Technological University (KTU)"/><Education years="2021 — 2024" degree="Bachelor of Computer Applications (BCA)" school="Mahatma Gandhi University (MG University)"/></div>
      </Section>

      <Section id="contact" eyebrow="Contact" title="Let's build something meaningful." intro="Recruiters, development teams, collaborators, and companies are welcome to reach out about software engineering opportunities.">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><h3 className="text-xl font-semibold">Ashkar M N</h3><div className="mt-6 space-y-4 text-muted-foreground"><ContactLine icon={MapPin} text="Kottayam, Kerala, India"/><ContactLine icon={Mail} text="ashkarbinnazar@gmail.com" href="mailto:ashkarbinnazar@gmail.com"/><ContactLine icon={Phone} text="+91 8129559057" href="tel:+918129559057"/><ContactLine icon={Linkedin} text="linkedin.com/in/ashkarmn" href="https://linkedin.com/in/ashkarmn"/></div><p className="mt-8 border-l-2 border-primary pl-4 text-sm leading-6 text-muted-foreground">GitHub will be added when Ashkar's verified profile URL is available.</p></div><ContactForm/></div>
      </Section>
    </main>

    <footer className="border-t border-border py-7"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-sm text-muted-foreground sm:flex-row lg:px-8"><span>© 2026 Ashkar M N. All rights reserved.</span><div className="flex items-center gap-3"><a className="icon-btn" href="https://linkedin.com/in/ashkarmn" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16}/></a><a className="icon-btn" href="mailto:ashkarbinnazar@gmail.com" aria-label="Email"><Mail size={16}/></a><button className="icon-btn" onClick={()=>jump("Home")} aria-label="Back to top"><ArrowUp size={16}/></button></div></div></footer>

    <Dialog.Root open={!!project} onOpenChange={(open)=>{if(!open){setProject(null);setLightbox(false)}}}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="dialog-content">{project&&<><div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur"><div><Dialog.Title className="font-semibold">{project.title}</Dialog.Title><Dialog.Description className="text-sm text-muted-foreground">{project.category}</Dialog.Description></div><Dialog.Close className="icon-btn" aria-label="Close"><X size={18}/></Dialog.Close></div><div className="p-5 sm:p-8"><button onClick={()=>setLightbox(true)} className="block w-full overflow-hidden rounded-lg focus:outline-hidden focus:ring-2 focus:ring-ring"><ProjectVisual project={project}/></button><p className="mt-3 text-xs text-muted-foreground">Select the project preview to enlarge it.</p><div className="case-grid"><Case title="Overview" text={project.summary}/><Case title="Problem" text={project.problem}/><Case title="Solution" text={project.solution}/><Case title="My contribution" text={project.contribution}/></div><h4 className="mt-8 font-semibold">Key features</h4><div className="mt-3 grid gap-2 sm:grid-cols-2">{project.features.map(x=><div className="attribute" key={x}><Check size={14}/>{x}</div>)}</div><h4 className="mt-8 font-semibold">Technology stack</h4><div className="mt-3 flex flex-wrap gap-2">{project.stack.map(x=><span className="badge" key={x}>{x}</span>)}</div><div className="notice mt-8"><ShieldCheck size={18}/><span>Source code is not publicly available. Project visuals and implementation details are provided here.</span></div></div></>}</Dialog.Content></Dialog.Portal></Dialog.Root>
    <Dialog.Root open={lightbox} onOpenChange={setLightbox}><Dialog.Portal><Dialog.Overlay className="dialog-overlay"/><Dialog.Content className="lightbox">{project&&<ProjectVisual project={project}/>}<Dialog.Close className="icon-btn absolute right-3 top-3" aria-label="Close image"><X/></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
  </div>;
}

function Section({id,eyebrow,title,intro,muted=false,children}:{id:string;eyebrow:string;title:string;intro:string;muted?:boolean;children:React.ReactNode}) { return <section id={id} className={`scroll-mt-20 border-b border-border py-24 sm:py-28 ${muted?"bg-muted/25":""}`}><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-12 max-w-2xl"><p className="eyebrow">{eyebrow}</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2><p className="mt-4 leading-7 text-muted-foreground">{intro}</p></div>{children}</div></section> }
function Experience({date,title,company,text,items}:{date:string;title:string;company:string;text:string;items:string[]}) { return <article className="timeline-item"><div className="timeline-dot"/><p className="font-mono text-xs text-primary">{date}</p><h3 className="mt-2 text-xl font-semibold">{title}</h3><p className="mt-1 text-sm font-medium text-secondary-foreground">{company}</p><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{text}</p><div className="mt-5 grid gap-2 sm:grid-cols-2">{items.map(x=><span className="flex items-center gap-2 text-sm text-muted-foreground" key={x}><Check className="text-primary" size={14}/>{x}</span>)}</div></article> }
function Education({years,degree,school}:{years:string;degree:string;school:string}) { return <article className="education-card"><p className="font-mono text-xs text-primary">{years}</p><h3 className="mt-3 text-lg font-semibold">{degree}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{school}</p></article> }
function ContactLine({icon:Icon,text,href}:{icon:typeof Mail;text:string;href?:string}) { const body=<><Icon className="text-primary" size={18}/><span>{text}</span></>; return href?<a className="flex items-center gap-3 hover:text-foreground" href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer">{body}</a>:<div className="flex items-center gap-3">{body}</div> }
function Case({title,text}:{title:string;text:string}) { return <div><h4 className="font-semibold text-primary">{title}</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div> }
function ProjectVisual({project}:{project:Project}) { return <div className={`project-visual visual-${project.tone}`} role="img" aria-label={`${project.title} application interface preview`}><div className="browser-bar"><span/><span/><span/><em>{project.title.toLowerCase().replaceAll(" ","-")}.app</em></div><div className="mock-layout"><div className="mock-sidebar"><b>AM</b><i/><i/><i/><i/></div><div className="mock-main"><div className="mock-heading"><div><small>{project.category}</small><strong>{project.title}</strong></div><button aria-hidden="true">Open</button></div><div className="mock-stats"><span/><span/><span/></div><div className="mock-content"><div/><div/></div></div></div></div> }
function HeroPortrait({className}:{className:string}) { return <div className={`portrait-stage ${className}`}><div className="portrait-ambient" aria-hidden="true"/><img className="portrait-image" src={profilePortrait} alt="Ashkar M N - Software Engineer" width={1024} height={1024} fetchPriority="high" /></div> }

const contactSchema=z.object({name:z.string().trim().min(2,"Please enter your name.").max(100),email:z.string().trim().email("Enter a valid email address.").max(255),subject:z.string().trim().min(3,"Please add a subject.").max(120),message:z.string().trim().min(10,"Please add a little more detail.").max(1500)});
function ContactForm(){ const [errors,setErrors]=useState<Record<string,string>>({}); const [sent,setSent]=useState(false); const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const form=new FormData(e.currentTarget);const parsed=contactSchema.safeParse(Object.fromEntries(form));if(!parsed.success){setErrors(Object.fromEntries(parsed.error.issues.map(i=>[String(i.path[0]),i.message])));setSent(false);return}setErrors({});setSent(true);e.currentTarget.reset()}; return <form onSubmit={submit} noValidate className="contact-form"><div className="grid gap-5 sm:grid-cols-2"><Field name="name" label="Name" error={errors["name"]}/><Field name="email" label="Email" type="email" error={errors["email"]}/></div><Field name="subject" label="Subject" error={errors["subject"]}/><label><span>Message</span><textarea name="message" rows={5} maxLength={1500} aria-invalid={!!errors["message"]}/>{errors["message"]&&<small>{errors["message"]}</small>}</label><button className="btn-primary" type="submit">Send Message <ArrowRight size={16}/></button>{sent&&<div className="success" role="status"><Check size={16}/> Message validated. Your email app can be used to send it to Ashkar.</div>}</form> }
function Field({name,label,type="text",error}:{name:string;label:string;type?:string;error?:string|undefined}) { return <label><span>{label}</span><input name={name} type={type} maxLength={name==="email"?255:120} aria-invalid={!!error}/>{error&&<small>{error}</small>}</label> }
