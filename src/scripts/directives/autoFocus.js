
export default class AutoFocus {
	constructor() {
		this.restrict = 'A';

		this.scope = {
			autoFocus: '='
		};
	}

	link(scope, elem, attrs) {
		scope.$watch('autoFocus', (val) => {
			if(val){
				elem[0].focus();
			}
		});
	}

	// http://stackoverflow.com/questions/28620479/using-es6-classes-as-angular-1-x-directives
	static directiveFactory(){
        return new AutoFocus();
    }
}