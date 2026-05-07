#!/bin/bash
# Exit on any error
set -e

echo "🚀 Starting FORGE System Update..."

# 1. NAVIGATE TO PROJECT
# Ensures we are in the correct directory
# Note: This path might need to be adjusted depending on where you run the script
# mkdir -p /home/rodlife1314/forge-system
# cd /home/rodlife1314/forge-system

# 2. PULL LATEST SPECS
# Grabs your newest weights and measures from GitHub
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# 3. AUTHENTICATE REGISTRY
# Tells Docker it's okay to talk to Google Cloud
echo "🔑 Authenticating with Artifact Registry..."
gcloud auth configure-docker europe-west2-docker.pkg.dev --quiet

# 4. BUILD & PUSH IMAGE
# Uses Cloud Build to turn your code into a container
echo "🏗️ Building and Pushing new FORGE image..."
gcloud builds submit . \
  --tag europe-west2-docker.pkg.dev/gen-lang-client-0916467533/cloud-run-source-deploy/forge-system:latest

# 5. DEPLOY TO CLOUD RUN (Operator Mode)
# Deploys the new code and locks in our performance tuning
echo "🚢 Deploying to Cloud Run with Operator Settings..."
gcloud run deploy rodz-2026-galyons-fellini-master-bible-v2-7-1 \
  --image europe-west2-docker.pkg.dev/gen-lang-client-0916467533/cloud-run-source-deploy/forge-system:latest \
  --region europe-west2 \
  --concurrency 60 \
  --min-instances 1 \
  --max-instances 12 \
  --platform managed

echo "✅ FORGE System is now Live and Optimized!"
