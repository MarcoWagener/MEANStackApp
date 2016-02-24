(function(){
	'use-strict';

	angular.module('flapperNews')
		.config(['$stateProvider', '$urlRouterProvider', 
			function($stateProvider, $urlRouterProvider) {
				$stateProvider
					.state('home', {
						url: '/home',
						templateUrl: '/javascripts/client/views/home.html',
						resolve: {
							postPromise: ['postService', function(postService) {
								return postService.getAll();
							}]			      
						}									
					})
					.state('posts', {
						url: '/posts/{id}',
						templateUrl: '/javascripts/client/views/posts.html'
					});

				$urlRouterProvider.otherwise('home');
			}
		]);
})();