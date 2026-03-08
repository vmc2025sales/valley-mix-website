import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const projects = [
    {
      titleKey: 'projects.driveway',
      location: 'Brownsville, TX',
      date: '2025',
      image: '/images/service-driveway.jpg',
      yards: '12 yards',
      psi: '3000 PSI',
    },
    {
      titleKey: 'projects.foundation',
      location: 'Harlingen, TX',
      date: '2025',
      image: '/images/project-foundation.jpg',
      yards: '85 yards',
      psi: '3500 PSI',
    },
    {
      titleKey: 'projects.patio',
      location: 'Los Fresnos, TX',
      date: '2025',
      image: '/images/project-patio.jpg',
      yards: '18 yards',
      psi: '2500 PSI',
    },
    {
      titleKey: 'projects.sidewalk',
      location: 'San Benito, TX',
      date: '2025',
      image: '/images/service-sidewalk.jpg',
      yards: '25 yards',
      psi: '3000 PSI',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Projects reveal animation with clip-path
      const projects = projectsContainerRef.current?.querySelectorAll('.project-card');
      if (projects) {
        gsap.fromTo(
          projects,
          {
            clipPath: 'inset(100% 0 0 0)',
            opacity: 0
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: projectsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              onEnter: () => setIsVisible(true),
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Force visibility when language changes after initial animation
  useEffect(() => {
    if (isVisible) {
      const projects = projectsContainerRef.current?.querySelectorAll('.project-card');
      if (projects) {
        gsap.set(projects, { opacity: 1, clipPath: 'inset(0% 0 0 0)' });
      }
    }
  }, [language, isVisible]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-concrete-900"
    >
      <div className="w-full section-padding">
        {/* Header */}
        <div ref={headerRef} className="mb-16 opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-safety-orange" />
            <span className="text-safety-orange uppercase tracking-widest text-sm font-semibold">
              {t('projects.work')}
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase">
              {t('projects.title')}
            </h2>
            <p className="text-concrete-300 max-w-xl">
              {t('projects.desc')}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={projectsContainerRef} className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={`${project.titleKey}-${index}`}
              className="project-card group relative overflow-hidden rounded-lg"
            >
              {/* Image */}
              <div className="relative h-80 lg:h-96 overflow-hidden">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-concrete-900 via-concrete-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs uppercase tracking-wider text-safety-orange border border-safety-orange/50 px-2 py-1 rounded">
                    {project.yards}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-concrete-300 border border-concrete-600 px-2 py-1 rounded">
                    {project.psi}
                  </span>
                </div>

                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white uppercase mb-2">
                  {t(project.titleKey)}
                </h3>

                <div className="flex items-center gap-4 text-concrete-300 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-safety-orange" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-safety-orange" />
                    <span>{project.date}</span>
                  </div>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-safety-orange transition-colors duration-300 rounded-lg pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
