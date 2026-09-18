# eLandRegistry - High-Level Architecture Overview

## 🏛️ System Concept

**eLandRegistry** is a permissioned-blockchain-based land registration and mutation platform built specifically for Bihar land record administration.

### Target Roles:
1. **Buyer / Seller (Citizen)**: Initiates land search, requests purchase/sale, submits deed documents, and views mutation history.
2. **Registration Officer (LRO)**: Inspects revenue records, verifies deed authenticity, approves land mutation, and signs chaincode transactions.
3. **Government Admin**: Manages node topologies, monitors system health, reviews audit logs, and handles dispute escalations.

---

## 📐 Data Flow & Component Architecture

```
+-------------------------------------------------------------+
|                      React Frontend                         |
|             (React Router, Axios, TypeScript)              |
+-------------------------------------------------------------+
                               |
                               v (HTTP / REST)
+-------------------------------------------------------------+
|                   Node.js / Express REST API                |
|           (Helmet, CORS, Morgan, Error Handler)             |
+-------------------------------------------------------------+
             |                                   |
             v (Prisma ORM)                      v (Fabric SDK - Future)
+------------------------+             +------------------------+
|   PostgreSQL Database  |             |  Hyperledger Fabric    |
| (Structured Records)   |             | (Permissioned Network) |
+------------------------+             +------------------------+
                                                 |
                                                 v
                                       +------------------------+
                                       |  Smart Contract        |
                                       |  / Chaincode           |
                                       +------------------------+
```

---

## 🔒 Security & Compliance Foundation

- **Environment Isolation**: All configuration values and secrets are sourced strictly from `.env` files.
- **Headers & CORS**: Secured via Helmet headers and restrictive origin policies.
- **Auditing**: Every mutation and state transition writes an immutable audit event to both PostgreSQL and the Fabric ledger.
