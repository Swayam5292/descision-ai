# Configuration
$PROJECT_ID="triple-brook-492505-p9"
$SERVICE_NAME="decision-ai-backend"
$REGION="us-central1"

Write-Host ">>> Starting deployment for $SERVICE_NAME..." -ForegroundColor Cyan

# Ensure we are in the backend directory
Set-Location backend

# Build the container image using Cloud Build
Write-Host ">>> Building container image..." -ForegroundColor Yellow
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME --project $PROJECT_ID

# Deploy to Cloud Run
Write-Host ">>> Deploying to Cloud Run..." -ForegroundColor Green
gcloud run deploy $SERVICE_NAME `
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME `
  --platform managed `
  --region $REGION `
  --allow-unauthenticated `
  --project $PROJECT_ID `
  --set-env-vars GOOGLE_API_KEY=AIzaSyBLQldx9_Fk8u_iivsyl31DO5nL3A-XcAE,PROJECT_ID=$PROJECT_ID

Write-Host ">>> Deployment complete!" -ForegroundColor Cyan
gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)' --project $PROJECT_ID
