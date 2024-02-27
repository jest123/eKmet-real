const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require('./middleware/authMiddleware');
var cookieParser = require('cookie-parser');
const util = require('util');
const { verify } = require('crypto');
const fs = require('fs');
app.use(express.json());
app.use(cookieParser());
let i = 0
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });
let db_config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "ekmet"
}
var con = mysql.createConnection(db_config);
app.set('view engine', 'ejs');
function handleDisconnect() {
  con = mysql.createConnection(db_config);
  con.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  con.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();
// util function to get the base64 encoded string for passed image.
const readFileAsync = util.promisify(fs.readFile);
async function getImageBase64(filePath) {
  const image = await readFileAsync(filePath);
  const buffer = Buffer.from(image);
  return `data:image/png;base64,${buffer.toString("base64")}`;
}
app.get('/', (req, res) => {
  console.log('HI');
  res.render('index', { text: 'WORLDD' });
})
app.post('/list', verifyToken, (req, res) => {
  i++;
  let date = new Date();
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log("[" + i + "]" + date.toLocaleString() + " request from " + ip);
  console.log(req.KMGMID);
  sql = "select ZivalID,SPOL,UNIX_TIMESTAMP(DatumRojstva) AS DatumRojstva from zivali WHERE Lastnik='" + req.KMGMID + "';";
  con.query(sql, function (err, response) {
    if (err) throw err;
    res.json(response);
  });
})
app.post('/add', verifyToken, urlencodedParser, (req, res) => {
  let oce;
  if (req.body.Oce === undefined) {
    oce = "NULL";
  }
  else
    oce = req.body.Oce;
  sql = "insert into Zivali(ZivalID,Spol,Pasma,DatumRojstva,Tip,Lastnik,Ime,Mati,Oce) VALUES('" + req.body.ZivalID + "','" + req.body.spol + "','" + req.body.Pasma + "','" + req.body.DatumRojstva + "','Govedo','" + req.KMGMID + "','" + req.body.Ime + "','" + req.body.Mati + "','" + oce + "');";
  con.query(sql, function (err, response) {
    if (err) throw err;
    let date = new Date();
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log(req.body.ZivalID + " dodana iz " + ip + " ob " + date.toLocaleString());
    res.statusCode = 200;
    let server = "http://localhost:5173";
    res.redirect(server);
  });
})
app.post('/details', verifyToken, (req, res) => {
  i++;
  let date = new Date();
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log("[" + i + "]" + date.toLocaleString() + " request from " + ip + " for " + req.query.ID);



  sql = "select ZivalID,SPOL,UNIX_TIMESTAMP(DatumRojstva) AS DatumRojstva,Ime,Pasma,Oce,Mati,credaID,Zivali.Opombe,slika from zivali LEFT JOIN creda using(CredaID) WHERE ZivalID='" + req.query.ID + "' AND zivali.Lastnik='" + req.KMGMID + "';";
  con.query(sql, async function (err, response) {
    if (err) throw err;
    const form = new FormData();
    form.append('data', response);
    if (response[0].slika != undefined) {
      const imageURI = await getImageBase64("./uploads/" + response[0].slika);
      res.statusCode=200;
      res.json({
        data: response,
        imageURI: imageURI,
      });
    }else{
    res.json({data:response});
    }
  });
})
app.post('/register', urlencodedParser, async (req, res) => {
  try {
    const { username, password, KMGMID } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    i++;
    let date = new Date();
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    console.log("[" + i + "]" + date.toLocaleString() + " registration from " + ip + " user" + username);
    sql = "INSERT INTO uporabniki VALUES('" + KMGMID + "','" + username + "','" + hashedPassword + "');";
    con.query(sql, function (err, response) {
      if (err) throw err;
    });
    res.status(201).redirect("http://localhost:5173");
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
    console.log(error);
  }
});
app.post('/login', urlencodedParser, async (req, res) => {
  try {
    const { KMGMID, password } = req.body;
    sql = "SELECT * FROM uporabniki WHERE KMGMID='" + KMGMID + "';";
    con.query(sql, function (err, response) {
      if (response.length <= 0) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      bcrypt.compare(password, response[0].pass).then(passwordMatch => {
        if (!passwordMatch) {
          return res.status(401).redirect("http://localhost:5173");
        }
        const token = jwt.sign({ KMGMID: KMGMID }, 'your-secret-key', {
          expiresIn: '1h',
        });
        res.status(200).cookie('token', token, { expire: 3600000 + Date.now() }).redirect("http://localhost:5173"+"/list");
      });

    });
  } catch (error) {
    res.status(500).redirect("http://localhost:5173");
  }
});
app.post('/addCreda', urlencodedParser, verifyToken, async (req, res) => {
  sql = "INSERT INTO Creda(ImeCrede,Opombe,lastnik) VALUES('" + req.body.ImeCrede + "','" + req.body.Opombe + "','" + req.KMGMID + "');";
  con.query(sql, function (err, response) {
    console.log("ADDEDD")
    if (err) console.log("ERROR " + err);
    res.status(200).send();
  })

});
app.post('/credaList', urlencodedParser, verifyToken, (req, res) => {
  i++;
  let date = new Date();
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log("[" + i + "]" + date.toLocaleString() + " crede request from " + ip);
  sql = "SELECT * FROM creda WHERE Lastnik='" + req.KMGMID + "';";
  con.query(sql, function (err, response) {
    if (err) throw err;
    res.status(200).send(response);
  })
})
app.post('/creda', urlencodedParser, verifyToken, (req, res) => {
  i++;
  let date = new Date();
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log("[" + i + "]" + date.toLocaleString() + " request creda list from " + ip);
  sql = "select ZivalID,SPOL,UNIX_TIMESTAMP(DatumRojstva) AS DatumRojstva from zivali WHERE Lastnik='" + req.KMGMID + "' AND CredaID='" + req.body.credaID + "';";
  console.log(sql);
  con.query(sql, function (err, response) {
    if (err) throw err;
    res.json(response);
  });
})
app.post('/update', upload.single("img"), verifyToken, (req, res) => {
  i++;
  let date = new Date();
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log("[" + i + "]" + date.toLocaleString() + " update request from " + ip);
  let x = JSON.parse(req.body.data)
  sql = "UPDATE Zivali SET spol='" + x.spol + "',pasma='" + x.pasma + "',ime='" + x.ime + "',mati='" + x.mati + "',oce='" + x.oce + "',credaID='" + x.credaID + "',Opombe='" + x.opombe + "'"+(req.file!=undefined?",slika='" + req.file.filename + "'":"")+" WHERE ZivalID='" + x.zivalID + "';";
  console.log(sql)
  con.query(sql, function (err, response) {
    if (err) throw err;
    res.send("MHMMM");
  })
})
app.post("/delete",urlencodedParser,verifyToken,(req,res)=>{
  i++;
  let date = new Date();
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log("[" + i + "]" + date.toLocaleString() + " update request from " + ip);
  sql = "DELETE FROM zivali WHERE ZivalID='"+req.body.ZivalID+"';";
  console.log(sql)
  con.query(sql, function (err, response) {
    if (err) throw err;
    res.redirect("http://localhost:5173/list");
  })
})
app.listen(5000, "0.0.0.0", () => console.log("Server dela na portu 5000"));