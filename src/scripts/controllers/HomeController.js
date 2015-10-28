
export default class HomeController {

	// ngAnnotate understand this string literal and annotates this method.
	/*@ngInject*/
	constructor($scope, PersonService) {

		var vm = this;	// the this keyword is contextual, use a capture variable for this

		PersonService.getPerson().then(function(person) {
			vm.person = person;
		});
		
	}
	
}