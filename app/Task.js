// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
let taskSchema = new Schema({
    name: {type: String, required: true},
    dueDate: {type: Date, required: true},
    priority: { type: Number, min: 0, max: 5, required: true },
    done: {type: Boolean, required: true},
    comment: String,
    finished_at: Date,
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
let Task = mongoose.model('Task', taskSchema);

// make this available to our users in our Node applications
module.exports = Task;