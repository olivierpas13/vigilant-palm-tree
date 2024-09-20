//Para esconder la barra lateral
const contenedor = document.querySelector('#contenedor');

document.querySelector('#botonMenu').addEventListener('click', () => {
    contenedor.classList.toggle('active');
});