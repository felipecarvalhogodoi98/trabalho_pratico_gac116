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

async function getPortfolios() {
  return fetchWithAuth("/api/portfolios/");
}

function createPortfolioCard(portfolio, currentUser) {
  const card = document.createElement("div");
  card.classList.add("card", "mb-3");
  card.style.minWidth = "270px";
  console.log(portfolio);
  card.innerHTML = `
    <div class="card-body position-relative" style="padding-right: 80px">
      <h5 class="card-title">
        <img src="${portfolio.user.avatar}" alt="Avatar" class="avatar me-2">
        ${portfolio.user.name}
      </h5>
      <p class="card-text">${portfolio.description}</p>
      <h6>Certificados</h6>
      <ul class="list-group list-group-flush">
        ${portfolio.certificates
          .map((cert) => `<li class="list-group-item">${cert.description}</li>`)
          .join("")}
      </ul>
      <h6>Skills</h6>
      <ul class="list-group list-group-flush">
        ${portfolio.skills
          .map(
            (skill) => `<li class="list-group-item">${skill.description}</li>`
          )
          .join("")}
      </ul>
      <h6>Projetos</h6>
      <ul class="list-group list-group-flush">
        ${portfolio.projects
          .map(
            (project) =>
              `<li class="list-group-item">
                <a href="${project.link_site}" class="text-light">${project.description}</a>
                <span class="mx-2">·</span>
                <a href="${project.link_git}" class="text-light">Git</a>
              </li>`
          )
          .join("")}
      </ul>

      ${
        currentUser
          ? `<a href="editar-portfolio" class="btn btn-primary position-absolute" style="bottom: 16px; right: 16px;">Editar</a>`
          : ""
      }
    </div>
  `;

  return card;
}

async function displayPortfolios() {
  try {
    const portfolios = await getPortfolios();
    const container = document.querySelector(".portfolios-container");

    portfolios.forEach((portfolio) => {
      const currentUser = getUser().id === portfolio.user.id;
      const card = createPortfolioCard(portfolio, currentUser);

      currentUser ? container.prepend(card) : container.append(card);
    });
  } catch (error) {
    console.error("Error displaying portfolios:", error);
  }
}

document.addEventListener("DOMContentLoaded", displayPortfolios);
