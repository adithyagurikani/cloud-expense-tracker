# Setup Guide: Docker & AWS

This guide explains how to run the Cloud Expense Tracker locally using Docker and how to deploy it to AWS.

## Prerequisites

1.  **Docker Desktop**: Installed and running.
2.  **AWS CLI**: Installed and configured (`aws configure`).
3.  **AWS SAM CLI**: Installed (for backend local development and deployment).
4.  **Node.js**: (Optional if using Docker, but good for local dev).

## Local Development with Docker

We use Docker Compose to run the Frontend and a local DynamoDB instance. The Backend (Lambda) is run using `sam local` which also utilizes Docker.

### 1. Start Support Services (Frontend + DB)

Run the following command in the root directory:

```bash
docker-compose up --build
```

- **Frontend**: Accessible at http://localhost:80
- **DynamoDB Local**: Running on port 8000

### 2. Run the Backend (API)

Open a new terminal, navigate to the backend directory, and start the local server:

```bash
cd frontend/backend
# Install dependencies
npm install express cors

# Start the local server (bypasses Docker networking issues)
$env:DYNAMODB_ENDPOINT="http://localhost:8000"; $env:TABLE_NAME="Expenses"; node server.js
```

*Note: You may need to create an `env.json` to point `TABLE_NAME` and endpoint URL to the local DynamoDB container if your Lambda code supports it. For simple testing, `sam local start-api` runs the functions in containers.*

## AWS Deployment

### 1. Backend (AWS SAM)

```bash
cd frontend/backend
sam build
sam deploy --guided
```

Follow the prompts to deploy the Stack (Lambda + DynamoDB + API Gateway). Note the **API Gateway Endpoint URL** from the output.

### 2. Frontend

1.  Update the frontend API URL to point to the deployed backend.
    - Set `VITE_API_URL` in your `.env` or build environment.
2.  Build and deploy the frontend (e.g., to S3+CloudFront, or manual S3 upload).

```bash
cd frontend
npm run build
# Upload 'dist' folder to your hosting solution
```
