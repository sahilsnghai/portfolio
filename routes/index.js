const e = require('express');
var express = require('express');
var router = express.Router();
const nodemailer =require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST contact page. */
router.post('/', function(req, res, next) {
    const {name,email,subject,message} = req.body;
    try {
      const transporter = nodemailer.createTransport(smtpTransport({
        service:"gmail",
        auth:{
          user:process.env.EMAIL,
          pass:process.env.PASSWORD
        }
      }))
      const emailOptions = {
        from: process.env.EMAIL, // sender address
        to: 'sahilsinghai5672@gmail.com', // list of receivers
        subject: subject, // Subject line
        // text: "laude", // plain text body
        html: `
        Name: ${name}
        <br>
        Message: ${message}
        <br>
        Email: ${email}` , // html body
      }
      transporter.sendMail(emailOptions, (error,info)=>{
        if (error){
          console.log(error)
        } else{
          console.log(info.res);
          res.render("index")
          // res.status(201).json({status:201,info})
        }
        
      })
    } catch (error) {
      res.status(201).json({status:401,error})
      
    }
    // console.log(req.body)
    // console.log(req.body)
    // res.render('index');
  });
  
  module.exports = router;
  