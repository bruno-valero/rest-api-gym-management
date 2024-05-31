# App

GymPass style App.

## Requisitos Funcionais

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de checkins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de checkins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10Km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar checkin em uma academia;
- [x] Deve ser possível validar o checkin de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## Regras de Negócio

- [x] O usuário não deve poder se cadastrar com um email duplicado;
- [x] O usuário não pode fazer 2 checkins no mesmo dia;
- [x] O usuário não pode fazer checkin se não tiver perto (100m) da academia;
- [x] O checkin só pode ser validado até 20 minutos após criado;
- [x] O checkin só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## Requisitos Não Funcionais

- [x] A senha do usuário deve estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados devem estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
