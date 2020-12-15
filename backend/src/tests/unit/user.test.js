const app = require('../../index');

const supertest = require('supertest');
const request = supertest(app);


describe('User Endpoint Test', () => {
    
    it('Just Dropping Users', async (done) => {
        const res = await request.delete('/api/user/all');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('All users deleted from database');
        done();
    });

    describe('Inserting User', () => {
        it('Expecting to store on DB', async (done) => {
    
            const res = await request.post('/api/user/store').send({
                name: 'Victor Oliveira',
                login: 'victor123',
                password: '123456789',
                email: 'test.email@gmail.com',
                city: 'Americana',
                uf: 'SP'
            });
    
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User Registered!');
            done();
        });
    });


    describe('Validation tests', () => {
        it('Validate User Name', async (done) => {

            const res = await request.post('/api/user/store').send({
                //name: 'Victor Oliveira',
                login: 'victor123',
                password: '123456789',
                email: 'test.email@gmail.com',
                city: 'Americana',
                uf: 'SP'
            });
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Error: \"name\" is required');
            done();
        });
    
        it('Validate User Login', async (done) => {
    
            const res = await request.post('/api/user/store').send({
                name: 'Victor Oliveira',
                //login: 'victor123',
                password: '123456789',
                email: 'test.email@gmail.com',
                city: 'Americana',
                uf: 'SP'
            });
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Error: \"login\" is required');
            done();
        });
    
        it('Validate User Password', async (done) => {
    
            const res = await request.post('/api/user/store').send({
                name: 'Victor Oliveira',
                login: 'victor123',
                //password: '123456789',
                email: 'test.email@gmail.com',
                city: 'Americana',
                uf: 'SP'
            });
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Error: \"password\" is required');
            done();
        });
    
        it('Validate User E-mail', async (done) => {
    
            const res = await request.post('/api/user/store').send({
                name: 'Victor Oliveira',
                login: 'victor123',
                password: '123456789',
                //email: 'test.email@gmail.com',
                city: 'Americana',
                uf: 'SP'
            });
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Error: \"email\" is required');
            done();
        });
    
        it('Validate User City', async (done) => {
    
            const res = await request.post('/api/user/store').send({
                name: 'Victor Oliveira',
                login: 'victor123',
                password: '123456789',
                email: 'test.email@gmail.com',
                //city: 'Americana',
                uf: 'SP'
            });
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Error: \"city\" is required');
            done();
        });
    
        it('Validate User UF', async (done) => {
    
            const res = await request.post('/api/user/store').send({
                name: 'Victor Oliveira',
                login: 'victor123',
                password: '123456789',
                email: 'test.email@gmail.com',
                city: 'Americana',
                // uf: 'SP'
            });
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Error: \"uf\" is required');
            done();
        });
    
        it('Validate User Login in use', async (done) => {
    
            const res = await request.post('/api/user/store').send({
                name: 'Victor Oliveira',
                login: 'victor123',
                password: '123456789',
                email: 'test.email2@gmail.com',
                city: 'Americana',
                uf: 'SP'
            });
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('This login is already been used.');
            done();
        });
    
        it('Validate User E-mail in use', async (done) => {
    
            const res = await request.post('/api/user/store').send({
                name: 'Victor Oliveira',
                login: 'victor1234',
                password: '123456789',
                email: 'test.email@gmail.com',
                city: 'Americana',
                uf: 'SP'
            });
    
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('This e-mail is already been used.');
            done();
        });
    });

    describe('Authentication Test', () => {
        it('Expect to return a token', async (done) => {
            const res = await request.post('/api/user/authenticate').send({
                login: 'victor123',
                password: '123456789'
            });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User authenticated');
            done();
        });

        it('Expect to return an error sending invalid password', async (done) => {
            const res = await request.post('/api/user/authenticate').send({
                login: 'victor123',
                password: '1234567890'
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Login or password is invalid');
            done();
        });

        it('Expect to return an error sending invalid user', async (done) => {
            const res = await request.post('/api/user/authenticate').send({
                login: 'victor123',
                password: '1234567890'
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Login or password is invalid');
            done();
        });
    });
});