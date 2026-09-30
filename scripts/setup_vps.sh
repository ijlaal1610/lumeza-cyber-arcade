#!/usr/bin/env bash
# ==============================================================================
# LUMEZA CYBER-ARCADE // VPS DEPLOYMENT & SYNC SCRIPT
# Target: https://games.lumeza.in
# ==============================================================================
set -e

echo "🚀 [Lumeza Arcade] Starting automated deployment..."

# 1. Ensure target directory exists
sudo mkdir -p /var/www/games.lumeza.in

# 2. Sync portal frontend files
sudo cp -r portal/* /var/www/games.lumeza.in/
sudo chown -R ubuntu:www-data /var/www/games.lumeza.in
sudo chmod -R 775 /var/www/games.lumeza.in

# 3. Deploy Nginx Configuration
sudo cp nginx/games.lumeza.in.conf /etc/nginx/sites-available/games.lumeza.in
sudo ln -sf /etc/nginx/sites-available/games.lumeza.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

echo "✅ [Lumeza Arcade] Deployment & Nginx reload completed successfully!"
