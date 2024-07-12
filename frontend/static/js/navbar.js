"use strict";

const logoutButton = document.querySelector(".logout");

logoutButton.addEventListener("click", logout);

navbar();

function navbar() {
  const links = document.querySelectorAll(".navbar ul li a");

  links.forEach((link) => {
    const url = new URL(link.href);
    if (url.pathname === window.location.pathname) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  window.location.href = "/";
}
