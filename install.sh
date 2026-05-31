#!/bin/bash

echo "======================================"
echo "    Synth Forge (sf) Installer"
echo "======================================"

# 1. Install Node Dependencies
echo "[1/4] Installing dependencies..."
npm install commander dotenv yaml

# 2. Setup Global Registry
echo "[2/4] Setting up ~/.agent-system/..."
# Cleanup previous installations to prevent conflicts
rm -rf ~/.agent-system/versions/v0.0.1
rm -f ~/.agent-system/current
rm -rf ~/.agent-system/playbooks ~/.agent-system/config ~/.agent-system/roles ~/.agent-system/skills

mkdir -p ~/.agent-system/versions/v0.0.1
cp -R system-template/* ~/.agent-system/versions/v0.0.1/
ln -sf ~/.agent-system/versions/v0.0.1 ~/.agent-system/current

# Map directories for easy access
cp -R system-template/playbooks ~/.agent-system/
cp -R system-template/config ~/.agent-system/
cp -R system-template/roles ~/.agent-system/
cp -R system-template/skills ~/.agent-system/

# 3. Setup Binary and PATH
echo "[3/4] Linking binary and updating PATH..."
chmod +x bin/sf.js

# Use npm link to make it globally available, but also ensure shell alias/PATH
npm link

# Automatically append alias to shell profiles if not already present
if [[ "$SHELL" == *"zsh"* ]]; then
  PROFILE_FILE="$HOME/.zshrc"
elif [[ "$SHELL" == *"bash"* ]]; then
  PROFILE_FILE="$HOME/.bashrc"
else
  PROFILE_FILE="$HOME/.profile"
fi

if ! grep -q "alias sf=" "$PROFILE_FILE"; then
  echo "alias sf='$(pwd)/bin/sf.js'" >> "$PROFILE_FILE"
  echo "Added 'sf' alias to $PROFILE_FILE"
fi

echo "[4/4] Complete!"
echo ""
echo "🚀 Welcome to Synth Forge."
echo "Please restart your terminal or run: source $PROFILE_FILE"
echo ""
echo "To get started in a new repository, run:"
echo "  sf project-init"
echo "Then start the pipeline:"
echo "  sf run"
echo "======================================"
