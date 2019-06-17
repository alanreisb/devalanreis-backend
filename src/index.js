require('dotenv').config();

const express = require("express");
const app = express();
const mailer = require("nodemailer");
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const config = {

    host: 'smtp.mail.yahoo.com',
    port: 465,
    service: 'Yahoo',

    auth: {

        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    debug: false,
    logger: true,
    tls: {
        rejectUnauthorized: false
    }

};

const transporter = mailer.createTransport(config);

app.use(bodyParser.json());

app.post("/contatos/enviar", urlencodedParser, function (req, res) {
    const message = {
        from: process.env.EMAIL,
        to: "alanreisb@gmail.com",
        subject: req.body.assunto,
        text: req.body.texto,
    };
    console.log(message);
});

app.listen(3333);

console.log(`Servidor iniciado...`);