const request = require('supertest');
const app = require('../../../../app');

describe('Tasks', () => {
  // jest.setTimeout(20000)

  test('POST /tasks --> create a task', async () => {
    const { body } = await request(app)
      .post('/tasks')
      .send({
        name: 'test-be',
        description: 'this is test',
        status: 'pending'
      })
      .expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
          "created": {
            "name": "test-be",
            "description": "this is test",
            "status": "pending",
            "isDeleted": false,
            "referenceTo": null,
            "_id": expect.any(String),
            "createdAt": expect.any(String),
            "updatedAt": expect.any(String),
            "__v": 0
          }
        },
        "message": "Create Task Success"
      });
  });

  test('POST /tasks --> create a task', async () => {
    const { body } = await request(app)
      .post('/tasks')
      .send({
        name: 'test-be',
        description: 'this is test',
        status: 'pending',
        referenceTo: '6368017fa6ff275a9695f91b'
      })
      .expect(404);
    
  });
});
