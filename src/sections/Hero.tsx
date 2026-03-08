import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-truck.jpg"
          alt="Concrete mixer truck"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-concrete-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding max-w-6xl mx-auto pt-20">
        <h1
          ref={titleRef}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white uppercase tracking-wider mb-4 opacity-0"
        >
          Valley Mix
          <span className="block text-safety-orange">Concrete</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium tracking-[0.2em] uppercase mb-8 opacity-0"
        >
          {t('hero.tagline')}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="btn-primary w-full sm:w-auto"
          >
            {t('nav.getQuote')}
          </a>
          <a
            href="tel:9565611288"
            className="flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-sm transition-all duration-300 hover:border-safety-orange hover:text-safety-orange w-full sm:w-auto"
          >
            <Phone className="w-5 h-5" />
            <span className="uppercase tracking-wider text-sm font-semibold">{t('nav.callNow')}</span>
          </a>
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/19565611288?text=Hello,%20I%20need%20ValleyMixConcrete!%20Could%20I%20please%20talk%20to%20a%20sales%20rep?"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-sm transition-all duration-300 w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="uppercase tracking-wider text-sm font-semibold">WhatsApp</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-safety-orange rounded-full" />
            <span>{t('hero.badge1')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-safety-orange rounded-full" />
            <span>{t('hero.badge2')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-safety-orange rounded-full" />
            <span>{t('hero.badge3')}</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0"
      >
        <button
          onClick={() => scrollToSection('#intro')}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-safety-orange transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
          <ChevronDown className="w-6 h-6 animate-bounce-slow" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
