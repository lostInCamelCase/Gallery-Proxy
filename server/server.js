const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client/dist')));

//gallery @ port 3009
app.get('/stay', (req, res) => {
  axios.get("http://3.101.80.128/stay")
    .then(response => {
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})
app.get('/stay/ratings', (req, res) => {
  axios.get("http://3.101.80.128/stay/ratings")
    .then(response => {
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})
app.get('/stay/pictures', (req, res) => {
  axios.get("http://3.101.80.128/stay/pictures")
    .then(response => {
      console.log('response', response.data)
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})

//calendar @ port 3011

app.get('/rentalpricing/', (req, res) => {
  axios.get("http://34.211.141.231/rentalpricing")
    .then(response => {
      console.log('response', response.data)
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})

//more places to stay @ port 8080

app.get('/properties', (req, res) => {
  axios.get("http://54.215.232.135/properties")
    .then(response => {
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})

app.get('/lists', (req, res) => {
  axios.get("http://54.215.232.135/lists")
    .then(response => {
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})




app.listen(port, () => {
  console.log(`listening on port: ${port}`);
})
