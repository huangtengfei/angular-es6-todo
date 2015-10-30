import Todo from '../models/Todo';

export default class HomeController {

	/*
	  The below annotation will be processes by ngAnnotate, which
	  will annotate the constructor after compiling for minification.
	*/
	/*@ngInject*/
	constructor($scope, $filter, TodoService) {

		this.todo = new Todo(TodoService);

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
		this.pending = true;
    	this.todo.create(this.newTodo).then(() => {
			this.newTodo = '';
		}).finally(() => {
			this.pending = false;
		});
	}

	remove(item) {
		this.todo.delete(this.todos.indexOf(item));
	}

	toggleCompleted(item) {
		this.todo.update(item, this.todos.indexOf(item)).then(() => {
			// if success, do nothing
		}, () => {
			item.completed = !item.completed;	// if error, change todo's status to previous
		});
	}

	clearCompleted() {
		this.todo.clear();
	}

	// use status change selected style, use statusFilter filter todos in the view 
	filterTodo(status) {
		this.status = (status === 1) ? 'all' : (status === 2) ? 'active' : 'completed';
		this.statusFilter = (status === 1) ? 
				{} : (status === 2) ? {completed: false} : {completed: true};
	}

}