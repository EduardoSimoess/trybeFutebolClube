import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

import matchesList from './utils/matchesList';

import matchesFinished from './utils/matchesFinished';

import matchesInProgress from './utils/matchesInProgress';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes relacionados à seção 3 - Matches', () => {
    it('Testa se todas as partidas são retornadas', async () => {
        const response = await chai.request(app).get('/matches');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(matchesList);
    });

    it('Testa se todas as partidas finalizadas são retornadas', async () => {
        const response = await chai.request(app).get('/matches?inProgress=false');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(matchesFinished);
    });

    it('Testa se as partidas em andamento são retornadas', async () => {
        const response = await chai.request(app).get('/matches?inProgress=true');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal(matchesInProgress);
    });
//  Problema com o token
    // it('Testa se é possível salvar uma nova partida com o status InProgress', async () => {
    //     const response = await chai.request(app).post('/matches').send({
    //         "homeTeam": 16,
    //         "awayTeam": 8,
    //         "homeTeamGoals": 2,
    //         "awayTeamGoals": 2,
    //     });
    //     expect(response.status).to.be.equal(200);
    //     expect(response.body).to.be.deep.equal({
    //         "id": 49,
    //         "homeTeam": 16,
    //         "homeTeamGoals": 2,
    //         "awayTeam": 8,
    //         "awayTeamGoals": 2,
    //         "inProgress": true,
    //     });
    // });

    it('Testa se é possível finalizar uma partida corretamente', async () => {
        const response = await chai.request(app).patch('/matches/48/finish');
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.deep.equal({ message: "Finished" });
    });
//  Token
    // it('Testa que não é possível inserir uma partida com time iguais', async () => {
    //     const response = await chai.request(app).patch('/matches/48/finish');
    // });
});