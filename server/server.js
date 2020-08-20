const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

// app.get('/hello', (req,res) => {
//   res.send('hello')
// })

//gallery @ port 3009
app.get('/stay', (req, res) => {
  axios.get("localhost:3009/stay")
    .then(response => {
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})
app.get('/stay/ratings', (req, res) => {
  axios.get("localhost:3009/stay/ratings")
    .then(response => {
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})
app.get('/stay/pictures', (req, res) => {
  axios.get("localhost:3009/stay/pictures")
    .then(response => {
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})

//calendar @ port 3011
app.all('/rentalpricing/*', (req, res) => {
  axios({
    method: req.method,
    url: "http://localhost:3011" + req.originalUrl,
    headers: req.headers,
    data: req.data
  }).then((response) => {
    res.send(response.data);
  }).catch((err) => console.log(err));

})

//more places to stay @ port 8080

app.get('/properties', (req, res) => {
  axios.get("localhost:8080/properties")
    .then(response => {
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})

app.get('/lists', (req, res) => {
  axios.get("localhost:8080/lists")
    .then(response => {
      res.send(response.data);
    })
    .catch (err => {
      console.log('error:', err);
    })
})
// app.all('/properties/*', (req, res) => {
//   axios({
//     method: req.method,
//     url: "http://localhost:8080" + req.originalUrl,
//     headers: req.headers,
//     data: req.data
//   }).then((response) => {
//     res.send(response.data);
//   }).catch((err) => console.log(err));
// })




app.listen(port, () => {
  console.log(`listening on port: ${port}`);
})
