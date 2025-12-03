# MyApp - Full Stack Application

## Quick Start for Users

### Option 1: Use Live Demo
Visit: [Your deployed app URL will be here]

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/KavyaSH02/myapp.git
cd myapp

# Install and run backend
cd backend
npm install
npm start

# Install and run frontend (new terminal)
cd web-frontend
npm install
npm start
```

## Deployment Options

### 1. Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub account
3. Import the repository: `KavyaSH02/myapp`
4. Deploy automatically

### 2. Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect GitHub and select this repository
3. Build command: `cd web-frontend && npm run build`
4. Publish directory: `web-frontend/build`

### 3. Railway
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Deploy both backend and frontend services

## Environment Variables
Set these in your deployment platform:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `PORT`: 5000 (for backend)