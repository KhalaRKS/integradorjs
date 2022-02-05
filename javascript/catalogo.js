"use strict";
import { STOCK } from "./stock.js";
import { agregarItemAlCarrito, colorearNumeroCarrito } from "./localstorage.js";
const CONTENEDOR_CARDS = document.querySelector('.contenedor-cards')

/* GUARDAMOS EL NODO DE LOS BUSCADORES/FILTROS PARA PODER UTILIZARLOS CON 1 SOLO ACCESO AL DOM*/
const BUSCADOR_TEXTO = document.getElementById('buscador-texto')
const FILTRO_PRECIO = document.getElementById("input-range");
const FILTRO_PRODUCTO = document.getElementById("filtro-producto");
const MODAL = document.querySelector('.fondo-modal')
/*MANIPULAMOS UN DATO AUXILIAR DEL STOCK ACTUAL RECIBIDO PARA NO TRANSGIVERSAR INFORMACIÓN */
const STOCK_AUXILIAR = STOCK;

function renderizarProducto(producto) {
  /* CREAMOS TODAS LAS ETIQUETAS CORRESPONDIENTES A LA CARTA QUE VAMOS A RENDERIZAR */
  let carta = document.createElement("div");
  let titulo = document.createElement("h2");
  let imagen = document.createElement("img");
  let precio = document.createElement("h3");
  let contenedor_botones = document.createElement("div");
  let boton_agregar = document.createElement("button");
  let boton_comprar = document.createElement("button");

  /*AÑADIMOS ATRIBUTOS E INFORMACIÓN A LAS ETIQUETAS*/
  carta.setAttribute("class", "card");

  titulo.innerText = producto.nombre;

  imagen.setAttribute("src", producto.url);
  imagen.setAttribute("alt", "imagen-producto.png");
  imagen.setAttribute("loading", "lazy");

  precio.setAttribute("id", "card-precio");
  precio.innerText = "$" + producto.precio;

  boton_agregar.setAttribute("class", "botonAgregar");
  boton_agregar.setAttribute('value', producto.id)
  boton_agregar.innerText = "Agregar al carrito";
  boton_agregar.addEventListener('click', (e)=>{
    //ID
    agregarItemAlCarrito(producto.id)
    colorearNumeroCarrito()
    e.stopPropagation()
  })
  boton_comprar.setAttribute("class", "botonComprar");
  boton_comprar.innerText = "Comprar";

  contenedor_botones.appendChild(boton_agregar);
  contenedor_botones.appendChild(boton_comprar);
/* CREAMOS LA CARTA, PUSHEANDO LOS NODOS EN CARTA */
  carta.appendChild(titulo);
  carta.appendChild(imagen);
  carta.appendChild(precio);
  carta.appendChild(contenedor_botones);

  /* RETORNAMOS LA CARTA COMPLETAMENTE ORDENADA */

  return carta;
}

/* ESTA FUNCION CARGA EL CATALOGO COMO VIENE ENTREGADO EL VALOR DE STOCK */
function cargarCatalogo() {
  STOCK.forEach((element) => {
    let card = renderizarProducto(element);
    CONTENEDOR_CARDS.appendChild(card);
    añadirModal(card)
  });
}

function borrarCatalogo () {
        while(CONTENEDOR_CARDS.firstChild){
            CONTENEDOR_CARDS.removeChild(CONTENEDOR_CARDS.firstChild)
        }
}

function filtrarProductos() {
    borrarCatalogo()
    if(BUSCADOR_TEXTO.value != '' || BUSCADOR_TEXTO.value){
        var PRODUCTOS_COINCIDENTES = STOCK_AUXILIAR.filter((producto) =>
  new RegExp(BUSCADOR_TEXTO.value, "i").test(producto.nombre.toLowerCase())
)
       if(PRODUCTOS_COINCIDENTES){
            let i = 0;
            for (let index = 0; index < PRODUCTOS_COINCIDENTES.length; index++) {
                const element = PRODUCTOS_COINCIDENTES[index];
                let card = renderizarProducto(element,index)
                CONTENEDOR_CARDS.appendChild(card);
                console.log(CONTENEDOR_CARDS[index]);
                añadirModal(card)
            }
        }else{
            borrarCatalogo()
            return 
        }
    }else{
        borrarCatalogo()
        cargarCatalogo()
    }
}
function añadirModal(card) {
      /* */
    card.addEventListener('click', (e) =>{
      MODAL.classList.add('active')
      console.log('hola');
    })
    MODAL.addEventListener('click', () =>{
      MODAL.classList.remove('active')
    })

  }
document.body.addEventListener('DOMContentLoaded', cargarCatalogo(), colorearNumeroCarrito())

BUSCADOR_TEXTO.addEventListener('input', filtrarProductos)

//export { borrarCatalogo }


