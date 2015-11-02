export default class todoFactory {

	/*@ngInject*/
	constructor($resource) {
		this.$resource = $resource;
		this.urlPrefix = 'http://localhost\\:8000/';
		let api = {
			list: { 
				method: 'GET',
				params: {
					path: 'todos'
				},
				isArray: true
			},
			create: {
				method: 'POST',
				params: {
					path: 'todos'
				}
			},
			delete: {
				method: 'DELETE',
				params: {
					path: 'todos',
					params: ''
				}
			},
			update: {
				method: 'PUT',
				params: {
					path: 'todos',
					params: ''				
				}
			},
			clear: {
				method: 'POST',
				params: {
					path: 'todos',
					params: 'clear'
				}
			}
		};
		return this.$resource(this.urlPrefix + 'api/:path/:params', null, api);
	}
}