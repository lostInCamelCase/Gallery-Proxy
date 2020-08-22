var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host: '172.17.0.2',
//   user: 'root',
//   password: 'password',
//   database: 'swag'
// });
// var connection = mysql.createConnection({
//   host: '172.17.0.2',
//   user: 'root',
//   password: 'hackreactor',
//   database: 'swag'
// });

connection.connect((err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Connected to DB')
  }
});

module.exports = connection;