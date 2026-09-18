# eLandRegistry

> Securing Land Registration Using Blockchain - Bihar Land Records & Mutation Platform

`eLandRegistry` is a permissioned-blockchain-based land registration and mutation platform designed for Bihar land records. It supports three distinct user roles:
1. **Buyer / Seller (Citizen)**
2. **Registration Officer (LRO)**
3. **Government Admin**

---

## 🏗️ Architecture Overview

The system follows a scalable monorepo architecture:

- **Frontend**: React + Vite + TypeScript + React Router + Axios
- **Backend**: Node.js + Express.js + TypeScript + REST API
- **Database**: PostgreSQL (managed via Prisma ORM)
- **Blockchain**: Hyperledger Fabric (Permissioned Network - *Future Phase*)
- **Document Storage**: Encrypted document storage / IPFS (*Future Phase*)

---

## 📂 Directory Structure

```
elandregistry/
├── frontend/             # React + Vite + TypeScript UI app
├── backend/              # Node.js + Express + TypeScript REST API & Prisma schema
├── blockchain/           # Hyperledger Fabric configuration & chaincode placeholders
├── storage/              # Document storage location placeholder
├── docs/                 # Architecture, API & setup documentation
│   ├── architecture/
│   ├── api/
│   └── development/
├── postman/              # Postman API collections & documentation
├── docker-compose.yml    # Docker Compose setup for local PostgreSQL database
├── .env.example          # Environment variable template
└── package.json          # Monorepo root workspace configuration
```

---

## ⚙️ Prerequisites

- **Node.js**: `v18.x` or later
- **npm**: `v9.x` or later
- **Docker Desktop** (or Docker Engine + Docker Compose) for local PostgreSQL database

---

## 🚀 Quick Start Guide

### 1. Clone & Environment Setup

```bash
# Clone the repository
git clone https://github.com/your-org/elandregistry.git
cd elandregistry

# Copy root environment variables
cp .env.example .env
cp .env.example backend/.env
cp .env.example frontend/.env
```

### 2. Install Dependencies

Install root, backend, and frontend dependencies:

```bash
npm install
npm run install:all # or npm install in root/backend/frontend
```

### 3. Start PostgreSQL Database

Launch the PostgreSQL Docker container:

```bash
npm run docker:up
# or: docker-compose up -d
```

### 4. Database Setup (Prisma)

Run Prisma migrations and client generation:

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Start Development Servers

Run backend and frontend simultaneously:

```bash
npm run dev
```

- **Frontend Application**: `http://localhost:3000`
- **Backend API Base**: `http://localhost:5000/api/v1`
- **Healthcheck Endpoint**: `http://localhost:5000/api/v1/healthcheck/`

---

## 🧪 Testing & Code Quality

```bash
# Run backend Jest + Supertest unit & integration tests
npm run test

# Run ESLint across frontend and backend
npm run lint

# Format code with Prettier
npm run format
```

---

## 🛑 Stopping Services

```bash
# Stop PostgreSQL container
npm run docker:down
# or: docker-compose down
```

---

## 📄 License

This project is licensed under the MIT License.
