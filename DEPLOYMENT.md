# Docker Configuration for ContentPulse

## Development

### Build
```bash
docker-compose up -d --build
```

### Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Stop
```bash
docker-compose down
```

## Production Deployment

### AWS ECS Deployment

1. **Push Docker images to ECR:**
   ```bash
   aws ecr create-repository --repository-name contentpulse-backend
   aws ecr create-repository --repository-name contentpulse-frontend
   docker tag contentpulse-backend:latest [ACCOUNT].dkr.ecr.[REGION].amazonaws.com/contentpulse-backend:latest
   docker tag contentpulse-frontend:latest [ACCOUNT].dkr.ecr.[REGION].amazonaws.com/contentpulse-frontend:latest
   docker push [ACCOUNT].dkr.ecr.[REGION].amazonaws.com/contentpulse-backend:latest
   docker push [ACCOUNT].dkr.ecr.[REGION].amazonaws.com/contentpulse-frontend:latest
   ```

2. **Create ECS Task Definitions** with:
   - Backend service on port 3001
   - Frontend service on port 3000
   - Environment variables from .env
   - IAM role with Bedrock permissions

3. **Configure ALB** for load balancing and HTTPS

### Vercel Frontend Deployment

```bash
vercel --prod
```

Requires:
- REACT_APP_API_URL environment variable

### AWS Lambda Backend

Create lambda function with Node.js 18 runtime:
```bash
sam deploy --guided
```

## Environment Variables for Production

```
AWS_REGION=us-east-1
CLAUDE_MODEL=claude-3-5-sonnet-20241022
LLAMA_MODEL=llama3.1-8b-instruct
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```
