(function(){
	'use-strict';

	angular.module('flapperNews')
		.factory('authService', ['$http', '$window', authService]);

	function authService($http, $window) {
		var authTokenName = 'flapper-news-token';

		var saveToken = function(token) {
			$window.localStorage[authTokenName] = token;
		};

		var getToken = function() {
			return $window.localStorage[authTokenName];
		};

		var isLoggedIn = function() {
			var token = getToken();

			if(token) {
				// If a token exists, we'll need to check the payload to see if the token has expired, 
				// otherwise we can assume the user is logged out. The payload is the middle part of the 
				// token between the two .s. It's a JSON object that has been base64'd. We can get it back to a 
				// stringified JSON by using $window.atob(), and then back to a javascript object with JSON.parse.				
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.exp > Date.now() / 1000;
			}
			else {
				return false;
			}
		};

		var currentUser = function() {
			if(isLoggedIn()) {
				var token = getToken();
				var payload = JSON.parse($window.atob(token.split('.')[1]));

				return payload.username;
			}
		};

		var register = function(user) {
			return $http.post('/register', user)
				.success(function(data) {
					saveToken(data.token);
				});			
		};

		var logIn = function(user) {
			return $http.post('/login', user)
				.success(function(data) {
					saveToken(data.token);
				});
		};

		var logOut = function() {
			$window.localStorage.removeItem(authTokenName);
		};

		return {
			saveToken: saveToken,
			getToken: getToken,
			isLoggedIn: isLoggedIn,
			currentUser: currentUser,
			register: register,
			logIn: logIn,
			logOut: logOut
		};
	};
})();
		