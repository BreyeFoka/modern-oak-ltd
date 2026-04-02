import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from './lib/utils';

gsap.registerPlugin(ScrollTrigger);

type Slide = { image: string; title: string; subtitle: string };
type Review = { quote: string; author: string; project: string };
type Showcase = { image: string; title: string; location: string; detail: string };

const heroSlides: Slide[] = [
    {
        image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=2400&q=80',
        title: 'Crafted Interiors',
        subtitle: 'Luxury residences sculpted in oak, marble, and subtle gold statements.',
    },
    {
        image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=2400&q=80',
        title: 'Material Poetry',
        subtitle: 'A choreography of grain, veining, and warm architectural light.',
    },
    {
        image: 'https://images.unsplash.com/photo-1616594039964-3f5af3a7f514?auto=format&fit=crop&w=2400&q=80',
        title: 'Signature Living',
        subtitle: 'Every room designed to feel timeless, elegant, and deeply personal.',
    },
];

const overlays = [
    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&w=1600&q=80',
];

const materialCards: Showcase[] = [
    {
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=80',
        title: 'European Oak Sculpting',
        location: 'Material Lab',
        detail: 'Hand-finished grains with architectural rhythm and tactile warmth.',
    },
    {
        image: 'https://images.unsplash.com/photo-1616627981459-8ee95f7f0268?auto=format&fit=crop&w=1800&q=80',
        title: 'Calacatta Marble Selection',
        location: 'Stone Atelier',
        detail: 'Book-matched veins curated for drama and balance in every space.',
    },
    {
        image: 'https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?auto=format&fit=crop&w=1800&q=80',
        title: 'Gold Finishing Details',
        location: 'Metal Studio',
        detail: 'Brushed metallic accents tuned to catch only the right amount of light.',
    },
    {
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80',
        title: 'Timber x Stone Contrast',
        location: 'Design Suite',
        detail: 'A balanced language of contrast designed for calm, luxurious living.',
    },
];

const projectSlides: Showcase[] = [
    {
        image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1800&q=80',
        title: 'Penthouse Story',
        location: 'Milan',
        detail: 'Soft oak volumes framing dramatic marble focal points.',
    },
    {
        image: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&w=1800&q=80',
        title: 'Private Villa',
        location: 'Dubai',
        detail: 'A quiet palette of charcoal, walnut oak, and brushed gold lines.',
    },
    {
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80',
        title: 'Waterfront Apartment',
        location: 'Lisbon',
        detail: 'Layered textures and panoramic materials for ocean-facing luxury.',
    },
    {
        image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=80',
        title: 'Gallery Residence',
        location: 'Paris',
        detail: 'Minimal architecture elevated with artisanal timber detailing.',
    },
    {
        image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1800&q=80',
        title: 'Executive Home',
        location: 'London',
        detail: 'A masterclass in composure, proportion, and material dialogue.',
    },
    {
        image: 'https://images.unsplash.com/photo-1600566752227-8f3b7f4d7f86?auto=format&fit=crop&w=1800&q=80',
        title: 'Skyline Loft',
        location: 'New York',
        detail: 'Contemporary luxury with stone-led silhouettes and warm brass glow.',
    },
];

const journeySlides = [
    {
        image: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=1800&q=80',
        title: 'Vision Mapping',
        text: 'We decode lifestyle, architecture, and aspirations into a visual narrative.',
    },
    {
        image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=1800&q=80',
        title: 'Material Storyboarding',
        text: 'Oak grains, marble slabs, and metallic finishes are curated as one composition.',
    },
    {
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1800&q=80',
        title: 'Craft and Installation',
        text: 'Precision execution, stage-by-stage quality control, and flawless final delivery.',
    },
];

