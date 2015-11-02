/*
  Model classes can be exported and imported directly (not using AngularJS' dependency injection).
*/

export default class Todo {

	/*@ngInject*/
	constructor($q, service) {
		this.q = $q;
		this.service = service;	
	}

	list() {
		let defer = this.q.defer();
		this.service.list((result) => {
			defer.resolve(result);
		});
		return defer.promise;
	}

	create(newTodo) {
    	let todo = {
			title: newTodo,
			completed: false
		};
		let defer = this.q.defer();
		this.service.create(todo, (result) => {
			defer.resolve(result);
		});
		return defer.promise;
	}

	delete(todoId) {
		let defer = this.q.defer();
		this.service.delete({params: todoId}, (result) => {
			defer.resolve(result);
		});
		return defer.promise;
	}

	update(todo) {
		let defer = this.q.defer();
		this.service.update({params: todo.todoId}, todo, (result) => {
			defer.resolve(result);
		});
		return defer.promise;
	}

	clear(todos) {
		let completedCol = [];
		let uncompletedCol = [];
		let defer = this.q.defer();
		todos.forEach((todo) => {
			if(todo.completed) {
				completedCol.push({
					todoId: todo.todoId
				});
			}else {
				uncompletedCol.push(todo);
			}
		})
		this.service.clear(completedCol, (result) => {
			defer.resolve(uncompletedCol);
		})
		return defer.promise;
	}

}