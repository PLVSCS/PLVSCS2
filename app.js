var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql      = require('mysql');  

var connection = mysql.createConnection({
  host     :'plvscdb2.clvqxdczmykt.ap-southeast-1.rds.amazonaws.com',
  user     :'plvscs',
  password : 'plvscsdb2022',
  database:'plvscdb',
  multipleStatements: true
  
});


/*
var connection = mysql.createConnection({
  host: 'sql6.freemysqlhosting.net',
  user: 'sql6482238',
  password: '6Rw8l7HZfx',
  database: 'sql6482238',
  multipleStatements: true

});*/
 
 
/*
connection.connect((err)=>{
    if(err) {
        console.log(err)
        return ;
    }
    
  //console.log('connected as id ' + connection.threadId);
  
    
    
});
*/
//var connection;


function handleDisconnect() {
  var con = mysql.createConnection(connection); // Recreate the connection, since
                                                  // the old one cannot be reused.

  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      //setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    con.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      //handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();





/*
sql = "select id from student"



connection.query(sql,(err,result)=>{
  if(err) {
    console.log(err)
  }
  
  console.log(result)
  
  
})  */




const QrScanner = require('qr-scanner')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var studentRouter = require('./routes/student');
var eventRouter = require('./routes/event');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);



io.on('connection',async(socket)=>{
  
  console.log("a user connected")
  
  
  
  
})











/*

const uri = "mongodb+srv://Ibrahim:ib130860011@cmrtcforum.dj6tu.mongodb.net/qrcodesla?retryWrites=true&w=majority";

mongoose.connect('mongodb://localhost:27017/newPlvsc',
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
).then(()=> {
    console.log("connected successfuly")})
*/



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
    req.con = connection
    next();
});

app.use(function(req, res, next) {
    req.io = io;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);
app.use('/event', eventRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = {
  app: app,
  server: server
};

//module.exports = app;
