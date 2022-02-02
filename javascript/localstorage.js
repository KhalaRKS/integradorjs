'use stric'
import { STOCK } from "./stock.js";
const AGREGAR_CARRITO = document.querySelectorAll('.botonAgregar')
const NUMERO_CARRITO = document.getElementById('numero-cart')


/*ASIGNACION DE PRODUCTOS AL LOCALSTORAGE MEDIANTE EL BOTON DE LA CARD*/
for (let index = 0; index < AGREGAR_CARRITO.length; index++) {
    const element = AGREGAR_CARRITO[index]
    element.addEventListener('click', ()=>{
        let validar_ingreso = false
        let i = Number(element.value)
        if (localStorage.length > 0) {
            for (let j = 0; j < localStorage.length; j++) {
                if(localStorage[j]){
                    const el = JSON.parse(localStorage[j])
                    if (el.id === i) {
                        el.cantidad += 1
                        localStorage.setItem(STOCK[i].id, JSON.stringify(el))
                        validar_ingreso = true
                    }
                }
            }
        
        }if (!validar_ingreso) {
            STOCK[i].cantidad = 1
            localStorage.setItem(STOCK[i].id, JSON.stringify(STOCK[i]))
            console.log();
        }
        NUMERO_CARRITO.innerText = localStorage.length 
        NUMERO_CARRITO.classList.add('active')
    })
}

if (localStorage.length > 0) {
    NUMERO_CARRITO.classList.add('active')
    NUMERO_CARRITO.innerText = localStorage.length
}

