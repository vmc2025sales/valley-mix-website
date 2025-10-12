
// Set your live form endpoints here (optional)
const FORM_ENDPOINT = ""; // e.g., "https://formspree.io/f/xxxxxx"
const GOOGLE_APPS_SCRIPT_URL = ""; // e.g., "https://script.google.com/macros/s/xxxx/exec"

const T = {
  en: {
    nav_home: "Home",
    nav_who: "Who We Are",
    nav_services: "Products & Services",
    nav_projects: "Projects",
    nav_quote: "Get a Quote",
    nav_apply: "Apply",

    slogan: "Exact Yard. On Site. On Time.",
    sub: "Fresh volumetric concrete mixed at your job site — order exactly what you need from 1 yard to any size.",
    call: "Call Now",
    quote_cta: "Get a Quote",
    k1: "On‑Site Volumetric Mixing",
    k2: "Exact‑Yard, Zero Waste",
    k3: "Same‑Day Scheduling",
    k4: "RGV & South Texas",

    who_h1: "Excellence & Reliability",
    who_p1: "We’re a South Texas concrete supplier focused on precision, punctuality and clean job sites.",
    who_h2a: "Our Approach",
    who_p2a: "Volumetric mixing means your concrete is produced on site — exact yardage, right PSI, with flexibility to adjust on the fly.",
    who_h2b: "Service Area",
    who_p2b: "Rio Grande Valley and surrounding South Texas markets. Call for availability outside the area.",

    svc_h1: "Concrete That Fits Your Job",
    svc_1h: "Custom Concrete Mixes",
    svc_1p: "Residential and commercial designs, options for fibers, accelerators and admixtures.",
    svc_2h: "Ready Mix Delivery (Volumetric)",
    svc_2p: "Exact yardage — pay only for what you use. Fresh concrete made at your site.",
    svc_3h: "Concrete Pumping Partners",
    svc_3p: "Coordinated scheduling with trusted pump operators.",
    svc_4h: "On‑Site Technical Support",
    svc_4p: "Field checks, mix adjustments and job coordination.",
    svc_5h: "Sustainable Practices",
    svc_5p: "Optimized loads and reduced returns minimize waste.",

    projects_h1: "Recent Work",
    projects_driveway: "Residential Driveway",
    projects_slab: "Commercial Slab",
    projects_sidewalks: "Sidewalks & Ramps",
    projects_patio: "Patio & Walkways",
    projects_foundation: "Foundations",

    map_h1: "Service Area",

    form_h1: "Tell Us About Your Pour",
    form_intro: "We’ll confirm availability and schedule your pour.",
    form_name: "Name",
    form_email: "Email",
    form_msg: "Details (address, date/time)",
    form_psi_label: "PSI",
    form_send: "Send Request",
    success: "Request sent! We’ll be in touch shortly.",
    error: "Something went wrong. Please call (956) 561-1288.",

    contact: "Contact",
    address: "6005 FM 1732, Brownsville, TX 78520",
    phone: "(956) 561-1288",
    email: "sales@valleymixconcrete.com",
    copyright: "© Valley Mix Concrete. All rights reserved."
  },
  es: {
    nav_home: "Inicio",
    nav_who: "Quiénes Somos",
    nav_services: "Productos y Servicios",
    nav_projects: "Proyectos",
    nav_quote: "Cotización",
    nav_apply: "Solicitar Empleo",

    slogan: "Yarda Exacta. En Sitio. A Tiempo.",
    sub: "Concreto fresco mezclado en tu obra: pide exactamente lo que necesitas — desde 1 yarda hasta lo que requieras.",
    call: "Llamar Ahora",
    quote_cta: "Solicitar Cotización",
    k1: "Mezcla Volumétrica en Sitio",
    k2: "Yarda Exacta, Cero Desperdicio",
    k3: "Programación Mismo Día",
    k4: "Valle del Río Grande y Sur de Texas",

    who_h1: "Excelencia y Confiabilidad",
    who_p1: "Somos un proveedor de concreto en el Sur de Texas enfocado en precisión, puntualidad y obras limpias.",
    who_h2a: "Nuestro Enfoque",
    who_p2a: "La mezcla volumétrica produce el concreto en sitio — yarda exacta, PSI correcto y flexibilidad para ajustar en el momento.",
    who_h2b: "Área de Servicio",
    who_p2b: "Valle del Río Grande y zonas aledañas en el Sur de Texas. Llama para disponibilidad fuera del área.",

    svc_h1: "Concreto a la Medida de tu Obra",
    svc_1h: "Mezclas Personalizadas",
    svc_1p: "Diseños residenciales y comerciales, con fibras, acelerantes y aditivos.",
    svc_2h: "Entrega de Concreto (Volumétrico)",
    svc_2p: "Yarda exacta — pagas solo lo que usas. Concreto fresco hecho en tu obra.",
    svc_3h: "Aliados en Bombeo",
    svc_3p: "Programación coordinada con operadores de bombeo confiables.",
    svc_4h: "Soporte Técnico en Sitio",
    svc_4p: "Revisiones, ajustes de mezcla y coordinación en la obra.",
    svc_5h: "Prácticas Sustentables",
    svc_5p: "Cargas optimizadas y menor retorno para reducir desperdicio.",

    projects_h1: "Trabajos Recientes",
    projects_driveway: "Cochera Residencial",
    projects_slab: "Losa Comercial",
    projects_sidewalks: "Banquetas y Rampas",
    projects_patio: "Patio y Andadores",
    projects_foundation: "Cimentaciones",

    map_h1: "Área de Servicio",

    form_h1: "Cuéntanos de tu Colado",
    form_intro: "Confirmamos disponibilidad y agendamos tu colado.",
    form_name: "Nombre",
    form_email: "Correo electrónico",
    form_msg: "Detalles (dirección, fecha/hora)",
    form_psi_label: "PSI",
    form_send: "Enviar Solicitud",
    success: "¡Enviado! Te contactamos en breve.",
    error: "Ocurrió un error. Por favor llama al (956) 561-1288.",

    contact: "Contacto",
    address: "6005 FM 1732, Brownsville, TX 78520",
    phone: "(956) 561-1288",
    email: "sales@valleymixconcrete.com",
    copyright: "© Valley Mix Concrete. Todos los derechos reservados."
  }
};

