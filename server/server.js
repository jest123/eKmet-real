const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

let i=0
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let db_config={
  host: "localhost",
  user: "root",
  password: "",
  database: "ekmet"
}
var con = mysql.createConnection(db_config);
  app.set('view engine', 'ejs');
  function handleDisconnect() {
    con = mysql.createConnection(db_config); 
    con.connect(function(err) {              
      if(err) {                              
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); 
      }                                     
    });                                     
                                            
    con.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();                        
      } else {                                     
        throw err;                                 
      }
    });
  }
  
  handleDisconnect();
app.get('/',(req,res)=>{
    console.log('HI');
    res.render('index',{text: 'WORLDD'});
})
app.get('/list',(req,res)=>{
    i++;
    let date=new Date();
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log("["+i+"]"+date.toLocaleString()+" request from "+ip);
    sql="select ZivalID,SPOL,UNIX_TIMESTAMP(DatumRojstva) AS DatumRojstva from zivali;";
    con.query(sql, function (err, response) {
        if (err) throw err;
        res.json(response);
    });
})
app.post('/add',urlencodedParser,(req,res)=>{
  let oce;
  if(req.body.Oce===undefined){
    console.log("AAA oce")
    oce="NULL";
  }
  else
    oce=req.body.Oce;
    sql="insert into Zivali(ZivalID,Spol,Pasma,DatumRojstva,Tip,Lastnik,Ime,Mati,Oce) VALUES('"+req.body.ZivalID+"','"+req.body.spol+"','"+req.body.Pasma+"','"+req.body.DatumRojstva+"','Govedo',100223065,'"+req.body.Ime+"','"+req.body.Mati+"','"+oce+"');";
    con.query(sql, function (err, response) {
      if (err) throw err;
      let date=new Date();
      let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
      console.log(req.body.ZivalID+" dodana iz "+ip+" ob "+date.toLocaleString());
      res.statusCode=200;
      res.redirect("http://localhost:5173");
  });
})
app.get('/details',(req,res)=>{
  i++;
  let date=new Date();
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  console.log("["+i+"]"+date.toLocaleString()+" request from "+ip+" for "+req.query.ID);
  sql="select ZivalID,SPOL,UNIX_TIMESTAMP(DatumRojstva) AS DatumRojstva,Ime,Pasma,Oce,Mati from zivali WHERE ZivalID='"+req.query.ID+"';";
  con.query(sql, function (err, response) {
      if (err) throw err;
      res.json(response);
  });
})
app.listen(5000,"0.0.0.0",()=>console.log("Server dela na portu 5000"));