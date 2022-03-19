const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

const haiku = () => {
  const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry",
  "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
  "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered",
  "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
  "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
  "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
  "wandering", "withered", "wild", "black", "young", "holy", "solitary",
  "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
  "polished", "ancient", "purple", "lively", "nameless"];

  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
  "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
  "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
  "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
  "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
  "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf",
  "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
  "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
  "frog", "smoke", "star"];

  return adjs[Math.floor(Math.random()*(adjs.length-1))]+"_"+nouns[Math.floor(Math.random()*(nouns.length-1))];
}

const getConnection = () => {
  const connection = mysql.createConnection(config);

  const createTableIfNotExists = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY(id));`;
  connection.query(createTableIfNotExists);

  return connection;
}

app.get('/', async (req, res) => {
  const connection = getConnection();
  const sql = `INSERT INTO people (name) values ('${haiku()}')`;
  connection.query(sql);

  const getAllPeople = `SELECT * FROM people`;
  connection.query(getAllPeople, (error, results) => {
    if (error) {
      throw error
    };
    
    const list = `<ol>${results.map((people) => `<li>${people.name}</li>`).join("")}</ol>`;

    connection.end();

    res.send('<h1>Full Cycle Rocks!</h1>' + list);    
  });
});

app.listen(port, () => {
  console.log('Running on port ' + port);
});