import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { language, t } = useTranslation();

  const testimonials = language === 'en' ? [
    {
      quote: "On time, clean pour, and the exact yards we needed—will book again. The team was professional and the quality exceeded our expectations.",
      author: "J. Martinez",
      location: "Brownsville, TX",
      rating: 5,
      project: "Residential Driveway",
    },
    {
      quote: "Valley Mix Concrete saved our project timeline. Their on-site mixing meant no waste and we got exactly the PSI we needed for our foundation.",
      author: "R. Garcia",
      location: "Harlingen, TX",
      rating: 5,
      project: "Commercial Foundation",
    },
    {
      quote: "Best concrete company in the RGV. Fair pricing, reliable scheduling, and the crew knows their stuff. Highly recommend!",
      author: "M. Lopez",
      location: "Los Fresnos, TX",
      rating: 5,
      project: "Patio & Sidewalk",
    },
    {
      quote: "They beat our previous supplier's quote and delivered better quality concrete. The volumetric mixing is a game changer.",
      author: "A. Hernandez",
      location: "San Benito, TX",
      rating: 5,
      project: "Warehouse Slab",
    },
  ] : [
    {
      quote: "A tiempo, vertido limpio y las yardas exactas que necesitábamos—volveremos a contratar. El equipo fue profesional y la calidad superó nuestras expectativas.",
      author: "J. Martínez",
      location: "Brownsville, TX",
      rating: 5,
      project: "Entrada Residencial",
    },
    {
      quote: "Valley Mix Concrete salvó el cronograma de nuestro proyecto. Su mezcla en el sitio significó sin desperdicio y obtuvimos exactamente el PSI que necesitábamos para nuestro cimiento.",
      author: "R. García",
      location: "Harlingen, TX",
      rating: 5,
      project: "Cimiento Comercial",
    },
    {
      quote: "La mejor compañía de concreto en el RGV. Precios justos, programación confiable y el equipo sabe lo que hace. ¡Altamente recomendado!",
      author: "M. López",
      location: "Los Fresnos, TX",
      rating: 5,
      project: "Patio y Acera",
    },
    {
      quote: "Superaron la cotización de nuestro proveedor anterior y entregaron concreto de mejor calidad. La mezcla volumétrica es un cambio de juego.",
      author: "A. Hernández",
      location: "San Benito, TX",
      rating: 5,
      project: "Losa de Bodega",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentIndex, language]);

  const current = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-concrete-800 overflow-hidden"
    >
      {/* Background Quote */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <Quote className="w-96 h-96 text-safety-orange" />
      </div>

      <div className="relative z-10 w-full section-padding">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-safety-orange" />
            <span className="text-safety-orange uppercase tracking-widest text-sm font-semibold">
              {t('testimonials.title')}
            </span>
            <div className="w-12 h-1 bg-safety-orange" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase">
            {t('testimonials.subtitle')}
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={cardRef}
            className="bg-concrete-900 border border-concrete-700 rounded-lg p-8 lg:p-12 text-center"
          >
            {/* Rating */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-safety-orange text-safety-orange" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8">
              "{current.quote}"
            </blockquote>

            {/* Author */}
            <div className="mb-4">
              <span className="block font-heading text-lg text-safety-orange uppercase">
                {current.author}
              </span>
              <span className="text-concrete-400 text-sm">{current.location}</span>
            </div>

            {/* Project Tag */}
            <span className="inline-block text-xs uppercase tracking-wider text-concrete-300 border border-concrete-600 px-3 py-1 rounded">
              {current.project}
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-concrete-700 hover:bg-safety-orange text-white rounded-full flex items-center justify-center transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-safety-orange w-8'
                      : 'bg-concrete-600 hover:bg-concrete-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-concrete-700 hover:bg-safety-orange text-white rounded-full flex items-center justify-center transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
