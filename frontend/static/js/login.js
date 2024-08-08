const form = document.querySelector("#login-form");
const loginButton = form.querySelector("button");
const responseHtml = document.getElementById("response");

function isAuthenticated() {
  return localStorage.getItem("access_token") !== null;
}

async function loginUser() {
  form.classList.remove("was-validated");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

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
    // document.getElementById("response").innerText = "Login successful!";

    window.location = "/";
  } else {
    displayErrors({ Erro: "Verifique seu usuario e senha!" });
  }
}

function displayErrors(errors) {
  responseHtml.innerHTML = "<ul class='error-list'></ul>";
  const errorList = responseHtml.querySelector(".error-list");

  Object.entries(errors).forEach(([field, messages]) => {
    if (Array.isArray(messages)) {
      messages.forEach((message) => {
        const li = document.createElement("li");
        li.innerText = `${field}: ${message}`;
        errorList.appendChild(li);
      });
    } else {
      const li = document.createElement("li");
      li.innerText = `${field}: ${messages}`;
      errorList.appendChild(li);
    }
  });
}

loginButton.addEventListener("click", loginUser);

if (isAuthenticated()) window.location = "/";
