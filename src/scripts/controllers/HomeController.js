
// import Todo from '../model/Todo';

export default class HomeController {

	/*
	  The below annotation will be processes by ngAnnotate, which
	  will annotate the constructor after compiling for minification.
	*/
	/*@ngInject*/
	constructor($scope, $filter, TodoService) {

		this.service = TodoService;
		this.todos = [];
		this.uncompleted = 0;

	    (() => {
	    	this.service.list()
		    	.then((result) => {
			    	this.todos = result;			   
			    });
	    })();

	    // use $scope just for use $watch
	    $scope.$watch('vm.todos', () => {
	    	this.uncompleted = $filter('filter')(this.todos, {completed: false}).length;
	    }, true);	  
		
	}

	toggleCompleted(item) {
		this.service.update(item, this.todos.indexOf(item)).then(() => {}, () => {
			item.completed = !item.completed;
		});
	}

	add() {
    	if(!this.newTodo){
    		return;
    	}
    	let todo = {
			title: this.newTodo,
			completed: false
		};
		this.pending = true;
		this.service.create(todo)
			.then(() => {
				this.newTodo = '';
			})
			.finally(() => {
				this.pending = false;
			});
	}

	remove(item) {
		this.service.delete(this.todos.indexOf(item));
	}

	clearCompleted() {
		this.service.clear();
	}

	// use status change selected style, use statusFilter filter todos in the view 
	filterTodo(status) {
		this.status = (status === 1) ? 'all' : (status === 2) ? 'active' : 'completed';
		this.statusFilter = (status === 1) ? 
				{} : (status === 2) ? {completed: false} : {completed: true};
	}

}