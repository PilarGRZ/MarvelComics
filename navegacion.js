//Mustra el menú de navegación estilo hamburguesa en pantallas pequeñas

$(document).ready(function() {
    $('.navbar-toggler').on('click', function() {
      $(this).toggleClass('collapsed');
      $('#navbarNav').toggleClass('collapse');
    });
  });