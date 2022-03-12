/* eslint-disable no-undef */
const request = require('supertest');
const { app, server } = require('..');

afterEach(() => {
  server.close();
});

describe('Names API', () => {
  it('GET /api/v1/names/ --> array of names', async () => {
    const response = await request(app).get('/api/v1/names');

    expect(response.status).toEqual(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
      ]),
    );
  });

  it('GET /api/v1/names/777 --> 404 not found', async () => {
    const response = await request(app).get('/api/v1/names/777');
    expect(response.status).toEqual(404);
  });
});
