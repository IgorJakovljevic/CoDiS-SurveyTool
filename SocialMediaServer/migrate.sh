pipenv run alembic upgrade head
pipenv run uvicorn smapi:app --host 0.0.0.0 --port 80
