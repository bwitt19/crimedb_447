// server.js
// crime visualizer 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());        // parsing json module

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

// visiting localhost/crimes -> loads everything in crimesRouter
app.use('/crimes', crimesRouter); 
app.use('/users', usersRouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
