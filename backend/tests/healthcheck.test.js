const request = require('supertest');
const app = require('../src/app');

describe('GET /api/v1/healthcheck/', () => {
  it('should return HTTP 200 and system health status', async () => {
    const response = await request(app).get('/api/v1/healthcheck/');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('api', 'ok');
    expect(response.body.data).toHaveProperty('database');
    expect(response.body.data).toHaveProperty('blockchain', 'not_configured');
  });

  it('should handle 404 for unknown endpoints', async () => {
    const response = await request(app).get('/api/v1/nonexistent-route');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body.error).toHaveProperty('code', 'NOT_FOUND');
  });
});
