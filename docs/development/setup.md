# Developer Setup Guide - eLandRegistry

Step-by-step developer guide to set up, configure, run, and test the **eLandRegistry** project locally.

---

## 🛠️ Step 1: Environment & Tooling Verification

Ensure you have the following installed on your developer machine:
- Node.js `v18+` (`node -v`)
- npm `v9+` (`npm -v`)
- Docker Desktop (`docker --version` & `docker-compose --version`)

---

## 📥 Step 2: Repository Setup & Environment Variables

```bash
# Clone repository
git clone https://github.com/your-org/elandregistry.git
cd elandregistry

# Copy root, backend, and frontend environment variables
cp .env.example .env
cp .env.example backend/.env
cp .env.example frontend/.env
```

---

## 📦 Step 3: Install Dependencies

```bash
# Install root, backend, and frontend npm packages
npm install
npm install --prefix backend
npm install --prefix frontend
```

---

## 🐳 Step 4: Launch PostgreSQL Database Container

```bash
# Start container in detached mode
docker-compose up -d

# Verify container health status
docker-compose ps
```

---

## 🗄️ Step 5: Prisma Database Migration

```bash
# Generate Prisma Client types
npm run prisma:generate

# Execute database migrations
npm run prisma:migrate
```

---

## 🚀 Step 6: Start Application Development Servers

```bash
# Run both Backend & Frontend in parallel from monorepo root
npm run dev
```

- **Frontend Application**: `http://localhost:3000`
- **Backend Healthcheck**: `http://localhost:5000/api/v1/healthcheck/`

---

## 🧪 Step 7: Testing & Verification

```bash
# Execute Jest + Supertest API unit test suite
npm run test

# Run ESLint across frontend and backend
npm run lint

# Format code with Prettier
npm run format
```
