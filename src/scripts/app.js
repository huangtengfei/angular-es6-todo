/*
  Import all Angular components via ES6 imports and register them
  at your module via their corresponding functions (controller, service, etc.).
*/

import HomeController from './controllers/HomeController';
import TodoService from './services/TodoService';
import TodoFactory from './services/TodoFactory';
import autoFocus from './directives/autoFocus';
import {UpperFilter, LowerFilter} from './filters/textFilters';
import config from './config';

angular.module('Todo', ['ui.router', 'ngResource'])	// do not forget inject ui.router or ngRoute if you use route
	.config(config)
	.controller('HomeController', HomeController)
	.service('TodoService', TodoService)
	.service('TodoFactory', TodoFactory)
	.directive('autoFocus', autoFocus.directiveFactory)
	.filter('upper', UpperFilter)
	.filter('lower', LowerFilter);