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
  const response = await fetchWithAuth("/api/users/me/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const user = await response.json();
    document.getElementById("username").innerText = user.name;
    if (user.avatar) {
      document.getElementById("avatar").src = user.avatar;
    } else {
      document.getElementById("avatar").src = "media/avatars/user.png";
    }
  } else {
  }
}

function isAuthenticated() {
  return (
    localStorage.getItem("access_token") !== null &&
    localStorage.getItem("refresh_token") !== null
  );
}

function redirectToLogin() {
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/register"
  )
    return;

  if (!isAuthenticated()) {
    window.location.href = "/login";
  }
}

redirectToLogin();
getUserDetails();

if (!isAuthenticated()) {
  document.querySelector(".not-logged").classList.remove("d-none");
} else {
  document.querySelector(".logged").classList.remove("d-none");
}
