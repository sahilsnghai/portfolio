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
router.post('/forms', function(req, res, next) {
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
        to: email, // list of receivers
        subject: subject, // Subject line
        // text: "laude", // plain text body
        html: `<h4 style="font:'montserrat';">Message from ${name}</h4><br><h2>Message: ${message}</h2><br><h5>Email: ${email}</h5>`, // html body
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
  