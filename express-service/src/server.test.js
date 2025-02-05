const request = require('supertest');
const app = require('./server');
describe('Test Express API', () => {
  it('should return 200 for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return 404 for a non-existing route', async () => {
    const response = await request(app).get('/non-existing');
    expect(response.status).toBe(404);
  });
});
