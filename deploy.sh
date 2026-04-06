#!/bin/bash

# Configuration
PROJECT_ID="triple-brook-492505-p9"
SERVICE_NAME="decision-ai-backend"
REGION="us-central1"

echo "🚀 Starting deployment for $SERVICE_NAME..."

# Ensure we are in the backend directory
cd backend

# Build the container image using Cloud Build
echo "📦 Building container image..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

# Deploy to Cloud Run
echo "🌍 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars GOOGLE_API_KEY=AIzaSyBLQldx9_Fk8u_iivsyl31DO5nL3A-XcAE,PROJECT_ID=$PROJECT_ID

echo "✅ Deployment complete!"
gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)'
