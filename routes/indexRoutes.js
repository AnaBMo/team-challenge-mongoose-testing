require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI); 

const express = require('express');
const router = express.Router();
const postsRoutes = require('./posts');

require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI); 

router.use('/', postsRoutes);

module.exports = router;