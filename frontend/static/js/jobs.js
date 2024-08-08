async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    accessToken = await getNewAccessToken();
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  let response = await fetch(url, options);

  const result = await response.json();

  return result;
}
let vacancies = [];
async function getVacancies() {
  vacancies = await fetchWithAuth("/api/vacancies/", {
    method: "GET",
  });

  return vacancies;
}

async function fillVacancies() {
  const vacancies = await getVacancies();

  vacanciesContainer.innerHTML = "";
  vacancies.reverse().forEach((vacancie) => {
    fillTemplate(vacancie);
  });
}
const vacanciesContainer = document.querySelector(".vacancies");

function fillTemplate(vacancie) {
  const template = document.querySelector(".vacancie-template").cloneNode(true);

  template.querySelector(".username-company").innerText = vacancie.user.name;
  template.querySelector(".avatar").src = vacancie.user.avatar;

  template.querySelector(".title").innerText = vacancie.title;
  template.querySelector(".description").innerText = vacancie.description;

  const responsibilitiesContainer = template.querySelector(".responsibilities");
  fillLists(
    responsibilitiesContainer,
    vacancie.responsibilities,
    "responsibilities"
  );

  const requirementsContainer = template.querySelector(".requirements");
  fillLists(requirementsContainer, vacancie.requirements, "requirements");

  const benefitsContainer = template.querySelector(".benefits");
  fillLists(benefitsContainer, vacancie.benefits, "benefits");

  template.querySelector(".created_at").innerText = getDateString(
    vacancie.created_at
  );

  template.querySelector(
    ".applications"
  ).innerText = `${vacancie.applications.length} applications`;

  const user = getUser();

  let userHasAplication = vacancie.applications.some(
    (aplication) => aplication.user === user?.id
  );

  if (userHasAplication) {
    template.querySelector(".apply").classList.add("disabled");
  } else {
    template.querySelector(".apply").setAttribute("vacancie-id", vacancie.id);
    template.querySelector(".apply").addEventListener("click", function (e) {
      const vacancyId = this.getAttribute("vacancie-id");
      applyToVacancy(vacancyId, vacancie.title);
      this.classList.add("disabled");
    });
  }

  template.classList.remove("d-none");
  vacanciesContainer.append(template);
}

function fillLists(container, list, name) {
  list.forEach((item) => {
    const li = document.createElement("li");
    const title = document.createElement("b");
    const description = document.createElement("p");

    title.innerText = item.title;
    description.innerText = item.description;

    li.id = `${name}-${item.id}`;

    li.append(title);
    li.append(description);
    container.append(li);
  });
}

function getDateString(date) {
  const dateObj = new Date(date);
  const todayObj = new Date();
  const diff = todayObj - dateObj;

  const diffInMinutes = Math.floor(diff / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 1) return `${diffInDays} dias atrás`;
  if (diffInDays === 1) return `1 dia atrás`;

  if (diffInHours > 1) return `${diffInHours} horas atrás`;
  if (diffInHours === 1) return `1 hora atrás`;

  if (diffInMinutes > 1) return `${diffInMinutes} minutos atrás`;
  if (diffInMinutes === 1) return `1 minuto atrás`;

  return `agora`;
}

const applyModal = document.getElementById("apply-modal");
const applyModalBootstrap = new bootstrap.Modal(applyModal);

async function applyToVacancy(vacancyId, title) {
  const user = getUser();
  const response = await fetchWithAuth(
    `/api/vacancies/${vacancyId}/applications/`,
    {
      method: "POST",
      body: JSON.stringify({
        user: user.id,
        applicant_name: user.name,
        applicant_email: user.email,
        vacancy: Number(vacancyId),
      }),
    }
  );

  if (response.status != 201) {
    applyModal.querySelector(".modal-title").innerText =
      "Aplicação feita com sucesso!";
    applyModal.querySelector(
      ".modal-body"
    ).innerText = `Sua aplicação feita a vaga ${title} foi realizada!`;
    applyModalBootstrap.toggle();
    return;
  }

  if (response.status === 400) {
    applyModal.querySelector(".modal-title").innerText = "Error";
    applyModal.querySelector(
      ".modal-body"
    ).innerText = `Ocorreu um erro ao submeter sua aplicação!`;
    applyModalBootstrap.toggle();
    return;
  }
}

window.addEventListener("user", fillVacancies);
fillVacancies();
