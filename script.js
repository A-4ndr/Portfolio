const data={
  campana:['Cali se Mueve','Campaña / 2021','Al realizar este proyecto se busca que las entidades encargadas de todo lo relacionado con el ámbito cultural de la Ciudad de Cali tengan un espacio de divulgación que se centre en la promoción y publicidad de eventos programados dentro de un determinado periodo de tiempo, cuya prioridad sea dar información relevante y actualizada sobre todos los acontecimientos relacionados con las artes en Cali para garantizar un espacio confiable y creativo que permita conocer las apuestas culturales de la ciudad avaladas por entidades gubernamentales.',['Dirección creativa','Diseño','Comunicación cultural','2021'],'images/proyectos/campanas/cali-se-mueve/'],
  campana2:['Cali se Mueve 2','Campaña','Segundo proyecto de la serie Cali se Mueve.',['Campaña','Diseño','Comunicación cultural'],'images/proyectos/campanas/cali-se-mueve-2/'],
  campana3:['Tanuki Creativo','Campaña','Proyecto desarrollado para Tanuki Creativo.',['Dirección de arte','Diseño','Branding'],'images/proyectos/campanas/tanuki-creativo/'],

  foto1:['Savaje','Fotomontaje','Proyecto de composición y manipulación fotográfica.',['Photoshop','Composición','Retoque'],'images/proyectos/fotomontaje/savaje/'],
  foto2:['The life is a videogame','Fotomontaje','Proyecto visual basado en la creación de una composición fotográfica.',['Photoshop','Composición'],'images/proyectos/fotomontaje/the-life-is-a-videogame/'],
  foto3:['Outside the frame','Fotomontaje','Proyecto de manipulación y composición fotográfica.',['Photoshop','Retoque'],'images/proyectos/fotomontaje/outside-the-frame/'],

  video1:['La Ouija','Vídeo / Postproducción','Proyecto audiovisual de edición y postproducción.',['Premiere Pro','After Effects','Color'],'images/proyectos/video/la-ouija/'],
  video2:['BreackDance','Edición','Proyecto audiovisual centrado en ritmo, montaje y narrativa.',['Premiere Pro','Edición'],'images/proyectos/video/breackdance/'],
  video3:['Graduación Medicina','Edición','Proyecto audiovisual de graduación y edición de vídeo.',['Premiere Pro','Edición'],'images/proyectos/video/graduacion-medicina/'],

  imagen1:['Memories of Love','Edición de imagen','Proyecto de tratamiento y edición fotográfica.',['Photoshop','Retoque'],'images/proyectos/edicion-imagen/memories-of-love/'],
  imagen2:['Sons of Zeus','Edición de imagen','Proyecto de transformación y tratamiento visual.',['Photoshop','Color'],'images/proyectos/edicion-imagen/sons-of-zeus/'],
  imagen3:['Traces of Life','Edición de imagen','Proyecto de edición y retoque fotográfico.',['Photoshop','Lightroom'],'images/proyectos/edicion-imagen/traces-of-life/'],

  pieza1:['Copa Airlines','Pieza gráfica','Pieza gráfica desarrollada para comunicación visual.',['Illustrator','Photoshop','Diseño'],'images/proyectos/piezas-graficas/copa-airlines/'],
  pieza2:['Cali se Mueve','Pieza gráfica','Piezas de comunicación vinculadas al proyecto Cali se Mueve.',['Diseño','Comunicación'],'images/proyectos/piezas-graficas/cali-se-mueve/'],
  pieza3:['Impresión','Pieza gráfica','Proyecto centrado en diseño y composición para impresión.',['Diseño gráfico','Impresión'],'images/proyectos/piezas-graficas/impresion/'],
  pieza4:['Tanuki Creativo','Pieza gráfica','Piezas de identidad y comunicación para Tanuki Creativo.',['Branding','Identidad','Diseño'],'images/proyectos/piezas-graficas/tanuki-creativo/'],

  illu1:['One Line, One Story','Ilustración digital','Proyecto de ilustración digital y exploración gráfica.',['Digital Art','Ilustración'],'images/proyectos/ilustracion/one-line-one-story/'],
  illu2:['Character Design','Character design','Diseño y desarrollo visual de personajes.',['Character Design','Digital Art'],'images/proyectos/ilustracion/character-design/']
};
const modal=document.querySelector('.modal'),title=document.querySelector('#modalTitle'),
cat=document.querySelector('#modalCat'),desc=document.querySelector('#modalDesc'),
tags=document.querySelector('#modalTags'),stage=document.querySelector('#carouselStage'),
dots=document.querySelector('#carouselDots'),counter=document.querySelector('#carouselCounter');
let currentImages=[],currentIndex=0;

