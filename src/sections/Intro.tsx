import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.fromTo(
        textRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: 80, opacity: 0, scale: 1.1 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-concrete-900 overflow-hidden"
    >
      <div className="w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <div ref={textRef} className="order-2 lg:order-1 opacity-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-safety-orange" />
              <span className="text-safety-orange uppercase tracking-widest text-sm font-semibold">
                {t('intro.about')}
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase leading-tight mb-6">
              {t('intro.title')}
            </h2>

            <p className="text-concrete-200 text-lg leading-relaxed mb-6">
              {t('intro.p1')}
            </p>

            <p className="text-concrete-300 leading-relaxed mb-8">
              {t('intro.p2')}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-l-2 border-safety-orange pl-4">
                <span className="block text-3xl font-heading font-bold text-safety-orange">2500-4500</span>
                <span className="text-concrete-300 text-sm uppercase tracking-wider">{t('intro.psi')}</span>
              </div>
              <div className="border-l-2 border-safety-orange pl-4">
                <span className="block text-3xl font-heading font-bold text-safety-orange">1+</span>
                <span className="text-concrete-300 text-sm uppercase tracking-wider">{t('intro.yardMin')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-concrete-200">
                <div className="w-2 h-2 bg-safety-orange rounded-full" />
                <span className="text-sm">{t('intro.feature1')}</span>
              </div>
              <div className="flex items-center gap-2 text-concrete-200">
                <div className="w-2 h-2 bg-safety-orange rounded-full" />
                <span className="text-sm">{t('intro.feature2')}</span>
              </div>
              <div className="flex items-center gap-2 text-concrete-200">
                <div className="w-2 h-2 bg-safety-orange rounded-full" />
                <span className="text-sm">{t('intro.feature3')}</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="order-1 lg:order-2 opacity-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-safety-orange/20 rounded-lg transform rotate-3" />
              <img
                src="/images/process-mixing.jpg"
                alt="Concrete pouring"
                className="relative w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-2xl"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-concrete-800 border border-concrete-600 p-6 rounded-lg shadow-xl">
                <span className="block text-4xl font-heading font-bold text-safety-orange">RGV</span>
                <span className="text-concrete-300 text-sm uppercase tracking-wider">{t('intro.rgv')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
