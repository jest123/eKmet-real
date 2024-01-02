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
    database: "volos"
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
    console.log((Date.toString)+" Request");
    sql="select ZivalID,SPOL,UNIX_TIMESTAMP(DatumRojstva) AS DatumRojstva from zivali;";
    con.query(sql, function (err, response) {
        if (err) throw err;
        res.json(response);
    });
})
app.post('/add',urlencodedParser,(req,res)=>{
    sql="insert into Zivali(ZivalID,SPOL,PASMA,DatumRojstva,Tip,Lastnik) VALUES('"+req.body.ZivalID+"','"+req.body.spol+"','"+req.body.Pasma+"','"+req.body.DatumRojstva+"','Govedo',100223065);";
    con.query(sql, function (err, response) {
      if (err) throw err;
      res.statusCode=200;
      res.json(response);
  });
})
app.listen(5000,"0.0.0.0",()=>console.log("Server dela na portu 5000"));

