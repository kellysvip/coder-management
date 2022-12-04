const request = require('supertest');
const app = require('../../../../app');

describe('Tasks', () => {
  // jest.setTimeout(20000)

  test('GET / --> get Tasks By Name', async () => {
    const { body } = await request(app).get('/tasks').query({ name: 'be' }).expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
          "taskInfo": [
            {
              "_id": "636a9992b9a3c9724a4563af",
              "name": "bezzzx",
              "description": "z",
              "status": "pending",
              "isDeleted": false,
              "createdAt": expect.any(String),
              "updatedAt": expect.any(String),
              "__v": 0,
              "referenceTo": null
            }
          ]
        },
        "message": "Find task success"
      });
  });

  test('GET / --> get Task By Id', async () => {
    const { body } = await request(app).get('/tasks/636a9992b9a3c9724a4563af').expect(200);
    expect(body).toEqual({
        "success": true,
        "data": {
          "taskInfo": {
            "_id": "636a9992b9a3c9724a4563af",
            "name": "bezzzx",
            "description": "z",
            "status": "pending",
            "isDeleted": false,
            "createdAt": expect.any(String),
            "updatedAt": expect.any(String),
            "__v": 0,
            "referenceTo": null
          }
        },
        "message": "Find Task By Id Success"
      });
  });
});
