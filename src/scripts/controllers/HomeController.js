
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
		    	.then(result => {
			    	vm.todos = result;
			    });
	    })();

	    // use $scope just for use $watch
	    $scope.$watch('vm.todos', () => {
	    	vm.uncompleted = $filter('filter')(vm.todos, {completed: false}).length;
	    }, true);

	    vm.add = () => {
	    	let todo = {
				title: vm.newTodo,
				completed: false
			};
			vm.service.create(todo)
				.then(() => {
					vm.newTodo = '';
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
	}
}