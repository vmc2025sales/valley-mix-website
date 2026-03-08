import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Send, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    yards: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '', yards: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(956) 561-1288',
      href: 'tel:9565611288',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'sales@valleymixconcrete.com',
      href: 'mailto:sales@valleymixconcrete.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '6005 FM 1732, Brownsville, TX 78520',
      href: 'https://maps.google.com/?q=6005+FM+1732+Brownsville+TX+78520',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: t('contact.hours'),
      href: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-truck.jpg"
          alt="Concrete truck"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-concrete-900/90" />
      </div>

      <div className="relative z-10 w-full section-padding">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-1 bg-safety-orange" />
            <span className="text-safety-orange uppercase tracking-widest text-sm font-semibold">
              {t('contact.touch')}
            </span>
            <div className="w-12 h-1 bg-safety-orange" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-concrete-300 max-w-2xl mx-auto">
            {t('contact.desc')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-concrete-800/80 backdrop-blur-sm border border-concrete-700 p-8 rounded-lg opacity-0"
          >
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-safety-orange/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-safety-orange" />
                </div>
                <h3 className="font-heading text-2xl text-white uppercase mb-2">
                  {t('contact.sent')}
                </h3>
                <p className="text-concrete-300">
                  {t('contact.sentDesc')}
                </p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white text-sm uppercase tracking-wider mb-2">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-concrete-900 border border-concrete-600 text-white px-4 py-3 rounded focus:border-safety-orange focus:outline-none transition-colors"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm uppercase tracking-wider mb-2">
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-concrete-900 border border-concrete-600 text-white px-4 py-3 rounded focus:border-safety-orange focus:outline-none transition-colors"
                      placeholder={t('contact.phonePlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white text-sm uppercase tracking-wider mb-2">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-concrete-900 border border-concrete-600 text-white px-4 py-3 rounded focus:border-safety-orange focus:outline-none transition-colors"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm uppercase tracking-wider mb-2">
                      {t('contact.yards')}
                    </label>
                    <select
                      name="yards"
                      value={formData.yards}
                      onChange={handleChange}
                      className="w-full bg-concrete-900 border border-concrete-600 text-white px-4 py-3 rounded focus:border-safety-orange focus:outline-none transition-colors"
                    >
                      <option value="">{t('contact.selectYards')}</option>
                      <option value="1-5">{t('contact.yards1')}</option>
                      <option value="6-10">{t('contact.yards2')}</option>
                      <option value="11-20">{t('contact.yards3')}</option>
                      <option value="21-50">{t('contact.yards4')}</option>
                      <option value="50+">{t('contact.yards5')}</option>
                      <option value="not-sure">{t('contact.yards6')}</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-white text-sm uppercase tracking-wider mb-2">
                    {t('contact.details')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-concrete-900 border border-concrete-600 text-white px-4 py-3 rounded focus:border-safety-orange focus:outline-none transition-colors resize-none"
                    placeholder={t('contact.detailsPlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  {t('contact.send')}
                </button>
              </>
            )}
          </form>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 opacity-0">
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 bg-concrete-800/50 border border-concrete-700 rounded-lg"
                >
                  <div className="w-12 h-12 bg-safety-orange/20 rounded flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-safety-orange" />
                  </div>
                  <div>
                    <span className="block text-concrete-400 text-xs uppercase tracking-wider mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white hover:text-safety-orange transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/19565611288?text=Hello,%20I%20need%20ValleyMixConcrete!%20Could%20I%20please%20talk%20to%20a%20sales%20rep?"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500 rounded flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-green-400 text-xs uppercase tracking-wider mb-1">
                    WhatsApp
                  </span>
                  <span className="text-white font-medium">{t('whatsapp.chat')}</span>
                </div>
              </a>
            </div>

            {/* Service Area */}
            <div className="mt-8 p-6 bg-concrete-800/50 border border-concrete-700 rounded-lg">
              <h3 className="font-heading text-lg text-white uppercase mb-4">
                {t('contact.area')}
              </h3>
              <p className="text-concrete-300 text-sm leading-relaxed">
                {t('contact.areaDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
