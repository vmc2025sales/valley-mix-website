
// Simple i18n + nav highlighter
const STR = {
  en: {
    slogan:"Exact Yard. On Site. On Time.",
    sub:"Fresh volumetric concrete mixed at your job site. Order exactly what you need — from 1 yard to any size.",
    call:"Call Now",
    quote:"Get a Quote",
    k1:"On‑Site Volumetric Mixing",
    k2:"Exact-Yard, Zero Waste",
    k3:"Same‑Day Scheduling",
    k4:"RGV & South Texas",
    aboutTitle:"Who We Are",
    aboutBody:"Valley Mix Concrete delivers exact-yard volumetric concrete across the Rio Grande Valley. Fresh concrete mixed on-site so you only pay for what you use. Professional drivers, reliable scheduling, and clean pours.",
    svcTitle:"Products & Services",
    s1:"Custom Concrete Mixes",
    s2:"Ready Mix Delivery (Volumetric)",
    s3:"Concrete Pumping Partners",
    s4:"On‑Site Technical Support",
    s5:"Sustainable Practices",
    ctaHeader:"Let's Build",
    ctaBody:"Tell us your yardage, PSI, address and date — we’ll schedule your pour and show up on time.",
    contact:"Contact",
    address:"6005 FM 1732, Brownsville, TX 78520",
    phone:"(956) 561-1288",
    email:"sales@valleymixconcrete.com",
    formName:"Name",
    formEmail:"Email",
    formMsg:"Tell us about your pour (yardage, PSI, address, date/time)",
    formSend:"Open Email to Send",
    copy:"© Valley Mix Concrete. All rights reserved."
  },
  es: {
    slogan:"Yarda Exacta. En Sitio. A Tiempo.",
    sub:"Concreto fresco con mezcladoras volumétricas directamente en tu obra. Pide exactamente lo que necesitas — desde 1 yarda hasta lo que requieras.",
    call:"Llamar Ahora",
    quote:"Solicitar Cotización",
    k1:"Mezcla Volumétrica en Sitio",
    k2:"Yarda Exacta, Cero Desperdicio",
    k3:"Programación el Mismo Día",
    k4:"RGV y Sur de Texas",
    aboutTitle:"Quiénes Somos",
    aboutBody:"Valley Mix Concrete entrega concreto a yarda exacta en todo el Valle del Río Grande. Concreto fresco mezclado en obra: pagas solo lo que usas. Operadores profesionales, programación confiable y colados limpios.",
    svcTitle:"Productos y Servicios",
    s1:"Mezclas Personalizadas",
    s2:"Entrega de Concreto (Volumétrico)",
    s3:"Aliados en Bombeo",
    s4:"Soporte Técnico en Sitio",
    s5:"Prácticas Sustentables",
    ctaHeader:"Construyamos",
    ctaBody:"Cuéntanos yardaje, PSI, dirección y fecha — agendamos tu colado y llegamos a tiempo.",
    contact:"Contacto",
    address:"6005 FM 1732, Brownsville, TX 78520",
    phone:"(956) 561-1288",
    email:"sales@valleymixconcrete.com",
    formName:"Nombre",
    formEmail:"Correo electrónico",
    formMsg:"Cuéntanos de tu colado (yardas, PSI, dirección, fecha/hora)",
    formSend:"Abrir Correo",
    copy:"© Valley Mix Concrete. Todos los derechos reservados."
  }
};
function setLang(lang){
  const t = STR[lang];
  document.documentElement.lang = lang;
  for(const [k,v] of Object.entries(t)){
    document.querySelectorAll(`[data-i18n="${k}"]`).forEach(el=>{
      if(el.tagName==="INPUT" || el.tagName==="TEXTAREA"){
        el.placeholder = v;
      } else {
        el.textContent = v;
      }
    });
  }
  document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.remove('active'));
  document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
}
function initCommon(){
  // language toggles
  document.querySelectorAll('.lang-toggle button').forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.dataset.lang));
  });
  setLang('en');
  // mailto form
  const form = document.querySelector('#quote-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
      window.location.href = `mailto:sales@valleymixconcrete.com?subject=Concrete Quote&body=${body}`;
    });
  }
  // highlight active nav
  const path = location.pathname.replace(/\/+$/,'/');
  document.querySelectorAll('.navlinks a').forEach(a=>{
    if(a.getAttribute('href')===path || (a.getAttribute('href')==='/' && path==='/')){
      a.classList.add('active');
      a.style.borderColor = '#374151';
    }
  });
}
document.addEventListener('DOMContentLoaded', initCommon);
