const request = require('supertest');
const app = require('../../../../app');

describe('Tasks', () => {
  // jest.setTimeout(20000)

  test('UPDATE / --> Delete Task', async () => {
    const { body } = await request(app).delete('/tasks/636a9992b9a3c9724a4563af').expect(200);
    expect(body).toEqual({
      "success": true,
      "data": {
        "deleted": {
          "_id": "636a9992b9a3c9724a4563af",
          "name": "bezzzx",
          "description": "z",
          "status": "archive",
          "isDeleted": true,
          "createdAt": "Wed Nov 09 2022 01:01:54 GMT+0700 (Indochina Time)",
          "updatedAt": expect.any(String),
          "__v": 0,
          "referenceTo": null
        }
      },
      "message": "Delete Success"
    });
  });

 
});
