const express = require('express');
const app = express();
const PORT = 3000;



const customers = [
  {
    "name": "Caleb",
    "industry": "Music"
  },
  {
    "name": "John",
    "industry": "Networking"
  },
  {
    "name": "Sal",
    "industry": "Sales"
  }
];

app.get('/', (req, res) => {
  res.send('Welcome')
});

app.get('/api/customers', (req, res) => {
  res.send({data: customers})
});

app.post('/', (req, res) => {
  res.send('POSTIN!')
})

app.listen(PORT, () => {
  console.log('App listenting on port ' + PORT)
});