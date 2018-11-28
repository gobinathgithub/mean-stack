var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    task: { type: String, required: true, unique: true, dropDups: true },
    fromDate: { type: Date, default: Date.now },
    toDate: { type: Date, default: Date.now },
    priorty: { type: Number, required: true, min: 0, max: 30 },
    finished: { type: Boolean, default: false },
    parent: { type: mongoose.Schema.ObjectId, ref: 'Task', required: false }
})

var Task = mongoose.model('Task', TaskSchema);
module.exports = Task;