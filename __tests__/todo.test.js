const request = require('supertest');
const app = require('../app');
// const { hash } = require('../helpers/hash-helper');
const { sign } = require('../helpers/jwt-helper');
const { queryInterface } = require('../models/index').sequelize;

const todos = [
  {
    "title": "Test todo 1",
    "description": "Description 1",
    UserId: 1,
    due_date: '2022-05-05',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    "title": "Test todo 2",
    "description": "Description 2",
    UserId: 1,
    due_date: '2022-05-05',
    createdAt: new Date(),
    updatedAt: new Date()
  },
]

const new_todo = {
  'title': 'Test todo new',
  'description': 'Description new',
  'due_date': '2022-05-06',
  'UserId': 1
}

let access_token = '';
const invalid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huZG9lQG1haWwuY29tIiwiaWF0IjoxNjQ2MTIxNjQ2fQ._qM83wbIQiXWC9ICdGPRlDP_-iz2BuY9nivhn0i9sOI';

beforeAll((done) => {
  queryInterface.bulkDelete('Todos', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })
  .then(() => {
    return queryInterface.bulkInsert('Todos', todos);
  })
  .then(() => {
    access_token = sign({ id: 1, email: 'admin@mail.com' });
    done();
  })
  .catch((error) => {
    done(error);
  });
});

describe('todo test', () => {
  test('get all photos', async () => {
    await request(app)
    .get('/todo')
    .set('access_token', access_token)
    .expect(200);
  });
  test('get todo by id', async () => {
    await request(app)
    .get('/todo/1')
    .set('access_token', access_token)
    .expect(200);
  });
  test('get all todos with invalid access token', async () => {
    const { body } = await request(app)
    .get('/todo')
    .set('access_token', invalid_token)
    .expect(401);
    expect(body).toEqual({ message: expect.any(String) });
  });
  test('get todo by id with invalid access token', async () => {
    const { body } = await request(app)
    .get('/todo/1')
    .set('access_token', invalid_token)
    .expect(401);
    expect(body).toEqual({ message: expect.any(String) });
  });
  test('create new todo', async () => {
    await request(app)
    .post('/todo')
    .set('access_token', access_token)
    .send(new_todo)
    .expect(201);
  });
  test('create new todo with invalid access token', async () => {
    await request(app)
    .post('/todo')
    .set('access_token', invalid_token)
    .send(new_todo)
    .expect(401);
  });
})
