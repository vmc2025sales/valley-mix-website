import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, ClipboardList, Factory, Wallet } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      icon: Phone,
      title: t('process.step1.title'),
      description: t('process.step1.desc'),
    },
    {
      number: '02',
      icon: ClipboardList,
      title: t('process.step2.title'),
      description: t('process.step2.desc'),
    },
    {
      number: '03',
      icon: Factory,
      title: t('process.step3.title'),
      description: t('process.step3.desc'),
    },
    {
      number: '04',
      icon: Wallet,
      title: t('process.step4.title'),
      description: t('process.step4.desc'),
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

      // Line animation
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps animation
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.fromTo(
            step,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              delay: index * 0.15,
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-concrete-800 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(218, 56, 50, 0.1) 10px,
            rgba(218, 56, 50, 0.1) 20px
          )`
        }} />
      </div>

      <div className="relative z-10 w-full section-padding">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-safety-orange" />
            <span className="text-safety-orange uppercase tracking-widest text-sm font-semibold">
              {t('process.simple')}
            </span>
            <div className="w-12 h-1 bg-safety-orange" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase">
            {t('process.title')}
          </h2>
        </div>

        {/* Steps */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-safety-orange/20 via-safety-orange to-safety-orange/20 origin-left"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el; }}
                className="relative text-center opacity-0"
              >
                {/* Number Badge */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="w-20 h-20 bg-concrete-700 border-2 border-safety-orange rounded-full flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-safety-orange" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-safety-orange text-white font-heading font-bold rounded-full flex items-center justify-center text-sm">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white uppercase mb-3">
                  {step.title}
                </h3>
                <p className="text-concrete-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            {t('process.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
