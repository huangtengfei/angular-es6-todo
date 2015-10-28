
// import Todo from '../model/Todo';

export default class HomeController {

	/*
	  The below annotation will be processes by ngAnnotate, which
	  will annotate the constructor after compiling for minification.
	*/
	/*@ngInject*/
	constructor(TodoService) {

		var vm = this;	// the this keyword is contextual, use a capture variable for this
		
		vm.service = TodoService;

	    (() => {
	    	vm.service.list()
		    	.then(result => {
			    	vm.todos = result;
			    });
	    })();

	    vm.addTodo = () => {
	    	let todo = {
				title: vm.newTodo,
				completed: false
			};
			vm.service.save(todo)
				.then(function(){
					vm.newTodo = '';
				});
		};
	}
}