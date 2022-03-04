const request = require('supertest');
const app = require('../app');
const { hash } = require('../helpers/hash-helper');
const { sign } = require('../helpers/jwt-helper');
const { queryInterface } = require('../models/index').sequelize;

const users = [
  {
    username: 'admin',
    email: 'admin@mail.com',
    password: hash('password'),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'staff',
    email: 'staff@mail.com',
    password: hash('password'),
    role: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const access_token = {
  admin: '',
  staff: ''
};

beforeAll((done) => {
  queryInterface.bulkDelete('Users', null, {
    truncate: true,
    restartIdentity: true,
    cascade: true
  })
    .then(() => {
      return queryInterface.bulkInsert('Users', users);
    })
    .then(() => {
      access_token.admin = sign({ id: 1, email: users[0].email });
      access_token.staff = sign({ id: 2, email: users[1].email });
      done();
    })
    .catch((error) => {
      done(error);
    });
});

describe('register tests', () => {
  test('successful registration', (done) => {
    const newUser = {
      username: 'user1',
      email: 'user1@mail.com',
      password: 'password',
      role: 'staff'
    };
    request(app)
      .post('/register')
      .set('access_token', access_token.admin)
      .send(newUser)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({
          id: expect.any(Number),
          username: newUser.username,
          email: newUser.email
        });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test('unsuccessful registration because of role permission', (done) => {
    const newUser = {
      username: 'user2',
      email: 'user2@mail.com',
      password: 'password',
      role: 'staff'
    };
    request(app)
      .post('/register')
      .set('access_token', access_token.staff)
      .send(newUser)
      .expect(403)
      .then(({ body }) => {
        expect(body).toEqual({ message: 'forbidden' });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test('unsuccessful registration because of empty string as username', (done) => {
    const newUser = {
      username: '',
      email: 'user3@mail.com',
      password: 'password',
      role: 'staff'
    };
    request(app)
      .post('/register')
      .set('access_token', access_token.admin)
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ message: 'username cannot be empty' });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test('unsuccessful registration because of username is null', (done) => {
    const newUser = {
      email: 'user4@mail.com',
      password: 'password',
      role: 'staff'
    };
    request(app)
      .post('/register')
      .set('access_token', access_token.admin)
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ message: 'username cannot be empty' });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test('unsuccessful registration because of email already exists', (done) => {
    const newUser = {
      username: 'user5',
      email: 'staff@mail.com',
      password: 'password',
      role: 'staff'
    };
    request(app)
      .post('/register')
      .set('access_token', access_token.admin)
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ message: 'email must be unique' });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test('unsuccessful registration because of wrong email format', (done) => {
    const newUser = {
      username: 'user6',
      email: 'user6mailcom',
      password: 'password',
      role: 'staff'
    };
    request(app)
      .post('/register')
      .set('access_token', access_token.admin)
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ message: 'wrong email format' });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  test('unsuccessful registration because of password is less than 5 characters', (done) => {
    const newUser = {
      username: 'user7',
      email: 'user7@mail.com',
      password: 'pass',
      role: 'staff'
    };
    request(app)
      .post('/register')
      .set('access_token', access_token.admin)
      .send(newUser)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ message: 'password cannot be less than five characters' });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});
