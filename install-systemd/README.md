## Running Node.JS App with _systemd_

This gist is written as a quick-and-dirty summary of [Running Your Node.js App With Systemd - Part 1](https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/) by Chris Lea

Assuming we have a simple Node.JS application like the following:

```javascript
const http = require('http');

const hostname = '0.0.0.0';
const port = process.env.NODE_PORT || 3000;
const env = process.env;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  for (var k in env) {
    res.write(k + ": " + env[k] + "\n");
  }
  res.end();
});

server.listen(port, hostname, () => {
  console.log("Server running at http://" + hostname + ":" + port + "/");
});
```

and we want to run it as a service, we can do:

##### 1. Create a systemd service file

```
$ sudo nano /usr/lib/systemd/system/myapp.service
```

In this file, write down:

```
[Unit]
Description=myapp.js - Sample App
Documentation=https://example.com
After=network.target

[Service]
Environment=NODE_PORT=3001
Type=simple
User=[_OS_username_]
ExecStart=/usr/bin/node /home/[_OS_username]/nodeapps/myapp/index.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

> In \[Unit\] we use ```After=network.target``` because in \[Service\] block we use ```Environment=NODE_PORT=3001```. It tells _systemd_ that if it's supposed to start our app when the machine boots up, it should wait until after the main networking functionality of the server is online to do so. This is what we want, since our app can't bind to ```NODE_PORT``` until the network is up and running.

> You can specify the Environment directive multiple times if you need multiple environment variables.

> ```User=[_OS_username_]``` tells _systemd_ that our app should be run as the unprivileged [_OS_username_] user. You definitely want to run your apps as unprivileged users to that attackers can't aim at something running as the root user.

Save + exit the editor.

##### 2.Next, tell the system to reload all daemon (including the newly-created):

```
$ sudo systemctl daemon-reload
```

and followed by:

```
$ sudo systemctl start myapp.service
```

##### 3.If you want to make the application start up when the machine boots:

```
$ sudo systemctl enable myapp.service
```

Related docs:

[systemd](https://www.freedesktop.org/software/systemd/man/systemd.html#)

[systemd.unit](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)

[systemd.service](https://www.freedesktop.org/software/systemd/man/systemd.service.html#)