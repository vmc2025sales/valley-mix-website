import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Building2, FlaskConical, Truck, Settings, Clock } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const services = [
    {
      icon: Home,
      titleKey: 'services.slab.title',
      descKey: 'services.slab.desc',
      image: '/images/service-driveway.jpg',
      featureKeys: ['services.slab.f1', 'services.slab.f2', 'services.slab.f3'],
    },
    {
      icon: Building2,
      titleKey: 'services.flatwork.title',
      descKey: 'services.flatwork.desc',
      image: '/images/service-sidewalk.jpg',
      featureKeys: ['services.flatwork.f1', 'services.flatwork.f2', 'services.flatwork.f3'],
    },
    {
      icon: FlaskConical,
      titleKey: 'services.mix.title',
      descKey: 'services.mix.desc',
      image: '/images/service-psitest.jpg',
      featureKeys: ['services.mix.f1', 'services.mix.f2', 'services.mix.f3'],
    },
    {
      icon: Truck,
      titleKey: 'services.pump.title',
      descKey: 'services.pump.desc',
      image: '/images/service-pump.jpg',
      featureKeys: ['services.pump.f1', 'services.pump.f2', 'services.pump.f3'],
    },
    {
      icon: Settings,
      titleKey: 'services.adjust.title',
      descKey: 'services.adjust.desc',
      image: '/images/project-foundation.jpg',
      featureKeys: ['services.adjust.f1', 'services.adjust.f2', 'services.adjust.f3'],
    },
    {
      icon: Clock,
      titleKey: 'services.schedule.title',
      descKey: 'services.schedule.desc',
      image: '/images/service-commercial.jpg',
      featureKeys: ['services.schedule.f1', 'services.schedule.f2', 'services.schedule.f3'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation - only run once
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

      // Cards animation
      const cards = cardsContainerRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: cardsContainerRef.current,
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
      const cards = cardsContainerRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.set(cards, { opacity: 1, y: 0 });
      }
    }
  }, [language, isVisible]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-concrete-900"
    >
      <div className="w-full section-padding">
        {/* Header */}
        <div ref={headerRef} className="mb-16 opacity-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-safety-orange" />
            <span className="text-safety-orange uppercase tracking-widest text-sm font-semibold">
              {t('services.offers')}
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase">
            {t('services.title')}
          </h2>
        </div>

        {/* Services Grid */}
        <div ref={cardsContainerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={`${service.titleKey}-${index}`}
              className="service-card group bg-concrete-800 border border-concrete-700 rounded-lg overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={t(service.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-concrete-800 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-safety-orange rounded-sm flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-white uppercase mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-concrete-300 text-sm leading-relaxed mb-4">
                  {t(service.descKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.featureKeys.map((featureKey, fIndex) => (
                    <span
                      key={fIndex}
                      className="text-xs uppercase tracking-wider text-safety-orange border border-safety-orange/30 px-2 py-1 rounded"
                    >
                      {t(featureKey)}
                    </span>
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

export default Services;
