<script type="module" src="./assets/js/main.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

<script>
//Para ocultar el menu
//Agregar el boton y el include del script 
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainContenedor = document.querySelector('.main-contenedor');
  
  if (menuToggle && mainContenedor) {
    menuToggle.addEventListener('click', function() {
      mainContenedor.classList.toggle('active');
    });
  }
  
  // Cerrar menú al hacer clic fuera de él
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && 
        !e.target.closest('.main-contenedor') && 
        !e.target.closest('.menu-toggle') &&
        mainContenedor.classList.contains('active')) {
      mainContenedor.classList.remove('active');
    }
  });
});

</script>

