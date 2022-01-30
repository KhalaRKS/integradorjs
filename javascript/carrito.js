'use stric'
import { STOCK } from "./stock.js";
const AGREGAR_CARRITO = document.querySelectorAll('.botonAgregar')
const NUMERO_CARRITO = document.getElementById('numero-cart')
console.log(localStorage, AGREGAR_CARRITO);

for (let index = 0; index < AGREGAR_CARRITO.length; index++) {
    const element = AGREGAR_CARRITO[index]
    element.addEventListener('click', ()=>{
        let i = Number(element.value)
        localStorage.setItem(localStorage.length, JSON.stringify(STOCK[i]) )
        console.log(localStorage);
        NUMERO_CARRITO.innerText = localStorage.length
        NUMERO_CARRITO.classList.add('active')
    })
}
if (localStorage.length > 0) {
    NUMERO_CARRITO.classList.add('active')
    NUMERO_CARRITO.innerText = localStorage.length
}
