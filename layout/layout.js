async function loadComponent(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  const target = document.getElementById(id);

  target.innerHTML = html;

  // execute scripts manually if any (future proof)
  target.querySelectorAll("script").forEach(oldScript => {
    const newScript = document.createElement("script");
    newScript.textContent = oldScript.textContent;
    document.body.appendChild(newScript);
  });
}

function root() {
  return document.body.dataset.root || ".";
}

function setLinks() {
  const r = root();
  document.querySelectorAll("[data-link]").forEach(el => {
    el.href = r + "/" + el.dataset.link;
  });
}

function buildMobileNav() {
  const desktop = document.getElementById("main-nav-links");
  const mobile = document.getElementById("mobile-nav");

  mobile.innerHTML = "";

  desktop.querySelectorAll("a").forEach(a => {
    const m = document.createElement("a");
    m.setAttribute("data-link", a.dataset.link);
    m.textContent = a.textContent;
    mobile.appendChild(m);
  });
}

function activeNav() {
  const path = window.location.pathname;

  document.querySelectorAll(".nav-links a, .mobile-nav a").forEach(link => {
    if (path.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    }
  });
}

function mobileNav() {
  const btn = document.getElementById("mobile-menu-btn");
  const nav = document.getElementById("mobile-nav");

  btn.onclick = () => {
    nav.dataset.open = nav.dataset.open === "true" ? "false" : "true";
  };
}

async function init() {
  const r = root();

  await loadComponent("site-header", r + "/components/header.html");
  await loadComponent("site-footer", r + "/components/footer.html");

  buildMobileNav();
  setLinks();
  activeNav();
  mobileNav();
}

init();
