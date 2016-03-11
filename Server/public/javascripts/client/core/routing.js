(function(){
	'use-strict';

	angular.module('flapperNews')
		.config(['$stateProvider', '$urlRouterProvider', 
			function($stateProvider, $urlRouterProvider) {
				$stateProvider
					.state('home', {
						url: '/home',
						templateUrl: '/javascripts/client/views/home.html',
						controller: 'mainCtrl',
						controllerAs: 'vm',
						resolve: {
							postsPromise: ['postService', 'authService', function(postService, authService) {
								if(authService.isLoggedIn()) {
									return postService.getAll();
								};
							}]			      
						},
						onEnter: ['$state', 'authService', function($state, authService) {
							if(!authService.isLoggedIn()) {
								$state.go('login');
							}
						}]
					})					
					.state('posts', {
						url: '/posts/{id}',
						templateUrl: '/javascripts/client/views/posts.html',
						controller: 'postsCtrl',
						controllerAs: 'vm',
						resolve: {
							postPromise:  ['postService', '$stateParams', 'authService', function(postService, $stateParams, authService) {
								if(authService.isLoggedIn()) {
					            	return postService.getPost($stateParams.id);
					        	};
					        }]
						},
						onEnter: ['$state', 'authService', function($state, authService) {
							if(!authService.isLoggedIn()) {
								$state.go('login');
							}
						}]						
					})
					.state('login', {
						url: '/login',
						templateUrl: '/javascripts/client/views/account/login.html',
						controller: 'authCtrl',
						controllerAs: 'vm',
						onEnter: ['$state', 'authService', function($state, authService) {
							if(authService.isLoggedIn()) {
								$state.go('home');
							}
						}]		
					})					
					.state('register', {
						url: '/register',
						templateUrl: '/javascripts/client/views/account/register.html',
						controller: 'authCtrl',
						controllerAs: 'vm',
						onEnter: ['$state', 'authService', function($state, authService) {
							if(authService.isLoggedIn()) {
								$state.go('home');
							}
						}]		
					});

				$urlRouterProvider.otherwise('home');
			}
		]);
})();