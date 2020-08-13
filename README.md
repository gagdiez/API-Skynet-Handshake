# Update Skylink in Namebase

I made a small nodejs service, that allows to easily register new skylinks in namebase. You can find it here: https://skynet-namespace.glitch.me/

## Why?
While working on a personal project (https://siasky.net/hns/bunnu/), I realized that it's not simple to communicate apps stored in skynet (https://siasky.net) with namebase API (https://www.namebase.io). This is because their CORS policies, which do not allow the API to be accessed from a browser. If you are running into the same problems, here is a solution.

## Usage
Send a PUT request to https://skynet-namespace.glitch.me/ with the access-key, secret-key, domain name, and sialink. The server then will comunicate with the namebase api to update the domain, and point it to the new sialink.

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
## Running your own server
If you don't like the idea of sending private api-keys to a server you don't own, I totally understand it. The easiest thing to do in such case would be to copy the current server from (https://glitch.com/edit/#!/skynet-namespace), check the code, edit it as you please, and run your own glitch-server, or private nodejs server.
