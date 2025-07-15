// Sample server.test.js file for the GitHub Actions course
const request = require('supertest');
const app = require('./server');

describe('Calculator API', () => {
  test('GET / should return status message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Calculator API is running!');
  });

  test('GET /api/add should add two numbers', async () => {
    const response = await request(app).get('/api/add/5/3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 8 });
  });

  test('GET /api/subtract should subtract two numbers', async () => {
    const response = await request(app).get('/api/subtract/5/3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 2 });
  });

  test('GET /api/multiply should multiply two numbers', async () => {
    const response = await request(app).get('/api/multiply/5/3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 15 });
  });

  test('GET /api/divide should divide two numbers', async () => {
    const response = await request(app).get('/api/divide/6/3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 2 });
  });

  test('GET /api/divide should return error for division by zero', async () => {
    const response = await request(app).get('/api/divide/6/0');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Division by zero' });
  });
});
