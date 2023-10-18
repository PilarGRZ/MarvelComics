document.addEventListener('DOMContentLoaded', function () {
    const title = document.getElementById('animated-title');
    const text = title.textContent;
    title.textContent = ''; // Limpiar el título original

    // Dividir el texto en palabras
    const words = text.split(' ');

    // Recorrer cada palabra y dividirla en letras con animación
    words.forEach((word, wordIndex) => {
        const wordContainer = document.createElement('span');
        wordContainer.classList.add('word-container');

        // Dividir cada palabra en letras
        for (let i = 0; i < word.length; i++) {
            const letter = document.createElement('span');
            letter.textContent = word[i];
            letter.classList.add('letter-animation');
            letter.style.animationDelay = `${wordIndex * 0.5}s, ${i * 0.1}s`; // Ajusta el retraso según tus preferencias
            wordContainer.appendChild(letter);
        }

        // Agregar espacio entre palabras
        if (wordIndex < words.length - 1) {
            const space = document.createElement('span');
            space.textContent = ' ';
            wordContainer.appendChild(space);
        }

        title.appendChild(wordContainer);
    });


 
});













