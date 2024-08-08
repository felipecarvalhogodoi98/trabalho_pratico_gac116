function addBenefit() {
  const benefitsContainer = document.querySelector("#benefits");
  const benefitDiv = document.createElement("div");
  benefitDiv.classList.add("benefit");

  benefitDiv.innerHTML = `
    <label for="benefit-title" class="form-label">Título:</label>
    <input type="text" class="benefit-title form-control">
    <label for="benefit-description" class="form-label">Descrição:</label>
    <textarea class="benefit-description form-control"></textarea>
  `;

  benefitsContainer.append(document.createElement("hr"));
  benefitsContainer.appendChild(benefitDiv);
}

function addResponsibility() {
  const responsibilitiesContainer = document.querySelector("#responsibilities");
  const responsibilityDiv = document.createElement("div");
  responsibilityDiv.classList.add("responsibility");

  responsibilityDiv.innerHTML = `
    <label for="responsibility-title" class="form-label">Título:</label>
    <input type="text" class="responsibility-title form-control">
    <label for="responsibility-description" class="form-label">Descrição:</label>
    <textarea class="responsibility-description form-control"></textarea>
  `;
  responsibilitiesContainer.append(document.createElement("hr"));
  responsibilitiesContainer.appendChild(responsibilityDiv);
}

function addRequirement() {
  const requirementsContainer = document.querySelector("#requirements");
  const requirementDiv = document.createElement("div");
  requirementDiv.classList.add("requirement");

  requirementDiv.innerHTML = `
    <label for="requirement-title" class="form-label">Título:</label>
    <input type="text" class="requirement-title form-control">
    <label for="requirement-description" class="form-label">Descrição:</label>
    <textarea class="requirement-description form-control"></textarea>
  `;

  requirementsContainer.append(document.createElement("hr"));
  requirementsContainer.appendChild(requirementDiv);
}

async function submitForm(e) {
  e.preventDefault();
  form.classList.remove("was-validated");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const benefits = Array.from(document.querySelectorAll(".benefit")).map(
    (element) => ({
      title: element.querySelector(".benefit-title").value,
      description: element.querySelector(".benefit-description").value,
    })
  );

  const responsibilities = Array.from(
    document.querySelectorAll(".responsibility")
  ).map((element) => ({
    title: element.querySelector(".responsibility-title").value,
    description: element.querySelector(".responsibility-description").value,
  }));

  const requirements = Array.from(
    document.querySelectorAll(".requirement")
  ).map((element) => ({
    title: element.querySelector(".requirement-title").value,
    description: element.querySelector(".requirement-description").value,
  }));

  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    accessToken = await getNewAccessToken();
  }

  try {
    let response = await fetch("/api/vacancies/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });

    if (response.ok) {
      const vacancy = await response.json();
      const vacancyId = vacancy.id;

      await Promise.all([
        ...benefits.map((benefit) =>
          fetch(`/api/vacancies/${vacancyId}/benefits/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(benefit),
          })
        ),
        ...responsibilities.map((responsibility) =>
          fetch(`/api/vacancies/${vacancyId}/responsibilities/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(responsibility),
          })
        ),
        ...requirements.map((requirement) =>
          fetch(`/api/vacancies/${vacancyId}/requirements/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(requirement),
          })
        ),
      ]);

      registerVacancyModal.querySelector(".modal-title").innerText =
        "Vaga cadastrada!";
      registerVacancyModal.querySelector(
        ".modal-body"
      ).innerText = `Sua vaga foi cadastrada com sucesso!`;
      registerVacancyModalBootstrap.toggle();

      registerVacancyModal.addEventListener(
        "hidden.bs.modal",
        function (event) {
          window.location.href = "/";
        }
      );
    } else {
      const errorData = await response.json();
      displayErrors(errorData);
    }
  } catch (error) {
    registerVacancyModal.querySelector(".modal-title").innerText = "Erro!";
    registerVacancyModal.querySelector(
      ".modal-body"
    ).innerText = `Ocorreu algum erro, tente mais tarde!`;
    registerVacancyModalBootstrap.toggle();
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

const registerVacancyModal = document.getElementById("register-vacancy-modal");
const registerVacancyModalBootstrap = new bootstrap.Modal(registerVacancyModal);
const form = document.querySelector("#vacancy-form");
const responseHtml = document.getElementById("response");

document.querySelector(".add-benefit").addEventListener("click", addBenefit);
document
  .querySelector(".add-responsability")
  .addEventListener("click", addResponsibility);
document
  .querySelector(".add-requeriment")
  .addEventListener("click", addRequirement);

document
  .querySelector("button[type=submit]")
  .addEventListener("click", (e) => submitForm(e));
