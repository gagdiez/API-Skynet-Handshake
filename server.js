// setup the package variables
const express        = require('express');
const fetch          = require('node-fetch');
const bodyParser     = require('body-parser');
const cors           = require('cors');

// initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/specific', (req, res) => {
  // Lets give the users some INFO
  res.sendFile(__dirname + '/www/specific.html')
});

// When the web is accessed
app.get('/*', (req, res) => {
  // Lets give the users some INFO
  res.sendFile(__dirname + '/www/index.html')
});

// When the method PUT is called
app.put('/', (req, res) => { 
  const ACCESS_KEY = req.body['access_key'];
  const SECRET_KEY = req.body['secret_key'];
  const sialink = req.body['sialink']
  const url = 'https://namebase.io/api/v0/dns/domains/' + req.body['domain']
  
  // Create Auth
  const credentials = Buffer.from(`${ACCESS_KEY}:${SECRET_KEY}`);
  const encodedCredentials = credentials.toString('base64');
  const authorization = `Basic ${encodedCredentials}`;   
  const data = `{"records":[{"type":"TXT", "host":"","value":"${sialink}","ttl":0}]}`
  
  const options = {method:'PUT', body:data,
                   headers:{Authorization:authorization, 
                            Accept:'application/json',
                            'Content-Type':'application/json'}}
  fetch(url, options)
  .then(result => result.json())
  .then(result => res.send(result))
  .catch(err => console.error(err))
});

// Start the app
app.listen(process.env.PORT, () => console.log('server started'));