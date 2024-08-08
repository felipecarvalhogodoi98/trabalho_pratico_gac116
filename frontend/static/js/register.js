const form = document.querySelector("#register-form");
const registerButton = form.querySelector("button[type=submit]");

const responseHtml = document.getElementById("response");

function isAuthenticated() {
  return localStorage.getItem("access_token") !== null;
}

async function registerUser(e) {
  e.preventDefault();
  form.classList.remove("was-validated");
  displayErrors({});

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch("/api/users/register/", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("access_token", result.access);
      localStorage.setItem("refresh_token", result.refresh);
      if (result.user.user_type === "user") {
        await fetch(`/api/portfolios/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + result.access,
          },
          body: JSON.stringify({}),
        });
      }
      window.location = "/";
    } else {
      displayErrors(result);
    }
  } catch (error) {
    console.error("Error:", error);
    responseHtml.innerText = "An error occurred: " + error.message;
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

registerButton.addEventListener("click", registerUser);

if (isAuthenticated()) window.location = "/";
