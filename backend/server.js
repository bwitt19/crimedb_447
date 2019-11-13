// server.js
// crime visualizer 

const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());                            // parsing json module
app.use(express.urlencoded({ extended: false }));   // parsing urlencoded module

// Set up db uri env var->from mongodb cluster connect
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}, );
const connection = mongoose.connection;


// On connect database
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


// set up routes use
const crimesRouter = require('./routes/crimes');
const usersRouter = require('./routes/users');
const filtersRouter = require('./routes/filters');

// visiting localhost/crimes -> loads everything in crimesRouter
app.use('/crimes', crimesRouter); 
app.use('/users', usersRouter);
app.use('/filter', filtersRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
