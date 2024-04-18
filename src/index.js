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
  res.send('welcome!')
});

app.get('/api/customers', async(req, res) => {
  
  // console.log(await mongoose.connection.db.listCollections().toArray())
  try {
    const result = await Customer.find()
    res.send({"customers": result})
  } catch(error) {
    res.status(500).json({error: error.message})
  }
  
});

app.get('/api/customers/:id', async(req, res) => {
  console.log({
    requestParams: req.params,
    requestQuery: req.query
  });

  try {
  const {id} = req.params;
  console.log(id);

  const customer = await Customer.findById(id);
  console.log(customer);
  if (!customer) {
    res.status(404).json({error: 'User not found'})
  } else {
    res.json({customer})
  }
  
} catch(error) {
  res.status(500).json({error: 'Something went wrong'})
}

});

app.post('/api/customers', async(req, res) => {
  console.log(req.body);
  const customer = new Customer(req.body);
  try {
    await customer.save();
    res.status(201).json({customer})
  } catch(error) {
    res.status(400).json({error: error.message})
  }

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

