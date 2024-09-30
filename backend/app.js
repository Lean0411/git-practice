require('dotenv').config();
const express = require('express');
const app = express();

//使用.env內的port
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})