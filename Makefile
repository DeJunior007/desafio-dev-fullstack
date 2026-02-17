.PHONY: up down logs build reset create-env

ENV_FILE=backend/.env

create-env:
	@if [ ! -f $(ENV_FILE) ]; then \
		echo "Criando backend/.env..."; \
		echo "DATABASE_URL=mysql://root:senha@mysql:3306/desafiobd" > $(ENV_FILE); \
		echo "FRONTEND_URL=http://localhost:3000" >> $(ENV_FILE); \
		echo "PORT=3333" >> $(ENV_FILE); \
		echo "MYSQL_ROOT_PASSWORD=senha" >> $(ENV_FILE); \
		echo "MYSQL_DATABASE=desafiobd" >> $(ENV_FILE); \
	else \
		echo "backend/.env já existe."; \
	fi

# Sobe tudo forçando o rebuild
build: create-env
	docker compose up -d --build

# Sobe tudo em background
up: create-env
	docker compose up -d

# Derruba tudo
down:
	docker compose down

# Logs
logs:
	docker compose logs -f

# Reset completo (apaga volume do banco)
reset:
	docker compose down -v
