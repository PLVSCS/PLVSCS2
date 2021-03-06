const express = require('express');
const router = express.Router();
const studentdb = require('../models/student');
const admindb = require('../models/admin');
const eventdb = require('../models/event');
const multer = require('multer');
const mysql = require("mysql");
const readXlsxFile = require('read-excel-file/node');
var aes256 = require('aes256');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage
})





router.get('/', (req, res) => {
  res.render('admin')
})




router.get('/import-accounts', (req, res) => {
  res.render('importaccount')
})






router.get('/generate-certificate',(req, res) => {

    sqldb = req.con;

    sqldb.query(`SELECT stdnt.id,stdnt.studentNo,stdnt.firstName,stdnt.surname,stdnt.lackingHours,(select ifnull(sum(hourRendered),0)  from eventstudentandhours where studentId = stdnt.id ) as rendered FROM student as stdnt;`, (err, result) => {
      if (err) {
        res.send(err)
      }
      res.render("generatecertificate",{
        results:result
      });
    })

});





router.post('/certificate',(req, res) => {

  let name = req.body.name;
  let lacking = req.body.lacking;
  let rendered = req.body.rendered;

  res.render("certificate",{
    name:name,
    lacking:lacking,
    rendered:rendered,
  });

});







router.post('/import-accounts', upload.single('excelfile'), (req, res, next) => {


  let filename = req.file.filename;
  let importfor = req.body.accountfor;

  let filepath = '../public/uploads/' +filename;

  readXlsxFile(filepath).then((rows) => {
    // Remove Header ROW
    rows.shift();
    // Open the MySQL connection
    
    sqldb = req.con;

    
    let query = `INSERT INTO ${importfor} (id,studentNo,email,surname,contactNo,firstName,address,middleName,username,course,password,emergencyName,emergencyNumber,studentStatus,lackingHours,academicYearStarted) VALUES ?`;
    sqldb.query(query, [rows], (error, response) => {
       
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write("<h1>Records Successfully Imported!</h1><br><br><b><a href='javascript:history.back(2)'>Go Back</a>");
      res.end();


    });
  });


  
})














































router.post("/validate_action/:eventid", (req, res) => {


  // session = req.session;
  // if (!session.userid) {
  //   res.send(403);
  //   return;
  // }

  sqldb = req.con

  let studentsid = req.body.studentid;
  let eventid = req.params.eventid;

  sqldb.query(`update event set isValidated = 1 where id = ${eventid}`, (err, result) => {
    if (err) {
      res.send(err)
    }
  })



  studentsid.forEach(id => {


    // let d = [];
    // d.push(id);
    // res.send(d);
    // return;




    sqldb.query(`select esh.*,ev.* from eventstudentandhours as esh join event as ev on esh.eventId = ev.id  where esh.studentId = ${id} and ev.id = ${eventid} `, (err, result) => {


      if (err) {
        res.send(err)
      }


      let timein = result[0].timeIn;
      let timeout = result[0].timeOut;
      let eventhrs = result[0].eventHours;


      if (timeout == null || timeout == "" || timeout == "00:00") {

      } else {


        sqldb.query(`update eventstudentandhours set hourRendered = (hours_multiplier * ${eventhrs}) where studentId = ${id} and eventId = ${eventid}`, (err, result) => {
          console.log("Hours Updated!");
        })

      };
    })
  });

  res.send("Validated");
})





router.get("/list_of_event/:adminid", (req, res) => {

  // session = req.session;
  // if (!session.userid) {
  //   res.send(403);
  //   return;
  // }

  sqldb = req.con;

  sqldb.query(`select * from adminandcreatedevent join event on adminandcreatedevent.eventId = event.id where adminId = ${req.params.adminid}`, (err, result) => {
    if (err) {
      res.send(err)
    }


    res.send(result)
  })


})



router.get("/list_of_event_approved/:adminid", (req, res) => {


  // session = req.session;
  // if (!session.userid) {
  //   res.send(403);
  //   return;
  // }

  sqldb = req.con;

  sqldb.query(`select * from adminandcreatedevent join event on adminandcreatedevent.eventId = event.id where adminId = ${req.params.adminid} and eventStatus = 1  `, (err, result) => {
    if (err) {
      res.send(err)
      return
    }
    console.log("app... " + JSON.stringify(result))

    res.send(result)
  })


})










