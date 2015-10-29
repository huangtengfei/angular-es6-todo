
// import Todo from '../model/Todo';

export default class HomeController {

	/*
	  The below annotation will be processes by ngAnnotate, which
	  will annotate the constructor after compiling for minification.
	*/
	/*@ngInject*/
	constructor($scope, $filter, TodoService) {

		var vm = this;	// the this keyword is contextual, use a capture variable for this

		vm.service = TodoService;

	    (() => {
	    	vm.service.list()
		    	.then((result) => {
			    	vm.todos = result;			   
			    });
	    })();

	    // use $scope just for use $watch
	    $scope.$watch('vm.todos', () => {
	    	vm.uncompleted = $filter('filter')(vm.todos, {completed: false}).length;
	    }, true);

	    vm.add = () => {
	    	if(!vm.newTodo){
	    		return;
	    	}
	    	let todo = {
				title: vm.newTodo,
				completed: false
			};
			vm.pending = true;
			vm.service.create(todo)
				.then(() => {
					vm.newTodo = '';
				})
				.finally(() => {
					vm.pending = false;
				});
		};

		vm.toggleCompleted = (item, index) => {
			vm.service.update(item, index).then(() => {}, () => {
				item.completed = !item.completed;
			});
		};

		vm.remove = (index) => {
			vm.service.delete(index);
		};

		vm.clearCompleted = () => {
			vm.service.clear();
		};

		// use status change class, use statusFilter filter todos in the view 
		vm.filterTodo = (status) => {
			vm.status = (status === 1) ? 'all' : (status === 2) ? 'active' : 'completed';
			vm.statusFilter = (status === 1) ? 
					{} : (status === 2) ? {completed: false} : {completed: true};
		};
	}
}