const portfolioPanels = [
    {
        image: 'https://images.unsplash.com/photo-1616594039964-3f5af3a7f514?auto=format&fit=crop&w=2200&q=80',
        label: 'Obsidian Penthouse',
        copy: 'Layered marble walls and sculpted oak partitions with cinematic skylight framing.',
    },
    {
        image: 'https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?auto=format&fit=crop&w=2200&q=80',
        label: 'Noir Residence',
        copy: 'Muted brown palettes and rich timber textures designed for evening warmth.',
    },
    {
        image: 'https://images.unsplash.com/photo-1616486701797-0f33f61038bc?auto=format&fit=crop&w=2200&q=80',
        label: 'Marble Atelier Home',
        copy: 'Bold veining paired with gold detailing to deliver timeless glamour.',
    },
    {
        image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=2200&q=80',
        label: 'Sculpted Wood Loft',
        copy: 'Architectural wood contours crafted to soften and elevate modern geometry.',
    },
];

const reviews: Review[] = [
    {
        quote: 'Modern Oak delivered a residence that feels like a private gallery. Every surface is intentional.',
        author: 'Elena Moretti',
        project: 'Milan Penthouse',
    },
    {
        quote: 'Their team blends craftsmanship and discipline at a world-class level. The finish quality is extraordinary.',
        author: 'James Whitlock',
        project: 'London Villa',
    },
    {
        quote: 'Elegant, composed, and deeply luxurious. The result exceeded every expectation we had.',
        author: 'Nour Al Farsi',
        project: 'Dubai Residence',
    },
];

const LoadingScreen = ({ onDone }: { onDone: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((value) => {
                if (value >= 100) {
                    clearInterval(timer);
                    setTimeout(onDone, 220);
                    return 100;
                }
                return value + 2;
            });
        }, 26);

        return () => clearInterval(timer);
    }, [onDone]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-charcoal text-marble-white"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5.2, ease: 'linear', repeat: Infinity }}
                className="h-28 w-28 rounded-full border border-marble-white/20 border-t-gilded-gold"
            />
            <h2 className="mt-8 text-5xl font-display tracking-wide">Modern Oak</h2>
            <p className="mt-2 text-xs uppercase tracking-[0.45em] text-marble-vein">Interior Atelier</p>
            <div className="mt-8 h-px w-72 overflow-hidden bg-marble-white/15">
                <motion.div className="h-full bg-gilded-gold" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.18 }} />
            </div>
        </motion.div>
    );
};

const Navbar = () => {
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const heroEl = document.getElementById('home');
        if (!heroEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setVisible(entry.isIntersecting);
            },
            { threshold: 0.05 },
        );
        observer.observe(heroEl);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-500',
                visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none',
                scrolled ? 'py-3' : 'py-6',
            )}
        >
            <div className={cn('mx-auto flex w-[min(1240px,94vw)] items-center justify-between rounded-full px-5 md:px-7', scrolled ? 'border border-gilded-gold/30 bg-charcoal/80 py-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'border border-transparent bg-charcoal/20 py-4 backdrop-blur-sm')}>
                <a href="#home" className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gilded-gold/50 bg-charcoal text-[10px] font-semibold tracking-[0.15em] text-gilded-gold">MO</span>
                    <span className="font-display text-xl text-marble-white">Modern Oak</span>
                </a>
                <nav className="hidden items-center gap-7 text-[10px] uppercase tracking-[0.22em] text-marble-white/85 md:flex">
                    <a href="#materials" className="nav-link">Materials</a>
                    <a href="#projects" className="nav-link">Projects</a>
                    <a href="#journey" className="nav-link">Journey</a>
                    <a href="#portfolio" className="nav-link">Portfolio</a>
                    <a href="#reviews" className="nav-link">Reviews</a>
                </nav>
                <button className="hidden rounded-full border border-gilded-gold/40 px-5 py-2 text-[10px] uppercase tracking-[0.24em] text-gilded-gold transition hover:bg-gilded-gold/10 md:block">Private Consultation</button>
            </div>
        </header>
    );
};

