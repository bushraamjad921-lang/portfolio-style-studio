import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Pencil, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { initialProfile, sampleProjects } from '@/lib/portfolio-data';
import studioImage from '@/assets/design-studio.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Bushra Amjad — Junior UI/UX Designer' },
    { name: 'description', content: 'Thoughtful digital experiences by Bushra Amjad, Junior UI/UX Designer. Explore selected work and get in touch.' },
    { property: 'og:title', content: 'Bushra Amjad — Junior UI/UX Designer' },
    { property: 'og:description', content: 'Explore the design portfolio of Bushra Amjad: mobile apps, web interfaces, and digital experiences.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

function Index() {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof sampleProjects[number] | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [clock, setClock] = useState('');
  useEffect(() => {
    const update = () => setClock(new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Karachi' }).format(new Date()));
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);
  const openEditor = () => { setDraft(profile); setEditorOpen(true); };
  const contact = () => {
    if (profile.email) { window.location.href = `mailto:${profile.email}`; return; }
    setContactOpen(true);
  };
  const firstName = profile.name.trim().split(' ')[0] || 'Bushra';
  return <>
    <header className="portfolio-header" id="home">
      <a href="#home" className="brand" aria-label={`${profile.name} home`}><span className="diamond" />{firstName}.</a>
      <nav className="header-nav" aria-label="Main navigation"><a href="#home">Home</a><a href="#info">Info</a><a href="#work">Work</a><a href="#contact">Contact</a></nav>
      <div className="header-actions"><span className="header-time">{clock}</span><Button className="call-button" onClick={contact}>Book a Call <ArrowUpRight /></Button></div>
    </header>
    <main className="portfolio-main">
      <section className="intro" aria-label="Introduction">
        <div className="disciplines"><span>UI/UX Design</span><span>/</span><span>Web Design</span><span>/</span><span>Product Design</span></div>
        <h1><span className="hello-line"><span className="diamond" />Hello!</span><span className="intro-name">I’m {firstName}.</span></h1>
        <p className="intro-copy">{profile.intro}</p>
      </section>
      <section className="work-section" id="work">
        <div className="section-heading"><h2>Selected work</h2><span className="section-count">(05)</span></div>
        <div>{sampleProjects.map((project, index) => <Button key={project.name} variant="ghost" className="project-row" onClick={() => setSelectedProject(project)} aria-label={`View ${project.name} sample project`}>
          <span className="project-number">0{index + 1}</span><span className="project-name">{project.name}</span><span className="project-details"><span>{project.category}</span><span>{project.description}</span></span><span className="project-year">’26</span><ArrowUpRight className="project-arrow" />
        </Button>)}</div>
        <p className="sample-note">Sample projects · Your own work will go here.</p>
      </section>
      <section className="about-section" id="info">
        <img src={studioImage} alt="A design workspace with interface sketches and a laptop" className="studio-image" width={1200} height={912} loading="lazy" />
        <div><span className="eyebrow">A LITTLE ABOUT ME</span><h2>{profile.role}</h2><p>{profile.bio}</p><span className="availability"><span className="diamond" />Open to new opportunities</span></div>
      </section>
      <section className="contact-section" id="contact">
        <span className="eyebrow">LET’S MAKE SOMETHING MEANINGFUL</span><h2>Have a project<br />in mind?</h2>
        <div className="contact-bottom">{profile.email ? <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a> : <span className="contact-email">Good design starts with a conversation.</span>}<Button variant="link" className="talk-link" onClick={contact}>— Let’s Talk <ArrowUpRight /></Button></div>
      </section>
      <footer className="portfolio-footer"><span>© 2026 {profile.name}. All rights reserved.</span><span>{profile.role}</span></footer>
    </main>
    <Button variant="secondary" className="preview-control" onClick={openEditor}><Pencil />Customize preview</Button>
    <Sheet open={editorOpen} onOpenChange={setEditorOpen}><SheetContent className="overflow-y-auto w-full sm:max-w-md">
      <SheetHeader><SheetTitle>Make it yours</SheetTitle><SheetDescription>Try changes in this preview. They won’t be saved after refreshing.</SheetDescription></SheetHeader>
      <form className="editor-fields" onSubmit={event => { event.preventDefault(); setProfile(draft); setEditorOpen(false); }}>
        <label htmlFor="profile-name">Name<Input id="profile-name" required value={draft.name} maxLength={45} onChange={event => setDraft({ ...draft, name: event.target.value })} /></label>
        <label htmlFor="profile-role">Role<Input id="profile-role" required value={draft.role} maxLength={70} onChange={event => setDraft({ ...draft, role: event.target.value })} /></label>
        <label htmlFor="profile-intro">Introduction<Textarea id="profile-intro" value={draft.intro} rows={4} maxLength={250} onChange={event => setDraft({ ...draft, intro: event.target.value })} /></label>
        <label htmlFor="profile-bio">About you<Textarea id="profile-bio" value={draft.bio} rows={6} maxLength={700} onChange={event => setDraft({ ...draft, bio: event.target.value })} /></label>
        <label htmlFor="profile-email">Email<Input id="profile-email" type="email" placeholder="Your contact email" value={draft.email} onChange={event => setDraft({ ...draft, email: event.target.value })} /></label>
        <Button type="submit"><Check />Apply to preview</Button><Button type="button" variant="outline" onClick={() => setDraft(initialProfile)}><RotateCcw />Reset fields</Button>
      </form>
    </SheetContent></Sheet>
    <Dialog open={selectedProject !== null} onOpenChange={open => { if (!open) setSelectedProject(null); }}><DialogContent>
      <DialogHeader><DialogTitle>{selectedProject?.name}</DialogTitle><DialogDescription>Sample concept · Not Bushra’s actual project</DialogDescription></DialogHeader>
      <div className="case-study"><dl><div><dt>Discipline</dt><dd>{selectedProject?.category}</dd></div><div><dt>Year</dt><dd>2026</dd></div></dl><p>{selectedProject?.detail}</p><p>This space is ready for your project images, process, and case study.</p></div>
    </DialogContent></Dialog>
    <Dialog open={contactOpen} onOpenChange={setContactOpen}><DialogContent><DialogHeader><DialogTitle>Let’s connect</DialogTitle><DialogDescription>Bushra’s contact email hasn’t been added yet.</DialogDescription></DialogHeader><Button onClick={() => { setContactOpen(false); openEditor(); }}><Pencil />Add contact email</Button></DialogContent></Dialog>
  </>;
}
