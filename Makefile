API_CONTAINER := test-product-manager-api-1
DB_CONTAINER := test-product-manager-db-1

.PHONY: seed check-db up build shell-api prisma-generate test

seed: check-db
	docker exec -it $(DB_CONTAINER) /bin/bash -c "psql -U \$${POSTGRES_USER} -d \$${POSTGRES_DB} -f /seed.sql"

check-db:
	docker ps --filter "name=$(DB_CONTAINER)" --format "{{.Status}}" | grep "Up" || (echo "Container $(DB_CONTAINER) is not running" && exit 1)

up:
	docker-compose --env-file .env.local up

stop:
	docker-compose --env-file .env.local stop

build:
	docker-compose --env-file .env.local build

shell-api:
	docker exec -it $(API_CONTAINER) /bin/sh

prisma-generate:
	docker exec -it $(API_CONTAINER) /bin/sh -c "npx prisma generate"

test:
	docker exec -it $(API_CONTAINER) /bin/sh -c "yarn run test:watch"