# Portfolio — V8

## Uso normal en GitHub Pages
Cada proyecto tiene un `gallery.json` dentro de su propia carpeta. Añade los archivos y escribe sus nombres en ese JSON.

## Abrir con doble clic sin Python
La V8 incluye un modo de compatibilidad para `file://`.

Al abrir `index.html` directamente, algunos navegadores bloquean que JavaScript lea automáticamente archivos JSON locales. Si ocurre, al abrir un proyecto aparecerá **Seleccionar gallery.json**.

Selecciona el `gallery.json` que está dentro de la carpeta de ese proyecto. La web cargará el contenido del carrusel.

**Importante:** en este modo local, el navegador puede bloquear también el acceso automático a las imágenes/vídeos si proceden de otras rutas locales. Para la prueba más fiable, sube el proyecto a GitHub Pages. En GitHub Pages el sistema funciona automáticamente.

## Formato
```json
{
  "images": ["01.jpg", "02.jpg", "03.png"],
  "videos": ["video.mp4", "making-of.mp4"]
}
```

`portada.jpg` sigue siendo la portada de la tarjeta.
