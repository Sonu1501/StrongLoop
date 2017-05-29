'use strict';
var nodemailer = require('nodemailer');
var request = require('request');
//var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(Mstusers) {

  Mstusers.sendEmail = function(obj,cb){
  	//-------------- access another models from common list --------------------- //
  	//var MstLog = Mstusers.app.models.MstLog;
  	obj = JSON.parse(obj);

  	var Transport = nodemailer.createTransport({
					    service: 'Gmail',
					    auth: {
					        user: 'nitinsinghjat08@gmail.com',
					        pass: 'Sonu@1501'
					    }
    				});
    var mailOptions = {
        from: "Budget Manager Alert <no-reply@budgetmanager.com>", // sender address
        to: obj.email, // list of receivers
        cc: "",
        bcc: "",
        subject: "One Time Password (OTP) for registartion on Budget Manager App", // Subject line
        html: "<htm><body><b>Dear Applicant,</b><br /><br />The One Time Password (OTP) for registartion on Budget Manager App is "+obj.otp+".<br />Please do not share this One Time Password with anyone.<br /><br /><b>Warm Regards </b><br />Budget Manager</body></html>"
        
    }
    // send mail with defined transport object
    Transport.sendMail(mailOptions, function(error, info){
        if(error){
             cb(error, null);
        }else{
            cb(null, info);
        }
    });

  }

  Mstusers.remoteMethod(
        'sendEmail', {
            accepts: [{
                arg: 'obj',
                type: 'string',
                required: true
            }],
            returns: [{
                type: 'string',
                required: true,
                root: true
            }],
            http: {
                verb: 'post'
            }
        }
    );


 Mstusers.sendOTP = function(obj,cb){
    //-------------- access another models from common list --------------------- //
    //var MstLog = Mstusers.app.models.MstLog;
    obj = JSON.parse(obj);

    var options = {
         method: 'POST',
         url: 'https://api.twilio.com/2010-04-01/Accounts/ACf9f2508da61fb92a285618cb51041948/Messages.json',
         headers: 
               { 
                 'content-type': 'application/x-www-form-urlencoded',
                 'authorization': 'Basic QUNmOWYyNTA4ZGE2MWZiOTJhMjg1NjE4Y2I1MTA0MTk0ODplNDgxNTg4NGZiNDc0ZmRmMzIwYzA1YjQ4MWVmM2EzNQ==' 
               },
         form: { To: obj.to,From:obj.from,Body: obj.message }
     };
     request(options, function (error, response, body) {
        if(error){
          console.log(error);
             cb(JSON.parse(error), null);
        }else{
          console.log(body);
            cb(null, JSON.parse(body));
        }
     });
    }

     Mstusers.remoteMethod(
        'sendOTP', {
            accepts: [{
                arg: 'obj',
                type: 'string',
                required: true
            }],
            returns: [{
                type: 'string',
                required: true,
                root: true
            }],
            http: {
                verb: 'post'
            }
        }
    );

};
