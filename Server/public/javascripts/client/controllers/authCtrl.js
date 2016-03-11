(function(){
	'use-strict';

	angular.module('flapperNews')
		.controller('authCtrl', ['$state', 'authService', authCtrl]);

	function authCtrl($state, authService) {
		var vm = this;

		vm.user = {};
		vm.error = undefined;

		vm.register = function() {
			authService
				.register(vm.user)
				.error(function(error) {
					vm.error = error;
				})
				.success(function() {
					$state.go('home');
				});
		};

		vm.logIn = function() {
			authService
				.logIn(vm.user)
				.error(function(error) {
					vm.error = error;
				})
				.success(function() {
					$state.go('home');
				});
		};
	};
})();
		