# VPS Deployment Guide - SOC_Infra

## Prerequisites
- VPS with Ubuntu 20.04+ or similar Linux distribution
- Root or sudo access
- Domain pointing to your VPS IP
- Git installed on VPS

## Option 1: Automatic Deployment (Recommended)

```bash
# From your local machine:
chmod +x deploy.sh
./deploy.sh ubuntu 192.168.1.100
# Replace 'ubuntu' with your VPS username and IP with your VPS IP
```

## Option 2: Manual Deployment

### Step 1: SSH into your VPS
```bash
ssh username@your_vps_ip
```

### Step 2: Update System
```bash
sudo apt-get update
sudo apt-get upgrade -y
```

### Step 3: Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Step 4: Install Nginx
```bash
sudo apt-get install -y nginx
```

### Step 5: Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

### Step 6: Clone and Setup Application
```bash
sudo mkdir -p /var/www/relearn
sudo chown -R $USER:$USER /var/www/relearn
cd /var/www/relearn
git clone https://github.com/Cyberfreak567/SOC_Infra.git .
```

### Step 7: Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
npm run build
```

### Step 8: Setup Environment Variables
```bash
cd /var/www/relearn/backend
# Create .env file
nano .env
```

**Add these to .env:**
```
MONGO_URI=mongodb+srv://budhbawret_db_user:BMC5EAb5h44CxLjW@cluster0.tkluqmh.mongodb.net/mernapp?retryWrites=true&w=majority
JWT_SECRET=mySuperSecretKey123
PORT=5000
NODE_ENV=production
```

### Step 9: Configure Nginx
```bash
sudo cp /var/www/relearn/nginx.conf /etc/nginx/sites-available/relearn.org.in
sudo ln -sf /etc/nginx/sites-available/relearn.org.in /etc/nginx/sites-enabled/relearn.org.in
sudo rm -f /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Step 10: Start Backend with PM2
```bash
cd /var/www/relearn/backend
pm2 start server.js --name "soc-infra-backend" --env production
pm2 save
pm2 startup
```

### Step 11: Setup SSL (Optional but Recommended)
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d relearn.org.in
```

## Useful Commands

### View Backend Logs
```bash
pm2 logs soc-infra-backend
```

### Restart Backend
```bash
pm2 restart soc-infra-backend
```

### Check PM2 Status
```bash
pm2 status
```

### Restart Nginx
```bash
sudo systemctl restart nginx
```

### Check Nginx Status
```bash
sudo systemctl status nginx
```

## Firewall Setup
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

## Troubleshooting

### Backend not connecting
- Check PM2 logs: `pm2 logs`
- Verify MongoDB connection string in .env
- Check port 5000 is not blocked: `sudo ufw status`

### Nginx not serving frontend
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Verify build folder exists: `ls -la /var/www/relearn/frontend/build/`

### Domain not resolving
- Update DNS records to point to your VPS IP
- Wait for DNS propagation (can take 24 hours)
- Test with: `ping relearn.org.in`

## Deployment Complete! 🎉

Your application is now live at: **https://relearn.org.in**

Backend API: **https://relearn.org.in/api**
Frontend: **https://relearn.org.in**