const HeroCarousel = () => {
    const [index, setIndex] = useState(0);
    const sectionRef = useRef<HTMLElement | null>(null);
    const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const timer = setInterval(() => setIndex((v) => (v + 1) % heroSlides.length), 5400);
        return () => clearInterval(timer);
    }, []);

    useGSAP(
        () => {
            slideRefs.current.forEach((node, i) => {
                if (!node) return;
                const active = i === index;
                gsap.to(node, { opacity: active ? 1 : 0, scale: active ? 1 : 1.1, duration: 1.15, ease: 'power2.out' });
            });
        },
        { dependencies: [index], scope: sectionRef },
    );

    useGSAP(
        () => {
            gsap.from('.hero-copy > *', { y: 45, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out' });
            gsap.to('.hero-parallax', {
                yPercent: 15,
                scale: 1.08,
                ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
            });
            gsap.to('.hero-copy', {
                yPercent: -14,
                opacity: 0.25,
                ease: 'none',
                scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 },
            });
        },
        { scope: sectionRef },
    );

    return (
        <section id="home" ref={sectionRef} className="relative isolate flex min-h-[100vh] items-end overflow-hidden pt-28">
            <div className="absolute inset-0 -z-20">
                {heroSlides.map((slide, i) => (
                    <div
                        key={slide.image}
                        ref={(node) => {
                            slideRefs.current[i] = node;
                        }}
                        className="hero-parallax absolute inset-0 opacity-0"
                    >
                        <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        <img src={overlays[i % overlays.length]} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen" referrerPolicy="no-referrer" />
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/45 to-charcoal/90" />
                <div className="absolute inset-0 hero-grain" />
            </div>

            <div className="absolute inset-x-0 top-32 z-10 flex justify-center gap-2 px-4">
                {heroSlides.map((_, i) => (
                    <button
                        key={`hero-dot-${i}`}
                        onClick={() => setIndex(i)}
                        className={cn('h-1.5 rounded-full transition-all', i === index ? 'w-14 bg-gilded-gold' : 'w-7 bg-marble-white/35')}
                        aria-label={`Go to hero slide ${i + 1}`}
                    />
                ))}
            </div>

            <div className="hero-copy relative z-10 mx-auto flex w-[min(1240px,94vw)] flex-col gap-7 pb-20 text-marble-white md:pb-28">
                <p className="max-w-max rounded-full border border-gilded-gold/35 bg-charcoal/35 px-5 py-2 text-[11px] uppercase tracking-[0.3em]">Bespoke Interiors in Oak, Marble and Gold</p>
                <h1 className="max-w-3xl text-5xl leading-[0.95] sm:text-6xl lg:text-8xl">
                    {heroSlides[index].title}
                    <span className="mt-3 block font-script text-gilded-gold">For Exceptional Living</span>
                </h1>
                <p className="max-w-xl text-base text-marble-white/85 sm:text-lg">{heroSlides[index].subtitle}</p>
                <a href="#projects" className="btn-gold w-max">Explore Masterpieces <ArrowRight className="h-4 w-4" /></a>
            </div>
        </section>
    );
};

const BlendArtSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                '.blend-title',
                { backgroundPosition: '50% 0%' },
                {
                    backgroundPosition: '50% 100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        end: 'bottom top',
                        scrub: 1.15,
                    },
                },
            );
            gsap.to('.blend-floating', {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 90%',
                    end: 'bottom top',
                    scrub: 1,
                },
            });
        },
        { scope: sectionRef },
    );

    return (
        <section ref={sectionRef} className="blend-section relative isolate overflow-hidden bg-charcoal py-28 text-marble-white md:py-36">
            <div className="absolute inset-0 -z-10">
                <img
                    src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=2200&q=80"
                    alt=""
                    aria-hidden="true"
                    className="zoom-on-scroll h-full w-full object-cover opacity-35"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/75 to-charcoal/85" />
            </div>
            <div className="mx-auto grid w-[min(1240px,94vw)] gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-7 reveal-left">
                    <p className="section-kicker text-gilded-gold">Art Direction</p>
                    <h2 className="blend-title text-[clamp(3rem,9vw,8rem)] leading-[0.9]">Interior Masterpiece</h2>
                    <p className="max-w-2xl text-lg text-marble-white/78 font-light">
                        Not conventional design. A moving gallery where typography, material textures, and cinematic transitions merge into a single luxury statement.
                    </p>
                </div>
                <div className="blend-floating reveal-right bg-charcoal/40 p-8">
                    <p className="font-script text-5xl text-gilded-gold">Breath Taking</p>
                    <p className="mt-4 text-sm uppercase tracking-[0.2em] text-marble-vein">Black • Gray • Brown • Gold</p>
                    <p className="mt-6 text-marble-white/75 font-light">A bespoke digital atmosphere inspired by wood craftsmanship and stone elegance.</p>
                </div>
            </div>
        </section>
    );
};

const MaterialsSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            // Fade-in each card as user scrolls through the section
            const cards = gsap.utils.toArray<HTMLElement>('.material-card');
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60, scale: 0.94 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                        },
                        delay: (i % 4) * 0.12,
                    },
                );
            });
        },
        { scope: sectionRef },
    );

    return (
        <section id="materials" ref={sectionRef} className="section-image-shell relative overflow-hidden py-24 text-marble-white md:py-32">
            <img src="https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=2200&q=80" alt="" aria-hidden="true" className="section-image-bg parallax-soft" referrerPolicy="no-referrer" />
            <div className="section-overlay-deep" />
            <div className="relative mx-auto w-[min(1240px,94vw)] space-y-12">
                <div className="reveal-up">
                    <p className="section-kicker text-gilded-gold">Material Language</p>
                    <h2 className="section-title mt-4 font-display-italic">Oak and Marble in Motion</h2>
                    <p className="max-w-2xl text-marble-white/72 font-light mt-4">A rolling visual study of grain depth, stone veining, and golden accents built for elevated interiors.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {materialCards.map((item) => (
                        <article key={item.title} className="material-card">
                            <img src={item.image} alt={item.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            <div className="material-card-overlay">
                                <p className="text-[10px] uppercase tracking-[0.26em] text-gilded-gold mb-1">{item.location}</p>
                                <h3>{item.title}</h3>
                                <p>{item.detail}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProjectsSection = () => {
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(
        () => {
            const track = trackRef.current;
            const trigger = triggerRef.current;
            if (!track || !trigger) return;

            const totalSlides = projectSlides.length;

            const st = ScrollTrigger.create({
                trigger,
                start: 'top top',
                end: `+=${totalSlides * 700}`,
                pin: true,
                anticipatePin: 1,
                scrub: 1,
                onUpdate: (self) => {
                    const idx = Math.min(Math.floor(self.progress * totalSlides), totalSlides - 1);
                    setActiveIndex(idx);
                    gsap.to(track, {
                        xPercent: -(idx * (100 / totalSlides)),
                        duration: 0.6,
                        ease: 'power2.out',
                        overwrite: 'auto',
                    });
                },
            });

            return () => st.kill();
        },
        { scope: triggerRef },
    );

    return (
        <section id="projects" className="section-image-shell relative text-marble-white">
            <div ref={triggerRef} className="relative h-[100vh] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=2200&q=80" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover parallax-soft" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/30 to-charcoal/80" />

                {/* Header text */}
                <div className="absolute top-0 left-0 right-0 z-20 pt-16 px-10 md:px-16 reveal-up">
                    <p className="section-kicker text-gilded-gold">Project Theatre</p>
                    <h2 className="mt-3 text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.92] font-display-italic">Cinematic Projects</h2>
                </div>

                {/* Slide track */}
                <div ref={trackRef} className="flex h-full" style={{ width: `${projectSlides.length * 100}%` }}>
                    {projectSlides.map((slide, i) => (
                        <div key={slide.image} className="relative h-full" style={{ width: `${100 / projectSlides.length}%` }}>
                            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/92 via-charcoal/30 to-transparent" />
                            <div className={cn('absolute bottom-0 left-0 right-0 p-10 md:p-14 transition-all duration-700', i === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
                                <p className="text-[11px] uppercase tracking-[0.28em] text-gilded-gold">{slide.location}</p>
                                <h3 className="mt-2 text-4xl md:text-5xl font-display-italic text-marble-white">{slide.title}</h3>
                                <p className="mt-3 max-w-md text-marble-white/72 font-light">{slide.detail}</p>
                                <div className="mt-6 flex gap-1.5">
                                    {projectSlides.map((_, dotIdx) => (
                                        <span key={dotIdx} className={cn('block h-px transition-all duration-500', dotIdx === activeIndex ? 'w-10 bg-gilded-gold' : 'w-4 bg-marble-white/30')} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const JourneySection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            journeySlides.forEach((_, i) => {
                const panel = document.querySelector(`.journey-panel-${i}`);
                const text = document.querySelector(`.journey-text-${i}`);
                if (!panel || !text) return;

                // Panel image reveals on scroll
                gsap.fromTo(
                    panel,
                    { opacity: 0, scale: 1.06 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: panel,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );

                // Text floats up over the image
                gsap.fromTo(
                    text,
                    { y: 48, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power3.out',
                        delay: 0.25,
                        scrollTrigger: {
                            trigger: panel,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse',
                        },
                    },
                );
            });
        },
        { scope: sectionRef },
    );

    return (
        <section id="journey" ref={sectionRef} className="section-image-shell relative overflow-hidden py-24 text-marble-white md:py-32">
            <img src="https://images.unsplash.com/photo-1618221469555-7f3ad97540d6?auto=format&fit=crop&w=2200&q=80" alt="" aria-hidden="true" className="section-image-bg parallax-soft" referrerPolicy="no-referrer" />
            <div className="section-overlay-deep" />
            <div className="relative mx-auto w-[min(1240px,94vw)]">
                <div className="mb-16 reveal-up">
                    <p className="section-kicker text-gilded-gold">Client Journey</p>
                    <h2 className="section-title mt-4 font-display-italic">An Elegant, Controlled Process</h2>
                </div>
                <div className="space-y-8">
                    {journeySlides.map((slide, i) => (
                        <div key={slide.title} className={`journey-panel-${i} relative overflow-hidden`} style={{ aspectRatio: i % 2 === 0 ? '16/7' : '16/6' }}>
                            <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/88 via-charcoal/50 to-transparent" />
                            {/* Floating text over image */}
                            <div className={`journey-text-${i} absolute inset-0 flex flex-col justify-center px-10 md:px-16`}>
                                <p className="text-[10px] uppercase tracking-[0.32em] text-gilded-gold mb-3">Phase 0{i + 1}</p>
                                <h3 className="text-3xl md:text-5xl font-display-italic text-marble-white leading-[0.95]">{slide.title}</h3>
                                <p className="mt-4 max-w-sm text-marble-white/72 font-light text-sm md:text-base">{slide.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PortfolioHorizontal = () => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLElement | null>(null);

    useGSAP(
        () => {
            const track = trackRef.current;
            const section = sectionRef.current;
            if (!track || !section) return;

            gsap.to(track, {
                xPercent: -75,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: '+=2800',
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                },
            });
        },
        { scope: sectionRef },
    );

    return (
        <section id="portfolio" ref={sectionRef} className="relative h-[100vh] overflow-hidden bg-charcoal text-marble-white">
            <div ref={trackRef} className="portfolio-track flex h-full" style={{ width: '400vw' }}>
                {portfolioPanels.map((panel) => (
                    <article key={panel.label} className="relative h-full w-screen shrink-0 overflow-hidden">
                        <img src={panel.image} alt={panel.label} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                        <div className="absolute bottom-14 left-10 max-w-xl md:left-16">
                            <p className="text-[10px] uppercase tracking-[0.28em] text-gilded-gold">Portfolio Narrative</p>
                            <h3 className="mt-3 text-4xl md:text-6xl font-display-italic text-marble-white leading-[0.92]">{panel.label}</h3>
                            <p className="mt-4 text-marble-white/72 font-light max-w-sm">{panel.copy}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

const ReviewsSection = () => {
    const doubled = [...reviews, ...reviews, ...reviews, ...reviews];

    return (
        <section id="reviews" className="section-image-shell relative overflow-hidden py-24 text-marble-white md:py-32">
            <img src="https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=2200&q=80" alt="" aria-hidden="true" className="section-image-bg parallax-soft" referrerPolicy="no-referrer" />
            <div className="section-overlay-deep" />
            <div className="relative mx-auto w-[min(1240px,94vw)]">
                <div className="mb-14 reveal-up">
                    <p className="section-kicker text-gilded-gold">Client Reflections</p>
                    <h2 className="section-title mt-4 font-display-italic">Luxury Experience,<br />Verified by Clients</h2>
                </div>
            </div>
            <div className="review-track-container mt-6">
                <div className="review-track">
                    {doubled.map((review, i) => (
                        <article key={`${review.author}-${i}`} className="review-card shrink-0">
                            <p className="font-script text-4xl text-gilded-gold leading-none">&#8220;</p>
                            <p className="mt-2 text-marble-white/82 font-light text-sm leading-relaxed">{review.quote}</p>
                            <p className="mt-6 font-display-italic text-xl text-gilded-gold">{review.author}</p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-marble-vein">{review.project}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LoopFooter = () => {
    const loopText = 'MODERN OAK • BESPOKE INTERIOR ARTISTRY • OAK & MARBLE & GOLD • TIMELESS LUXURY • CRAFTED RESIDENCES • ARCHITECTURAL ELEGANCE • © 2026 MODERN OAK LTD • ';

    return (
        <footer className="loop-footer relative overflow-hidden py-8 text-marble-white">
            <div className="loop-line loop-line-forward">
                <span>{loopText.repeat(4)}</span>
            </div>
        </footer>
    );
};

export default function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const lenis = new Lenis({ smoothWheel: true, lerp: 0.08, wheelMultiplier: 0.9 });
        let rafId = 0;

        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    useGSAP(() => {
        const revealElements = gsap.utils.toArray<HTMLElement>('.reveal-up, .reveal-left, .reveal-right');
        revealElements.forEach((element) => {
            const y = element.classList.contains('reveal-up') ? 52 : 0;
            const x = element.classList.contains('reveal-left') ? -48 : element.classList.contains('reveal-right') ? 48 : 0;
            gsap.fromTo(
                element,
                { opacity: 0, y, x },
                {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 0.95,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: element, start: 'top 85%' },
                },
            );
        });

        gsap.utils.toArray<HTMLElement>('.zoom-on-scroll').forEach((element) => {
            gsap.fromTo(
                element,
                { scale: 1.16, filter: 'brightness(0.74)' },
                {
                    scale: 1,
                    filter: 'brightness(1)',
                    ease: 'none',
                    scrollTrigger: { trigger: element, start: 'top 95%', end: 'bottom 15%', scrub: 1.2 },
                },
            );
        });

        gsap.utils.toArray<HTMLElement>('.parallax-soft').forEach((element) => {
            gsap.fromTo(
                element,
                { yPercent: -8 },
                {
                    yPercent: 8,
                    ease: 'none',
                    scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 1 },
                },
            );
        });
    });

    return (
        <div className="relative min-h-screen bg-charcoal">
            <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>
            {!loading && (
                <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
                    <Navbar />
                    <HeroCarousel />
                    <BlendArtSection />
                    <MaterialsSection />
                    <ProjectsSection />
                    <JourneySection />
                    <PortfolioHorizontal />
                    <ReviewsSection />
                    <LoopFooter />
                </motion.main>
            )}
        </div>
    );
}
