const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();

let i=0
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ekmet"
  });
  app.set('view engine', 'ejs');
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
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
    sql="insert into Zivali(ZivalID,Spol,Pasma,DatumRojstva,Tip,Lastnik) VALUES('"+req.body.ZivalID+"','"+req.body.spol+"','"+req.body.Pasma+"','"+req.body.DatumRojstva+"','Govedo',100223065);";
    con.query(sql, function (err, response) {
      if (err) throw err;
      let date=new Date();
      let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
      console.log(req.body.ZivalID+" dodana iz "+ip+" ob "+date.toLocaleString());
      console.log(typeof req.body.Pasma);
      res.statusCode=200;
      res.redirect("http://localhost:5173");
  });
})
app.listen(5000,"0.0.0.0",()=>console.log("Server dela na portu 5000"));