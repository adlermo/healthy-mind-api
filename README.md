# API Healthy Mind

Deve ser criada uma API que permita as seguintes operações em uma base de dados:

 - [ ] cadastro de profissionais e pacientes,
 - [ ] listagem de pacientes por profissional,
 - [ ] atualização dos pacientes,
 - [ ] deleção de pacientes,
 - [ ] e visualização do histórico de _sessões_.

A base de dados deve ter tabelas bem estruturadas e populadas com valores para testes e também deve ser entregue em script SQL junto ao repositório.

-------

## Para utilizar a API

Existem duas formas de utilizar o projeto apresentado:

1. Executar localmente:
        
    - Em um terminal execute o comando ```git clone ```
        
    - Após entrar no projeto ``` cd  ```, cole o comando de sua preferência ```npm i``` ou ```yarn install```
        
    - É necessário criar um arquivo _.env_ (modelo abaixo)  com as credênciais de acesso a um banco Postgres, antes de executar o comando de inicialização ```yarn start``` ou ```npm start```.

```
USER=anyuser
PASS=xYz123abC
HOST=motty.db.elephantsql.com
BASE=anybase
PORT=8080
```

2. Utilizar a URL de deploy no Postman ou Insomnia:

A [aplicação no Heroku](https://healthy-mind-api.herokuapp.com) está disponível para consumo imediato.

Para mais praticidade utilize a [coleção](postman_collection.json) disponível.
