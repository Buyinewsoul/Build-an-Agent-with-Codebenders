# Deployment Guide

## 🚀 Deploying ContentPulse Bedrock

This guide covers deployment options for production environments.

## Option 1: AWS (Recommended)

### Backend on AWS Lambda + API Gateway

```bash
# 1. Install serverless
npm install -g serverless

# 2. Configure serverless
serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET

# 3. Create serverless.yml in backend/
# Deploy
serverless deploy
```

### Backend on EC2

```bash
# 1. SSH into EC2 instance
ssh -i key.pem ubuntu@your-instance

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clone and setup
git clone your-repo
cd ContentPulse-Bedrock/backend
npm install

# 4. Create .env with credentials
nano .env

# 5. Run with PM2
npm install -g pm2
pm2 start src/server.js --name "contentpulse"
pm2 startup
pm2 save
```

### Frontend on S3 + CloudFront

```bash
# 1. Build frontend
cd frontend
npm run build

# 2. Upload to S3
aws s3 sync build/ s3://your-bucket-name/

# 3. Create CloudFront distribution
# - Origin: your S3 bucket
# - Default Root Object: index.html
# - Error Pages: 404 -> index.html (for SPA routing)

# 4. Update REACT_APP_API_URL to point to your API
```

## Option 2: Vercel (Frontend) + Heroku (Backend)

### Frontend on Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy frontend
cd frontend
vercel

# 3. Add environment variables in Vercel dashboard
REACT_APP_API_URL=https://your-backend.herokuapp.com
```

### Backend on Heroku

```bash
# 1. Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# 2. Create Heroku app
heroku create contentpulse-api

# 3. Set environment variables
heroku config:set AWS_REGION=us-east-1
heroku config:set AWS_ACCESS_KEY_ID=your_key
heroku config:set AWS_SECRET_ACCESS_KEY=your_secret
heroku config:set NODE_ENV=production

# 4. Deploy
git push heroku main
```

## Option 3: Docker Deployment

### Docker Setup

```bash
# Create Dockerfile for backend
cat > backend/Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
EXPOSE 5000
CMD ["npm", "start"]
EOF

# Create Dockerfile for frontend
cat > frontend/Dockerfile << 'EOF'
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Docker Compose
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - AWS_REGION=us-east-1
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - NODE_ENV=production

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    environment:
      - REACT_APP_API_URL=http://localhost:5000
    depends_on:
      - backend
EOF

# Run
docker-compose up
```

## Option 4: DigitalOcean App Platform

```bash
# 1. Push code to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/user/repo
git push -u origin main

# 2. Create app.yaml in root
cat > app.yaml << 'EOF'
name: contentpulse

services:
- name: backend
  github:
    repo: user/repo
    branch: main
  source_dir: backend
  build_command: npm install
  run_command: npm start
  env:
    - key: AWS_REGION
      value: us-east-1
    - key: NODE_ENV
      value: production

- name: frontend
  github:
    repo: user/repo
    branch: main
  source_dir: frontend
  build_command: npm install && npm run build
  http_port: 3000
  env:
    - key: REACT_APP_API_URL
      value: ${backend.APP_DOMAIN}
EOF

# 3. Deploy via DigitalOcean dashboard
```

## Pre-Deployment Checklist

- [ ] All AWS credentials configured
- [ ] Environment variables set
- [ ] Database migrations (if applicable)
- [ ] SSL certificates configured
- [ ] API rate limiting enabled
- [ ] CORS properly configured
- [ ] Error logging enabled
- [ ] Database backups configured
- [ ] CDN configured (optional)
- [ ] Monitoring setup (CloudWatch, DataDog, etc.)

## Post-Deployment Verification

### 1. Backend Health
```bash
curl https://your-api.com/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Frontend Access
```
https://your-frontend.com
```

Should load dashboard without errors.

### 3. API Connectivity
```bash
# Test from frontend console
fetch('https://your-api.com/analytics/data')
  .then(r => r.json())
  .then(console.log)
```

## Performance Optimization

### Backend
- Enable gzip compression
- Configure caching headers
- Use CDN for static assets
- Enable database query optimization

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle size analysis

```bash
# Analyze bundle size
npm run build --analyze
```

## Monitoring & Logging

### AWS CloudWatch
```bash
# View logs
aws logs tail /aws/lambda/contentpulse --follow
```

### Error Tracking (Sentry)
```javascript
// Add to backend/src/server.js
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: process.env.SENTRY_DSN });
app.use(Sentry.Handlers.errorHandler());
```

### Application Performance Monitoring
- Use DataDog, New Relic, or Dynatrace
- Monitor response times
- Track error rates
- Monitor resource usage

## Scaling

### Horizontal Scaling
- Backend: Use load balancer (AWS ALB, nginx)
- Frontend: Use CDN (CloudFront, CloudFlare)
- Database: Use read replicas

### Caching Strategy
- Frontend: Browser cache, service workers
- Backend: Redis for API responses
- CDN: Cache static assets

## Security Checklist

- [ ] SSL/TLS enabled
- [ ] AWS credentials in Secrets Manager
- [ ] Input validation enabled
- [ ] CSRF protection enabled
- [ ] Rate limiting configured
- [ ] SQL injection prevention (if using DB)
- [ ] XSS protection enabled
- [ ] Security headers configured
- [ ] CORS properly restricted
- [ ] Regular security audits

## Disaster Recovery

### Backup Strategy
```bash
# Database backups (if applicable)
aws rds create-db-snapshot \
  --db-instance-identifier contentpulse-db \
  --db-snapshot-identifier contentpulse-backup-$(date +%Y%m%d)
```

### Automated Deployments
```bash
# GitHub Actions example
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: |
          # Your deployment commands
```

## Rollback Procedure

If deployment fails:

```bash
# AWS Lambda
aws lambda update-function-code \
  --function-name contentpulse \
  --s3-bucket my-bucket \
  --s3-key previous-version.zip

# EC2 with Git
git revert HEAD
git push production
pm2 restart contentpulse
```

## Cost Optimization

### AWS Cost Reduction
- Use Lambda for minimal traffic
- Use Reserved Instances for consistent traffic
- Enable auto-scaling
- Use S3 for static assets
- Configure lifecycle policies for logs

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Review and optimize database queries
- Monitor performance metrics
- Test disaster recovery procedures
- Review security logs
- Update SSL certificates

### Scheduled Maintenance Window
```
Maintenance: 2 AM - 4 AM UTC
Frequency: Monthly
Notification: 24 hours in advance
```

---

**Your application is now production-ready!** 🚀

For questions, refer to the main README.md or contact support.
