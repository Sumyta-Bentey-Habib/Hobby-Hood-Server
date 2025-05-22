const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const groups = [];


app.get('/create-group', (req, res) => {
  res.send(JSON.stringify(groups));
});


app.post('/create-group', (req, res) => {
  const newGroup = req.body;
  console.log('Received new group:', newGroup);
  groups.push(newGroup);
  res.send({ message: 'Group created successfully!', group: newGroup });
});


app.get('/', (req, res) => {
  res.send('Hobby Hood server is running without MongoDB!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
