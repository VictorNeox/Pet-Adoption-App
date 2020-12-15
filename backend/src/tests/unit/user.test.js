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
            email: 'test.email@gmail.com',
            city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User Registered!");
        done();
    });

    it('Validate User Data - Name', async (done) => {

        const res = await request.post('/api/user').send({
            //name: 'Victor Oliveira',
            login: 'victor123',
            password: '123456789',
            email: 'test.email@gmail.com',
            city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Error: \"name\" is required");
        done();
    });

    it('Validate User Data - Login', async (done) => {

        const res = await request.post('/api/user').send({
            name: 'Victor Oliveira',
            //login: 'victor123',
            password: '123456789',
            email: 'test.email@gmail.com',
            city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Error: \"login\" is required");
        done();
    });

    it('Validate User Data - Password', async (done) => {

        const res = await request.post('/api/user').send({
            name: 'Victor Oliveira',
            login: 'victor123',
            //password: '123456789',
            email: 'test.email@gmail.com',
            city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Error: \"password\" is required");
        done();
    });

    it('Validate User Data - E-mail', async (done) => {

        const res = await request.post('/api/user').send({
            name: 'Victor Oliveira',
            login: 'victor123',
            password: '123456789',
            //email: 'test.email@gmail.com',
            city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Error: \"email\" is required");
        done();
    });

    it('Validate User Data - City', async (done) => {

        const res = await request.post('/api/user').send({
            name: 'Victor Oliveira',
            login: 'victor123',
            password: '123456789',
            email: 'test.email@gmail.com',
            //city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Error: \"city\" is required");
        done();
    });

    it('Validate User Data - UF', async (done) => {

        const res = await request.post('/api/user').send({
            name: 'Victor Oliveira',
            login: 'victor123',
            password: '123456789',
            email: 'test.email@gmail.com',
            city: 'Americana',
            // uf: 'SP'
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Error: \"uf\" is required");
        done();
    });

    it('Validate User Data - Login in use', async (done) => {

        const res = await request.post('/api/user').send({
            name: 'Victor Oliveira',
            login: 'victor123',
            password: '123456789',
            email: 'test.email@gmail.com',
            city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("This login is already been used.");
        done();
    });

    it('Validate User Data - E-mail in use', async (done) => {

        const res = await request.post('/api/user').send({
            name: 'Victor Oliveira',
            login: 'victor1234',
            password: '123456789',
            email: 'test.email@gmail.com',
            city: 'Americana',
            uf: 'SP'
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("This e-mail is already been used.");
        done();
    });
});
