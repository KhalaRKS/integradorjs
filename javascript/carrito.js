'use strict'
import { STOCK } from "./stock.js";
const CONTENEDOR_CARRITO = document.querySelector('.contenedor-carrito')
const CONTENEDOR_PRODUCTO = document.querySelector('.contenedor-producto-carrito')
let keys = Object.keys(localStorage)
console.log(keys.length);

function renderizarCarrito() {
    for (let index = 0; index < keys.length; index++) {
        if (keys[index]) {
            console.log(Number(keys[index]));
            const element = JSON.parse(localStorage[Number(keys[index])])
            renderizarProducto(element, keys[index]) 
        }
    }
}

function renderizarProducto(producto, index) {
    let contenedor_producto = document.createElement('div')
    let titulo = document.createElement('p')
    let imagen = document.createElement('img')
    let contenedor_precio_input = document.createElement('div')
    let precio = document.createElement('p')
    let contenedor_input_producto= document.createElement('div')
    let contenedor_botones = document.createElement('div')
    let boton_restar = document.createElement('button')
    let boton_sumar = document.createElement('button')
    let boton_remover = document.createElement('button')
    let input = document.createElement('input')

    /*ASIGNAMOS ATRIBUTOS A LAS ETIQUETAS*/
    contenedor_producto.setAttribute('class', 'contenedor-producto-carrito')

    imagen.setAttribute('class', 'imagen-carrito')
    imagen.setAttribute('src', producto.url)

    contenedor_precio_input.setAttribute('class', 'contenedor-precio-input')

    contenedor_input_producto.setAttribute('class', 'contenedor-input-producto')
    boton_restar.setAttribute('class','boton-restar')
    boton_sumar.setAttribute('class','boton-sumar')
    boton_remover.setAttribute('class','boton-remover')

    input.setAttribute('type', 'number')
    input.setAttribute('id', 'input-cantidad')
/**AGREGAMOS INFORMACION A LAS PARTES DEL PRODUCTO */

    precio.innerText = '$' + producto.precio * producto.cantidad
    boton_remover.innerHTML = "<i class='fas fa-trash'></i>"
    boton_remover.value = index

    input.value = producto.cantidad
    contenedor_botones.appendChild(boton_restar)
    contenedor_botones.appendChild(input)
    contenedor_botones.appendChild(boton_sumar)

    boton_restar.innerText = '-'
    boton_sumar.innerText = '+'
    contenedor_input_producto.appendChild(contenedor_botones)
    contenedor_input_producto.appendChild(boton_remover)

    contenedor_precio_input.appendChild(precio)
    contenedor_precio_input.appendChild(contenedor_input_producto)



    titulo.innerText = producto.nombre
    /**CREAMOS LA CARD DEL PRODUCTO A VISUALIZAR */
    contenedor_producto.appendChild(titulo)
    contenedor_producto.appendChild(imagen)
    contenedor_producto.appendChild(contenedor_precio_input)

    CONTENEDOR_CARRITO.appendChild(contenedor_producto)
    return
}
const boton_remover = document.getElementsByClassName('boton-remover')
const Productos = CONTENEDOR_CARRITO.childNodes
console.log(Productos);
if (boton_remover) {
    for (let j = 0; j < boton_remover.length; j++) {
        const element = boton_remover[j]
        element.addEventListener('click', () =>{
            let key = Number(boton_remover[j].value)
            console.log(key);
            localStorage.removeItem(key)
            keys = Object.keys(localStorage)
            renderizarCarrito() 
        });
    }
}
renderizarCarrito()

