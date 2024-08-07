const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = 'data.json';
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};
app.get('/api/pokemon', (req, res) => {
  const data = readData();
  res.json(data);
});
app.get('/api/owners', (req, res) => {
  const data = readData();
  const owners = [...new Set(data.map(pokemon => pokemon.pokemonOwnerName))];
  res.json(owners);

});
app.post('/api/pokemon', (req, res) => {
  const data = readData();
  const newPokemons = req.body;

  newPokemons.forEach(pokemon => {
    pokemon.id = uuidv4();
    data.push(pokemon);
  });

  writeData(data);
  res.status(201).json(newPokemons);
});
app.put('/api/pokemon/:id', (req, res) => {
  const data = readData();
  const index = data.findIndex(item => item.id === req.params.id);
  if (index !== -1) {
    data[index] = req.body;
    writeData(data);
    res.json(req.body);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});
app.delete('/api/pokemon/:id', (req, res) => {
  let data = readData();
  data = data.filter(item => item.id !== req.params.id);
  writeData(data);
  res.status(204).end();
});
app.delete('/api/pokemon', (req, res) => {
  writeData([]);
  res.status(204).end();
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});




