# Projeto Trybe Futebol Club

<summary><strong>👨‍💻 O que deverá ser desenvolvido</strong><br />

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  No time de desenvolvimento do `TFC`, fui responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, construí **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Desenvolvido **respeitando as regras de negócio** providas no projeto com a finalidade de prover as informações necessárias para o front-end.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  O back-end implementa regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

