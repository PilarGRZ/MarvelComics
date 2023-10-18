const formulario = document.querySelector('#formulario')
const nombreInput = document.querySelector('#nombre')
const comentarioInput = document.querySelector('#comentario')
const comentarioText = document.querySelector('.comentario-final')
const buttonFormulario = document.querySelector('.btn-primary')

const currentPageKey = window.location.pathname; 

let editando;

class Comentarios {

    constructor() {
        // Verificar si hay datos en localStorage
        const comentariosGuardados = JSON.parse(localStorage.getItem(currentPageKey)) || [];
        this.comentarios = comentariosGuardados ;
    }


    agregarComentario(comentario) {
        this.comentarios = [...this.comentarios, comentario];
        console.log(this.comentarios)
    }

    eliminarComentario(id) {
        this.comentarios = this.comentarios.filter(comentario => comentario.id !== id)
    }

    editarComentario(comentarioActualizado) {
        this.comentarios = this.comentarios.map(comentario => comentario.id === comentarioActualizado.id ? comentarioActualizado : comentario)
    }

     // Método para guardar los comentarios en localStorage
     guardarComentariosEnLocalStorage() {
        localStorage.setItem(currentPageKey, JSON.stringify(this.comentarios));
    }

}

class UI {

    //Mostrar alertas

    mostrarAlerta(mensaje) {

        const alerta = document.querySelector('.alert')

        if (!alerta) {

            const divMensaje = document.createElement('div')
            divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-md-12', 'alert-success', 'mt-4')

            divMensaje.textContent = mensaje;

            formulario.appendChild(divMensaje)

            setTimeout(() => {
                divMensaje.remove()
            }, 3000);
        }

    }

    imprimirComentarios({ comentarios }) {

        //Agregar comentarios con sus respectivos botones

        this.limpiarHtml();

        console.log(comentarios)

        comentarios.forEach(coment => {

            const { nombre, comentario, id } = coment;

            const divComentario = document.createElement('div')
            divComentario.classList.add('border-bottom', 'mb-3')
            divComentario.dataset.id = id;

            const nombreComentario = document.createElement('p')
            nombreComentario.classList.add('px-3', 'name')
            nombreComentario.textContent = nombre;

            const comentarioFinal = document.createElement('p')
            comentarioFinal.classList.add('px-3', 'coment')
            comentarioFinal.textContent = comentario;

            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn', 'px-3')
            btnEliminar.innerHTML = '<i class="fa-solid fa-trash-can fa-xs" style="color: #0d6efd;"></i>';

            btnEliminar.onclick = () => eliminarComentario(id);

            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'px-3', 'edicion')
            btnEditar.innerHTML = '<i class="fa-solid fa-pen fa-xs" style="color: #0d6efd;"></i>'

            btnEditar.onclick = () => cargarEdicion(coment)

            divComentario.appendChild(nombreComentario)
            divComentario.appendChild(comentarioFinal)
            divComentario.appendChild(btnEliminar)
            divComentario.appendChild(btnEditar)

            comentarioText.appendChild(divComentario)
        });
    }

    limpiarHtml() {

        while (comentarioText.firstChild) {
            comentarioText.removeChild(comentarioText.firstChild)
        }
    }
};

const ui = new UI();
const administradorComentario = new Comentarios();


eventListeners()

//Agregar eventos a las variables
function eventListeners() {

    nombreInput.addEventListener('input', datoComentario)
    comentarioInput.addEventListener('input', datoComentario)
    formulario.addEventListener('submit', nuevoComentario)
}


const comentarioObj = {

    nombre: '',
    comentario: ''
}

//Agrega datos al objeto comentario

function datoComentario(e) {

    comentarioObj[e.target.name] = e.target.value;
}





//Valida y agrega nuevo comentario a la clase de comentarios

function nuevoComentario(e) {

    e.preventDefault()

    const { nombre, comentario } = comentarioObj;

    //Compruba si hay un elemento del formulario vacío y muestra la alerta

    if (nombre === '' || comentario === '') {

        alert('Please indicate your name and comment');
        return;
    }

    if (editando) {
        ui.mostrarAlerta('Correctly edited')

        //Pasar el objeto de la cita a edición

        administradorComentario.editarComentario({ ...comentarioObj })

        administradorComentario.guardarComentariosEnLocalStorage();

        //Colocar el texto del botón al incial

        buttonFormulario.textContent = 'Add comment'


        //Quitar el modo edición

        editando = false;

    }
    else {

        //Generar un id único

        comentarioObj.id = Date.now();

        administradorComentario.agregarComentario({ ...comentarioObj })

         // Guardar los comentarios en localStorage
         administradorComentario.guardarComentariosEnLocalStorage();

        //Mensaje de agregado correctamente.

        ui.mostrarAlerta('Comment added successfully')
    }

    //Reiniciar objeto

    reiniciarObjeto()

    //Reiciciar formulario

    formulario.reset();

    ui.imprimirComentarios(administradorComentario)

}

function reiniciarObjeto() {

    comentarioObj.nombre = '';
    comentarioObj.comentario = ''
}

function eliminarComentario(id) {
    const confirmacion = window.confirm('Do you want to delete this comment?');

    if (confirmacion) {

        administradorComentario.eliminarComentario(id);

         // Guardar los comentarios actualizados en localStorage
         administradorComentario.guardarComentariosEnLocalStorage();


        ui.imprimirComentarios(administradorComentario)
    }
}

function cargarEdicion(comentarios) {

    //Guardando los cambios en los casos que se edita un comentario

    const { nombre, comentario, id } = comentarios;

    nombreInput.value = nombre;
    comentarioInput.value = comentario;

    //Llenar el objeto

    comentarioObj.nombre = nombre;
    comentarioObj.comentario = comentario;
    comentarioObj.id = id;

    //Cambiando el nombre del boton cuando demos clic en editar

    buttonFormulario.textContent = 'Save Changes'

    editando = true;
}

// Verificar si ya hay datos en localStorage al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    ui.imprimirComentarios(administradorComentario);
});

