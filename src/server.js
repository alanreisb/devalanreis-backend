require('dotenv').config();
const express = require("express");
const cors = require('cors');
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
app.use(cors({origin:`${process.env.APP_CORS}`}));



app.post("/contatos/enviar", urlencodedParser, function (req, res) {
    const message = {
        from: process.env.EMAIL,
        to: process.env.PARA,
        subject: "Mensagem Portfolio: " +req.body.nome + "---" +req.body.email ,
        text: req.body.mensagem,
    };
    transporter.sendMail(message, (error, info) => {
        if (error) {
            return res.status(400).send(`${error}  ${info}`);
        }
        return res.status(200).send("Enviou");
    });
    console.log(message);
});

app.listen(process.env.PORT||3333, ()=> {console.log('Servidor iniciado no local 3333...')});

