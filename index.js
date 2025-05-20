const express = require('express')
const app = express()
const port = process.env.port || 3000;
require('dotenv').config()

app.get('/', (req, res) => {
  res.send('Hobby Hood server is running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
