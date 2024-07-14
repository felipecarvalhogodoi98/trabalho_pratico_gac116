"use strict";

async function getNewAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    return;
  }

  const response = await fetch("/api/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (response.ok) {
    const result = await response.json();
    localStorage.setItem("access_token", result.access);
    return result.access;
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
}

async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    accessToken = await getNewAccessToken();
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);
  if (response.status === 401) {
    accessToken = await getNewAccessToken();
    if (accessToken) {
      options.headers["Authorization"] = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    }
  }

  return response;
}

async function getUserDetails() {
  if (hasUserInfo() || publicPages()) return;

  const response = await fetchWithAuth("/api/users/me/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const user = await response.json();
    fillProfile(user);
    fillNavbar(user);
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    // TODO:
  }
}

function isAuthenticated() {
  return (
    localStorage.getItem("access_token") !== null &&
    localStorage.getItem("refresh_token") !== null
  );
}
function hasUserInfo() {
  return localStorage.getItem("user") !== null;
}

function redirectToLogin() {
  if (publicPages()) return;

  if (!isAuthenticated()) {
    window.location.href = "/login";
  }
}

function fillNavbar(user) {
  if (!user) user = getUser();
  if (!user) return;

  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  navbar.querySelector(".username").innerText = user?.name;
  if (user?.avatar) {
    navbar.querySelector(".avatar").src = user.avatar;
  } else {
    navbar.querySelector(".avatar").src = "media/avatars/user.png";
  }
}

function fillProfile(user) {
  if (!user) user = getUser();
  if (!user) return;

  const perfilForm = document.querySelector("#perfil-form");
  if (!perfilForm) return;

  fillInput(perfilForm, "username", user?.username);
  fillInput(perfilForm, "email", user?.email);
  fillInput(perfilForm, "name", user?.name);
  fillSelect(perfilForm, "user_type", user?.user_type);
}

function fillInput(parent, name, value) {
  parent.querySelector(`input[name=${name}]`).value = value;
}

function fillSelect(parent, name, value) {
  parent.querySelector(`select[name=${name}]`).value = value;
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function publicPages() {
  return (
    window.location.pathname === "/login" ||
    window.location.pathname === "/register"
  );
}

redirectToLogin();
getUserDetails();
fillNavbar();
fillProfile();

if (!isAuthenticated()) {
  const notLogged = document.querySelector(".not-logged");
  if (notLogged) notLogged.classList.remove("d-none");
} else {
  const logged = document.querySelector(".logged");
  if (logged) logged.classList.remove("d-none");
}
