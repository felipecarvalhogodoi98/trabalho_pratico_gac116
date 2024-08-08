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

async function getUserApplications() {
  return fetchWithAuth("/api/vacancies/user/applications/");
}

async function getCompanyApplications() {
  return fetchWithAuth("/api/vacancies/with-applications/");
}

function createUserApplicationCard(application) {
  const applicationElement = document.createElement("div");
  applicationElement.classList.add("application-item", "card", "mb-3", "p-0");

  applicationElement.innerHTML = `
    <div class="card-body p-0">
      <h5 class="card-header d-flex gap-3 justify-content-between align-items-center">
        <p class="title mb-0">${application.vacancy.title}</p>
        <div>
          <span class="username text-light me-3">${
            application.vacancy.user.name
          }</span>
          <img src="${
            application.vacancy.user.avatar
          }" alt="Avatar" class="avatar">
        </div>
      </h5>
      <div class="p-3">
        <p class="card-text">${application.vacancy.description}</p>
        <p class="card-text"><small class="text-muted">Aplicado em: ${new Date(
          application.created_at
        ).toLocaleDateString()}</small></p>
      </div>
    </div>
  `;

  return applicationElement;
}

function createCompanyApplicationCard(application) {
  const applicationElement = document.createElement("div");
  applicationElement.classList.add("application-item", "card", "mb-3", "p-0");

  applicationElement.innerHTML = `
    <div class="card-body p-0">
      <h5 class="card-header d-flex gap-3 justify-content-between align-items-center">
        <p class="title mb-0">${application.title}</p>
      </h5>
      <div class="p-3">
        <p class="card-text">${application.description}</p>
        
        ${
          application.applications.length
            ? application.applications
                .map((ap) => {
                  return `
            <div class="card p-2 mb-2">
              <div class="d-flex justify-content-between">
                <span class="username text-light me-3">${
                  ap.applicant_name
                }</span>
                <span class="email text-light me-3">${ap.applicant_email}</span>
                <p class="card-text"><small class="text-muted">Aplicado em: ${new Date(
                  ap.created_at
                ).toLocaleDateString()}</small></p>
              </div>
            </div>
          `;
                })
                .join("")
            : "Nenhuma aplicação"
        }
        </div>
      </div>
    </div>
  `;

  return applicationElement;
}

async function displayUserApplications(getApplications) {
  const applicationsContainer = document.querySelector(
    ".applications-container"
  );
  applicationsContainer.innerHTML = "";

  try {
    const applications = await getApplications();

    if (applications.length == 0) {
      applicationsContainer.innerText = "Nenhuma aplicação";
    }

    applications.forEach((application) => {
      const applicationElement = createUserApplicationCard(application);
      applicationsContainer.appendChild(applicationElement);
    });
  } catch (error) {
    alert("Erro ao buscar aplicações.");
  }
}

async function displayCompanyApplications(getApplications) {
  const applicationsContainer = document.querySelector(
    ".applications-container"
  );
  applicationsContainer.innerHTML = "";

  try {
    const applications = await getApplications();

    if (applications.length == 0) {
      applicationsContainer.innerText = "Nenhuma vaga cadastrada";
    }

    applications.forEach((application) => {
      const applicationElement = createCompanyApplicationCard(application);
      applicationsContainer.appendChild(applicationElement);
    });
  } catch (error) {
    alert("Erro ao buscar aplicações.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isCompany = getUser().user_type == "company";

  if (isCompany) {
    displayCompanyApplications(getCompanyApplications);
  } else {
    displayUserApplications(getUserApplications);
  }
});
