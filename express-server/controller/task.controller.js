const Task = require('./../model/task');

module.exports = {
    creatTask: function (request, response) {
        var task = new Task(request.body);
        task.save(function (err) {
            if (!!err) {
                response.json({ success: false, message: err.message });
            } else {
                response.status(201).json({ success: true, data: 'You task has created successfully..!!' });
            }
        })
    },
    updateTask: function (request, response) {
        var task = new Task(request.body);
        Task.findByIdAndUpdate(request.body._id, { task: request.body.task, parent:request.body.parent, fromDate: request.body.fromDate, 
            toDate: request.body.toDate, priorty: request.body.priorty, finished: request.body.finished},
            function (err) {
                if (!!err) {
                    response.json({ success: false, message: err.message });
                } else {
                    response.status(201).json({ success: true, data: 'You task has updated successfully..!!' });
                }
            }
        )
    }, 
    getAllTask: function (request, response) {
        Task.find({}).exec(function (err, tasks) {
            if (!!err) {
                response.json({ success: false, message: err.message });
            } else {
                response.status(201).json({ success: true, data: tasks });
            }
        })
    }
}