router.post('/', async (req, res) => {


  // session = req.session;
  // if (!session.userid) {
  //   res.send(403);
  //   return;
  // }


  sqldb = req.con
  //let incoming = await admindb.findOne({idNo:req.body.adminid})  ;
  let incomingMysql;
  let currentAdminMysql, currentAdmin;








  if (req.body.adminid === "administheid" && req.body.password === "administhepassword") {

    res.render('adminDashborad')
    return;
  }







  //mysql
  else if (req.body.adminid != "administheid" && req.body.password != "administhepassword") {
    req.con.query(`select * from admin where idNo = ${req.body.adminid};
 select admin.id, adminnoofnotification.adminId,adminnoofnotification.noOfNotification,admin.idNo from admin join adminnoofnotification on admin.id = adminnoofnotification.adminId where admin.idNo = "${req.body.adminid}"
 `, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }


      incomingMysql = currentAdmin = currentAdminMysql = result[0][0];


      let currentadminpass = incomingMysql.password;

      var key = 'plvscs';
      var decryptedpass = aes256.decrypt(key, currentadminpass);


      if (decryptedpass == req.body.password) {




        if (currentAdminMysql.adminType == "eao") {



          


          res.render('eaodashboard', { adminType: "EAO DASHBOARD", currentAdmin, noOfNotification_: result[1][0] })










          return;
        }


        if (currentAdminMysql.adminType == "oic") {
          console.log();

          session=req.session;
          session.username= currentAdminMysql.firstName + " " +currentAdminMysql.surname;
       

          res.render('oicdashboard', { adminType: "OIC DASHBOARD", currentAdmin, noOfNotification_: result[1][0] })

          return;
        }







      }





      else {
        res.send("The admin info entered does not exist or are incorrect.")

        return
      }







    })
  } else {
    res.send("The admin info you provided are incorrect.")
  }





















})




