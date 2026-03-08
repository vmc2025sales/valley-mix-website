import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-concrete-900 border-t border-concrete-800">
      {/* Main Footer */}
      <div className="w-full section-padding py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt="Valley Mix Concrete" 
                className="h-12 w-auto max-h-12 object-contain"
              />
            </div>
            <p className="text-concrete-300 leading-relaxed mb-6 max-w-md">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-4">
              {/* Instagram Only */}
              <a
                href="https://www.instagram.com/valleymixconcrete/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-concrete-800 hover:bg-safety-orange text-white rounded flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/19565611288?text=Hello,%20I%20need%20ValleyMixConcrete!%20Could%20I%20please%20talk%20to%20a%20sales%20rep?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded flex items-center justify-center transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-white uppercase tracking-wider mb-6">
              {t('footer.links')}
            </h3>
            <ul className="space-y-3">
              {[
                { name: t('nav.home'), href: '#hero' },
                { name: t('nav.services'), href: '#services' },
                { name: t('nav.process'), href: '#process' },
                { name: t('nav.projects'), href: '#projects' },
                { name: t('nav.faq'), href: '#faq' },
                { name: t('nav.contact'), href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-concrete-300 hover:text-safety-orange transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-white uppercase tracking-wider mb-6">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:9565611288"
                  className="flex items-center gap-3 text-concrete-300 hover:text-safety-orange transition-colors"
                >
                  <Phone className="w-5 h-5 text-safety-orange" />
                  <span>(956) 561-1288</span>
                </a>
              </li>
              {/* WhatsApp */}
              <li>
                <a
                  href="https://wa.me/19565611288?text=Hello,%20I%20need%20ValleyMixConcrete!%20Could%20I%20please%20talk%20to%20a%20sales%20rep?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@valleymixconcrete.com"
                  className="flex items-center gap-3 text-concrete-300 hover:text-safety-orange transition-colors"
                >
                  <Mail className="w-5 h-5 text-safety-orange" />
                  <span className="text-sm">sales@valleymixconcrete.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=6005+FM+1732+Brownsville+TX+78520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-concrete-300 hover:text-safety-orange transition-colors"
                >
                  <MapPin className="w-5 h-5 text-safety-orange flex-shrink-0" />
                  <span className="text-sm">6005 FM 1732, Brownsville, TX 78520</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-concrete-800">
        <div className="w-full section-padding py-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-concrete-400 text-sm text-center md:text-left">
              {currentYear} Valley Mix Concrete. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-concrete-400 hover:text-safety-orange transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="text-concrete-400 hover:text-safety-orange transition-colors">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
