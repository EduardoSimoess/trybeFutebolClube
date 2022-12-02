import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import TeamList from './utils/teamsList';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes relacionados à seção 2 - Teams', () => {
    it('Testa se os times são retornados com sucesso', async () => {
        const response = await chai.request(app).get('/teams');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(TeamList);
    });

    it('Testa se o time correto é retornado de acordo com o id', async () => {
        const response = await chai.request(app).get('/teams/1');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({
            "id": 1,
            "teamName": "Avaí/Kindermann"
        });
    })
});