router.post('/create/:entity', upload.single('scannedimage'), async (req, res) => {


  // session = req.session;
  // if (!session.userid) {
  //   res.send(403);
  //   return;
  // }

  sqldb = req.con;
  io = req.io;


  var encryptedpass = "";

  if (req.params.entity != "event") {
    var key = 'plvscs';
    var plaintext = req.body.password;
  
    encryptedpass = aes256.encrypt(key,plaintext);  
  }





  if (req.params.entity == 'student') {


    //mysql
    sqldb.query(`insert into student(studentNo,email,surname,contactNo,firstName,address,middleName,course,password,emergencyName,emergencyNumber,lackingHours,academicYearStarted) values('${req.body.studentno}','${req.body.email}','${req.body.surname}','${req.body.contactno}','${req.body.firstname}','${req.body.address}', '${req.body.middlename}', '${req.body.course}','${encryptedpass}','${req.body.emername}','${req.body.emerno}','${req.body.lackinghours}','${req.body.academicyearstarted}')`, (err, result) => {
      if (err) {
        res.send(err)
        console.log(err)
        return;
      }


      sqldb.query(`insert into studentnoofnotification(studentId) values(${sqldb.escape(result.insertId)}) `, (err, row) => {
        if (err) {
          console.log("err of studentnotification " + err)
        }

      })


      res.send("Please ask the student to login with the following details" + '<br>' + "Student Id:" + req.body.studentno + "<br>" + "Password:" + req.body.password)

      console.log(result)
    })

    /*
    newStudent = new studentdb({studentNo:req.body.studentno,
  email:req.body.email,
  surname:req.body.surname,
  contactNo:req.body.contactno,
  firstName:req.body.firstname,
  address:req.body.address,
  middleName:req.body.middlename,
  username:req.body.username,
  course:req.body.course,
  password:req.body.password,
  emergencyName:req.body.emername,
  emergencyNumber:req.body.emerno})

    await newStudent.save().then(()=>{
      res.send("Please ask the student to login with the following detail" + '<br>'+"Student Id:"+req.body.studentno + "<br>"+"password:"+req.body.password)
    console.log("success:Mongodb")
    }).catch((err)=>{
      res.send(err + " "+ "please try again later")
    })
    */




  }


  else if (req.params.entity == "event") {

    // res.send((req.file.path.substring(7).toString()).replace('\\','/'));
    // return;


    let noOfStu;
    if (req.body.eventnoofstudent == "" | " ") {
      noOfStu = "Unlimited Number of Student"
    } else {
      noOfStu = req.body.eventnoofstudent
    }



    //mysql
    sqldb.query(`insert into event(eventName,eventHours,eventnoofstudent,eventStartDate,eventEndDate,eventVenue,dateAndTime,scannedImage,schoolYear,semester,eventNeededMaterial) values(
      '${req.body.eventname}',
      '${req.body.eventhours}',
      '${noOfStu}',
      '${req.body.eventstartdate}',
      '${req.body.eventenddate}',
      '${req.body.venue}',
      '${req.body.dateandtime}',
      '${(req.file.path.substring(10).toString()).replace('\\', '/')}',
      '${req.body.schoolyear}',
      '${req.body.semester}','${req.body.material}')`, (err, result) => {
      if (err) {
        console.log(err)
        return;
      }


      sqldb.query(`insert into adminandcreatedevent(adminId,eventId) values(${req.body.id_admin},${result.insertId})`, (err, result) => {
        if (err) {
          console.log(err)
        }
      })






      //adminnoofnotification



      sqldb.query(`select id from admin where adminType = "oic";select eventName from event where id = ${result.insertId}`, (err, result1) => {
        if (err) {
          console.log(err)
        }

        let newNotifications = []

        result1[0].forEach((n) => {
          newNotifications.push([`${n.id}`, `A new event has been created "${result1[1][0].eventName}"`])
        })

        sqldb.query(`insert into adminnotification(adminId,notification) values ?`, [newNotifications], (err, result) => {

          if (err) {
            console.log(err)
          }














          sqldb.query(`update adminnoofnotification set noOfNotification = noOfNotification + 1 where adminType = "oic"`, (err, rows) => {


            if (err) {
              console.log("noOfNotification err " + err)
            }



          })





















        })


        io.emit("new event was created for oic", `${req.params.evid}`)



      })


      //end Notification






      /* console.log("admin_id...:" +req.body.id_admin)
       console.log("inserted Id " + JSON.stringify(result))*/


      res.send("Event was created succesfully.")

      console.log(result)

    })


    /*

  newEvent = new eventdb({
  eventName:req.body.eventname,
  eventHours:req.body.eventhours,
  eventnoofstudent:noOfStu,
  eventStartDate:req.body.eventstartdate,
  eventEndDate:req.body.eventenddate,
  eventVenue:req.body.venue,
  dateAndTime: req.body.dateandtime,
  scannedImage : removePublic(req.file.path)

  }) ;

  await newEvent.save().then(()=>{res.send("event was created succesfully")}).catch((e)=>{res.send("try again" + e)})

  */


  }


  else if (req.params.entity === "eao") {

    //mysql
    sqldb.query(`insert into admin(idNo,email,surname,contactNo,firstName,middleName,department,password,adminType) values('${parseInt(req.body.idnumber)}',
      '${req.body.email}',
      '${req.body.Surname}',
      '${req.body.contactnumber}',
      '${req.body.firstname}',
      '${req.body.middlename}',      
      '${req.body.department}',
      '${encryptedpass}',
      'eao'
      )`, (err, result) => {
      if (err) {
        console.log(err)
        return;
      }



      sqldb.query(`insert into adminnoofnotification(adminId,adminType) values(${sqldb.escape(result.insertId)},"eao") `, (err, row) => {
        if (err) {
          console.log("err of adminnotification " + err)
        }

      })







      res.send(`Ask the Event & Activity Organizer to login with the following: <br> Admin Id:${req.body.idnumber} <br> Password:${req.body.password}`)



    })

    /*
    newAdmin = new admindb({
    idNo:req.body.idnumber,
  email:req.body.email,
  surname:req.body.Surname,
  contactNo:req.body.contactnumber,
  firstName:req.body.firstname,
  middleName:req.body.middlename,
  username:req.body.username,
  departmentCode:req.body.departmentcode,
  departmen:req.body.department,
  password:req.body.password,
  adminType:"eao"})

  await newAdmin.save().then(()=>{
    res.send(`ask the EAO to login with the follwoing: <br> adminid:${req.body.idnumber} <br> password:${req.body.password}`)
  }).catch((e)=>{res.send(e + "please try again. An err occured")}) */




  }


  else if (req.params.entity === "oic") {

    //mysql
    sqldb.query(`insert into admin(idNo,email,surname,contactNo,firstName,middleName,department,password,adminType) values('${parseInt(req.body.idnumber)}',
      '${req.body.email}',
      '${req.body.Surname}',
      '${req.body.contactnumber}',
      '${req.body.firstname}',
      '${req.body.middlename}',      
      '${req.body.department}',
      '${encryptedpass}',
      'oic'
      )`, (err, result) => {
      if (err) {
        console.log(err)
      }



      sqldb.query(`insert into adminnoofnotification(adminId,adminType) values(${sqldb.escape(result.insertId)},"oic") `, (err, row) => {
        if (err) {
          console.log("err of adminnotification " + err)
        }

      })




      res.send(`Ask the Officer-In-Charge to login with the follwoing: <br> Admin Id:${req.body.idnumber} <br> Password:${req.body.password}`)

      console.log(result)

    })









    /*

    newAdmin = new admindb({
    idNo:req.body.idnumber,
  email:req.body.email,
  surname:req.body.Surname,
  contactNo:req.body.contactnumber,
  firstName:req.body.firstname,
  middleName:req.body.middlename,
  username:req.body.username,
  departmentCode:req.body.departmentcode,
  departmen:req.body.department,
  password:req.body.password,
  adminType:"oic"})

  await newAdmin.save().then(()=>{
    res.send(`ask the oic to login with the follwoing: <br> adminid:${req.body.idnumber} <br> password:${req.body.password}`)
  }).catch((e)=>{res.send(e + "please try again. An err occured")})


    */

  }





  else if (req.params.entity === "acctmaker") {

    //mysql
    sqldb.query(`insert into admin(idNo,email,surname,contactNo,firstName,middleName,departmentCode,department,password,adminType) values('${parseInt(req.body.idnumber)}',
      '${req.body.email}',
      '${req.body.Surname}',
      '${req.body.contactnumber}',
      '${req.body.firstname}',
      '${req.body.middlename}',
      '${parseInt(req.body.departmentcode)}',
      '${req.body.department}',
      '${encryptedpass}',
      'acctmaker'
      )`, (err, result) => {
      if (err) {
        console.log(err)
      }



      sqldb.query(`insert into adminnoofnotification(adminId,adminType) values(${sqldb.escape(result.insertId)},"acctmaker") `, (err, row) => {
        if (err) {
          console.log("err of adminnotification " + err)
        }

      })




      res.send(`ask the account maker to login with the follwoing: <br> adminid:${req.body.idnumber} <br> password:${req.body.password}`)

      console.log(result)
    })


  }



})



