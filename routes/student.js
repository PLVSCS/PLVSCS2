const express = require('express');
const router = express.Router();
const studentdb = require('../models/student');
const sessions = require('express-session');
var base64ToImage = require('base64-to-image');

var QRCode = require('qrcode')

var aes256 = require('aes256');


router.get('/', (req, res) => {

  
  // session=req.session;
  // if(!session.userid){
  //   res.send(403);
  //   return;
  // }

  res.render('student')
})


router.post('/', async (req, res) => {





  sqldb = req.con;
  // mysql
  sqldb.query(`select * from student where studentNo = "${req.body.studentid}" `, (err, result) => {

    if (err) {
      res.send(err)
      console.log(err)
      return
    }


    

    



    currentStudent = result[0]
    let noOfNotification

    console.log(result)

    
    var key = 'plvscs';
    var encryptedpass = currentStudent.password;

    var decryptedpass = aes256.decrypt(key,encryptedpass);


    session=req.session;
    session.userid=req.body.studentid;
    session.userrow=currentStudent.id;
    console.log(req.session)


    if (currentStudent && decryptedpass == req.body.password) {

      sqldb.query(`select * from studentnoofnotification where studentId = ${currentStudent.id}`, (err, rows_) => {

      
        QRCode.toDataURL(currentStudent.id.toString(), function (err, url) {
          studentqrCode = url;
          var notif = rows_.length > 0 ? rows_[0].noOfNotification : 0;
          res.render('studentdashboard', { 
            currentStudent, 
            url, 
            noOfNotification:  notif,
            lackingHours:currentStudent.lackingHours
          })
        })

      })
    }


    else {
      res.send("Student with these credentials does not exist or is incorrect, please coordinate with OIC for your account. Thank You!")

    }




  })
})

router.post("/change_password/:studentid", (req, res) => {

  // session=req.session;
  // if(!session.userid){
  //   res.send(403);
  //   return;
  // }



  sqldb = req.con;

  sqldb.query(`select * from student where id = ${req.params.studentid}`, (err, result) => {
    if (err) {
      res.send(err)
      return
    }


    student = result[0]


    var key = 'plvscs';
    let currpassword = aes256.decrypt(key,student.password);
    var updatedpassword = aes256.encrypt(key,req.body.newpassword);
  


    if (currpassword == req.body.currentpassword) {


      

      sqldb.query(`update student set password ='${updatedpassword}' where id =${req.params.studentid}`, (err, result) => {
        if (err) {


        
          res.send("password could not be changed . Please try again: " + err);
          return;

        }

        res.send("password was changed successfully")
        
      })
    }else{
        res.send("Error occured. Please try again.");
    }


  })
})



router.get("/dashboard/:studentid", (req, res) => {


  // session=req.session;
  // if(!session.userid){
  //   res.send(403);
  //   return;
  // }


  sqldb = req.con;

  sqldb.query(`select * from eventandwishingtoparticipate join event on eventandwishingtoparticipate.eventId = event.id  where studentId = ${req.params.studentid};
    select * from eventstudentandhours join event on eventstudentandhours.eventId = event.id  where studentId = ${req.params.studentid};
    select * from student where id = '${req.params.studentid}'
    `, (err, result) => {

    if (err) {
      res.send(err)
      return
    }


    res.send(result)
  })


})

//let currentStudent = await studentdb.findOne({studentNo:req.body.studentid})

//let allStudent = await studentdb.find() ;
//console.log(allStudent)

router.get("/notifications/:studentid", (req, res) => {


  // session=req.session;
  // if(!session.userid){
  //   res.send(403);
  //   return;
  // }


  sqldb = req.con


  sqldb.query(`select * from studentnoofnotification where studentId = ${sqldb.escape(req.params.studentid)}`, (err, rows) => {

    if (err) {
      console.log(err)
    }

    console.log("vvvvvv---66---5------ rows " + JSON.stringify(rows
    ))

    //  res.status(200)
    res.send(rows)


  })





})



router.get(`/all_notification/:studentid`, (req, res) => {


  // session=req.session;
  // if(!session.userid){
  //   res.send(403);
  //   return;
  // }

  sqldb = req.con;


  sqldb.query(`select * from studentnotification where studentId =${req.params.studentid.replace("%20", " ").trim()} order by id desc`, (err, result) => {

    if (err) {
      res.send(err)
      return
    }


    sqldb.query(`update studentnoofnotification set  noOfNotification = 0 where studentId = ${sqldb.escape(req.params.studentid)} `, (err, result__) => {
      if (err) {
        console.log("err- " + err)
      }
    })


    res.send(result)



  })




})
















module.exports = router;

