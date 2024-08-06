# JobQuest
Trabalho para desenvolvimento de um sistema Web para a disciplina GAC-116 (Programaçâo Web)


# install
pip3 install djangorestframework
pip3 install --upgrade djangorestframework-simplejwt

# run
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py makemigrations users
python3 manage.py migrate users
python3 manage.py makemigrations portfolios
python3 manage.py migrate portfolios
python3 manage.py makemigrations vacancies
python3 manage.py migrate vacancies
python3 manage.py createsuperuser
python3 manage.py runserver 