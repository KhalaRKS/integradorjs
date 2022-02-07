'use strict'
import { agregarItemAlCarrito, colorearNumeroCarrito } from "./localstorage.js";
const FONDO_MODAL = document.querySelector('.fondo-modal')

const MODAL = document.querySelector('.modal')
const BOTON_MODAL = document.querySelector('.contenedor-boton-modal')

export function toggleClassFondoModal() {
    FONDO_MODAL.classList.remove('inactive')
    FONDO_MODAL.classList.add('active')

}
export function renderizarModal(producto) {
    MODAL.innerHTML = ''
    let titulo = document.createElement("h2");
    let imagen = document.createElement("img");
    let precio = document.createElement("h3");
    let contenedor_botones = document.createElement("div");
    let contenedor_imagen = document.createElement('div')
    let boton_izquierdo = document.createElement('button')
    let boton_derecho = document.createElement('button')
    let boton_agregar = document.createElement("button");
    let descripcion = document.createElement('p')
    let boton_comprar = document.createElement("button");

    titulo.innerText = producto.nombre;

    imagen.setAttribute("src", producto.url[0]);
    imagen.setAttribute("alt", "imagen-producto.png");
    imagen.setAttribute("loading", "lazy");

    boton_izquierdo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg>'
    boton_izquierdo.setAttribute('id', 'boton-izquierdo')
    boton_derecho.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EEEEEE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>'
    boton_derecho.setAttribute('id', 'boton-derecho')
    let siguiente = 0
    boton_izquierdo.addEventListener('click', () =>{
        siguiente--
        if(siguiente < 0 || producto.url[siguiente] == undefined){
            siguiente = producto.url
            siguiente = siguiente.length - 1
        }
        imagen.src = producto.url[siguiente]
    })
    boton_derecho.addEventListener('click', () =>{
        siguiente++
        if(producto.url[siguiente] == undefined) siguiente = 0
        imagen.src = producto.url[siguiente]
    })
    contenedor_imagen.setAttribute('class', 'contenedor-imagen-modal')
    contenedor_imagen.appendChild(boton_izquierdo)
    contenedor_imagen.appendChild(imagen)
    contenedor_imagen.appendChild(boton_derecho)

    descripcion.setAttribute('class', 'descripcion-modal')
    descripcion.innerText = producto.descripcion

    precio.setAttribute("id", "card-precio");
    precio.innerText = "$" + producto.precio;

    boton_agregar.setAttribute("class", "botonAgregar");
    boton_agregar.setAttribute('value', producto.id)
    boton_agregar.innerText = "Agregar al carrito";
    boton_agregar.addEventListener('click', (e)=>{
      agregarItemAlCarrito(producto.id)
      colorearNumeroCarrito()
      e.stopPropagation()
    })
    contenedor_botones.setAttribute('class', 'contenedor-botones-modal')
    contenedor_botones.appendChild(boton_agregar);

    MODAL.appendChild(titulo)
    MODAL.appendChild(contenedor_imagen)
    MODAL.appendChild(descripcion)
    MODAL.appendChild(precio)
    MODAL.appendChild(contenedor_botones)

}

FONDO_MODAL.addEventListener('click', () =>{
  
    FONDO_MODAL.classList.remove('active')
    FONDO_MODAL.classList.add('inactive')
      
    })
MODAL.addEventListener('click', (e) =>{
    e.stopPropagation()
})