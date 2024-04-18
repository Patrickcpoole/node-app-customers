const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customer')
const app = express();
mongoose.set('strictQuery', false)

app.use(express.json());
app.use(express.urlencoded({extended: true}))

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

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

const customer = new Customer({
  name: 'Patrick',
  industry: 'Marketing'
});

app.get('/', (req, res) => {
  res.send(customer)
});

app.get('/api/customers', (req, res) => {
  res.send({data: customers})
});

app.post('/api/customers', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})

app.post('/', (req, res) => {
  res.send('POSTIN!')
})

const start = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);
  
    app.listen(PORT, () => {
      console.log('App listenting on port ' + PORT)
    });
  } catch(error) {
    console.log(error.message)
  }
}

start();

