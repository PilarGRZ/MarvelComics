const iniciarAPP = () => {

    const modal = new bootstrap.Modal('#modal', {})

    //Consultar y mostrar información la API

    const consultarApi = () => {
        const url = "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=cd0e4260b4bafa99f0b64e6d3407fb01&hash=a48f78af283c52cbdf8264c80f2fe6ce";

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => obtenerPersonajes(resultado.data.results))
            .catch(error => console.log('Error al obtener datos', error))

    }
    consultarApi()

    //llamar propiedades de personajes y realizar el código para mostrar resultado en pantalla 

    function obtenerPersonajes(personajes) {
        console.log(personajes)

        const contenido = document.querySelector('#resultado')

        personajes.forEach(personaje => {

            const { name, thumbnail, description } = personaje;

            const divPersonaje = document.createElement('div')
            divPersonaje.classList.add('col-md-3')

            const personajeCard = document.createElement('div')
            personajeCard.classList.add('card', 'mb-4', 'text-center', 'cardPersonaje')

            //Agregar contenido en las tarjetas

            const img = document.createElement('img')
            img.classList.add('card-img-top', 'lista')
            img.src = `${thumbnail.path}.${thumbnail.extension}`
            img.alt = `${name}`

            const nombreCardBody = document.createElement('DIV');
            nombreCardBody.classList.add('card-body');

            const nombrePersonaje = document.createElement('H5');
            nombrePersonaje.classList.add('card-tittle', 'mb-3', 'nombreP');
            nombrePersonaje.textContent = name;

            const button = document.createElement('button')
            button.classList.add('btn','w-100')
            button.textContent = 'Details'

            // Al dar clic en el botón muestra modal con info del personaje
            button.onclick = () => {
                
                const modalTitle = document.querySelector('.modal .modal-title');
                const modalBody = document.querySelector('.modal .modal-body');

                modalTitle.textContent = name;
           

                modalBody.innerHTML = `
                <img class="img-fluid img-thumbnail" src=${thumbnail.path}.${thumbnail.extension}
                 alt="imagen ${name}"/>
                 <h4 class="mt-3">Description : </h4>
                <p>${description}</p>
                `
                //Si el campo de descripción se encuentra vacío, autocompleta con el siguiente código

                if (description === '') {
                    modalBody.innerHTML = `
                    <img class="img-fluid img-thumbnail" src=${thumbnail.path}.${thumbnail.extension}
                    alt="imagen ${name}"/>
                    <h4 class="mt-3">Description :</h4>
                   <p>Fictional character who usually has supernatural abilities and who stands out 
                   for helping the community, confronting all types of evil characters.'</p>`
                }
                
                modal.show()
            }

            //Mostrar el contenido en pantalla

            nombreCardBody.appendChild(nombrePersonaje)
            nombreCardBody.appendChild(button)

            personajeCard.appendChild(img)
            personajeCard.appendChild(nombreCardBody)

            divPersonaje.appendChild(personajeCard)

            contenido.appendChild(divPersonaje)
        });
    }
}

// Escuchamos el evento e iniciamos APP

document.addEventListener('DOMContentLoaded', iniciarAPP);