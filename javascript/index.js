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

