(async () => {
    // Función para esperar una cantidad de milisegundos (delay)
    const delay = ms => new Promise(res => setTimeout(res, ms));
  
    // Función que descarga una imagen dado un URL y un índice
    const downloadImage = (url, index) => {
      fetch(url) // obtiene la imagen desde el servidor
        .then(res => res.blob()) // la convierte en un blob (archivo binario)
        .then(blob => {
          // crea un enlace invisible para forzar la descarga
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob); // crea URL temporal
          a.download = `imagen_${index}.jpg`; // nombre del archivo
          document.body.appendChild(a); // lo agrega al documento
          a.click(); // simula el clic de descarga
          a.remove(); // lo elimina del DOM
        });
    };
  
    // Selecciona todos los elementos de miniaturas de imagen
    const elements = document.querySelectorAll('.H8Rx8c');
    console.log(elements);
    let index = 0; // contador de imágenes descargadas
  
    // Itera por cada miniatura encontrada
    for (const el of elements) {
      try {
        // Hace scroll hacia la miniatura para asegurarse de que es visible
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
        // Simula el clic en la miniatura para abrir la imagen grande
        el.click(); // ← ¡ESTE ES EL CLIC REAL!
  
        // Espera 1.5 segundos a que la imagen cargue
        await delay(1500);
  
        // Selecciona la imagen grande abierta
        const bigImg = document.querySelector('img.iPVvYb');
        console.log(bigImg);
        
        const src = bigImg?.src; // obtiene el atributo src
  
        // Si encontró la imagen y el src es válido
        if (src && src.startsWith('http')) {
          console.log(`📥 Imagen ${index + 1}: ${src}`);
          downloadImage(src, index++); // descarga la imagen
          await delay(1000); // espera antes de seguir a la siguiente
        } else {
          console.warn(`⚠️ No se encontró imagen en el intento ${index + 1}`);
        }
      } catch (err) {
        console.error(`❌ Error en imagen ${index + 1}:`, err);
      }
    }
  
    // Al final muestra un resumen en la consola
    console.log(`✅ Completado. Imágenes descargadas: ${index}`);
  })();
  