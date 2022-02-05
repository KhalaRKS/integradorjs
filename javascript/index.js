const hamburguesa = document.querySelector(".boton-hamburguesa");
const navbarMenu = document.querySelector(".navbar-menu");
hamburguesa.addEventListener("click", () => {
  hamburguesa.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});
document.querySelectorAll(".navbar-link").forEach((element) => {
  element.addEventListener("click", () => {
    hamburguesa.classList.remove("active");
    navbarMenu.classList.remove("active");
  });
});

document.addEventListener('DOMContentLoaded', () =>{

})


/*
import { STOCK } from "stock";

var STOCK_AUXILIAR = STOCK
function buscarProductos() {
         var productosEncontrados = STOCK_AUXILIAR.filter((carta) =>
            new RegExp(filterText.value, "i").test(
                carta.name.toLowerCase())
    console.log(productosEncontrados);
}
BUSCADOR.addeventlistener('change', buscarProductos())
console.log("hola");
*/
