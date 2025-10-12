
const strings = {
  en: {
    slogan: "Exact Yard. On Site. On Time.",
    sub: "Fresh volumetric concrete mixed at your job site. Order exactly what you need—from 1 yard to as many as you like.",
    callNow: "Call Now",
    getQuote: "Get a Quote",
    aboutTitle:"Why Valley Mix",
    aboutBody:"We deliver exact-yard concrete with modern volumetric mixer trucks. No waste, no hot loads, and no 5AM concrete rush. Pay only for what you use.",
    servicesTitle:"Services",
    s1:"Residential & Commercial Delivery",
    s2:"Volumetric Concrete (2500–4500+ PSI)",
    s3:"Driveways, Slabs, Foundations, Sidewalks",
    contactTitle:"Contact",
    address:"6005 FM 1732, Brownsville, TX 78520",
    phone:"(956) 561-1288",
    email:"sales@valleymixconcrete.com",
    formName:"Name",
    formEmail:"Email",
    formMsg:"Tell us about your pour (yardage, PSI, address, date/time)",
    formSend:"Open Email to Send",
    copyright:"© Valley Mix Concrete. All rights reserved."
  },
  es: {
    slogan: "Yarda Exacta. En Sitio. A Tiempo.",
    sub: "Concreto fresco con mezcladoras volumétricas directamente en tu obra. Pide exactamente lo que necesitas—desde 1 yarda hasta la cantidad que quieras.",
    callNow: "Llamar Ahora",
    getQuote: "Solicitar Cotización",
    aboutTitle:"¿Por qué Valley Mix?",
    aboutBody:"Entregamos concreto a yarda exacta con camiones mezcladores volumétricos modernos. Sin desperdicio, sin cargas calientes y sin madrugar a las 5 AM. Solo pagas lo que usas.",
    servicesTitle:"Servicios",
    s1:"Entregas Residenciales y Comerciales",
    s2:"Concreto Volumétrico (2500–4500+ PSI)",
    s3:"Cocheras, Losas, Cimentaciones y Banquetas",
    contactTitle:"Contacto",
    address:"6005 FM 1732, Brownsville, TX 78520",
    phone:"(956) 561-1288",
    email:"sales@valleymixconcrete.com",
    formName:"Nombre",
    formEmail:"Correo electrónico",
    formMsg:"Cuéntanos de tu colado (yardas, PSI, dirección, fecha/hora)",
    formSend:"Abrir Correo para Enviar",
    copyright:"© Valley Mix Concrete. Todos los derechos reservados."
  }
};

const $ = (sel)=>document.querySelector(sel);
const setLang = (lang)=>{
  const t = strings[lang];
  $('[data-slogan]').textContent = t.slogan;
  $('[data-sub]').textContent = t.sub;
  document.querySelectorAll('[data-call]').forEach(el=>el.textContent=t.callNow);
  document.querySelectorAll('[data-quote]').forEach(el=>el.textContent=t.getQuote);
  $('[data-about-title]').textContent = t.aboutTitle;
  $('[data-about-body]').textContent = t.aboutBody;
  $('[data-services-title]').textContent = t.servicesTitle;
  $('[data-s1]').textContent = t.s1;
  $('[data-s2]').textContent = t.s2;
  $('[data-s3]').textContent = t.s3;
  $('[data-contact-title]').textContent = t.contactTitle;
  $('[data-address]').textContent = t.address;
  $('[data-phone]').textContent = t.phone;
  $('[data-email]').textContent = t.email;
  $('[name=name]').placeholder = t.formName;
  $('[name=email]').placeholder = t.formEmail;
  $('[name=message]').placeholder = t.formMsg;
  $('[data-send]').textContent = t.formSend;
  $('[data-copy]').textContent = t.copyright;
  document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.remove('active'));
  document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
  document.documentElement.lang = lang;
};

window.addEventListener('DOMContentLoaded', ()=>{
  setLang('en');
  document.querySelectorAll('.lang-toggle button').forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.dataset.lang));
  });

  // mailto builder
  const form = document.querySelector('#quote-form');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const msg = form.message.value.trim();
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:sales@valleymixconcrete.com?subject=Concrete Quote Request&body=${body}`;
  });
});
