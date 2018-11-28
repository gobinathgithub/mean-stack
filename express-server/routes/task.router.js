var express = require('express');
var Router = express.Router();

// const Task = require('./../model/task');
const TaskController = require('./../controller/task.controller');

Router.post('/addTask', TaskController.creatTask);
Router.post('/saveTask', TaskController.updateTask);
Router.get('/getTask', TaskController.getAllTask);

module.exports = Router;