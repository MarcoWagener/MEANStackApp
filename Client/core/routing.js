(function(){
	'use-strict';

	angular.module('flapperNews')
		.config(['$stateProvider', '$urlRouterProvider', 
			function($stateProvider, $urlRouterProvider) {
				$stateProvider
					.state('home', {
						url: '/home',
						templateUrl: '/views/home.html'
					})
					.state('posts', {
						url: '/posts',
						templateUrl: '/views/posts.html',
						resolve: {
							postPromise: ['postService', function(postService) {
								return postService.getAll();
							}]
						}
					});

				$urlRouterProvider.otherwise('posts');
			}
		]);
})();