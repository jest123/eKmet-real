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
const nodemailer = require("nodemailer");
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
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "mail.ekmet@gmail.com",
    pass: "azth dufn owgg qeva",
  },
});
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
      res.statusCode = 200;
      res.json({
        data: response,
        imageURI: imageURI,
      });
    } else {
      res.json({ data: response });
    }
  });
})
app.post('/image', verifyToken, upload.single('image'), async (req, res) => {
  sql = "select slika from zivali LEFT JOIN creda using(CredaID) WHERE ZivalID='" + req.query.ID + "' AND zivali.Lastnik='" + req.KMGMID + "';";
  con.query(sql, async function (err, response) {
    if (err) throw err;
    const form = new FormData();
    form.append('data', response);
    if (response[0]!=undefined) {
      if(response[0].slika != undefined){
      const imageURI = await getImageBase64("./uploads/" + response[0].slika);
      res.statusCode = 200;
      res.json({
        imageURI: imageURI,
      });
    } else {
      res.json({ data: response });
    }
    } else {
      res.json({ data: response });
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
        res.status(200).cookie('token', token, { expire: 3600000 + Date.now() }).redirect("http://localhost:5173" + "/list");
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
  sql = "UPDATE Zivali SET spol='" + x.spol + "',pasma='" + x.pasma + "',ime='" + x.ime + "',mati='" + x.mati + "',oce='" + x.oce + "',credaID='" + x.credaID + "',Opombe='" + x.opombe + "'" + (req.file != undefined ? ",slika='" + req.file.filename + "'" : "") + " WHERE ZivalID='" + x.zivalID + "';";
  console.log(sql)
  con.query(sql, function (err, response) {
    if (err) throw err;
    res.send("MHMMM");
  })
})

app.post("/reset", urlencodedParser, (req, res) => {
  i++;
  let date = new Date();
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log("[" + i + "]" + date.toLocaleString() + " update request from " + ip);
  const token = Math.floor(Math.random() * 8999) + 1000;
  let found=false;
  sql = "select user from uporabniki;"
  con.query(sql, function (err, response) {
    if (err) throw err;
    let users = response;
    for (let i = 0; i < users.length; i++) {
      if (users[i].user == req.body.email) {
        sql = "INSERT INTO reset VALUES('" + req.body.email + "','" + token + "');"
        con.query(sql, function (err, response) {
          if (err) throw err;
          const mailOptions = {
            from: "mail.ekmet@gmail.com",
            to: req.body.email,
            subject: "Ponastavitev gesla",
            html: "<html><body>Pozdravljeni, pošiljamo povezavo za ponastavitev gesla <br/> <a href='http://localhost:5173/reset/" + token + "'>Ponastavitev gesla</a></body></html>",
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email: ", error);
            } else {
              console.log("Email sent: ", info.response);
            }
          });
        })
        found = true;
        res.redirect("http://localhost:5173/");
        break;
      }
      
    }
    if (!found) {
      res.status(401).json({ error: 'Authentication failed' });
    }
  })
  
  return;
})
app.post("/delete", urlencodedParser, verifyToken, (req, res) => {
  i++;
  let date = new Date();
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log("[" + i + "]" + date.toLocaleString() + " delete request from " + ip);
  sql = "DELETE FROM zivali WHERE ZivalID='" + req.body.zivalID + "';";
  con.query(sql, function (err, response) {
    if (err) throw err;

  })
  res.redirect("http://localhost:5173/list");
})
app.post("/resetPass", urlencodedParser, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.pass, 10);
  sql = "SELECT * FROM reset INNER JOIN uporabniki ON reset.email=uporabniki.user WHERE token=" + req.body.token + ";";
  con.query(sql, function (err, response) {
    sql = "UPDATE uporabniki SET pass='" + hashedPassword + "' WHERE KMGMID='" + response[0].KMGMID + "';";
    console.log(sql);
    con.query(sql, function (err, respo) {
      if (err) throw err;
    });

  });
  sql = "DELETE FROM reset WHERE token='" + req.body.token + "';";
  con.query(sql, function (err, response) {
    if (err) throw err;
    res.status(200).send;
  });
})
app.post("/users", urlencodedParser, (req, res) => {
  sql = "SELECT token FROM reset;";
  con.query(sql, function (err, response) {
    let found = false;
    for (let i = 0; i < response.length; i++) {
      if (response[i].token == req.query.token) {
        found = true;
        break;
      }
    }
    res.send(found);
  });
});
app.listen(5000, "0.0.0.0", () => console.log("Server dela na portu 5000"));