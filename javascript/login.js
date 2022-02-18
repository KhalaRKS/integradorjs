'use strict'
const MOSTRAR_INPUT_REGISTRO = document.getElementsByClassName('mostrar-input-registro')
const TEXTO_REGISTRARSE = document.getElementById('texto-registrarse')

const BOTON_LOGIN= document.getElementById('botonLogin')
const BOTON_REGISTER = document.getElementById('botonRegister')
const TEXTO_LOGIN = document.getElementById('texto-login')
const ALERTA = document.querySelector('.contenedor-alerta')

const NOMBRE_USER = document.getElementById('nombre')
const EMAIL_USER = document.getElementById('email')
const PW_USER = document.getElementById('password')
const VERIFY_PW_USER = document.getElementById('confirmar-password')

const PW_LABEL = document.getElementById('pw-label')
const NOMBRE_LABEL = document.getElementById('nombre-label')
const EMAIL_LABEL = document.getElementById('email-label')
const CON_PW_LABEL = document.getElementById('confirm-pw')

console.log(BOTON_LOGIN);
function changeForm() {
    PW_USER.value = ''
    VERIFY_PW_USER.value = ''
    EMAIL_USER.value = ''
    NOMBRE_USER.value = ''
    MOSTRAR_INPUT_REGISTRO[0].classList.toggle('active')
    MOSTRAR_INPUT_REGISTRO[1].classList.toggle('active')
    if (MOSTRAR_INPUT_REGISTRO[0].classList.contains('active')) {
        TEXTO_REGISTRARSE.innerText = 'Ya tengo una cuenta'
        BOTON_LOGIN.style.display = 'none'
        BOTON_REGISTER.style.display = 'block'
        TEXTO_LOGIN.innerText = 'Registrarse'
        const removeFocus = document.querySelector('.label-input')
        for (let index = 0; index < removeFocus.length; index++) {
            const element = remove[index];
            if (element.classList.contains('focus')) element.classList.remove('focus')
            
        }

    }else{
        TEXTO_REGISTRARSE.innerText = '¿No tienes cuenta? Registrarse'
        BOTON_REGISTER.style.display = 'none'
        BOTON_LOGIN.style.display = 'block'
        TEXTO_LOGIN.innerText = 'Login'
        const removeFocus = document.querySelector('.label-input')
        for (let index = 0; index < removeFocus.length; index++) {
            const element = remove[index];
            if (element.classList.contains('focus')) element.classList.remove('focus')
            
        }
    }
    EMAIL_LABEL.classList.remove('focus')
    PW_LABEL.classList.remove('focus')
    CON_PW_LABEL.classList.remove('focus')
    NOMBRE_LABEL.classList.remove('focus')
    
}
TEXTO_REGISTRARSE.addEventListener('click', changeForm)

