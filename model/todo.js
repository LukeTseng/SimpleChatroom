var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema( {
	// name: String,
	// completed: Boolean,
	message: String
});

module.exports = mongoose.model('todo', todoSchema);