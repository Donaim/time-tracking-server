
dev:
	rm -rf dist
	DB_SCHEMA=task_db \
	DB_USER=task_user \
	DB_HOST=localhost \
	DB_PORT=5432 \
	npm run start:dev

docker-build:
	sudo docker build -t time-tracking-server .

docker-test: docker-build
	sudo docker run -it -p 3000:3000 time-tracking-server

docker-compose: docker-build
	sudo docker-compose up

docker-test: docker-build
	sudo docker-compose run time-tracking-server npm run test:e2e

PG_DIR = /tmp/postgres-time-sharing-db

postgres-run: postgres-start
	psql -D $(PG_DIR)  --dbname=task_db --username=task_user || true
	$(MAKE) postgres-stop

postgres-stop:
	pg_ctl -D $(PG_DIR) stop
	rm -rf $(PG_DIR)

postgres-start: $(PG_DIR)

$(PG_DIR):
	initdb -D $@
	pg_ctl -D $@ -l /tmp/postgres-log -o "-k /tmp" start & disown
	sleep 5
	echo 'CREATE USER task_user' | psql -d template1
	createdb --owner=task_user --no-password task_db

test-e2e: postgres-start
	DB_SCHEMA=task_db \
	DB_USER=task_user \
	DB_HOST=localhost \
	DB_PORT=5432 \
	npm run test:e2e
	$(MAKE) postgres-stop
