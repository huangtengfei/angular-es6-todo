
export default class todoLocService {

	/*@ngInject;*/
	constructor($q) {
		this._$q = $q;
		this.STORAGE_ID = 'todos-angularjs';
		this.items = [];
	}

	_getFromLocalStorage() {
		return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
	}

	_saveToLocalStorage(items) {
		localStorage.setItem(this.STORAGE_ID, JSON.stringify(items));
	}

	list() {
		let deferred = this._$q.defer();

		angular.copy(this._getFromLocalStorage(), this.items);
		deferred.resolve(this.items);

		return deferred.promise;
	}

	save(item) {
		let deferred = this._$q.defer();

		this.items.push(item);

		this._saveToLocalStorage(this.items);
		deferred.resolve(this.items);

		return deferred.promise;
	}
}