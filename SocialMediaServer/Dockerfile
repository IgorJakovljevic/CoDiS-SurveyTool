FROM python:3.9
RUN pip install fastapi uvicorn
EXPOSE 80
COPY ./SocialMediaServer/smapi /smapi
COPY ./SocialMediaServer/.env /
COPY ./SocialMediaServer/Pipfile /
COPY ./SocialMediaServer/Pipfile.lock /
RUN pip install pipenv
RUN pipenv install

COPY ./SocialMediaServer/alembic /alembic
COPY ./SocialMediaServer/alembic.ini /
COPY ./SocialMediaServer/migrate.sh /
RUN ["chmod", "777", "migrate.sh"]
CMD "./migrate.sh"
# CMD ["pipenv", "run", "uvicorn", "smapi:app", "--host", "0.0.0.0", "--port", "80"]
