async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    accessToken = await getNewAccessToken();
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

async function getPortfolio() {
  return fetchWithAuth("/api/portfolios/user");
}

function addCertificate({ description = "", id }) {
  const newCertificate = containerCertificates
    .querySelector(".certificate")
    .cloneNode(true);

  if (id) {
    newCertificate.setAttribute("certificate-id", id);
  } else {
    newCertificate.removeAttribute("certificate-id");
  }
  newCertificate.querySelector(".certificate-description").value = description;

  containerCertificates.append(newCertificate);
}

function addSkill({ description = "", id }) {
  const newSkill = containerSkills.querySelector(".skill").cloneNode(true);

  if (id) {
    newSkill.setAttribute("skill-id", id);
  } else {
    newSkill.removeAttribute("skill-id");
  }
  newSkill.querySelector(".skill-description").value = description;

  containerSkills.append(newSkill);
}

function addProject({ description = "", link_site = "", link_git = "", id }) {
  const newProject = containerProjects
    .querySelector(".project")
    .cloneNode(true);

  if (id) {
    newProject.setAttribute("project-id", id);
  } else {
    newProject.removeAttribute("project-id");
  }
  newProject.querySelector(".project-description").value = description;
  newProject.querySelector(".project-link").value = link_site;
  newProject.querySelector(".project-git").value = link_git;

  containerProjects.append(newProject);
}

async function displayEditPortfolio() {
  try {
    const [portfolio] = await getPortfolio();
    const form = document.querySelector("#edit-portfolio-form");

    form.setAttribute("portfolio-id", portfolio.id);
    form.querySelector("#description").value = portfolio.description;

    // Certificates
    containerCertificates
      .querySelector(".certificate")
      .setAttribute("certificate-id", portfolio.certificates[0].id);
    containerCertificates.querySelector(".certificate-description").value =
      portfolio.certificates[0].description;

    for (let i = 1; i < portfolio.certificates.length; i++) {
      addCertificate(portfolio.certificates[i]);
    }

    // Skills
    const containerSkills = form.querySelector("#skills");
    containerSkills
      .querySelector(".skill")
      .setAttribute("skill-id", portfolio.skills[0].id);
    containerSkills.querySelector(".skill-description").value =
      portfolio.skills[0].description;

    for (let i = 1; i < portfolio.skills.length; i++) {
      addSkill(portfolio.skills[i]);
    }

    // Projetos
    const containerProjects = form.querySelector("#projects");
    containerProjects
      .querySelector(".project")
      .setAttribute("project-id", portfolio.projects[0].id);
    containerProjects.querySelector(".project-description").value =
      portfolio.projects[0].description;
    containerProjects.querySelector(".project-link").value =
      portfolio.projects[0].link_site;
    containerProjects.querySelector(".project-git").value =
      portfolio.projects[0].link_git;

    for (let i = 1; i < portfolio.projects.length; i++) {
      addProject(portfolio.projects[i]);
    }
  } catch (error) {
    console.error("Error displaying portfolios:", error);
  }
}

async function submitForm(e) {
  e.preventDefault();

  form.classList.remove("was-validated");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    return;
  }

  const values = {};
  values.id = form.getAttribute("portfolio-id");
  values.description = description.value;

  values.certificates = Array.from(
    containerCertificates.querySelectorAll(".certificate")
  ).map((element) => ({
    id: element.getAttribute("certificate-id"),
    description: element.querySelector(".certificate-description").value,
  }));

  values.skills = Array.from(containerSkills.querySelectorAll(".skill")).map(
    (element) => ({
      id: element.getAttribute("skill-id"),
      description: element.querySelector(".skill-description").value,
    })
  );

  values.projects = Array.from(
    containerProjects.querySelectorAll(".project")
  ).map((element) => ({
    id: element.getAttribute("project-id"),
    description: element.querySelector(".project-description").value,
    link_site: element.querySelector(".project-link").value,
    link_git: element.querySelector(".project-git").value,
  }));

  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    accessToken = await getNewAccessToken();
  }

  try {
    let response = await fetch(`/api/portfolios/${values.id}/update/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        description: values.description,
      }),
    });

    if (response.ok) {
      const portfolio = await response.json();
      console.log(values);
      await Promise.all([
        // Criar
        ...values.certificates
          .filter((c) => !c.id)
          .map((c) =>
            fetch(`/api/portfolios/${values.id}/certificates/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
              },
              body: JSON.stringify(c),
            })
          ),
        ...values.skills
          .filter((s) => !s.id)
          .map((s) =>
            fetch(`/api/portfolios/${values.id}/skills/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
              },
              body: JSON.stringify(s),
            })
          ),
        ...values.projects
          .filter((p) => !p.id)
          .map((p) =>
            fetch(`/api/portfolios/${values.id}/projects/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
              },
              body: JSON.stringify(p),
            })
          ),
        // Update
        ...values.certificates
          .filter((p) => !!p.id)
          .map((p) =>
            fetch(`/api/portfolios/${values.id}/certificate/${p.id}/update/`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
              },
              body: JSON.stringify(p),
            })
          ),
        ...values.skills
          .filter((s) => !!s.id)
          .map((s) =>
            fetch(`/api/portfolios/${values.id}/skill/${s.id}/update/`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
              },
              body: JSON.stringify(s),
            })
          ),
        ...values.projects
          .filter((p) => !!p.id)
          .map((p) =>
            fetch(`/api/portfolios/${values.id}/project/${p.id}/update/`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
              },
              body: JSON.stringify(p),
            })
          ),
      ]);

      editPortfolioModal.querySelector(".modal-title").innerText =
        "Portfolio atualizado!";
      editPortfolioModal.querySelector(
        ".modal-body"
      ).innerText = `Seu portfolio foi atualizado com sucesso!`;
      editPortfolioModalBootstrap.toggle();

      editPortfolioModal.addEventListener("hidden.bs.modal", function (event) {
        window.location.reload();
      });
    } else {
      const errorData = await response.json();

      editPortfolioModal.querySelector(".modal-title").innerText = "Erro!";
      editPortfolioModal.querySelector(
        ".modal-body"
      ).innerText = `Ocorreu um erro ao atualizar seu portfolio!`;
      editPortfolioModalBootstrap.toggle();
    }
  } catch (error) {
    console.error("Erro ao atualizar portfolio:", error);
  }
}

const form = document.querySelector("#edit-portfolio-form");
const description = form.querySelector("#description");
const containerCertificates = form.querySelector("#certificates");
const containerSkills = form.querySelector("#skills");
const containerProjects = form.querySelector("#projects");

const editPortfolioModal = document.getElementById("edit-portfolio-modal");
const editPortfolioModalBootstrap = new bootstrap.Modal(editPortfolioModal);

document.addEventListener("DOMContentLoaded", () => {
  displayEditPortfolio();

  document
    .querySelector(".add-certificate")
    .addEventListener("click", addCertificate);
  document.querySelector(".add-skill").addEventListener("click", addSkill);
  document.querySelector(".add-project").addEventListener("click", addProject);

  form
    .querySelector("button[type=submit]")
    .addEventListener("click", (e) => submitForm(e));
});
