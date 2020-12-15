const app = require('../../index');

const supertest = require('supertest');
const request = supertest(app);

describe('User Endpoint Test', () => {

    it('Just Dropping Users', async (done) => {
        const res = await request.delete('/api/user/all');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("All users deleted from database");
        done();
    })

    it('Create User EndPoint', async (done) => {

        const res = await request.post('/api/user').send({
            name: 'Victor Oliveira',
            login: 'victor123',
            password: '123456789',
            email: 'victorrodrigues753@gmail.com',
            city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User Registered!");
        done();
    });

    it('Validate User Data - NAME', async (done) => {

        const res = await request.post('/api/user').send({
            //name: 'Victor Oliveira',
            login: 'victor123',
            password: '123456789',
            email: 'victorrodrigues753@gmail.com',
            city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Error: \"name\" is required");
        done();
    });
});
