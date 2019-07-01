const express = require('express');
const route = express.Router();
const controller=require('../controller/posts')
route.post('/add',controller.add)
route.post('/delete',controller.delete)
route.get('/show',controller.show)
route.post('/schedule',controller.schedule)
module.exports = route;
