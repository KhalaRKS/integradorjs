const hamburguesa = document.querySelector(".boton-hamburguesa");
const navbarMenu = document.querySelector(".navbar-menu");
hamburguesa.addEventListener("click", () => {
  hamburguesa.classList.toggle("active");
  navbarMenu.classList.toggle("active");
});
document.querySelectorAll(".navbar-link").forEach((element) => {
  element.addEventListener("click", () => {
    hamburguesa.classList.remove("active");
    navbarMenu.classList.remove("active");
  });
});


if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]))

if(sessionStorage.getItem('user')){
  const INGRESAR_NAV = document.getElementById('nav-li-ingresar')
  const CERRAR_NAV = document.getElementById('nav-li-salir')
  INGRESAR_NAV.style.display = 'none'
  CERRAR_NAV.style.display = 'block'
  CERRAR_NAV.addEventListener('click', () => {
    sessionStorage.clear()
    window.location.assign('/index.html')
  })
  navbarMenu.classList.add('login')
  const USUARIO_ONLINE = document.querySelector('#usuario-online')
  USUARIO_ONLINE.style.display = 'block'
  let usuario = JSON.parse(sessionStorage.getItem('user'))
  console.log(usuario);
  USUARIO_ONLINE.innerText = `Hola ${usuario.nombre.toUpperCase()}!`
  console.log('el usuario esta logeado');
}else{
  console.log('el usuario no esta logeado');
}

