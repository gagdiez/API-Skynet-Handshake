# A NodeJS Server to Update Skylink in Handshake Domains

While working on a personal project (https://siasky.net/hns/bunnu/), I realized that it's not simple to communicate apps stored in skynet (https://siasky.net) with namebase API (https://www.namebase.io). This is because their CORS policies, which do not allow the API to be accessed from a browser.

To circumvent this problem, I made a small nodejs service, that allows to easily register new skylinks in namebase. An example of the code running can be found here: https://skynet-namespace.glitch.me/

The service takes the access-key, secret-key, domain name, and sialink. Then, it comunicates with the namebase api to update the domain, and point it to the sialink.

## Usage
Send a PUT request, with the following data: access_key, secret_key, sialink, domain.

```
const ak = "ACCESS KEY"
const sk = "SECRET KEY"
const domain = "YOUR HNS DOMAIN"
const sialink = "NEW SIALINK"

const data = `{"access_key":"${ak}", "secret_key":"${sk}", "sialink":"${sialink}", "domain":"${domain}"}`
opts = {method:'PUT', body:data, headers:{'Content-Type':'application/json'}}

fetch('https://skynet-namespace.glitch.me/', opts)
.then(result => result.json())
.then(result => console.log(result))
.catch(err => console.error('error', err)) 
```
