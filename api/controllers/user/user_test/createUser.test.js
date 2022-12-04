const request = require('supertest');
const app = require('../../../../app');

describe('Users', () => {
  // jest.setTimeout(20000)

  test('POST /users --> create a user', async () => {
    const { body } = await request(app)
      .post('/users')
      .send({
        name: 'Plymouth',
        role: 'employee',
      })
      .expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        created: {
          name: 'plymouth',
          role: 'employee',
          _id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: 0,
        },
      },
      message: 'Create User Success',
    });
  });
});
