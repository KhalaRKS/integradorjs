'use stric'
import { STOCK } from "./stock.js";
const AGREGAR_CARRITO = document.querySelectorAll('.botonAgregar')
const NUMERO_CARRITO = document.getElementById('numero-cart')


/*ASIGNACION DE PRODUCTOS AL LOCALSTORAGE MEDIANTE EL BOTON DE LA CARD*/
export function agregarItemAlCarrito(id) {
    //1) VALIDAR SI EL ITEM YA EXISTE EN EL CARRITO
    //2) EN CASO DE EXISTIR AGREGAR KEY CANTIDAD E INCREMENTARLA
    //3) EN CASO DE NO EXISTIR AGREGAR AL LOCALSTORAGE
    // PARSEAR LOS VALORES OBJETOS
    if(localStorage.getItem(id)){
        let item = JSON.parse(localStorage.getItem(id))
        item.cantidad++
        localStorage.setItem(id, JSON.stringify(item))

    }else{
        STOCK[id].cantidad = 1
        localStorage.setItem(id, JSON.stringify(STOCK[id]))
    }


}

export function colorearNumeroCarrito() {

    if (localStorage.length > 1) {
        NUMERO_CARRITO.innerText = (localStorage.length - 1)
        NUMERO_CARRITO.classList.add('active')
        
    }
}