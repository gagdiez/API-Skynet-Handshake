// setup the package variables
const express        = require('express');
const fetch          = require('node-fetch');
const bodyParser     = require('body-parser');
const cors           = require('cors');

// initialize the app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// When the web is accessed
app.get('/', (req, res) => {
  // Lets give the users some INFO
  res.send(
  `<head><title>API for Skylink + Namespace</title></head><body>
   Usage: Send a PUT request, with the following data: access_key, secret_key, sialink, domain.
   <br><br>
   Example:
   <br>
   --------------------------------------------------------------------------------------------
   <br><br>
   const ak = "ACCESS KEY" <br>
   const sk = "SECRET KEY" <br>
   const domain = "YOUR HNS DOMAIN" <br>
   const sialink = "NEW SIALINK" <br>
   <br>
   const data = `+'`{"access_key":"${ak}", "secret_key":"${sk}", "sialink":"${sialink}", "domain":"${domain}"}`'+
   `
   <br>
   opts = {method:'PUT', body:data, headers:{'Content-Type':'application/json'}}
   <br><br> 
   fetch('https://skynet-namespace.glitch.me/', opts)<br>
   .then(result => result.json())<br>
   .then(result => console.log(result))<br>
   .catch(err => console.error('error', err)) </body>`)
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