function setNewAccount() {
    let usuarios = JSON.parse(localStorage.getItem('users'))
    for (let index = 0; index < usuarios.length; index++) {
        const element = usuarios[index];
        if (element.email === EMAIL_USER.value) {
            EMAIL_USER.value = ''
            EMAIL_USER.style.border = '1px solid red'
            console.log('Ese mail ya esta en uso.');
            ALERTA.innerText = 'Ese mail ya se encuentra en uso, prueba utilizando uno distinto.'
            ALERTA.classList.add('active')
            setInterval(() => {
                ALERTA.classList.remove('active')
                ALERTA.classList.add('inactive')
            }, 4000);
            return
        }
    }
    if(NOMBRE_USER.value == ''){
        NOMBRE_USER.style.border = '1px solid red'
        console.log('El usuario debe contener un nombre');
        ALERTA.innerText = 'El usuario debe contener un nombre'
        ALERTA.classList.add('active')
        setInterval(() => {
            ALERTA.classList.remove('active')
            ALERTA.classList.add('inactive')
        }, 4000);
        return
    }else if (EMAIL_USER.value == '') {
        EMAIL_USER.style.border = '1px solid red'
        console.log('El usuario debe colocar un email.');
        ALERTA.innerText = 'El usuario debe colocar un email.'
        ALERTA.classList.add('active')
        setInterval(() => {
            ALERTA.classList.remove('active')
            ALERTA.classList.add('inactive')
        }, 4000);
        return
    }else if (PW_USER.value == ''){
        PW_USER.style.border = '1px solid red'
        console.log('El usuario debe colocar una contraseña');
        ALERTA.innerText = 'El usuario debe colocar una contraseña'
        ALERTA.classList.add('active')
        setInterval(() => {
            ALERTA.classList.remove('active')
            ALERTA.classList.add('inactive')
        }, 4000);
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
    console.log('Usuario creado exitosamente.');
    ALERTA.innerText = 'Usuario creado exitosamente.'
    ALERTA.classList.add('active')
    ALERTA.style.background = 'var(--green)'
    setInterval(() => {
        ALERTA.classList.remove('active')
        ALERTA.classList.add('inactive')

    }, 4000);
    changeForm()
    return
}

function logAccount() {

    let usuarios = JSON.parse(localStorage.getItem('users'))
    let usuario = usuarios.find(usuario => usuario.email === EMAIL_USER.value)
    if(usuario){
        if (usuario.password === sha256(PW_USER.value)) {
            console.log('Sesion iniciada');
            sessionStorage.setItem('user', JSON.stringify(usuario))
            window.location.assign('/index.html')
            return
        }else{
            ALERTA.innerText = 'La contraseña ingresada es incorrecta'
            ALERTA.classList.add('active')
            console.log('la contraseña no existe');
            PW_USER.value = ''
            setInterval(() => {
                ALERTA.classList.remove('active')
                ALERTA.classList.add('inactive')
            }, 4000);
            return
        }
    }else{
        ALERTA.innerText = 'El usuario y/o la contraseña son invalidos.'
        ALERTA.classList.add('active')
        console.log('El usuario y/o la contraseña son invalidos.');
        PW_USER.value = ''
        EMAIL_USER.value = ''
        setInterval(() => {
            ALERTA.classList.remove('active')
            ALERTA.classList.add('inactive')
        }, 4000);
        return
    }
}

BOTON_REGISTER.addEventListener('click', setNewAccount)
BOTON_LOGIN.addEventListener('click', logAccount)
EMAIL_USER.addEventListener('focus', () =>{
    if (EMAIL_USER.value != '') {
        return
    }
    
        EMAIL_LABEL.classList.add('focus')

})
EMAIL_USER.addEventListener('blur', () =>{
    if (EMAIL_USER.value != '') {
        return
    }
        EMAIL_LABEL.classList.remove('focus')

})
NOMBRE_USER.addEventListener('focus', () =>{
    if (NOMBRE_USER.value != '') {
        return
    }
        NOMBRE_LABEL.classList.add('focus')

})
NOMBRE_USER.addEventListener('blur', () =>{
    if (NOMBRE_USER.value != '') {
        return
    }
        NOMBRE_LABEL.classList.remove('focus')

})
PW_USER.addEventListener('focus', () =>{
    if (PW_USER.value != '') {
        return
    }
    
        PW_LABEL.classList.add('focus')

})
PW_USER.addEventListener('blur', () =>{
    if (PW_USER.value != '') {
        return
    }
    
        PW_LABEL.classList.remove('focus')

})
PW_USER.addEventListener('focus', () =>{
})
VERIFY_PW_USER.addEventListener('focus', () =>{
    if (VERIFY_PW_USER.value != '') {
        return
    }
        CON_PW_LABEL.classList.add('focus')

})
VERIFY_PW_USER.addEventListener('blur', () =>{
    if (VERIFY_PW_USER.value != '') {
        return
    }
        CON_PW_LABEL.classList.remove('focus')

})
VERIFY_PW_USER.addEventListener('focus', () =>{
})