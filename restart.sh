#!/bin/bash

echo "🛑 Stopping and removing containers and volumes..."
sudo docker compose down

echo "🔨 Rebuilding and starting containers..."
sudo docker compose up --build
# 