'use strict';

const _ = require('underscore');
const q = require('q');
let todos = require('./todoData').todos;

let api = {};

api.list = () => {

	// 在真实项目中，此处的数据应该是异步从数据库获取的，所以此处用 promise 
	let defer = q.defer();

	setTimeout(() => {
		defer.resolve(todos);
	}, 100);

	return defer.promise;
}

api.create = (newTodo) => {

	let defer = q.defer();
	
	let lastTodo = _.max(todos, (todo) => {
		return todo.todoId;
	});

	newTodo.todoId = lastTodo.todoId + 1;
	todos.push(newTodo);

	setTimeout(() => {
		defer.resolve(newTodo);
	}, 100);

	return defer.promise;
}

api.delete = (id) => {

	let defer = q.defer();

	let todoIndex = -1;
	let todoExist = _.find(todos, (todo) => {
		todoIndex++;
		return todo.todoId == id;
	});

	if(!todoExist) {
		defer.reject({
			errCode: '601',
			errMsg: 'not exist this todo'
		})
	}else {	
		todos.splice(todoIndex, 1);	
		defer.resolve({
			errCode: '0'
		})
	}

	return defer.promise;
}

api.update = (id, newTodo) => {

	let defer = q.defer();

	let todoIndex = -1;
	let todoExist = _.find(todos, (todo) => {
		todoIndex++;
		return todo.todoId == id;
	});

	if(!todoExist) {
		defer.reject({
			errCode: '601',
			errMsg: 'not exist this todo'
		})
	}else {	
		todos[todoIndex] = newTodo;
		defer.resolve({
			errCode: '0'
		})
	}

	return defer.promise;
}

api.clear = (completedCol) => {

	let defer = q.defer();

	completedCol.forEach((item) => {
		let todoIndex = -1;
		let todoExist = _.find(todos, (todo) => {
			todoIndex++;
			return todo.todoId == item.todoId;
		});
		if(!todoExist) {
			defer.reject({
				errCode: '601',
				errMsg: 'not exist this todo'
			})
		}else {
			todos.splice(todoIndex, 1);
		}
	})

	defer.resolve({
		errCode: '0'
	})

	return defer.promise;
}

module.exports = api;



