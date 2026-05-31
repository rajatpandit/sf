#!/bin/bash

echo "======================================"
echo "    Synth Forge (sf) Installer"
echo "======================================"

# 1. Install Node Dependencies
echo "[1/4] Installing dependencies..."
npm install commander dotenv yaml

# 2. Setup Global Registry
echo "[2/4] Setting up ~/.agent-system/..."
mkdir -p ~/.agent-system/versions/v0.0.1
cp -R system-template/* ~/.agent-system/versions/v0.0.1/
ln -s ~/.agent-system/versions/v0.0.1 ~/.agent-system/current
# Map directories for easy access
cp -R system-template/playbooks ~/.agent-system/
cp -R system-template/config ~/.agent-system/
cp -R system-template/roles ~/.agent-system/
cp -R system-template/skills ~/.agent-system/

# 3. Setup Binary
echo "[3/4] Linking binary..."
chmod +x bin/sf.js
npm link

echo "[4/4] Complete!"
echo ""
echo "🚀 Welcome to Synth Forge."
echo "To get started in a new repository, run:"
echo "  sf project-init"
echo "Then start the pipeline:"
echo "  sf run"
echo "======================================"
