const app = require('../../index');

const supertest = require('supertest');
const request = supertest(app);
/* 
    ! Didn't figured out why JEST TEST is ending with this message: "Jest did not exit one second after the test run has completed.
    ! This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue."
    TODO: I'll fix Later
*/

describe('User Endpoint Test', () => {

    let token;
    
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

            token = res.body.token;
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

    describe('Authorization Test', () => {
        it('Expect to loggin successfully', async (done) => {
            const res = await request.post('/api/user/auth').set(
                'Authorization', `Bearer ${token}`
            );

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User Founded');
            done();
        });

        it('Expect No Token Provided', async (done) => {
            const res = await request.post('/api/user/auth');

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('No token provided');
            done();
        });

        it('Expect Token malformatted', async (done) => {
            const res = await request.post('/api/user/auth').set(
                'Authorization', `Test ${token}`
            );

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Token malformatted');
            done();
        });

        it('Expect Token Error', async (done) => {
            const res = await request.post('/api/user/auth').set(
                'Authorization', `${token}`
            );

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Token Error');
            done();
        });
    });
});