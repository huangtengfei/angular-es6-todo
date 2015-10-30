/*
  Model classes can be exported and imported directly (not using AngularJS' dependency injection).
*/

export default class Todo {

	constructor(service) {
		this.service = service;
	}

	list() {
		return this.service.list();
	}

	create(newTodo) {
		if(!newTodo){
    		return;
    	}
    	let todo = {
			title: newTodo,
			completed: false
		};
		return this.service.create(todo);
	}

	delete(todo) {
		return this.service.delete(todo);
	}

	update(todo, index) {
		return this.service.update(todo, index);
	}

	clear() {
		return this.service.clear();
	}

}