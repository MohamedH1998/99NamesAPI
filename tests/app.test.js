/* eslint-disable no-undef */
import request from 'supertest';
import app from '../src/app.js';

afterEach(() => {
  // server.close();
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
    expect(response.body).toEqual({});
    expect(response.status).toEqual(404);
  });

  it('Get /api/v1/name/random --> random name within the database', async() =>{
    const response = await request(app).get('/api/v1/name/random');

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
  })

  it('GET /api/v1/name/randoms --> 404 not found', async () => {
    const response = await request(app).get('/api/v1/name/randoms');
    expect(response.body).toEqual({
      message: "A name with that id does not seem to exist.",
      status: 404
    });
    expect(response.status).toEqual(404);
  }); 

  it('GET /api/v1/name/:id --> random name within the database', async() =>{
    const response = await request(app).get('/api/v1/name/20');

    expect(response.status).toEqual(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: 20,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
      ]),
    );
  })

  it('GET /api/v1/name/200 --> 404 id out of range', async () => {
    const response = await request(app).get('/api/v1/name/200');
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: "A name with that id does not seem to exist.",
      status: 404
    });
  });

  /*
  if numbers are used in the url for id instead of string*/

  it('GET /api/v1/name/:id,:id2 --> get names with id ranging from id1 to id2', async() =>{
    const response = await request(app).get('/api/v1/names/range/20,30');

    expect(response.status).toEqual(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: 20,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
        {
          id: 21,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
        {
          id: 22,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
        {
          id: 23,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
        {
          id: 24,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
        {
          id: 25,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
        {
          id: 26,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
        {
          id: 27,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
        {
          id: 28,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
        {
          id: 29,
          ayaatExample: expect.any(String),
          meaning: expect.any(String),
          definition: expect.any(String),
          name: expect.any(String),
          arabicName: expect.any(String),
        },
      ]),
    );
  });

  it('GET /api/v1/names/range/20,3 --> 404 not found', async () => {
    const response = await request(app).get('/api/v1/names/range/20,3');
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      message: "Start id cannot be larger than end id.",
      status: 400
    });
  });

  it('GET /api/v1/names/range/200,300 --> 404 not found', async () => {
    const response = await request(app).get('/api/v1/names/range/200,300');
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: "Names do not seem to exist within the given range of ids.",
      status: 404
    });
  });

}); 