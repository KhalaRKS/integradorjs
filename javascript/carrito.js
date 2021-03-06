"use strict";

const CONTENEDOR_CARRITO = document.querySelector(".contenedor-carrito");
const CONTENEDOR_BOTONES_CARRITO = document.querySelector(
  ".contenedor-botones-carrito"
);
const VACIAR_CARRITO = document.getElementById("vaciar-carrito");
const TEXTO_CARRITO_VACIO = document.getElementById("texto-carrito-vacio");

const MODAL_CARRITO = document.querySelector('.modal-carrito')

let keys = Object.keys(localStorage);

function renderizarCarrito() {
  for (let index = 0; index < keys.length; index++) {
    if (keys[index] != "users") {
      const element = JSON.parse(localStorage[Number(keys[index])]);
      renderizarProducto(element, keys[index]);
    }
  }
}

function setCantidad(item, cant) {
  item.cantidad = cant;
  if (item.cantidad > 20) item.cantidad = 20;

  if (item.cantidad <= 0) {
    localStorage.removeItem(item.id);
    keys = Object.keys(localStorage);
    item.cantidad = 0;
    renderizarCarritoVacio();
    return item.cantidad;
  }

  localStorage.setItem(item.id, JSON.stringify(item));
  renderizarCarritoVacio();
  return item.cantidad;
}

function renderizarProducto(producto, index) {
  let contenedor_producto = document.createElement("div");
  let titulo = document.createElement("p");
  let imagen = document.createElement("img");
  let contenedor_precio_input = document.createElement("div");
  let precio = document.createElement("p");
  let contenedor_input_producto = document.createElement("div");
  let contenedor_botones = document.createElement("div");
  let boton_restar = document.createElement("button");
  let boton_sumar = document.createElement("button");
  let boton_remover = document.createElement("button");
  let input = document.createElement("input");
  let item = JSON.parse(localStorage.getItem(producto.id));
  /*ASIGNAMOS ATRIBUTOS A LAS ETIQUETAS*/
  contenedor_producto.setAttribute("class", "contenedor-producto-carrito");

  imagen.setAttribute("class", "imagen-carrito");
  imagen.setAttribute("src", producto.url[0]);

  contenedor_precio_input.setAttribute("class", "contenedor-precio-input");

  contenedor_input_producto.setAttribute("class", "contenedor-input-producto");
  boton_restar.setAttribute("class", "boton-restar");
  boton_sumar.setAttribute("class", "boton-sumar");
  boton_remover.setAttribute("class", "boton-remover");

  input.setAttribute("type", "number");
  input.setAttribute("id", "input-cantidad");
  /**AGREGAMOS INFORMACION A LAS PARTES DEL PRODUCTO */

  precio.innerText = "$" + producto.precio * producto.cantidad;
  boton_remover.innerHTML = "<i class='fas fa-trash'></i>";
  boton_remover.value = index;

  input.value = producto.cantidad;
  boton_restar.innerText = "-";
  boton_sumar.innerText = "+";

  /*FUNCION PARA AGREGAR EVENTO REMOVER ITEM DEL CARRITO */

  boton_sumar.addEventListener("click", () => {
    let cantidadProductos = setCantidad(item, (item.cantidad += 1));

    input.value = cantidadProductos;
    precio.innerText = "$" + item.precio * cantidadProductos;
  });

  boton_restar.addEventListener("click", () => {
    let cantidadProductos = setCantidad(item, (item.cantidad -= 1));

    if (cantidadProductos == 0) {
      contenedor_producto.remove();
    }
    input.value = cantidadProductos;
    precio.innerText = "$" + item.precio * cantidadProductos;
  });

  boton_remover.addEventListener("click", () => {
    setCantidad(item, 0);
    contenedor_producto.remove();
  });

  input.addEventListener("focusout", () => {
    let cantidadProductos = setCantidad(item, Number(input.value));
    if (cantidadProductos == 0) {
      contenedor_producto.remove();
    }

    input.value = cantidadProductos;
    precio.innerText = "$" + item.precio * cantidadProductos;
  });

  contenedor_botones.appendChild(boton_restar);
  contenedor_botones.appendChild(input);
  contenedor_botones.appendChild(boton_sumar);

  contenedor_input_producto.appendChild(contenedor_botones);
  contenedor_input_producto.appendChild(boton_remover);

  contenedor_precio_input.appendChild(precio);
  contenedor_precio_input.appendChild(contenedor_input_producto);

  titulo.innerText = producto.nombre;
  /**CREAMOS LA CARD DEL PRODUCTO A VISUALIZAR */
  contenedor_producto.appendChild(titulo);
  contenedor_producto.appendChild(imagen);
  contenedor_producto.appendChild(contenedor_precio_input);

  CONTENEDOR_CARRITO.appendChild(contenedor_producto);
  return;
}
/**RENDERIZA HTML DEPENDIENDO DE QUE EL CARRITO SE ENCUENTRE VACIO O CON INFORMACION */
function renderizarCarritoVacio() {
  if (localStorage.length > 1) {
    CONTENEDOR_BOTONES_CARRITO.classList.add("active");
    const FINALIZAR_COMPRA = document.getElementById('finalizar-compra')
    FINALIZAR_COMPRA.addEventListener('click', () =>{
      MODAL_CARRITO.classList.add('show')
      MODAL_CARRITO.addEventListener('click', ()=> {
        MODAL_CARRITO.classList.remove('show')
      })
    })
    const PRECIO_TOTAL = document.getElementById("precio-total-carrito");
    let precio_total = 0;
    for (let index = 0; index < keys.length; index++) {
      if (keys[index] != "users") {
        const element = JSON.parse(localStorage[keys[index]]);
        precio_total += element.precio * element.cantidad;
      }
    }
    PRECIO_TOTAL.innerText = `Precio Total: \$ ${precio_total}`;
  } else if (localStorage.length <= 1) {
    while (CONTENEDOR_CARRITO.firstChild) {
      CONTENEDOR_CARRITO.removeChild(CONTENEDOR_CARRITO.firstChild);
    }
    TEXTO_CARRITO_VACIO.classList.add("active");
    CONTENEDOR_BOTONES_CARRITO.classList.remove("active");
  }
}

function vaciarCarrito() {
  for (let index = 0; index < keys.length; index++) {
    if (keys[index] != "users") {
      localStorage.removeItem([keys[index]]);
    }
  }
  keys = Object.keys(localStorage);
}
document.addEventListener(
  "DOMContentLoaded",
  renderizarCarritoVacio(),
  renderizarCarrito()
);
if (VACIAR_CARRITO) {
  VACIAR_CARRITO.addEventListener("click", () => {
    vaciarCarrito();
    renderizarCarritoVacio();
  });
}
