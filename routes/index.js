var express = require('express');
var router = express.Router();
var user = require('../user');

var base64ToImage = require('base64-to-image');

var QRCode = require('qrcode')

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'plvscs@gmail.com',
    pass: 'Plvscs-14',
  },
});
transporter.verify().then(console.log).catch(console.error);




/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('login');

});


router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
})




router.get('/forgot-password', function (req, res, next) {
  res.render('resetpassword');
})



router.get('/new-password/:token', function (req, res, next) {

  sqldb = req.con ;

  let token = req.params.token;

  sqldb.query(`select * from requestpassword where token = '${token}' and tokenstatus = 'Pending'`,(err,row)=>{
    if(err){
     
      console.log(err);
      return;
    }

    if (row.length >= 1) {
      res.render('newpassword',{token:req.params.token});
    }else{
      res.write("<h1>token expired</h1><br><br><a href='/'>Back</a>");
      return;
    }
  })


  return;

})


router.post('/verify/:token', function (req,res,next){

      sqldb = req.con ;

      let password = req.body.validatepassword;
      let token = req.params.token

      var email;




      sqldb.query(`select * from requestpassword where token = '${token}' and tokenstatus = 'Pending'`,(err,row)=>{
        if(err){
          console.log(err);
          return;
        }
    
        if (row.length >= 1) {


          email = row[0].usermail;


          sqldb.query(`update admin set password = '${password}' where email = '${email}'`,(err,row)=>{
            if(err){
              console.log(err);
              return;
            }
          })
    
    
    
     
          sqldb.query(`update requestpassword set tokenstatus = 'Done' where token = '${token}' `,(err,row)=>{
            if(err){
              console.log(err);
              return;
            }
          })



          res.write("<h1>Password Updated!</h1><br><br><a href='/'>Login</a>");


        }else{
          res.write("<h1>page expired</h1><br><br><a href='/'>Back</a>");
          return;
        }
      })




      
      

      return;

  });
 



router.get('/send-link/:usermail', function (req, res, next) {

  sqldb = req.con ;

  let token = Math.floor(Date.now() / 1000);
  let usermail = req.params.usermail;
  let newlink = "https://plvscs.tech/new-password/"+token;

  
  sqldb.query(`select email from student where email = '${usermail}'`,(err,row)=>{
    if(err){
      console.log(err);
      return;
    }

    if (row.length >= 1) {
      
      sqldb.query(`insert into requestpassword(usermail,token) values('${usermail}','${token}') `,(err,row)=>{
        if(err){
          console.log(err);
          return;
        }


        transporter.sendMail({
          from: 'PLVSCS', // sender address
          to: `${usermail}`, // list of receivers
          subject: "PLVSCS Password Reset", // Subject line
          text: "", // plain text body
          html: `<b>Please follow the link and do not share this link to others. </b><br><br> <a href='${newlink}'>${newlink}</a>`, // html body
        }).then(info => {
          console.log({info});
        }).catch(console.error);


      })

    }
  })





  res.send({res:'<b>You will receive the password reset link to your email once it is verified.</a><br><br><a href="/">Back</a>'});

  return;
})









/*

router.post('/home',async(req,res)=>{
  name = req.body.name ;
  if(req.body.password == req.body.password2) {
    
    newUser = await new user({name:name,email:req.body.email,password:req.body.password})
   await  newUser.save() ;
   
   let lk = await user.findOne({name:name})
   
   if(lk.qrcodes.length !=0) {
  status = 'd-block'
}
else{
status = 'd-none'
}
   
  res.render('generate',{name:req.body.name,src:lk.qrcodes,status})
  


  
  
  
  }
  
  
  
  
  
})



router.post('/generate/:name',async(req,res)=>{
  
  currentUser = await user.findOne({name:req.params.name})
  
  QRCode.toDataURL(req.body.textToBeConverted, async function (err, url) {
    
    var base64Str = url
  
  
  
var path ='public/images/';
var optionalObj = {'fileName': new Date() +"hhb", 'type':'png'};

info = 	base64ToImage(base64Str,path,optionalObj); 

currentUser.qrcodes = await currentUser.qrcodes.concat(info.fileName) ;

await currentUser.save() ;

let updateduser = await user.findOne({name:req.params.name})

if(updateduser.qrcodes.length !=0) {
  status = 'd-block'
}
else{
status = 'd-none'
}
res.render('generate',{src:updateduser.qrcodes,status,name:req.params.name
})
	
  
})
  
  
  
    
  
  
  
})
*/




module.exports = router;


