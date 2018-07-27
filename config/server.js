'use strict';

// Import do módulo do Express
const express = require('express');
const server = express();

// Import do módulo nativo do Node pra conseguir facilitar acesso ao bode das requisições
const bodyParser = require('body-parser');

//Import do módulo para que facitile a modularização da nossa aplicação 
const consign = require('consign');

//Import do módulo para configuração de cors
const cors = require('cors')

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

consign()
    .include('./config/firebaseConfig.js')
    .then('./app/routes')
    .into(server)

module.exports = server;