const data={
  campana:['Cali se Mueve','Campaña / 2021','Al realizar este proyecto se busca que las entidades encargadas de todo lo relacionado con el ámbito cultural de la Ciudad de Cali tengan un espacio de divulgación que se centre en la promoción y publicidad de eventos programados dentro de un determinado periodo de tiempo, cuya prioridad sea dar información relevante y actualizada sobre todos los acontecimientos relacionados con las artes en Cali para garantizar un espacio confiable y creativo que permita conocer las apuestas culturales de la ciudad avaladas por entidades gubernamentales.',['Dirección creativa','Diseño','Comunicación cultural','2021'],'images/proyectos/campanas/cali-se-mueve/'],
  campana2:['Cali se Mueve 2','Campaña','Segundo proyecto de la serie Cali se Mueve.',['Campaña','Diseño','Comunicación cultural'],'images/proyectos/campanas/cali-se-mueve-2/'],
  campana3:['Tanuki Creativo','Campaña','Proyecto desarrollado para Tanuki Creativo.',['Dirección de arte','Diseño','Branding'],'images/proyectos/campanas/tanuki-creativo/'],

  foto1:['Savaje','Fotomontaje','Proyecto de composición y manipulación fotográfica.',['Photoshop','Composición','Retoque'],'images/proyectos/fotomontaje/savaje/'],
  foto2:['The life is a videogame','Fotomontaje','Proyecto visual basado en la creación de una composición fotográfica.',['Photoshop','Composición'],'images/proyectos/fotomontaje/the-life-is-a-videogame/'],
  foto3:['Outside the frame','Fotomontaje','Proyecto de manipulación y composición fotográfica.',['Photoshop','Retoque'],'images/proyectos/fotomontaje/outside-the-frame/'],

  video1:['La Ouija','Vídeo / Postproducción','Proyecto audiovisual de edición y postproducción.',['Premiere Pro','After Effects','Color'],'images/proyectos/video/la-ouija/'],
  video2:['BreackDance','Edición','Proyecto audiovisual centrado en ritmo, montaje y narrativa.',['Premiere Pro','Edición'],'images/proyectos/video/breackdance/'],
  video3:['Boda','Edición','Proyecto audiovisual de boda y edición de vídeo.',['Premiere Pro','Edición'],'images/proyectos/video/graduacion-medicina/'],

  imagen1:['Memories of Love','Edición de imagen','Proyecto de tratamiento y edición fotográfica.',['Photoshop','Retoque'],'images/proyectos/edicion-imagen/memories-of-love/'],
  imagen2:['Sons of Zeus','Edición de imagen','Proyecto de transformación y tratamiento visual.',['Photoshop','Color'],'images/proyectos/edicion-imagen/sons-of-zeus/'],
  imagen3:['Traces of Life','Edición de imagen','Proyecto de edición y retoque fotográfico.',['Photoshop','Lightroom'],'images/proyectos/edicion-imagen/traces-of-life/'],

  pieza1:['Copa Airlines','Pieza gráfica','Pieza gráfica desarrollada para comunicación visual.',['Illustrator','Photoshop','Diseño'],'images/proyectos/piezas-graficas/copa-airlines/'],
  pieza2:['Cali se Mueve','Pieza gráfica','Piezas de comunicación vinculadas al proyecto Cali se Mueve.',['Diseño','Comunicación'],'images/proyectos/piezas-graficas/cali-se-mueve/'],
  pieza3:['Real Steel','Pieza gráfica','Proyecto centrado en diseño y composición para impresión.',['Diseño gráfico','Impresión'],'images/proyectos/piezas-graficas/impresion/'],
  pieza4:['Logos','Pieza gráfica','Piezas de identidad y comunicación para Tanuki Creativo.',['Branding','Identidad','Diseño'],'images/proyectos/piezas-graficas/tanuki-creativo/'],

  illu1:['One Line, One Story','Ilustración digital','Proyecto de ilustración digital y exploración gráfica.',['Digital Art','Ilustración'],'images/proyectos/ilustracion/one-line-one-story/'],
  illu2:['Space Love','Character design','Diseño y desarrollo visual de personajes.',['Space Love','Digital Art'],'images/proyectos/ilustracion/character-design/']
};

const modal=document.querySelector('.modal');
const title=document.querySelector('#modalTitle');
const cat=document.querySelector('#modalCat');
const desc=document.querySelector('#modalDesc');
const tags=document.querySelector('#modalTags');
const stage=document.querySelector('#carouselStage');
const dots=document.querySelector('#carouselDots');
const counter=document.querySelector('#carouselCounter');
const prevButton=document.querySelector('.carousel-arrow.prev');
const nextButton=document.querySelector('.carousel-arrow.next');

