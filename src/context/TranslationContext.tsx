import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'es';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.projects': 'Projects',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.getQuote': 'Get a Quote',
    'nav.callNow': 'Call Now',

    // Hero
    'hero.tagline': 'Exact Yard. On Site. On Time.',
    'hero.badge1': 'RGV Owned & Operated',
    'hero.badge2': 'Volumetric Mixing',
    'hero.badge3': 'Price-Beat Guarantee',
    'hero.scroll': 'Scroll',

    // Intro
    'intro.about': 'About Us',
    'intro.title': 'Fresh Volumetric Concrete Mixed at Your Job Site',
    'intro.p1': 'Order exactly what you need from 1 yard to any size. Valley Mix Concrete is proudly owned and operated by RGV locals. We started with a single truck and a simple promise: deliver fresh, on-site concrete with honesty, fair pricing and reliable scheduling.',
    'intro.p2': 'Today we serve homeowners, builders and businesses across the Rio Grande Valley and South Texas—still guided by the same values we grew up with here. Because we mix on site with volumetric technology, you get the exact yards you need, the PSI you specify, and a crew that treats your project like our own.',
    'intro.psi': 'PSI Mixes',
    'intro.yardMin': 'Yard Minimum',
    'intro.feature1': 'Exact-Yard Mixing',
    'intro.feature2': 'Pay Only for What You Use',
    'intro.feature3': 'On-Site Adjustments',
    'intro.rgv': 'Owned & Operated',

    // Price Beat
    'price.title': 'Price-Beat Guarantee',
    'price.p1': "We'll beat any written quote from a licensed concrete supplier in the RGV. Our neighbors are our customers, and our reputation is worth more than any single job.",
    'price.req1': 'Licensed Suppliers Only',
    'price.req2': 'Written Quote Required',
    'price.req3': 'Same Specifications',
    'price.cta': 'Send Competitor Quote',

    // Services
    'services.offers': 'What We Offer',
    'services.title': 'Products & Services',
    'services.slab.title': 'Residential & Commercial Slabs',
    'services.slab.desc': 'Monolithic slabs, grade beams, machine pads—poured with on-site precision. Perfect for foundations, additions, and garages.',
    'services.slab.f1': 'Foundations',
    'services.slab.f2': 'Grade Beams',
    'services.slab.f3': 'Machine Pads',
    'services.flatwork.title': 'Driveways, Sidewalks, Patios',
    'services.flatwork.desc': 'Clean edges, consistent finishes and fiber options to fit your design. Enhance your property with durable concrete flatwork.',
    'services.flatwork.f1': 'Driveways',
    'services.flatwork.f2': 'Sidewalks',
    'services.flatwork.f3': 'Patios',
    'services.mix.title': 'Custom Mixes (2500–4500 PSI)',
    'services.mix.desc': 'Adjust slump and admixtures on site. Order exactly the yards you use with precise PSI specifications for your project.',
    'services.mix.f1': '2500-4500 PSI',
    'services.mix.f2': 'Fiber Options',
    'services.mix.f3': 'Admixtures',
    'services.pump.title': 'Pump Coordination',
    'services.pump.desc': 'We coordinate trusted pump partners to keep your pour moving. Available for residential and commercial projects.',
    'services.pump.f1': 'Residential',
    'services.pump.f2': 'Commercial',
    'services.pump.f3': 'Trusted Partners',
    'services.adjust.title': 'On-Site Adjustments',
    'services.adjust.desc': 'Adjust slump and yield in real time to match site conditions. Our volumetric trucks mix concrete on location.',
    'services.adjust.f1': 'Real-time Mixing',
    'services.adjust.f2': 'Slump Control',
    'services.adjust.f3': 'Exact Yards',
    'services.schedule.title': 'Flexible Scheduling',
    'services.schedule.desc': 'Early morning starts, weekend pours, and emergency services available. We work around your project timeline.',
    'services.schedule.f1': 'Early Starts',
    'services.schedule.f2': 'Weekends',
    'services.schedule.f3': 'Emergency',

    // Process
    'process.simple': 'Simple Process',
    'process.title': 'How It Works',
    'process.step1.title': 'Call or Book Online',
    'process.step1.desc': 'Contact us by phone or fill out our online form. Tell us about your project, location, and concrete needs.',
    'process.step2.title': 'Choose Your Mix & Yards',
    'process.step2.desc': "Select your PSI strength (2500-4500) and estimate your yardage. Not sure? We'll help you calculate.",
    'process.step3.title': 'We Mix On Site',
    'process.step3.desc': 'Our volumetric truck arrives and mixes fresh concrete on location. Adjust slump and admixtures as needed.',
    'process.step4.title': 'Pay Only for What You Use',
    'process.step4.desc': 'No waste, no overordering. You only pay for the exact yards you use. Clean, efficient, and fair.',
    'process.cta': 'Start Your Project',

    // Projects
    'projects.work': 'Our Work',
    'projects.title': 'Recent Projects',
    'projects.desc': 'Quality concrete work across the Rio Grande Valley. From residential driveways to commercial foundations, we deliver excellence on every pour.',
    'projects.driveway': 'Residential Driveway',
    'projects.foundation': 'Commercial Foundation',
    'projects.patio': 'Stamped Concrete Patio',
    'projects.sidewalk': 'Urban Sidewalk',

    // Testimonials
    'testimonials.title': 'Testimonials',
    'testimonials.subtitle': 'What Our Customers Say',

    // FAQ
    'faq.questions': 'Got Questions?',
    'faq.title': 'Frequently Asked Questions',
    'faq.cta': 'Contact Us',
    'faq.still': 'Still have questions? We\'re here to help.',
    'faq.q1': 'What areas do you serve?',
    'faq.a1': "We serve the Rio Grande Valley and South Texas including Brownsville, Harlingen, Los Fresnos, San Benito, Olmito, Port Isabel, and South Padre Island. Contact us if you're unsure about your location.",
    'faq.q2': 'What PSI mixes do you deliver?',
    'faq.a2': 'We offer custom mixes ranging from 2500 PSI to 4500 PSI. Our volumetric trucks allow us to adjust the mix on-site to meet your specific project requirements. We can also add fibers, accelerators, and retarders as needed.',
    'faq.q3': 'Can you coordinate a pump?',
    'faq.a3': 'Yes! We work with trusted pump partners and can coordinate concrete pump services for both residential and commercial projects. Just let us know when you book your delivery.',
    'faq.q4': 'How does volumetric mixing work?',
    'faq.a4': 'Our trucks carry the raw materials (cement, sand, gravel, water) separately and mix them on-site. This means you get fresh concrete mixed exactly when you need it, and you only pay for what you use—no waste!',
    'faq.q5': 'What is your minimum order?',
    'faq.a5': "Our minimum order is 1 cubic yard. This makes us perfect for small residential projects that larger concrete companies won't handle.",
    'faq.q6': 'How do I get a quote?',
    'faq.a6': "You can get a quote by calling us at (956) 561-1288, filling out our online form, or sending us an email at sales@valleymixconcrete.com. We'll need to know your project location, estimated yardage, and PSI requirements.",

    // Contact
    'contact.touch': 'Get In Touch',
    'contact.title': 'Request a Quote',
    'contact.desc': "Ready to start your project? Fill out the form below and we'll get back to you within 24 hours with a competitive quote.",
    'contact.name': 'Name *',
    'contact.namePlaceholder': 'Your name',
    'contact.phone': 'Phone *',
    'contact.phonePlaceholder': '(956) 123-4567',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.yards': 'Estimated Yards',
    'contact.selectYards': 'Select yards',
    'contact.yards1': '1-5 yards',
    'contact.yards2': '6-10 yards',
    'contact.yards3': '11-20 yards',
    'contact.yards4': '21-50 yards',
    'contact.yards5': '50+ yards',
    'contact.yards6': 'Not sure',
    'contact.details': 'Project Details',
    'contact.detailsPlaceholder': 'Tell us about your project, location, and any specific requirements...',
    'contact.send': 'Send Message',
    'contact.sent': 'Message Sent!',
    'contact.sentDesc': "We'll get back to you within 24 hours.",
    'contact.area': 'Service Area',
    'contact.areaDesc': 'Rio Grande Valley & South Texas including Brownsville, Harlingen, Los Fresnos, San Benito, Olmito, Port Isabel and South Padre Island.',
    'contact.hours': 'Mon-Sat: 6AM - 6PM',

    // Footer
    'footer.desc': 'Fresh volumetric concrete mixed at your job site. Serving the Rio Grande Valley with honesty, fair pricing, and reliable scheduling. RGV owned and operated.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    // WhatsApp
    'whatsapp.chat': 'Chat on WhatsApp',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.process': 'Proceso',
    'nav.projects': 'Proyectos',
    'nav.faq': 'Preguntas',
    'nav.contact': 'Contacto',
    'nav.getQuote': 'Cotización',
    'nav.callNow': 'Llamar',

    // Hero
    'hero.tagline': 'Yarda Exacta. En Sitio. A Tiempo.',
    'hero.badge1': 'Dueños y Operados del RGV',
    'hero.badge2': 'Mezcla Volumétrica',
    'hero.badge3': 'Garantía de Mejor Precio',
    'hero.scroll': 'Desplazar',

    // Intro
    'intro.about': 'Sobre Nosotros',
    'intro.title': 'Concreto Volumétrico Fresco Mezclado en Su Obra',
    'intro.p1': 'Ordene exactamente lo que necesita desde 1 yarda hasta cualquier tamaño. Valley Mix Concrete es orgullosamente propiedad y operado por locales del RGV. Comenzamos con un solo camión y una promesa simple: entregar concreto fresco en el sitio con honestidad, precios justos y programación confiable.',
    'intro.p2': 'Hoy servimos a propietarios, constructores y negocios en todo el Valle del Río Grande y el Sur de Texas, guiados aún por los mismos valores con los que crecimos aquí. Debido a que mezclamos en el sitio con tecnología volumétrica, obtiene las yardas exactas que necesita, el PSI que especifica y un equipo que trata su proyecto como propio.',
    'intro.psi': 'Mezclas PSI',
    'intro.yardMin': 'Mínimo de Yardas',
    'intro.feature1': 'Mezcla por Yarda Exacta',
    'intro.feature2': 'Pague Solo lo que Use',
    'intro.feature3': 'Ajustes en el Sitio',
    'intro.rgv': 'Dueños y Operados',

    // Price Beat
    'price.title': 'Garantía de Mejor Precio',
    'price.p1': 'Superaremos cualquier cotización escrita de un proveedor de concreto licenciado en el RGV. Nuestros vecinos son nuestros clientes, y nuestra reputación vale más que cualquier trabajo individual.',
    'price.req1': 'Solo Proveedores Licenciados',
    'price.req2': 'Cotización Escrita Requerida',
    'price.req3': 'Mismas Especificaciones',
    'price.cta': 'Enviar Cotización Competidor',

    // Services
    'services.offers': 'Lo Que Ofrecemos',
    'services.title': 'Productos y Servicios',
    'services.slab.title': 'Losas Residenciales y Comerciales',
    'services.slab.desc': 'Losas monolíticas, vigas de grado, plataformas para maquinaria—vertidas con precisión en el sitio. Perfectas para cimientos, adiciones y garajes.',
    'services.slab.f1': 'Cimientos',
    'services.slab.f2': 'Vigas de Grado',
    'services.slab.f3': 'Plataformas',
    'services.flatwork.title': 'Entradas, Aceras, Patios',
    'services.flatwork.desc': 'Bordes limpios, acabados consistentes y opciones de fibra para adaptarse a su diseño. Mejore su propiedad con concreto duradero.',
    'services.flatwork.f1': 'Entradas',
    'services.flatwork.f2': 'Aceras',
    'services.flatwork.f3': 'Patios',
    'services.mix.title': 'Mezclas Personalizadas (2500–4500 PSI)',
    'services.mix.desc': 'Ajuste la consistencia y aditivos en el sitio. Ordene exactamente las yardas que use con especificaciones PSI precisas para su proyecto.',
    'services.mix.f1': '2500-4500 PSI',
    'services.mix.f2': 'Opciones de Fibra',
    'services.mix.f3': 'Aditivos',
    'services.pump.title': 'Coordinación de Bomba',
    'services.pump.desc': 'Coordinamos socios de bombeo confiables para mantener su vertido en movimiento. Disponible para proyectos residenciales y comerciales.',
    'services.pump.f1': 'Residencial',
    'services.pump.f2': 'Comercial',
    'services.pump.f3': 'Socios Confiables',
    'services.adjust.title': 'Ajustes en el Sitio',
    'services.adjust.desc': 'Ajuste la consistencia y rendimiento en tiempo real para adaptarse a las condiciones del sitio. Nuestros camiones volumétricos mezclan concreto en el lugar.',
    'services.adjust.f1': 'Mezcla en Tiempo Real',
    'services.adjust.f2': 'Control de Consistencia',
    'services.adjust.f3': 'Yardas Exactas',
    'services.schedule.title': 'Programación Flexible',
    'services.schedule.desc': 'Inicios tempranos, vertidos de fin de semana y servicios de emergencia disponibles. Trabajamos según el cronograma de su proyecto.',
    'services.schedule.f1': 'Inicios Tempranos',
    'services.schedule.f2': 'Fines de Semana',
    'services.schedule.f3': 'Emergencias',

    // Process
    'process.simple': 'Proceso Simple',
    'process.title': 'Cómo Funciona',
    'process.step1.title': 'Llame o Reserve en Línea',
    'process.step1.desc': 'Contáctenos por teléfono o complete nuestro formulario en línea. Cuéntenos sobre su proyecto, ubicación y necesidades de concreto.',
    'process.step2.title': 'Elija Su Mezcla y Yardas',
    'process.step2.desc': 'Seleccione su resistencia PSI (2500-4500) y estime sus yardas. ¿No está seguro? Le ayudaremos a calcular.',
    'process.step3.title': 'Mezclamos en el Sitio',
    'process.step3.desc': 'Nuestro camión volumétrico llega y mezcla concreto fresco en el lugar. Ajuste la consistencia y aditivos según sea necesario.',
    'process.step4.title': 'Pague Solo lo que Use',
    'process.step4.desc': 'Sin desperdicio, sin sobre pedido. Solo paga por las yardas exactas que usa. Limpio, eficiente y justo.',
    'process.cta': 'Inicie Su Proyecto',

    // Projects
    'projects.work': 'Nuestro Trabajo',
    'projects.title': 'Proyectos Recientes',
    'projects.desc': 'Trabajo de concreto de calidad en todo el Valle del Río Grande. Desde entradas residenciales hasta cimientos comerciales, entregamos excelencia en cada vertido.',
    'projects.driveway': 'Entrada Residencial',
    'projects.foundation': 'Cimiento Comercial',
    'projects.patio': 'Patio de Concreto Estampado',
    'projects.sidewalk': 'Acera Urbana',

    // Testimonials
    'testimonials.title': 'Testimonios',
    'testimonials.subtitle': 'Lo Que Dicen Nuestros Clientes',

    // FAQ
    'faq.questions': '¿Tiene Preguntas?',
    'faq.title': 'Preguntas Frecuentes',
    'faq.cta': 'Contáctenos',
    'faq.still': '¿Aún tiene preguntas? Estamos aquí para ayudar.',
    'faq.q1': '¿Qué áreas sirven?',
    'faq.a1': 'Servimos el Valle del Río Grande y el Sur de Texas incluyendo Brownsville, Harlingen, Los Fresnos, San Benito, Olmito, Port Isabel y South Padre Island. Contáctenos si no está seguro de su ubicación.',
    'faq.q2': '¿Qué mezclas PSI entregan?',
    'faq.a2': 'Ofrecemos mezclas personalizadas desde 2500 PSI hasta 4500 PSI. Nuestros camiones volumétricos nos permiten ajustar la mezcla en el sitio para cumplir con los requisitos específicos de su proyecto. También podemos agregar fibras, aceleradores y retardantes según sea necesario.',
    'faq.q3': '¿Pueden coordinar una bomba?',
    'faq.a3': '¡Sí! Trabajamos con socios de bombeo confiables y podemos coordinar servicios de bombeo de concreto para proyectos residenciales y comerciales. Solo avísenos cuando reserve su entrega.',
    'faq.q4': '¿Cómo funciona la mezcla volumétrica?',
    'faq.a4': 'Nuestros camiones transportan los materiales crudos (cemento, arena, grava, agua) por separado y los mezclan en el sitio. Esto significa que obtiene concreto fresco mezclado exactamente cuando lo necesita, y solo paga por lo que usa—¡sin desperdicio!',
    'faq.q5': '¿Cuál es su pedido mínimo?',
    'faq.a5': 'Nuestro pedido mínimo es de 1 yarda cúbica. Esto nos hace perfectos para proyectos residenciales pequeños que las compañías de concreto más grandes no manejan.',
    'faq.q6': '¿Cómo obtengo una cotización?',
    'faq.a6': 'Puede obtener una cotización llamándonos al (956) 561-1288, completando nuestro formulario en línea, o enviándonos un correo a sales@valleymixconcrete.com. Necesitaremos saber la ubicación de su proyecto, yardaje estimado y requisitos de PSI.',

    // Contact
    'contact.touch': 'Póngase en Contacto',
    'contact.title': 'Solicite una Cotización',
    'contact.desc': '¿Listo para iniciar su proyecto? Complete el formulario a continuación y nos pondremos en contacto dentro de 24 horas con una cotización competitiva.',
    'contact.name': 'Nombre *',
    'contact.namePlaceholder': 'Su nombre',
    'contact.phone': 'Teléfono *',
    'contact.phonePlaceholder': '(956) 123-4567',
    'contact.email': 'Correo',
    'contact.emailPlaceholder': 'su@correo.com',
    'contact.yards': 'Yardas Estimadas',
    'contact.selectYards': 'Seleccione yardas',
    'contact.yards1': '1-5 yardas',
    'contact.yards2': '6-10 yardas',
    'contact.yards3': '11-20 yardas',
    'contact.yards4': '21-50 yardas',
    'contact.yards5': '50+ yardas',
    'contact.yards6': 'No estoy seguro',
    'contact.details': 'Detalles del Proyecto',
    'contact.detailsPlaceholder': 'Cuéntenos sobre su proyecto, ubicación y cualquier requisito específico...',
    'contact.send': 'Enviar Mensaje',
    'contact.sent': '¡Mensaje Enviado!',
    'contact.sentDesc': 'Nos pondremos en contacto dentro de 24 horas.',
    'contact.area': 'Área de Servicio',
    'contact.areaDesc': 'Valle del Río Grande y Sur de Texas incluyendo Brownsville, Harlingen, Los Fresnos, San Benito, Olmito, Port Isabel y South Padre Island.',
    'contact.hours': 'Lun-Sáb: 6AM - 6PM',

    // Footer
    'footer.desc': 'Concreto volumétrico fresco mezclado en su obra. Sirviendo el Valle del Río Grande con honestidad, precios justos y programación confiable. Dueños y operados del RGV.',
    'footer.links': 'Enlaces Rápidos',
    'footer.contact': 'Contáctenos',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',

    // WhatsApp
    'whatsapp.chat': 'Chat por WhatsApp',
  },
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
