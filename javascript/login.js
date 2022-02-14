'use strict'
const MOSTRAR_INPUT_REGISTRO = document.getElementsByClassName('mostrar-input-registro')
const TEXTO_REGISTRARSE = document.getElementById('texto-registrarse')
const TEXTO_RECOVER_PW = document.getElementById('texto-recover')

const BOTON_LOGIN= document.getElementById('botonLogin')
const BOTON_REGISTER = document.getElementById('botonRegister')

const NOMBRE_USER = document.getElementById('nombre')
const EMAIL_USER = document.getElementById('email')
const PW_USER = document.getElementById('password')
const VERIFY_PW_USER = document.getElementById('confirmar-password')

console.log(BOTON_LOGIN);
TEXTO_REGISTRARSE.addEventListener('click', () =>{
    PW_USER.value = ''
    VERIFY_PW_USER.value = ''
    EMAIL_USER.value = ''
    NOMBRE_USER.value = ''
    MOSTRAR_INPUT_REGISTRO[0].classList.toggle('active')
    MOSTRAR_INPUT_REGISTRO[1].classList.toggle('active')
    if (MOSTRAR_INPUT_REGISTRO[0].classList.contains('active')) {
        TEXTO_REGISTRARSE.innerText = 'Ya tengo una cuenta'
        TEXTO_RECOVER_PW.style.display ='none';
        BOTON_LOGIN.style.display = 'none'
        BOTON_REGISTER.style.display = 'block'

    }else{
        TEXTO_REGISTRARSE.innerText = '¿No tienes cuenta? Registrarse'
        TEXTO_RECOVER_PW.style.display ='block';
        BOTON_REGISTER.style.display = 'none'
        BOTON_LOGIN.style.display = 'block'
    }
})

function setNewAccount() {
    let usuarios = JSON.parse(localStorage.getItem('users'))
    for (let index = 0; index < usuarios.length; index++) {
        const element = usuarios[index];
        if (element.email === EMAIL_USER.value) {
            EMAIL_USER.value = ''
            EMAIL_USER.style.border = '1px solid red'
            console.log('ESE EMAIL YA ESTA EN USO');
            return
        }
    }
    if(NOMBRE_USER.value == ''){
        console.log('El usuario debe contener un nombre');
        return
    }else if (EMAIL_USER.value == '') {
        console.log('Debes colocar un email');
        return
    }else if (PW_USER.value == ''){
        console.log('Debes colocar una contraseña')
        return
    }

    if (sha256(PW_USER.value) != sha256(VERIFY_PW_USER.value)) {
        PW_USER.value = ''
        VERIFY_PW_USER.value = ''
        PW_USER.style.border = '1px solid red'
        return 
    }
    let NewAccount = {
        nombre: NOMBRE_USER.value,
        password: sha256(PW_USER.value),
        email: EMAIL_USER.value
    }
    usuarios.push(NewAccount)
    localStorage.setItem('users', JSON.stringify(usuarios))
}

function logAccount() {

    let usuarios = JSON.parse(localStorage.getItem('users'))
    let usuario = usuarios.find(usuario => usuario.email === EMAIL_USER.value)
    if(usuario){
        console.log('el user existe');
        if (usuario.password === sha256(PW_USER.value)) {
            console.log('sesion iniciada');
            sessionStorage.setItem('user', JSON.stringify(usuario))
            window.location.assign('/index.html')
            return
        }else{
            console.log('la contraseña no existe');
        }
    }else{
        console.log('no existe el user');
    }
}

BOTON_REGISTER.addEventListener('click', setNewAccount)
BOTON_LOGIN.addEventListener('click', logAccount)
EMAIL_USER.addEventListener('focus', () =>{
    EMAIL_USER.style.border = '1px solid transparent'
})
PW_USER.addEventListener('focus', () =>{
    PW_USER.style.border = '1px solid transparent'
})