router.post("/change_password/:adminid", (req, res) => {

  // session = req.session;
  // if (!session.userid) {
  //   res.send(403);
  //   return;
  // }


  sqldb = req.con;

  sqldb.query(`select * from admin where idNo = ${req.params.adminid}`, (err, result) => {
    if (err) {
      res.send(err)
      return
    }

    admin = result[0]
   

    var key = 'plvscs';
    let currpassword = aes256.decrypt(key,admin.password);
    var updatedpassword = aes256.encrypt(key,req.body.newpassword);
    

    if (currpassword == req.body.currentpassword) {

      sqldb.query(`update admin set password ='${updatedpassword}' where idNo =${req.params.adminid}`, (err, result) => {
        if (err) {
          res.send("password could not be changed . Please try again: " + err)
          return;
        }

        res.send("Password was changed successfully.")
        return;
      })
    }


  })



})




router.post('/mass_account', (req, res) => {


  // session = req.session;
  // if (!session.userid) {
  //   res.send(403);
  //   return;
  // }

  sqldb = req.con


  accrows = JSON.parse(req.body.info)


  sing = []

  accrows.forEach((n) => {

    sing.push((n))

  })



  //console.log(accrows)


  sqldb.query(`insert into student(studentNo,email,surname,contactNo,firstName,address,middleName,course,password,academicYearStarted) values ?`, [sing], (err, inff) => {

    if (err) {
      res.send(err)
      return
    }

    res.send(inff)

  })













})
























router.get("/no_of_notification/:adminid", (req, res) => {


  // session = req.session;
  // if (!session.userid) {
  //   res.send(403);
  //   return;
  // }

  sqldb = req.con;


  sqldb.query(`select * from adminnoofnotification where adminId=${req.params.adminid}`, (err, result) => {

    if (err) {
      console.log("admi")
    }

    res.send(result[0])
  })



})



router.get("/allnotification/:adminid", (req, res) => {


  // session = req.session;
  // if (!session.userid) {
  //   res.send(403);
  //   return;
  // }

  sqldb = req.con;


  sqldb.query(`update adminnoofnotification set noOfNotification = 0 where adminId = ${req.params.adminid}`, (err, r1) => {

    if (err) {
      console.log(err)
    }


    sqldb.query(`select * from adminnotification where adminId= ${req.params.adminid}`, (err, resultpp) => {
      if (err) {
        console.log(err)
      }


      res.send(resultpp)
    })


  })






})





module.exports = router




