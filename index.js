const nodemailer = require("nodemailer");
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser')
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({  extended: true }));


app.get('/', function (req, res) {
   res.send("hello");
})

app.get("/sendemail", async(req,res)=>{
   const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'taylor63@ethereal.email',
          pass: 'rdUsPZQRQgGrQGVEb7'
      },
  });

  const info = await transporter.sendMail({
   from: '"Dhanada Panda 👻" <taylor63@ethereal.email>', // sender address
   to: "dhanada1502@gmail.com, dhanada306@gmail.com", // list of receivers
   subject: "Hello ✔", // Subject line
   text: "Hello world?", // plain text body
   html: "<b>Hello world?</b>", // html body
 });

 console.log("Message sent: %s", info.messageId);
   res.json(info);
})

var bodyParser = require('body-parser')
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({  extended: true }));

var server = app.listen(5000, function () {
   console.log("Express App running at http://127.0.0.1:5000/");
})