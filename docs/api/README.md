# eLandRegistry API Documentation

Base URL: `/api/v1`

## Endpoints Summary

### Healthcheck Endpoint
- **URL**: `GET /api/v1/healthcheck/`
- **Description**: Evaluates runtime availability of REST API, PostgreSQL database, and Hyperledger Fabric network.
- **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "System health check completed successfully",
    "data": {
      "api": "ok",
      "database": "ok",
      "blockchain": "not_configured",
      "timestamp": "2026-09-18T12:00:00.000Z"
    }
  }
  ```

---

## Error Response Format
All errors return a uniform JSON schema:
```json
{
  "success": false,
  "message": "Resource not found: GET /api/v1/unknown",
  "error": {
    "code": "NOT_FOUND"
  }
}
```
