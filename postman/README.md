# Postman API Collection - eLandRegistry

This directory contains Postman collections and environment files for testing **eLandRegistry REST APIs**.

---

## 📂 Files Included

- `eLandRegistry_Setup.postman_collection.json`: Initial setup collection containing the `GET /api/v1/healthcheck/` verification request.

---

## 🚀 How to Use

1. Open **Postman**.
2. Click **Import** and select `postman/eLandRegistry_Setup.postman_collection.json`.
3. Set environment variable `baseUrl` to `http://localhost:5000/api/v1`.
4. Execute `Health Check` request to verify backend API, database, and blockchain status.
