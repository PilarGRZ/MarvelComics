const miNav = document.querySelector("#miNav");

// Escuchamos el evento de desplazamiento
window.addEventListener("scroll", function() {
 // Si el usuario está desplazándose hacia abajo
 if (window.scrollY > 242) {
   // Ocultamos el encabezado
   miNav.style.position = "fixed";
   // Posicionamos el menú de navegación en la parte superior
   miNav.style.top = "0";
   miNav.style.background = "#ffff";
 } else {
   // Mostramos el encabezado
   miNav.style.position = "relative";
  
 }
});