###########################################################################
## Makefile
## @author: Devi Indra Laksmana <laksmana.d.indra@gmail.com>
## @since: 2022.11.04
###########################################################################

DOCKER_COMPOSE=docker-compose -f docker-compose.yml 

## Environment File Preperation
init-dev:
	rm -f .env
	@cp src/configs/.env.example .env

## Start DB Only
start-db:
	@echo "############################"
	@echo "####### User Service #######"
	@echo "############################"
	@echo
	@echo "Start DB..."
	@echo
	@make init-dev
	@$(DOCKER_COMPOSE) up -d database
	@echo "Wait for 10 seconds for database and es up and running properly"
	@sleep 10

## Start API
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

## Stop API
stop-dev:
	@$(DOCKER_COMPOSE) stop

down-dev: stop-dev
	@$(DOCKER_COMPOSE) down --remove-orphans

## Database Migration
migrate:
	@yarm prisma migrate dev --name "init" --preview-feature

## Test Local Invoke
invoke-auth-login:
	@serverless invoke local --function login --path src/test/testdata/auth_login.json

invoke-get-user:
	@serverless invoke local --function getUser --path src/test/testdata/get_user.json

invoke-get-all-users:
	@serverless invoke local --function getAllUsers --path src/test/testdata/get_all_users.json

invoke-create-user:
	@serverless invoke local --function createUser --path src/test/testdata/create_user.json

invoke-update-user:
	@serverless invoke local --function updateUser --path src/test/testdata/update_user.json

invoke-delete-user:
	@serverless invoke local --function deleteUser --path src/test/testdata/delete_user.json