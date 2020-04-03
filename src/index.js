const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const normalizePort = require('normalize-port');

const port = normalizePort(process.env.PORT || 3000);

//Settings
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use(require('./routes/'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

// Listening the server
app.listen(app.get('port'), (req, res) => {
    console.log(`Server on ${port}`);
});