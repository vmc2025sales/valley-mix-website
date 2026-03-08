import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, CheckCircle } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const PriceBeat = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Card animation
      gsap.fromTo(
        cardRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Parallax Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <img
          src="/images/price-bg.jpg"
          alt="Concrete truck on road"
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full section-padding">
        <div
          ref={cardRef}
          className="max-w-3xl mx-auto bg-concrete-800/95 backdrop-blur-sm border border-concrete-600 p-8 md:p-12 lg:p-16 rounded-lg text-center opacity-0"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-safety-orange/20 rounded-full flex items-center justify-center">
              <FileText className="w-10 h-10 text-safety-orange" />
            </div>
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase mb-6">
            {t('price.title')}
          </h2>

          <p className="text-concrete-200 text-lg md:text-xl leading-relaxed mb-8">
            {t('price.p1')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-concrete-300">
              <CheckCircle className="w-5 h-5 text-safety-orange" />
              <span className="text-sm">{t('price.req1')}</span>
            </div>
            <div className="flex items-center gap-2 text-concrete-300">
              <CheckCircle className="w-5 h-5 text-safety-orange" />
              <span className="text-sm">{t('price.req2')}</span>
            </div>
            <div className="flex items-center gap-2 text-concrete-300">
              <CheckCircle className="w-5 h-5 text-safety-orange" />
              <span className="text-sm">{t('price.req3')}</span>
            </div>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline inline-flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            {t('price.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PriceBeat;
