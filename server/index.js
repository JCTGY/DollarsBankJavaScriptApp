'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json())

app.listen(5000, () => {
    console.log("Sucesse connect to port 5000");
});

const routes = require('./routes/apiRoutes');
routes(app);