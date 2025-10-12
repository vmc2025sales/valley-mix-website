
const FORM_ENDPOINT = "";
const GOOGLE_APPS_SCRIPT_URL = "";
const T = {
  en:{nav_home:"Home",nav_who:"Who We Are",nav_services:"Products & Services",nav_projects:"Projects",nav_quote:"Get a Quote",nav_apply:"Apply",
      slogan:"Exact Yard. On Site. On Time.",sub:"Fresh volumetric concrete mixed at your job site — order exactly what you need from 1 yard to any size.",
      call:"Call Now",quote_cta:"Get a Quote",k1:"On‑Site Volumetric Mixing",k2:"Exact‑Yard, Zero Waste",k3:"Same‑Day Scheduling",k4:"RGV & South Texas",
      who_h1:"Excellence & Reliability",who_p1:"We’re a South Texas concrete supplier focused on precision, punctuality and clean job sites.",
      map_h1:"Service Area",projects_h1:"Recent Work",
      form_h1:"Tell Us About Your Pour",form_intro:"We’ll confirm availability and schedule your pour.",
      form_name:"Name",form_email:"Email",form_msg:"Details (address, date/time)",form_psi_label:"PSI",form_send:"Send Request",
      success:"Request sent! We’ll be in touch shortly.",error:"Something went wrong. Please call (956) 561-1288.",
      contact:"Contact",address:"6005 FM 1732, Brownsville, TX 78520",phone:"(956) 561-1288",email:"sales@valleymixconcrete.com",
      copyright:"© Valley Mix Concrete. All rights reserved.",
      cap_driveway:"Residential Driveway",cap_slab:"Commercial Slab",cap_sidewalks:"Sidewalks & Ramps",cap_patio:"Patio & Walkways",cap_foundation:"Foundations"},
  es:{nav_home:"Inicio",nav_who:"Quiénes Somos",nav_services:"Productos y Servicios",nav_projects:"Proyectos",nav_quote:"Cotización",nav_apply:"Solicitar Empleo",
      slogan:"Yarda Exacta. En Sitio. A Tiempo.",sub:"Concreto fresco mezclado en tu obra: pide exactamente lo que necesitas — desde 1 yarda hasta lo que requieras.",
      call:"Llamar Ahora",quote_cta:"Solicitar Cotización",k1:"Mezcla Volumétrica en Sitio",k2:"Yarda Exacta, Cero Desperdicio",k3:"Programación Mismo Día",k4:"Valle del Río Grande y Sur de Texas",
      who_h1:"Excelencia y Confiabilidad",who_p1:"Somos un proveedor de concreto en el Sur de Texas enfocado en precisión, puntualidad y obras limpias.",
      map_h1:"Área de Servicio",projects_h1:"Trabajos Recientes",
      form_h1:"Cuéntanos de tu Colado",form_intro:"Confirmamos disponibilidad y agendamos tu colado.",
      form_name:"Nombre",form_email:"Correo electrónico",form_msg:"Detalles (dirección, fecha/hora)",form_psi_label:"PSI",form_send:"Enviar Solicitud",
      success:"¡Enviado! Te contactamos en breve.",error:"Ocurrió un error. Por favor llama al (956) 561-1288.",
      contact:"Contacto",address:"6005 FM 1732, Brownsville, TX 78520",phone:"(956) 561-1288",email:"sales@valleymixconcrete.com",
      copyright:"© Valley Mix Concrete. Todos los derechos reservados.",
      cap_driveway:"Cochera Residencial",cap_slab:"Losa Comercial",cap_sidewalks:"Banquetas y Rampas",cap_patio:"Patio y Andadores",cap_foundation:"Cimentaciones"}
};
function setLang(lang){
  const t=T[lang]; document.documentElement.lang=lang;
  document.querySelectorAll("[data-i]").forEach(el=>{
    const k=el.getAttribute("data-i"); if(!k||!(k in t)) return;
    if(el.tagName==="INPUT"||el.tagName==="TEXTAREA") el.placeholder=t[k]; else el.textContent=t[k];
  });
  document.querySelectorAll(".lang-toggle button").forEach(b=>b.classList.remove("active"));
  document.querySelector(`.lang-toggle button[data-lang='${lang}']`).classList.add("active");
}
async function postJSON(url,data){
  const res=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
  if(!res.ok) throw new Error("bad"); return await res.json().catch(()=>({ok:true}));
}
function init(){
  // i18n
  setLang("en");
  document.querySelectorAll(".lang-toggle button").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
  // mobile menu
  const burger=document.querySelector(".hamburger"), nav=document.querySelector(".navlinks");
  burger.addEventListener("click",()=>nav.classList.toggle("show"));
  // nav labels
  ["nav_home","nav_who","nav_services","nav_projects","nav_quote","nav_apply"].forEach((k,i)=>{
    const a=document.querySelectorAll(".navlinks a")[i]; if(a) a.setAttribute("data-i",k);
  });
  // form submit
  const form=document.getElementById("quote-form"); const notice=document.getElementById("form-notice");
  if(form){
    form.addEventListener("submit",async e=>{
      e.preventDefault(); notice.textContent="";
      const payload={name:form.name.value.trim(),email:form.email.value.trim(),psi:form.psi.value,message:form.message.value.trim(),source:location.href};
      try{ if(FORM_ENDPOINT){ await postJSON(FORM_ENDPOINT,payload); notice.textContent=T[document.documentElement.lang].success; form.reset(); return; } }catch(e){}
      try{ if(GOOGLE_APPS_SCRIPT_URL){ await postJSON(GOOGLE_APPS_SCRIPT_URL,payload); notice.textContent=T[document.documentElement.lang].success; form.reset(); return; } }catch(e){}
      notice.textContent=T[document.documentElement.lang].error;
    });
  }
}
document.addEventListener("DOMContentLoaded",init);
