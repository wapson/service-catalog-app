GO_BUILD_ENV := CGO_ENABLED=0 GOOS=linux GOARCH=amd64
GOCMD=go
GOTEST=$(GOCMD) test
GOVET=$(GOCMD) vet
BINARY_NAME=service-catalog
BINARY_DIR=bin
VERSION?=0.0.0
SERVICE_PORT?=8000
DOCKER_REGISTRY?= #if set it should finished by /
EXPORT_RESULT?=false # for CI please set EXPORT_RESULT to true

GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
CYAN   := $(shell tput -Txterm setaf 6)
RESET  := $(shell tput -Txterm sgr0)


full: clean go-tidy build run ## full cycle of local build Go server

## Build:
build: ## Build your project and put the output binary in bin/
	mkdir -p $(BINARY_DIR)
	$(GO_BUILD_ENV) GO111MODULE=on $(GOCMD) build -mod vendor -o $(BINARY_DIR)/$(BINARY_NAME) cmd/main.go

run:
	./$(BINARY_DIR)/$(BINARY_NAME)

go-tidy:
	$(GOCMD) mod tidy
	$(GOCMD) mod vendor

clean: ## Remove build related file
	rm -fr ./bin
	rm -fr ./out
	rm -f ./junit-report.xml checkstyle-report.xml ./coverage.xml ./profile.cov yamllint-checkstyle.xml
