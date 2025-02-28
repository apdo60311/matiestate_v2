#!/bin/bash

check_docker() {
    if ! docker info >/dev/null 2>&1; then
        echo "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

docker_compose_up() {
    echo "Starting Docker compose services"
    docker-compose up 
}

docker_compose_down() {
    echo "Stopping Docker compose services"
    docker-compose down -v
}

check_docker

if [ "$1" == "start" ]; then
    docker_compose_down
    docker_compose_up
else
    echo "Usage: $0 [up|down]"
    exit 1
fi