'use strict'
const EMAIL_INPUT = document.getElementById('email')
const CONTRASEÑA_INPUT = document.getElementById('password')
const MOSTRAR_INPUT_REGISTRO = document.getElementsByClassName('mostrar-input-registro')
const TEXTO_REGISTRARSE = document.getElementById('texto-registrarse')
const TEXTO_RECOVER_PW = document.getElementById('texto-recover')

const BOTON_SUBMIT = document.getElementById('botonLog')

const NOMBRE_USER = document.getElementById('nombre')
const EMAIL_USER = document.getElementById('email')
const PW_USER = document.getElementById('password')
const VERIFY_PW_USER = document.getElementById('confirmar-password')


TEXTO_REGISTRARSE.addEventListener('click', () =>{
    MOSTRAR_INPUT_REGISTRO[0].classList.toggle('active')
    MOSTRAR_INPUT_REGISTRO[1].classList.toggle('active')
    if (MOSTRAR_INPUT_REGISTRO[0].classList.contains('active')) {
        TEXTO_REGISTRARSE.innerText = 'Ya tengo una cuenta'
        TEXTO_RECOVER_PW.style.display ='none';
    }else{
        TEXTO_REGISTRARSE.innerText = '¿No tienes cuenta? Registrarse'
        TEXTO_RECOVER_PW.style.display ='block';
    }
})

function setNewAccount() {
    let NewAccount = {}
    if (sha256(PW_USER.value) != sha256(VERIFY_PW_USER.value)) {
        PW_USER.value = ''
        VERIFY_PW_USER.value = ''
        PW_USER.style.border = '1px solid red'
        return console.log('LAS CONTRASEÑAS NO COINCIDEN');
    }
    NewAccount.nombre = NOMBRE_USER.value
    NewAccount.email = EMAIL_USER.value
    NewAccount.password = sha256(PW_USER.value)
    let usuarios = localStorage.getItem('users')
    console.log(usuarios);
    //usuarios.push(JSON.stringify(NewAccount))
    localStorage.setItem('users', usuarios)

}

BOTON_SUBMIT.addEventListener('click', setNewAccount())

let nombre = 'ssssssss'
console.log(sha256(nombre))