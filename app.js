const config = require('./utils/config');
const express = require('express');
const app = express();
const blogsRouter = require('./controllers/blogs');
const middleware = require('./utils/middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

console.log(`Connecting to ${ config.MONGO_URI }`)

mongoose
    .connect(config.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log(`Connected to MongoDB`))
    .catch(e => console.error(`Error connecting to MongoDB: ${ e }`));

app.use(bodyParser.json());

app.use(cors());
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
