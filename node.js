const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('frontend'));

const db = mysql.createConnection({
  host: 'db',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.get('/api/guest', (req, res) => {
  db.query('SELECT * FROM guests', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/guest', (req, res) => {
  const { name, message } = req.body;
  db.query('INSERT INTO guests (name, message) VALUES (?, ?)', [name, message], (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
