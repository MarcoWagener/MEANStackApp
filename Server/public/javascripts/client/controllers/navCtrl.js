(function(){
	'use-strict';

	angular.module('flapperNews')
		.controller('navCtrl', ['authService', '$state', navCtrl]);

	function navCtrl(authService, $state) {
		var vm = this;

		vm.isLoggedIn = authService.isLoggedIn;
		vm.currentUser = authService.currentUser;
		
		vm.logOut = function() {
			authService.logOut();

			$state.go('login');
		}
	};
})();
		