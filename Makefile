build-frontend:
	docker build -t social-media-eval -f ./SocialMedia/Dockerfile . --no-cache

build-server:
	docker build -t social-media-eval-api -f ./SocialMediaServer/Dockerfile . --no-cache

run:
	docker-compose -f ./Docker/docker-compose.yaml --env-file ./.env up --remove-orphans

matomo:
	docker-compose -f ./Docker/docker-compose.matomo.yaml up --remove-orphans
