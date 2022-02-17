'use strict'
import { toggleClassFondoModal } from "./modal.js";

const FINALIZAR_COMPRA = document.getElementById('finalizar-compra')
const CONFIRMAR_COMPRA = document.getElementById('confirmar-compra')
const DESCRIPCION_COMPRA = document.getElementById('descripcion-compra')
const USUARIO_NOMBRE = document.getElementById('usuario')
const USUARIO_EMAIL = document.getElementById('email')
const PRECIO = document.getElementById('color-precio')
const FONDO_MODAL = document.querySelector('.fondo-modal')
const MODAL = document.querySelector('.modal')

function showModal() {
    let precio = document.getElementById('precio-total-carrito').innerText.toLowerCase();
    let user = JSON.parse(sessionStorage.getItem('user'))
    USUARIO_NOMBRE.innerText = user.nombre
    USUARIO_EMAIL.innerText = user.email
    PRECIO.innerText = document.getElementById('precio-total-carrito').innerText

    DESCRIPCION_COMPRA.innerHTML =`
    Usted realizara un pedido de los articulos
     detallados anteriormente en su carrito. Se enviara un mail con los
     detalles del pedido realizado.
    `
    toggleClassFondoModal()
    
}

FINALIZAR_COMPRA.addEventListener('click', showModal)
CONFIRMAR_COMPRA.addEventListener('click', () =>{
    const serviceID = 'service_tyoxefw'
    const templateID = 'template_tjy5s8j'
    const templateParams = {
        nombre: JSON.parse(sessionStorage.getItem('user')).nombre,
        email: JSON.parse(sessionStorage.getItem('user')).email,
        cuerpo: 'Usted realizo la compra con exito. Le informamos su detalle de su compra.',
        precio: PRECIO.innerText,


    }
    emailjs.send(serviceID, templateID, templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
     }, function(error) {
        console.log('FAILED...', error);
     });
})

FONDO_MODAL.addEventListener('click', () =>{

    FONDO_MODAL.classList.remove('active')
    FONDO_MODAL.classList.add('inactive')
      
    })
MODAL.addEventListener('click', (e) =>{
    e.stopPropagation()
})