function renderCarousel(baseUrl){
  carouselStage.innerHTML="";
  currentImages.forEach((media,i)=>{
    const src=new URL(media.name,baseUrl).href;
    let el;
    if(media.type==="video"){
      el=document.createElement("video");
      el.controls=true; el.playsInline=true; el.preload="metadata";
    }else{
      el=document.createElement("img");
      el.alt="Proyecto — imagen "+(i+1);
    }
    el.className="carousel-image"+(i===0?" active":"");
    el.src=src;
    el.onerror=()=>console.warn("No se pudo cargar:",src);
    carouselStage.appendChild(el);
  });
  updateCarousel();
}
async async function loadProjectGallery(folder){
  currentImages=[]; currentIndex=0;
  const projectUrl=new URL(String(folder).replace(/^\/+/,"").replace(/\/+$/,"")+"/",document.baseURI);
  const manifestUrl=new URL("gallery.json",projectUrl);
  try{
    const response=await fetch(manifestUrl.href+"?v="+Date.now(),{cache:"no-store"});
    if(!response.ok) throw new Error("HTTP "+response.status);
    const manifest=await response.json();
    const images=Array.isArray(manifest.images)?manifest.images:[];
    const videos=Array.isArray(manifest.videos)?manifest.videos:[];
    currentImages=[
      ...images.map(name=>({name:String(name),type:"image"})),
      ...videos.map(name=>({name:String(name),type:"video"}))
    ].filter(x=>x.name.trim()!=="");
    renderCarousel(projectUrl.href);
    if(!currentImages.length) carouselStage.innerHTML='<div class="carousel-empty"><strong>Este proyecto no tiene contenido todavía.</strong><br><small>Añade los nombres de tus archivos en gallery.json.</small></div>';
    carouselModal.classList.add("open");
  }catch(error){
    console.error("Error cargando gallery.json:",error,manifestUrl.href);
    carouselStage.innerHTML='<div class="carousel-empty"><strong>No se pudo cargar gallery.json</strong><br><small>Ruta comprobada: '+manifestUrl.pathname+'</small></div>';
    carouselModal.classList.add("open");
  }
}
document.querySelectorAll('[data-cover]').forEach(el=>{
 const img=document.createElement('img');img.src=el.dataset.cover;img.alt='';img.className='project-cover-image';img.onerror=()=>img.remove();el.prepend(img);
});
document.querySelectorAll('[data-project]').forEach(el=>el.addEventListener('click',()=>{
 const p=data[el.dataset.project];title.textContent=p[0];cat.textContent=p[1];desc.textContent=p[2];tags.innerHTML=p[3].map(x=>`<span>${x}</span>`).join('');
 loadProjectGallery(p[4]);modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}));
function moveCarousel(d){if(!currentImages.length)return;currentIndex=(currentIndex+d+currentImages.length)%currentImages.length;renderCarousel();}
document.querySelector('.carousel-arrow.prev').onclick=e=>{e.stopPropagation();moveCarousel(-1)};
document.querySelector('.carousel-arrow.next').onclick=e=>{e.stopPropagation();moveCarousel(1)};
function close(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelector('.close').onclick=close;document.querySelector('.backdrop').onclick=close;
document.addEventListener('keydown',e=>{if(e.key==='Escape')close();if(e.key==='ArrowLeft')moveCarousel(-1);if(e.key==='ArrowRight')moveCarousel(1);});
