
// Configurable endpoints
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxxxx"
const GOOGLE_APPS_SCRIPT_URL = ""; // e.g. "https://script.google.com/macros/s/xxxxxxxx/exec"

const STR = {
  en: {
    slogan:"Exact Yard. On Site. On Time.",
    sub:"Fresh volumetric concrete mixed at your job site. Order exactly what you need — from 1 yard to any size.",
    call:"Call Now",
    quote:"Get a Quote",
    k1:"On-Site Volumetric Mixing",
    k2:"Exact-Yard, Zero Waste",
    k3:"Same-Day Scheduling",
    k4:"RGV & South Texas",
    aboutTitle:"Who We Are",
    aboutBody:"Valley Mix Concrete delivers exact-yard volumetric concrete across the Rio Grande Valley. Fresh concrete mixed on-site so you only pay for what you use. Professional drivers, reliable scheduling, and clean pours.",
    svcTitle:"Products & Services",
    s1:"Custom Concrete Mixes",
    s2:"Ready Mix Delivery (Volumetric)",
    s3:"Concrete Pumping Partners",
    s4:"On-Site Technical Support",
    s5:"Sustainable Practices",
    ctaHeader:"Let's Build",
    ctaBody:"Tell us your yardage, PSI, address and date — we’ll schedule your pour and show up on time.",
    contact:"Contact",
    address:"6005 FM 1732, Brownsville, TX 78520",
    phone:"(956) 561-1288",
    email:"sales@valleymixconcrete.com",
    formName:"Name",
    formEmail:"Email",
    formMsg:"Details (address, date/time)",
    formSend:"Send Request",
    psiLabel:"PSI",
    success:"Request sent! We’ll be in touch shortly.",
    error:"Something went wrong. Please call (956) 561-1288.",
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
    formMsg:"Detalles (dirección, fecha/hora)",
    formSend:"Enviar Solicitud",
    psiLabel:"PSI",
    success:"¡Enviado! Te contactamos en breve.",
    error:"Ocurrió un error. Por favor llama al (956) 561-1288.",
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
      } else if(el.tagName==="SELECT") {
        // ignore
      } else {
        el.textContent = v;
      }
    });
  }
  document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.remove('active'));
  document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
}
async function postJSON(url, data){
  const res = await fetch(url, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  if(!res.ok) throw new Error("Request failed");
  return await res.json().catch(()=>({ok:true}));
}
function initCommon(){
  // hamburger menu
  const burger = document.querySelector('.hamburger');
  const navlinks = document.querySelector('.navlinks');
  if(burger && navlinks){
    burger.addEventListener('click', ()=> navlinks.classList.toggle('show'));
  }
  // language toggles
  document.querySelectorAll('.lang-toggle button').forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(btn.dataset.lang));
  });
  setLang('en');
  // form
  const form = document.querySelector('#quote-form');
  const notice = document.querySelector('#form-notice');
  if(form){
    form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      notice.textContent = "";
      const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        psi: form.psi.value,
        message: form.message.value.trim(),
        source: location.href
      };
      try{
        if(FORM_ENDPOINT){
          await postJSON(FORM_ENDPOINT, payload);
          notice.textContent = STR[document.documentElement.lang].success;
          form.reset();
          return;
        }
      }catch(e){ /* fall through to Sheets */ }
      try{
        if(GOOGLE_APPS_SCRIPT_URL){
          await postJSON(GOOGLE_APPS_SCRIPT_URL, payload);
          notice.textContent = STR[document.documentElement.lang].success;
          form.reset();
          return;
        }
      }catch(e){}
      notice.textContent = STR[document.documentElement.lang].error;
    });
  }
  // highlight active nav
  const path = location.pathname.replace(/\/+$/,'/');
  document.querySelectorAll('.navlinks a').forEach(a=>{
    if(a.getAttribute('href')===path || (a.getAttribute('href')==='/' && path==='/')){
      a.classList.add('active');
      a.style.borderColor = '#d1d5db';
    }
  });
}
document.addEventListener('DOMContentLoaded', initCommon);
