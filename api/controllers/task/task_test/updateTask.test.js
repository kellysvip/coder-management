const request = require('supertest');
const app = require('../../../../app');

describe('Tasks', () => {
  // jest.setTimeout(20000)

  test('UPDATE / --> update status of task', async () => {
    const { body } = await request(app).put('/tasks/636a9992b9a3c9724a4563af').send({ status: 'done' }).expect(200);
    expect(body).toEqual({
      success: true,
      data: {
        updated: {
          _id: '636a9992b9a3c9724a4563af',
          name: 'bezzzx',
          description: 'z',
          status: 'done',
          isDeleted: false,
          createdAt: 'Wed Nov 09 2022 01:01:54 GMT+0700 (Indochina Time)',
          updatedAt: expect.any(String),
          __v: 0,
          referenceTo: null,
        },
      },
      message: 'Update Success',
    });
  });
  test('UPDATE / --> update status of task', async () => {
    const { body } = await request(app).put('/tasks/636a9992b9a3c9724a4563af').send({ status: 'pending' }).expect(400);
  });
});
