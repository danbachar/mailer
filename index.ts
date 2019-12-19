var fs = require('fs');
var nodemailer = require("nodemailer");

var FROM_ADDRESS = 'dandanbachar@gmail.com';
// var TO_ADDRESS = 'natalie.judkowsky@liwela.com';
var TO_ADDRESS = 'elad.gargi@liwela.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sassonistheking@gmail.com',
      pass: 'longlivesasson'
    }
  });

var sendMail = function(toAddress, subject, content, next){
  var mailOptions = {
    from: "derp <" + FROM_ADDRESS + ">",
    to: toAddress,
    // replyTo: FROM_ADDRESS,
    subject: subject,
    html: content,
    attachments: [{
      filename: 'happy_holodays.jpeg',
      path: './images/happy_holidays.jpeg',
      cid: 'happy_holidays' //same cid value as in the html img src
    }]
  };

  transporter.sendMail(mailOptions, next);
}; 

  // res.render('index', { title: 'Express' });

var template = process.cwd() + '/email.html';

// get template from file system/
fs.readFile(template, 'utf8', function(err, file){
    console.log("I have an error: " + !!err);
    if(err){
        //handle errors
        console.log('ERROR!');
        console.log(err);
    }
    else {
        sendMail(TO_ADDRESS, 'test', file, function(err, response){
            if(err){
                console.log('ERROR!');
                console.log(err);
                console.log(response);
            }
            console.log("Email sent!");
        });
    }
});