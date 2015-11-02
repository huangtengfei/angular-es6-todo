import Todo from '../models/Todo';

export default class HomeController {

	/*
	  The below annotation will be processes by ngAnnotate, which
	  will annotate the constructor after compiling for minification.
	*/
	/*@ngInject*/
	constructor($scope, $filter, $q, TodoFactory) {

		this.todo = new Todo($q, TodoFactory);

		this.todos = [];
		this.uncompleted = 0;
		this.status = 'all';

		this.todo.list().then((result) => {
			this.todos = result;	
		});

	    // use $scope just for use $watch
	    $scope.$watch('vm.todos', () => {
	    	this.uncompleted = $filter('filter')(this.todos, {completed: false}).length;
	    }, true);	  
	}

	add() {		
		if(!this.newTodo) {
			return;
		}
		this.pending = true;
    	this.todo.create(this.newTodo).then((result) => {
    		this.todos.push(result);
			this.newTodo = '';
		}).finally(() => {
			this.pending = false;
		});
	}

	remove(todo) {
		this.todo.delete(todo.todoId).then((result) => {
			this.todos.splice(this.todos.indexOf(todo), 1);
		})
	}

	toggleCompleted(todo) {
		this.todo.update(todo).then(() => {
			// if success, do nothing
		}, () => {
			todo.completed = !todo.completed;	// if error, change todo's status to previous
		});
	}

	clearCompleted() {
		this.todo.clear(this.todos).then((result) => {
			this.todos = result;
		})
	}

	// use status change selected style, use statusFilter filter todos in the view 
	filterTodo(status) {
		this.status = (status === 1) ? 'all' : (status === 2) ? 'active' : 'completed';
		this.statusFilter = (status === 1) ? 
				{} : (status === 2) ? {completed: false} : {completed: true};
	}

}