    const iniciarAPP = () => {

        const modal = new bootstrap.Modal('#modal',{})

            //Consultar y mostrar información la API

        const obtenerComics = async () => {

            const url = "https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=cd0e4260b4bafa99f0b64e6d3407fb01&hash=a48f78af283c52cbdf8264c80f2fe6ce"


            const respuesta = await fetch(url);
            const resultado = await respuesta.json()
            const listaComics = await resultado.data.results

            mostrarComics(listaComics)

            console.log(listaComics)

        }

        obtenerComics()

        //llamar propiedades de comics y realizar el código para mostrar resultado en pantalla 

        function mostrarComics(comics){

            console.log(comics)

            const resultado = document.querySelector('#resultado')

            comics.forEach(comic => {

                const {creators,description,thumbnail,title,dates} = comic;

                const divResultado = document.createElement('div');
                divResultado.classList.add('col-md-3')

                const cardComics = document.createElement('div')
                cardComics.classList.add('card', 'text-center', 'mb-4', 'card-comic')

                   // Al dar clic sobre la tarjeta muestra modal con info de los comics

                cardComics.onclick = async()=>{

                    const modalTitle = document.querySelector('.modal .modal-title');
                    const modalBody = document.querySelector('.modal .modal-body');

                    const nombreCreador = creators.items.filter((creador) => creador.role === 'writer')[0]?.name ?? 'Brian K. Vaughan';
                    const fechaComic = dates.find((fecha) => fecha.type === 'onsaleDate')?.date ?? 'Desconocida';

                    modalTitle.textContent = title;

                      //Agregando información del modal 

                modalBody.innerHTML =`
                <img class="img-fluid img-thumbnail" src=${thumbnail.path}.${thumbnail.extension}
                 alt ="Imagen Comic"/>
                <h4>Description : </h4>
                <p>${description}</p>
                <h4>Creator : </h4>
                <p>${nombreCreador}</p>
                <h4>Publication date : </h4>
                <p>${new Date(fechaComic).toLocaleDateString()}</p>   
                `
                 //Si el campo de descripción se encuentra vacío o es null, autocompleta con el siguiente código

            if(description === '' || description === null || description === '#N/A'){

                    modalBody.innerHTML =`
                    <img class="img-fluid img-thumbnail" src=${thumbnail.path}.${thumbnail.extension}
                     alt ="Imagen Comic"/>
                    <h4>Description : </h4>
                    <p>The Kree and the Skrulls have united under a new emperor, and their war fleet is on a collision course toward our world. On the moon,
                     the Avengers are ready to attack with the full power of Earth's mightiest heroes.'</p>
                    <h4>Creator : </h4>
                    <p>${nombreCreador}</p>
                    <h4>Publication date : </h4>
                    <p>${new Date(fechaComic).toLocaleDateString()}</p>
                    `

                }

                modal.show()
           
                }

                //Agregando contenido de tarjetas con info de la API

                const imgComics = document.createElement('img')
                imgComics.classList.add('card-img-top')
                imgComics.src = `${thumbnail.path}.${thumbnail.extension}`
                imgComics.alt = title

                const cardBody = document.createElement('div')
                cardBody.classList.add('card-body')

                const tituloComic = document.createElement('h5')
                tituloComic.classList.add('card-tittle', 'text-center', 'nombreP')
                tituloComic.textContent = title


                //Mostrar contenido en pantalla

                cardComics.appendChild(imgComics)
                cardComics.appendChild(cardBody)

                cardBody.appendChild(tituloComic)

                divResultado.appendChild(cardComics)

                resultado.appendChild(divResultado)
                
            });
        }
    }

// Escuchamos el evento e iniciamos la función APP

    document.addEventListener('DOMContentLoaded', iniciarAPP)