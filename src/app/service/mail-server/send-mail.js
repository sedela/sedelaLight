"use strict";
const express = require("express");
const nodeMailer = require('nodemailer');


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/sendmail', (req, res) => {
  console.log(req.body, 'data of form');
  var transporter = nodeMailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
      // should be replaced with real sender's account
      user: 'sedela.comminlabs@gmail.com', // generated ethereal user
      pass: 'sedela@2017' 
    }
  });
 
  var mailOptions = {
    from: "sedela.comminlabs@gmail.com",
    to: `${req.body.email}`,
    subject: 'Confirmation Inscription sedela',
    html : `<p>Bonjour ${req.body.name}, <p> 
        Pour terminer votre inscription veuillez saisir le code <strong> ${req.body.register_code}</strong>.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('mesages:',error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        message: 'successfuly sent!'
      })
    }
  });

});

app.listen(3000, () => {
  console.log("server run!!!");
});