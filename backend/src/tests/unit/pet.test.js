const app = require('../../index');

const supertest = require('supertest');
const request = supertest(app);


describe('Pet endpoint test', () => {

    describe('Inserting pet', () => {
        it('Expect to insert successfully', async (store) => {
            const res = await request.post('/api/pet/store').send({
                species: 'Cachorro',
                gender: 'Macho',
                name: 'Nick',
                age: 3,
                description: 'Cachorro Dócil à procura de um lar',
                uf: 'SP'
            });

            expect(res.status).toBe(200);
            done();
        });
    });

});