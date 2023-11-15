const request = require('supertest');
const assert = require('assert');
const index = require('../index'); 



describe('Express App', () => {
    it('should respond with 200 OK on /api endpoint', async () => {
      await request(index.app).get('/api/messages/public').expect(200)
    });

    // it('should respond with 200 OK on /api/users endpoint', async () => {
    //     await request(index.app).get('/api/users/').expect(200)
    //   });

   
   
});
