'use strict';

const express = require('express');
const app = express();

app.listen(5000, () => {
    console.log("Sucesse connect to port 5000");
});

const routes = require('./routes/userRoutes');
routes(app);