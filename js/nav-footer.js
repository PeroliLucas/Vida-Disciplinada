/* =====================================================
   BASE PATH — GitHub Pages ou Local
===================================================== */
const BASE_PATH = location.hostname.includes("github.io")
  ? "/Vida-Disciplinada"
  : "";

/* =====================================================
   MENU MOBILE (ABRIR / FECHAR)
===================================================== */
function initMobileMenu() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav-menu");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show-menu");
    toggle.classList.toggle("show-icon");
  });
}

/* =====================================================
   DROPDOWNS DO MENU
===================================================== */
function initDropdowns() {
  const dropdownItems = document.querySelectorAll(".dropdown__item");

  if (!dropdownItems.length) return;

  dropdownItems.forEach(item => {
    const trigger = item.querySelector(".nav__link");

    if (!trigger) return;

    trigger.addEventListener("click", () => {
      // Fecha outros dropdowns
      dropdownItems.forEach(other => {
        if (other !== item) {
          other.classList.remove("open");
        }
      });

      // Abre / fecha o atual
      item.classList.toggle("open");
    });
  });
}

/* =====================================================
   FECHAR MENU AO CLICAR EM UM LINK (MOBILE)
===================================================== */
function initCloseMenuOnClick() {
  const navLinks = document.querySelectorAll(
    ".nav__menu a[data-link]"
  );

  const navMenu = document.getElementById("nav-menu");
  const toggle = document.getElementById("nav-toggle");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu?.classList.contains("show-menu")) {
        navMenu.classList.remove("show-menu");
        toggle?.classList.remove("show-icon");
      }
    });
  });
}

/* =====================================================
   FUNÇÃO GENÉRICA PARA INJETAR COMPONENTES
===================================================== */
function loadComponent(selector, componentPath, callback) {
  const container = document.querySelector(selector);
  if (!container) return;

  fetch(`${BASE_PATH}${componentPath}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao carregar ${componentPath}`);
      }
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;

      /* Corrige todos os data-link */
      container.querySelectorAll("[data-link]").forEach(link => {
        link.setAttribute("href", BASE_PATH + link.dataset.link);
      });

      /* Callback após injeção */
      if (callback) callback();
    })
    .catch(error => console.error(error));
}

/* =====================================================
   INICIALIZAÇÃO GLOBAL
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("#site-header", "/components/header.html", () => {
    initMobileMenu();
    initDropdowns();
    initCloseMenuOnClick();
  });

  loadComponent("#site-footer", "/components/footer.html");
});
