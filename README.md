# JobQuest
Trabalho para desenvolvimento de um sistema Web para a disciplina GAC-116 (Programaçâo Web)

## Linguagens
- Python
- HTML/CSS
- JavaScript
- SQL

## Framework 
- Django - Backend
- Bootstrap - Frontend

## Instalação
- Faça o clone do repositorio
- Crie um ambiente virtual e ative-o
```bash
  python3 -m venv venv
  source venv/bin/activate
```
- Instale as dependências:
```bash
  pip install -r requirements.txt
```

## Dependências
As dependêcias do projetos incluem:
- Django
- Django Rest Framework (APIs)
- Django Rest Framework SimpleJWT (Auth)

## Configurações do Banco de dados e migrations

- Faça as migrations iniciais e crie as tabelas
```bash
  python3 manage.py makemigrations
  python3 manage.py migrate
```

- Faça as migrations para users, portfolios e vacancies
```bash
  python3 manage.py makemigrations users
  python3 manage.py migrate users

  python3 manage.py makemigrations portfolios
  python3 manage.py migrate portfolios
  
  python3 manage.py makemigrations vacancies
  python3 manage.py migrate vacancies
```

- Crie um Superusuario
```bash
  python3 manage.py createsuperuser
```

- Inicie o servidor
```bash
  python3 manage.py runserver
```

## Features
- Autenticação
- Cadastro de vagas
- Cadastro de portfolios
- Candidatura em vagas

## API Endpoints

#### User
```
  POST /api/user/register/
  GET /api/user/me/
  POST /api/user/login/
  GET /api/user/token/refresh/
  GET /api/user/token/verify/
```

#### Portfolios
```
  POST /api/portfolios/
  GET /api/portfolios/user/
  GET /api/portfolios/<int:pk>/
  PATCH /api/portfolios/<int:pk>/update/
  POST /api/portfolios/<int:portfolio_pk>/certificates/
  PATCH /api/portfolios/<int:portfolio_pk>/certificate/<int:pk>/update/
  POST /api/portfolios/<int:portfolio_pk>/skills/
  PATCH /api/portfolios/<int:portfolio_pk>/skill/<int:pk>/update/
  POST /api/portfolios/<int:portfolio_pk>/projects/
  PATCH /api/portfolios/<int:portfolio_pk>/project/<int:pk>/update/
```

#### Vacancies
```
  POST /api/vacancies/
  GET /api/vacancies/
  GET /api/vacancies/<int:pk>/
  POST /api/vacancies/<int:vacancy_pk>/benefits/
  POST /api/vacancies/<int:vacancy_pk>/responsibilities/
  POST /api/vacancies/<int:vacancy_pk>/requirements/
  POST /api/vacancies/<int:vacancy_pk>/applications/
  GET /api/vacancies/user/applications/
  GET /api/vacancies/with-applications/
```

#### Frontend
```
  GET /
  GET /login
  GET /register
  GET /perfil
  GET /cadastrar-vaga
  GET /aplicacoes
  GET /portfolios
  GET /editar-portfolio
```

- Home with company logged

- Home with normal user logged


## Autores
- [thiagof201014](https://github.com/thiagof201014)
- [felipecarvalhogodoi98](https://github.com/felipecarvalhogodoi98)
- [Layravbf](https://github.com/Layravbf)