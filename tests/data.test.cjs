const request = require('supertest');
const app = require('../server-crud.js');

describe('Regression Test Suite - CRUD /data', () => {
  let createdId;

  // HAPPY PATH - GET /data
  test('HAPPY PATH - GET /data - should return empty array initially', async () => {
    const res = await request(app).get('/data');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // HAPPY PATH - POST /data
  test('HAPPY PATH - POST /data - should create new data', async () => {
    const res = await request(app).post('/data').send({ name: 'Item 1', value: 100 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  // ERROR SCENARIO - POST /data name missing
  test('ERROR SCENARIO - POST /data - should return 400 if name is missing', async () => {
    const res = await request(app).post('/data').send({ value: 50 });
    expect(res.statusCode).toBe(400);
  });

  // ERROR SCENARIO - POST /data value missing
  test('ERROR SCENARIO - POST /data - should return 400 if value is missing', async () => {
    const res = await request(app).post('/data').send({ name: 'No Value' });
    expect(res.statusCode).toBe(400);
  });

  // HAPPY PATH - GET /data/:id
  test('HAPPY PATH - GET /data/:id - should return data by id', async () => {
    const res = await request(app).get(`/data/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  // ERROR SCENARIO - GET /data/:id not found
  test('ERROR SCENARIO - GET /data/:id - should return 404 if not found', async () => {
    const res = await request(app).get('/data/9999');
    expect(res.statusCode).toBe(404);
  });

  // HAPPY PATH - PUT /data/:id
  test('HAPPY PATH - PUT /data/:id - should update existing data', async () => {
    const res = await request(app).put(`/data/${createdId}`).send({ name: 'Updated', value: 999 });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated');
  });

  // ERROR SCENARIO - PUT /data/:id not found
  test('ERROR SCENARIO - PUT /data/:id - should return 404 if not found', async () => {
    const res = await request(app).put('/data/9999').send({ name: 'Ghost' });
    expect(res.statusCode).toBe(404);
  });

  // HAPPY PATH - DELETE /data/:id
  test('HAPPY PATH - DELETE /data/:id - should delete existing data', async () => {
    const res = await request(app).delete(`/data/${createdId}`);
    expect(res.statusCode).toBe(204);
  });

  // ERROR SCENARIO - DELETE /data/:id not found
  test('ERROR SCENARIO - DELETE /data/:id - should return 404 if not found', async () => {
    const res = await request(app).delete('/data/9999');
    expect(res.statusCode).toBe(404);
  });
});