let currentImages=[];
let currentIndex=0;
let currentGalleryBaseUrl='';

function escapeHtml(value){
  return String(value)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');
}

function openImageLightbox(src,alt){
  let lightbox=document.getElementById('imageLightbox');

  if(!lightbox){
    lightbox=document.createElement('div');
    lightbox.id='imageLightbox';
    lightbox.className='image-lightbox';
    lightbox.innerHTML='<button class="image-lightbox-close" aria-label="Cerrar">×</button><img class="image-lightbox-image" alt="">';
    document.body.appendChild(lightbox);

    lightbox.addEventListener('click',function(e){
      if(e.target===lightbox || e.target.classList.contains('image-lightbox-close')){
        closeImageLightbox();
      }
    });
  }

  const image=lightbox.querySelector('.image-lightbox-image');
  image.src=src;
  image.alt=alt||'';
  lightbox.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeImageLightbox(){
  const lightbox=document.getElementById('imageLightbox');
  if(lightbox){
    lightbox.classList.remove('open');
    document.body.style.overflow='hidden';
  }
}

function updateCarousel(){
  if(!stage) return;

  const items=stage.querySelectorAll('.carousel-image');
  items.forEach((item,i)=>{
    item.classList.toggle('active',i===currentIndex);
  });

  if(counter){
    counter.textContent=currentImages.length ? String(currentIndex+1).padStart(2,'0')+' / '+String(currentImages.length).padStart(2,'0') : '';
  }

  if(dots){
    dots.innerHTML='';
    currentImages.forEach((_,i)=>{
      const dot=document.createElement('button');
      dot.type='button';
      dot.className='carousel-dot'+(i===currentIndex?' active':'');
      dot.setAttribute('aria-label','Ir a elemento '+(i+1));
      dot.addEventListener('click',e=>{
        e.stopPropagation();
        currentIndex=i;
        updateCarousel();
      });
      dots.appendChild(dot);
    });
  }
}

function renderCarousel(baseUrl){
  if(baseUrl) currentGalleryBaseUrl=baseUrl;
  if(!stage) return;

  stage.innerHTML='';

  currentImages.forEach((media,i)=>{
    let el;

    if(media.type==='image'){
      el=document.createElement('img');
      el.alt='Proyecto — imagen '+(i+1);
      el.className='carousel-image'+(i===currentIndex?' active':'');
      el.src=new URL(media.name,currentGalleryBaseUrl).href;
      el.loading=i===0?'eager':'lazy';
      el.title='Haz clic para ampliar';
      el.tabIndex=0;
      el.addEventListener('click',e=>{
        e.stopPropagation();
        openImageLightbox(el.src,el.alt);
      });
      el.addEventListener('keydown',e=>{
        if(e.key==='Enter' || e.key===' '){
          e.preventDefault();
          openImageLightbox(el.src,el.alt);
        }
      });
      el.onerror=()=>console.warn('No se pudo cargar la imagen:',el.src);
    }else if(media.type==='video'){
      if(media.external && media.url){
        el=document.createElement('a');
        el.className='carousel-image external-video-link'+(i===currentIndex?' active':'');
        el.href=media.url;
        el.target='_blank';
        el.rel='noopener noreferrer';
        el.setAttribute('aria-label','Abrir '+(media.name||'vídeo')+' en Google Drive');
        el.innerHTML='<span class="external-video-preview"><span class="external-video-play">▶</span><span class="external-video-title">'+escapeHtml(media.name||'Ver vídeo completo')+'</span><span class="external-video-subtitle">Abrir vídeo en Google Drive ↗</span></span>';
        el.addEventListener('click',e=>{
          e.stopPropagation();
        });
      }else{
        el=document.createElement('video');
        el.className='carousel-image'+(i===currentIndex?' active':'');
        el.controls=true;
        el.playsInline=true;
        el.preload='metadata';
        el.src=new URL(media.name,currentGalleryBaseUrl).href;
      }
    }

    if(el) stage.appendChild(el);
  });

  updateCarousel();
}

async function loadProjectGallery(folder){
  currentImages=[];
  currentIndex=0;

  if(!stage) return;

  stage.innerHTML='<div class="carousel-empty">Cargando proyecto…</div>';
  if(dots) dots.innerHTML='';
  if(counter) counter.textContent='';

  const projectUrl=new URL(
    String(folder).replace(/^\/+/, '').replace(/\/+$/, '')+'/',
    document.baseURI
  );
  currentGalleryBaseUrl=projectUrl.href;
  const manifestUrl=new URL('gallery.json',projectUrl);

  try{
    const response=await fetch(manifestUrl.href+'?v='+Date.now(),{cache:'no-store'});
    if(!response.ok) throw new Error('HTTP '+response.status);

    const manifest=await response.json();
    const images=Array.isArray(manifest.images)?manifest.images:[];
    const videos=Array.isArray(manifest.videos)?manifest.videos:[];

    currentImages=[
      ...images.map(name=>({name:String(name),type:'image',external:false})),
      ...videos.map(video=>{
        if(typeof video==='string'){
          return {name:String(video),type:'video',external:false};
        }
        if(video && typeof video==='object' && video.url){
          return {
            name:String(video.name||'Vídeo'),
            type:'video',
            external:true,
            url:String(video.url)
          };
        }
        return null;
      }).filter(Boolean)
    ].filter(x=>x.name.trim()!=='');

    // Nombres y enlaces definitivos de La Ouija. Se fuerzan aquí para que
    // una copia antigua de gallery.json no pueda recuperar los nombres anteriores.
    if(/\/la-ouija\/$/i.test(projectUrl.pathname)){
      currentImages=[
        {name:'La Ouija Intro',type:'video',external:true,url:'https://drive.google.com/file/d/1GK9CMX-ApqysoYA80IEnJEMY5uJtZqLn/view?usp=sharing'},
        {name:'La Ouija Noticiero',type:'video',external:true,url:'https://drive.google.com/file/d/165Ctzg5DgLSLGR997Vw74OyUGyj_l84y/view?usp=sharing'},
        {name:'La Ouija Creditos',type:'video',external:true,url:'https://drive.google.com/file/d/1HOO0teJELKM7g-oaU1C1oxqmXMq5IKsc/view?usp=sharing'}
      ];
    }

    if(!currentImages.length){
      stage.innerHTML='<div class="carousel-empty"><strong>Este proyecto no tiene contenido todavía.</strong><br><small>Añade los nombres de tus archivos en gallery.json.</small></div>';
      updateCarousel();
      return;
    }

    renderCarousel(currentGalleryBaseUrl);
  }catch(error){
    console.error('Error cargando gallery.json:',error,manifestUrl.href);
    stage.innerHTML='<div class="carousel-empty"><strong>No se pudo cargar gallery.json</strong><br><small>Ruta comprobada: '+escapeHtml(manifestUrl.pathname)+'</small></div>';
    if(dots) dots.innerHTML='';
    if(counter) counter.textContent='';
  }
}

function moveCarousel(delta){
  if(!currentImages.length) return;
  currentIndex=(currentIndex+delta+currentImages.length)%currentImages.length;
  updateCarousel();
}

function openProject(el){
  const p=data[el.dataset.project];
  if(!p) return;

  title.textContent=p[0];
  cat.textContent=p[1];
  desc.textContent=p[2];
  tags.innerHTML=p[3].map(x=>'<span>'+escapeHtml(x)+'</span>').join('');

  currentImages=[];
  currentIndex=0;
  currentGalleryBaseUrl='';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';

  loadProjectGallery(p[4]);
}

function closeProjectModal(){
  closeImageLightbox();
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

// Project cover images — the cards show only the cover artwork, with no centered title overlay.
document.querySelectorAll('[data-cover]').forEach(el=>{
  const img=document.createElement('img');
  img.src=el.dataset.cover;
  img.alt='';
  img.className='project-cover-image';
  img.onerror=()=>img.remove();
  el.prepend(img);
});

document.querySelectorAll('[data-project]').forEach(el=>{
  el.addEventListener('click',()=>openProject(el));
});

if(prevButton) prevButton.addEventListener('click',e=>{e.stopPropagation();moveCarousel(-1);});
if(nextButton) nextButton.addEventListener('click',e=>{e.stopPropagation();moveCarousel(1);});

const closeButton=document.querySelector('.close');
const backdrop=document.querySelector('.backdrop');
if(closeButton) closeButton.addEventListener('click',closeProjectModal);
if(backdrop) backdrop.addEventListener('click',closeProjectModal);

document.addEventListener('keydown',e=>{
  const lightbox=document.getElementById('imageLightbox');
  if(e.key==='Escape'){
    if(lightbox && lightbox.classList.contains('open')){
      closeImageLightbox();
    }else if(modal && modal.classList.contains('open')){
      closeProjectModal();
    }
  }
  if(modal && modal.classList.contains('open') && !(lightbox && lightbox.classList.contains('open'))){
    if(e.key==='ArrowLeft') moveCarousel(-1);
    if(e.key==='ArrowRight') moveCarousel(1);
  }
});
