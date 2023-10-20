const selectPeliculas = document.querySelector('#peliculas');


document.addEventListener('DOMContentLoaded', ()=>{

    selectPeliculas.addEventListener('change', selectPelicula)
})


function selectPelicula(e){
    console.log(e.target.value)

    const nombrePeliculaSeleccionada = e.target.value.toLowerCase();

    const peliculas = document.querySelectorAll('.pelicula')

    for(const pelicula of peliculas){

        const tituloPelicula = pelicula.querySelector('.titulo');
        const nombrePelicula = tituloPelicula.getAttribute('data-name').toLowerCase();

        if(nombrePelicula === nombrePeliculaSeleccionada || nombrePeliculaSeleccionada === '--seleccione--'){
            pelicula.style.display ='block'
        }
        else{
            pelicula.style.display = 'none';
        }
    }
}