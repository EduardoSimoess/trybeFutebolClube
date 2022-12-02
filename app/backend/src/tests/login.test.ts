import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes relacionados à seção 1 - Login', () => {
  it('Testa se ao fazer o login o token correto é retornado', async () => {
      const response = await chai.request(app).post('/login').send(
          {
              email: "user@user.com",
              password: "secret_user"
          }
      );
      expect(response.status).to.be.equal(200);
      expect(response.body.token).to.contain("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlc");
  });

  it('Testa se não é permitido fazer login com o campo de email em branco', async () => {
    const response = await chai.request(app).post('/login').send(
        {
            email: "",
            password: "secret_user"
        }
    );
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal("All fields must be filled");
  });

  it('Testa se não é permitido fazer login com o campo de password em branco', async () => {
    const response = await chai.request(app).post('/login').send(
        {
            email: "user@user.com",
            password: ""
        }
    );
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal("All fields must be filled");
  });

  it('Testa se não é permitido fazer login com o campo de email inválido', async () => {
    const response = await chai.request(app).post('/login').send(
        {
            email: "user@user",
            password: "secret_user"
        }
    );
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal("Incorrect email or password");
  });

  it('Testa se não é permitido fazer login com o campo de senha inválido', async () => {
    const response = await chai.request(app).post('/login').send(
        {
            email: "user@user.com",
            password: "secret"
        }
    );
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal("Incorrect email or password");
  });

//   it('Testa se o role corretor é retornado com base no token', async () => {
//     const response = await (await chai.request(app).post('/login/validate')).header({ Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJwYXNzd29yZCI6InNlY3JldF91c2VyIiwiaWF0IjoxNjY5NTUwODg3LCJleHAiOjE2NzAxNTU2ODd9.HEJ_4zWCfXoPE3uSxvORpWEvm7GXCRoCrpMkcaJwf1s'});
//     expect(response.status).to.be.equal(200);
//     expect(response.body.role).to.be.equal("user");
//   });
});
