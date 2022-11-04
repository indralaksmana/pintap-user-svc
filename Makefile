DOCKER_COMPOSE=docker-compose -f docker-compose.yml 

init-dev:
	rm -f .env
	@cp prisma/.env.example .env

start-dev:
	@echo "############################"
	@echo "####### User Service #######"
	@echo "############################"
	@echo
	@echo "Start dev..."
	@echo
	@make init-dev
	@$(DOCKER_COMPOSE) up -d database
	@echo "Wait for 10 seconds for database and es up and running properly"
	@sleep 10
	@serverless offline start --debug=*

build:
	@serverless package

migrate:
	@npx prisma migrate dev --name "init" --preview-feature