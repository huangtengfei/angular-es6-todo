'use strict';

const api = require('./todoApi');

function routes(app) {

	app.get('/api/todos', (req, res) => {
		api.list().then((result) => {
			res.send(result);
		})
	})

	app.post('/api/todos', (req, res) => {
		let newTodo = req.body;
		if(!newTodo.title) {
			res.status(500).json({error: "No data found to add"});
		}else {
			api.create(newTodo).then((result) => {
				res.send(result);
			})
		}	
	})

	app.delete('/api/todos/:id', (req, res) => {
		let id = req.params.id;
		if(!id) {
			res.status(500).json({error: "No data found to delete"});
		}else {
			api.delete(id).then((result) => {
				res.send(result);
			})
		}
	})

	app.put('/api/todos/:id', (req, res) => {
		let id = req.params.id;
		let todo = req.body;
		if(!id) {
			res.status(500).json({error: "No data found to update"});
		}else {
			api.update(id, todo).then((result) => {
				res.send(result);
			})
		}
	})

	app.post('/api/todos/clear', (req, res) => {
		let completedCol = req.body;
		if(!completedCol) {
			res.status(500).json({error: "No data found to update"});
		}else {
			api.clear(completedCol).then((result) => {
				res.send(result);
			})
		}
	})
}

module.exports = routes;