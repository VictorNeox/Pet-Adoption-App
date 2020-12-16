const app = require('../../index');


app.listen(4001);

const supertest = require('supertest');
const request = supertest(app);


describe('Pet endpoint test', () => {
    let token;

    /* JUST REMOVING AND ADDING A USER TO GET TOKEN */

    it('Just Dropping Users', async (done) => {
        const res = await request.delete('/api/user/all');
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
            done();
        });
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
    });

    describe('Inserting pet', () => {
        it('Expect to insert successfully', async (done) => {
            const res = await request.post('/api/pet/store')
                .set('Authorization', `Bearer ${token}`)
                .send({
                species: 'Cachorro',
                gender: 'Macho',
                name: 'Nick',
                age: 3,
                description: 'Cachorro Dócil à procura de um lar',
            });

            expect(res.body.message).toBe('Pet registered!');
            done();
        });
    });

});