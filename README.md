# xquery-dashboard-backend

This is a simple express-app server for verifying the signature sent from the xquery front-end.<br/>

## Getting started

Update Nginx config so that when the front end sends requests to `ip_address/api` it will be redirected to port 5433 on the server:

```bash
server {
  listen 80 default_server;
  servername ;

  # react app & front-end files
  location / {
    root /opt/frontend;
    try_files $uri /index.html;
  }

  # node api reverse proxy
  location /api {
    proxy_pass http://localhost:5433/;
  }
}
```

Clone the repo:

```bash
git clone https://github.com/blocknetdx/xquery-dashboard-backend.git
```

Navigate to the project directory:

```bash
cd xquery-dashboard-backend
```

Install the dependencies:

```bash
yarn
```

Start the development server:

```bash
yarn start
```

<br/>

When front-end tries to create new project, a sign message comes and it makes a signature.

After click sign, front sends the signature to backend to verify. <br/>
The endpoint includes signature and wallet address as a query param. <br/>
When this back-end receives the request, it verifies to signature and wallet are compared to correct one. <br/>
Returns success when valid, otherwise fail.<br/>
If success, front-end goes to the next step - create project.
