#!/bin/bash

# CodeSnip Quick Setup Script
# This script automates the initial setup process

echo "🚀 CodeSnip - Quick Setup Script"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}❌ Node.js is not installed!${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✓ Node.js found:${NC} $(node --version)"
echo ""

# Backend Setup
echo -e "${BLUE}📦 Setting up Backend...${NC}"
cd backend

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please update backend/.env with your database URL and secrets!${NC}"
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

# Check if DATABASE_URL is set
if grep -q "postgresql://username:password@localhost" .env; then
    echo -e "${YELLOW}⚠️  DATABASE_URL not configured! Please update backend/.env${NC}"
    echo ""
    echo "Steps to configure:"
    echo "1. Create PostgreSQL database: createdb codesnip"
    echo "2. Update DATABASE_URL in backend/.env"
    echo "3. Run: npx prisma migrate dev"
    echo ""
    read -p "Press enter when done..."
fi

# Run migrations
echo "Running database migrations..."
npx prisma migrate dev --name init || {
    echo -e "${YELLOW}⚠️  Migration failed. Make sure DATABASE_URL is correct.${NC}"
}

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

echo -e "${GREEN}✓ Backend setup complete!${NC}"
echo ""

# Frontend Setup
echo -e "${BLUE}📦 Setting up Frontend...${NC}"
cd ../frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo -e "${GREEN}✓ Frontend .env created${NC}"
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

echo -e "${GREEN}✓ Frontend setup complete!${NC}"
echo ""

# Done
echo "================================"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Start backend:  cd backend && npm run dev"
echo "2. Start frontend: cd frontend && npm start"
echo ""
echo "📚 Documentation:"
echo "   - README.md - Project overview"
echo "   - IMPLEMENTATION_GUIDE.md - Development guide"
echo "   - DEPLOYMENT_GUIDE.md - Deployment instructions"
echo ""
echo "🎉 Happy coding!"
