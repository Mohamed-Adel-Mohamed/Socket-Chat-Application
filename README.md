### edited ya mody edit 222 a7a b2a
#b7b sharmo he is my bestie
nodejs chat app using the multi-threading concept with the help of the `cluster` module in Node.js. The `cluster` module allows you to create child processes that run simultaneously, effectively taking advantage of multi-core systems.
<br/>

```
const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const path = require('path');

if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Your server code here
}
```