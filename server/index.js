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
  pool.query("SELECT id, name FROM items", function (err, data) {
    if (err) return console.log(err);
    res.send(data);
  });
});

// получение описания предмета мебели
app.get("/items/desc/:id", function (req, res) {
  const id = req.params.id;
  pool.query("SELECT description FROM items WHERE id=?", [id], function (
    err,
    data
  ) {
    if (err) return console.log(err);
    res.json(data[0].description);
  });
});

// получение списка изображений предмета мебели
app.get("/items/images/:id", function (req, res) {
  const id = req.params.id;
  pool.query("SELECT items.name, slider.itemsId, photos.name FROM slider " +
   "INNER JOIN photos ON slider.photosId = photos.id " +
   "INNER JOIN items ON slider.itemsId = items.id WHERE items.id = ?", [id], function (
    err,
    data
  ) {
    if (err) return console.log(err);
    res.json(data);
  });
});

// загрузка изображения предмета мебели
app.get("/images/download/:fileName", function (req, res) {
  const file = __dirname + '/images/' + req.params.fileName;
  res.sendFile(file);
  });

app.listen(4000, function () {
  console.log("Server listening on port 4000...");
});
