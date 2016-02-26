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
							postsPromise: ['postService', function(postService) {
								return postService.getAll();
							}]			      
						}									
					})					
					.state('posts', {
						url: '/posts/{id}',
						templateUrl: '/javascripts/client/views/posts.html',
						controller: 'postsCtrl',
						controllerAs: 'vm',
						resolve: {
							postPromise:  ['postService', '$stateParams', function(postService, $stateParams) {
					            return postService.getPost($stateParams.id);
					        }]
						}
					});

				$urlRouterProvider.otherwise('home');
			}
		]);
})();