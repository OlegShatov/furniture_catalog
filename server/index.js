const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

process.env.SECRET_KEY = "secret";

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "furniture",
  password: "",
});

// array to object
function toObject(data) {
  let object = {};
  for (var i = 0; i < data.length; ++i) object[i] = data[i];
  return object;
} // array to object

// авторизация пользователя
app.post("/users/authenticate", bodyParser.json(), function (req, res) {
  if (!req.body) return res.sendStatus(400);
  pool.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [req.body.username, req.body.password],
    function (err, data) {
      let user = toObject(data);
      if (user) {
        let token = jwt.sign(user, process.env.SECRET_KEY, {
          expiresIn: 1440,
        });
        user["token"] = token;
        res.json(user);
      } else {
        res.send("User does not exist");
      }
    }
  );
});

// получение списка предметов мебели
app.get("/items", function (req, res) {
  pool.query("SELECT * FROM items", function (err, data) {
    if (err) return console.log(err);
    res.send(data);
  });
});

/*
// получение списка пользователей
app.get("/", function (req, res) {
  pool.query("SELECT * FROM users", function (err, data) {
    if (err) return console.log(err);
    res.send(data);
  });
});

// получение списка пользователей
app.get("/users", function (req, res) {
  pool.query("SELECT * FROM users", function (err, data) {
    if (err) return console.log(err);
    res.send(data);
  });
});

// получем id редактируемого пользователя, получаем его из бд и отправлям с формой редактирования
app.get("/edit/:id", function (req, res) {
  const id = req.params.id;
  pool.query("SELECT * FROM users WHERE id=?", [id], function (err, data) {
    if (err) return console.log(err);
    res.render("edit.hbs", {
      user: data[0],
    });
  });
});
*/

app.listen(4000, function () {
  console.log("Сервер ожидает подключения...");
});
