
const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx'; // TODO: replace with your Formspree endpoint
const T = {
  en:{home:"Home",services:"Services",projects:"Projects",about:"About",faq:"FAQ",quote:"Get a Quote",
      hero_sub:"Fresh volumetric concrete mixed at your job site—order exactly what you need from 1 yard to any size.",
      svc_h:"Products & Services",p1:"Residential & Commercial Slabs",p2:"Driveways, Sidewalks, Patios",p3:"Custom Mixes (2500–4500 PSI)",p4:"Pump Coordination",
      how_h:"How It Works",s1:"Request a Quote",s2:"We Schedule & Mix On‑Site",s3:"Pay Only For What You Use",
      proj_h:"Recent Work",area_h:"Service Area",form_h:"Tell Us About Your Pour",form_name:"Name",form_email:"Email",form_msg:"Details (address, date/time)",form_send:"Send Request",
      contact:"Contact",address:"6005 FM 1732, Brownsville, TX 78520",phone:"(956) 561-1288",email:"sales@valleymixconcrete.com",
      success:"Request sent! We’ll be in touch shortly.",error:"Something went wrong. Please call (956) 561-1288."},
  es:{home:"Inicio",services:"Servicios",projects:"Proyectos",about:"Quiénes Somos",faq:"Preguntas",quote:"Cotización",
      hero_sub:"Concreto fresco mezclado en tu obra: pide exactamente lo que necesitas — desde 1 yarda en adelante.",
      svc_h:"Productos y Servicios",p1:"Losas Residenciales y Comerciales",p2:"Cocheras, Banquetas, Patios",p3:"Diseños 2500–4500 PSI",p4:"Coordinación con Bomba",
      how_h:"Cómo Funciona",s1:"Solicita Cotización",s2:"Agendamos y Mezclamos en Sitio",s3:"Pagas Solo lo Usado",
      proj_h:"Trabajos Recientes",area_h:"Área de Servicio",form_h:"Cuéntanos de tu Colado",form_name:"Nombre",form_email:"Correo",form_msg:"Detalles (dirección, fecha/hora)",form_send:"Enviar",
      contact:"Contacto",address:"6005 FM 1732, Brownsville, TX 78520",phone:"(956) 561-1288",email:"sales@valleymixconcrete.com",
      success:"¡Enviado! Te contactamos en breve.",error:"Ocurrió un error. Llama al (956) 561-1288."}
};
let current='en';
function setLang(lang){
  current=lang; const t=T[lang];
  document.querySelectorAll("[data-i]").forEach(el=>{
    const k=el.getAttribute("data-i"); if(!k||!(k in t)) return;
    if(el.tagName==="INPUT"||el.tagName==="TEXTAREA") el.placeholder=t[k]; else el.textContent=t[k];
  });
  document.querySelectorAll(".lang button").forEach(b=>b.classList.remove("active"));
  document.querySelector(`.lang button[data-lang='${lang}']`).classList.add("active");
}
function init(){
  // label keys for both desktop & dropdown
  const keys=["home","services","projects","about","faq","quote"];
  document.querySelectorAll(".menu a, .dropdown a").forEach((a,i)=>a.setAttribute("data-i", keys[i]));
  setLang(current);
  // burger open/close
  const header=document.querySelector(".header");
  document.querySelector(".burger").addEventListener("click",e=>{e.stopPropagation();header.classList.toggle("open");});
  document.addEventListener("click",e=>{if(!header.contains(e.target)) header.classList.remove("open");});
  // lang
  document.querySelectorAll(".lang button").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
  // form
  const form=document.getElementById("quote-form"); const note=document.getElementById("notice");
  if(form){form.addEventListener("submit", async e=>{
      e.preventDefault();
      const data = new FormData(form);
      try{
        const r = await fetch(FORM_ENDPOINT, {method:"POST", body:data, headers:{"Accept":"application/json"}});
        if(r.ok){ note.textContent=T[current].success; form.reset(); }
        else { note.textContent=T[current].error; }
      }catch(err){ note.textContent=T[current].error; }
    });}
}
document.addEventListener("DOMContentLoaded", init);


// Slider
function initSlider(){
  const slider=document.querySelector(".slider");
  if(!slider) return;
  const slides=[...slider.querySelectorAll(".slide")];
  let idx=0;
  const show=i=>{slides.forEach((s,j)=>s.classList.toggle("active", j===i));};
  show(idx);
  slider.querySelector(".prev").addEventListener("click",()=>{idx=(idx-1+slides.length)%slides.length;show(idx);});
  slider.querySelector(".next").addEventListener("click",()=>{idx=(idx+1)%slides.length;show(idx);});
}

// FAQ
function initFAQ(){
  document.querySelectorAll(".faq-item .faq-q").forEach(btn=>{
    btn.addEventListener("click",()=> btn.parentElement.classList.toggle("open"));
  });
}

document.addEventListener("DOMContentLoaded", ()=>{
  initSlider();
  initFAQ();
});
