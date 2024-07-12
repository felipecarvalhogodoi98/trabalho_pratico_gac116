const registerButtton = document.querySelector(
  "#register-form button[type=submit]"
);
const responseHtml = document.getElementById("response");

function isAuthenticated() {
  return localStorage.getItem("access_token") !== null;
}

async function registerUser(e) {
  e.preventDefault();
  console.log("reg");
  const form = document.getElementById("register-form");
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
      responseHtml.innerText = "Registration successful!";
      window.location = "/";
    } else {
      responseHtml.innerText = "Registration failed: " + JSON.stringify(result);
    }
  } catch (error) {
    console.error("Error:", error);
    responseHtml.innerText = "An error occurred: " + error.message;
  }
}

registerButtton.addEventListener("click", registerUser);

if (isAuthenticated()) window.location = "/";
