#!/bin/bash

# SOC_Infra VPS Deployment Script
# Run this on your VPS to deploy the application

set -e

echo "=========================================="
echo "SOC_Infra VPS Deployment Script"
echo "=========================================="

# Variables
VPS_USER=$1
VPS_IP=$2
APP_PATH="/var/www/relearn"
DOMAIN="relearn.org.in"

if [ -z "$VPS_USER" ] || [ -z "$VPS_IP" ]; then
    echo "Usage: ./deploy.sh <vps_user> <vps_ip>"
    echo "Example: ./deploy.sh ubuntu 192.168.1.100"
    exit 1
fi

echo "VPS User: $VPS_USER"
echo "VPS IP: $VPS_IP"
echo "App Path: $APP_PATH"

# Step 1: SSH into VPS and clone repository
echo "Cloning repository on VPS..."
ssh $VPS_USER@$VPS_IP << 'EOF'
    # Update system
    sudo apt-get update
    sudo apt-get upgrade -y

    # Install Node.js
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs

    # Install Nginx
    sudo apt-get install -y nginx

    # Install PM2 for process management
    sudo npm install -g pm2

    # Create app directory
    sudo mkdir -p /var/www/relearn
    sudo chown -R $USER:$USER /var/www/relearn
    cd /var/www/relearn

    # Clone the repository
    git clone https://github.com/Cyberfreak567/SOC_Infra.git .

    # Install dependencies
    cd /var/www/relearn/backend
    npm install

    cd /var/www/relearn/frontend
    npm install
    npm run build

    echo "=========================================="
    echo "Installation Complete!"
    echo "=========================================="
EOF

# Step 2: Copy Nginx config
echo "Configuring Nginx..."
ssh $VPS_USER@$VPS_IP << EOF
    sudo cp /var/www/relearn/nginx.conf /etc/nginx/sites-available/$DOMAIN
    sudo ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/$DOMAIN
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Test Nginx configuration
    sudo nginx -t
    
    # Restart Nginx
    sudo systemctl restart nginx
    sudo systemctl enable nginx
EOF

# Step 3: Start backend with PM2
echo "Starting backend with PM2..."
ssh $VPS_USER@$VPS_IP << EOF
    cd /var/www/relearn/backend
    pm2 start server.js --name "soc-infra-backend" --env production
    pm2 save
    pm2 startup
EOF

echo ""
echo "=========================================="
echo "✅ Deployment Complete!"
echo "=========================================="
echo ""
echo "Your app is live at: http://$DOMAIN"
echo ""
echo "Next steps:"
echo "1. Update your DNS records to point to your VPS IP"
echo "2. (Optional) Setup SSL certificate:"
echo "   sudo certbot --nginx -d $DOMAIN"
echo "3. SSH into VPS: ssh $VPS_USER@$VPS_IP"
echo "4. Monitor backend: pm2 logs"
echo ""
