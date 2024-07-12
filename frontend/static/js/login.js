const loginButton = document.querySelector("#login-form button");

function isAuthenticated() {
  return localStorage.getItem("access_token") !== null;
}

async function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("/api/users/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  if (response.ok) {
    localStorage.setItem("access_token", result.access);
    localStorage.setItem("refresh_token", result.refresh);
    document.getElementById("response").innerText = "Login successful!";

    window.location = "/";
  } else {
    document.getElementById("response").innerText =
      "Login failed: " + JSON.stringify(result);
  }
}

loginButton.addEventListener("click", loginUser);

if (isAuthenticated()) window.location = "/";
