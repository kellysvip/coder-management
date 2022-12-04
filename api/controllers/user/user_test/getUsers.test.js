const request = require('supertest');
const app = require('../../../../app');

describe('Users', () => {
  // jest.setTimeout(20000)

  test('GET / --> get User By Name', async () => {
    const { body } = await request(app).get('/users').query({ name: 't' }).expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        userInfo: [
          {
            _id: '6368017fa6ff275a9695f91a',
            name: 'tri',
            role: 'employee',
            createdAt: '2022-11-06T18:48:31.035Z',
            updatedAt: '2022-11-06T18:48:31.035Z',
            __v: 0,
          },
        ],
      },
      message: 'Find User Success',
    });
  });

  test('GET / --> get User By Id', async () => {
    const { body } = await request(app).get('/users/6368017fa6ff275a9695f91a').expect(200);
    expect(body).toEqual({
      "success": true,
      "data": {
        "userInfo": {
          "_id": "6368017fa6ff275a9695f91a",
          "name": "tri",
          "role": "employee",
          "createdAt": "2022-11-06T18:48:31.035Z",
          "updatedAt": "2022-11-06T18:48:31.035Z",
          "__v": 0
        }
      },
      "message": "Find User Success"
    });
  });
});
