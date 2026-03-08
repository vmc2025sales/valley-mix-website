import { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#hero' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.process'), href: '#process' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.faq'), href: '#faq' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-concrete-900/95 backdrop-blur-md py-3 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full section-padding">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-3"
            >
              <img 
                src="/logo.png" 
                alt="Valley Mix Concrete" 
                className="h-10 w-auto max-h-10 object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-white/80 hover:text-safety-orange transition-colors duration-300 text-sm uppercase tracking-wider font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="text-white/80 hover:text-safety-orange transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {language === 'en' ? 'ES' : 'EN'}
              </button>

              <a
                href="tel:9565611288"
                className="flex items-center gap-2 text-white/80 hover:text-safety-orange transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">(956) 561-1288</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/19565611288?text=Hello,%20I%20need%20ValleyMixConcrete!%20Could%20I%20please%20talk%20to%20a%20sales%20rep?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-300"
                aria-label={t('whatsapp.chat')}
              >
                <MessageCircle className="w-5 h-5" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="btn-primary text-xs py-3 px-6"
              >
                {t('nav.getQuote')}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-concrete-900/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {/* Language Toggle Mobile */}
          <button
            onClick={toggleLanguage}
            className="text-safety-orange text-lg font-medium uppercase tracking-wider"
          >
            {language === 'en' ? 'Español' : 'English'}
          </button>

          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-white text-2xl font-heading uppercase tracking-wider hover:text-safety-orange transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
            </a>
          ))}

          {/* WhatsApp Mobile */}
          <a
            href="https://wa.me/19565611288?text=Hello,%20I%20need%20ValleyMixConcrete!%20Could%20I%20please%20talk%20to%20a%20sales%20rep?"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-lg">WhatsApp</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="btn-primary mt-4"
          >
            {t('nav.getQuote')}
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
