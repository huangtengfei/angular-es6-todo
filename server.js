'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const api = require('./server/todoApi');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static('.'));

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	if ('OPTIONS' == req.method){
		return res.send(200);
	}
	next();
});

app.get('/', (req, res) => {
	res.send({
		text: 'hello world'
	});
});

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

app.listen(8000, () => {
	console.log('node server started at port 8000...');
})