function setLang(lang){
  const t = T[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i]").forEach(el=>{
    const key = el.getAttribute("data-i");
    if(!key || !(key in t)) return;
    if(el.tagName === "INPUT" || el.tagName === "TEXTAREA"){
      el.placeholder = t[key];
    } else if(el.tagName === "SELECT"){
      // handle PSI select label separately if needed
    } else {
      el.textContent = t[key];
    }
  });
  document.querySelectorAll(".lang-toggle button").forEach(b=>b.classList.remove("active"));
  document.querySelector(`.lang-toggle button[data-lang='${lang}']`).classList.add("active");
}

async function postJSON(url, payload){
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  });
  if(!res.ok) throw new Error("bad");
  return await res.json().catch(()=>({ok:true}));
}

function init(){
  // Set language
  setLang("en");
  document.querySelectorAll(".lang-toggle button").forEach(btn=>{
    btn.addEventListener("click", ()=> setLang(btn.dataset.lang));
  });

  // Mobile hamburger
  const burger = document.querySelector(".hamburger");
  const nav = document.querySelector(".navlinks");
  burger.addEventListener("click", ()=> nav.classList.toggle("show"));

  // Nav labels i18n
  const navMap = ["nav_home","nav_who","nav_services","nav_projects","nav_quote","nav_apply"];
  document.querySelectorAll(".navlinks a").forEach((a,i)=> a.setAttribute("data-i", navMap[i]));

  // Quote form submit
  const form = document.getElementById("quote-form");
  const notice = document.getElementById("form-notice");
  if(form){
    form.addEventListener("submit", async (e)=>{
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
          notice.textContent = T[document.documentElement.lang].success;
          form.reset(); return;
        }
      }catch(_){}
      try{
        if(GOOGLE_APPS_SCRIPT_URL){
          await postJSON(GOOGLE_APPS_SCRIPT_URL, payload);
          notice.textContent = T[document.documentElement.lang].success;
          form.reset(); return;
        }
      }catch(_){}
      notice.textContent = T[document.documentElement.lang].error;
    });
  }
}
document.addEventListener("DOMContentLoaded", init);
