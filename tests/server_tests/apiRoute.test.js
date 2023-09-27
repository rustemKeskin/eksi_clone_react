const app = require('../../build/app')
const supertest = require('supertest');
const api = supertest(app);

// npm test -- -t "a specific note is within the returned notes"

describe('TITLES', () => {

  test('/titlelist should return array & content-Type should be json', async() => {

    let response = await api
                  .get('/titles')
                  .expect(200)
                  .expect('Content-Type', /application\/json/);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('/:title_name if valid should return array/json and must be unique', async() => {

    let response = await api
                    .get('/titles/Closures in JavaScript')
                    .expect(200)
                    .expect('Content-Type', /application\/json/);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  })
    
  test('/titles/:title_name editing1', async() => {
  
    let response = await api
      .patch("/titles/Closures in JavaScript")
      .send({newTitle : 'deneme'});
    
      expect(response.status).toBe(204);
  })
  
  test('/titles/:title_name editing2', async() => {
  
    let response = await api
      .patch("/titles/deneme")
      .send({newTitle : 'Closures in JavaScript'});
  
    expect(response.status).toBe(204);
  })
  
  test('/titles create title', async() => {
  
    let response = await api
      .post("/titles")
      .send({newTitle : 'new title', userId : '1'});
  
      expect(response.status).toBe(200);
  })

  test('/titles/:titleName delete title', async() => {
  
    let response = await api
      .delete("/titles/new title")
  
      expect(response.status).toBe(200);
  })
});

describe('USERS', () => {

  test('should return array & content-Type should be json', async() => {

    await api
      .get('/usernames')
      .expect(200)
      .expect('Content-Type', /application\/json/);

      expect(Array.isArray(response.body)).toBe(true);
  });


});

describe('ENTRIES', () => {});





