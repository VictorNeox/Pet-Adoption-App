const chai = require('chai');
const http = require('chai-http');
const subset = require('chai-subset');
const expect = chai.expect();

const app = require('../../index');

chai.use(http);
chai.use(subset);

describe('User Controller Tests', () => {
    it('/api/user - POST', () => {
        chai.request(app)
            .post('/api/user')
            .send({
                name: 'Victor Oliveira',
                login: 'victor123',
                password: '123456789',
                email: 'victorrodrigues753@gmail.com',
                city: 'Americana',
                uf: 'SP'
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
                chai.expect(err).to.be.null;
                chai.expect(res.body).to.containSubset({ id: id => id });
                done();
            });
    });

    it('/api/user - Validate', () => {
        chai.request(app)
            .post('/api/user')
            .send({
                name: 'Victor Oliveira',
                login: 'victor1234',
                password: '123456789',
                email: 'victorrodrigues7534@gmail.com',
                city: 'Americana',
                uf: 'SP'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(err).to.be.null;
                expect(res.body).to.containSubset({ id: id => id });
            });
    });
})