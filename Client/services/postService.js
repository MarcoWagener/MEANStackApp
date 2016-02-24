(function(){
	'use-strict';

	angular.module('flapperNews')
		.factory('postService', ['$http', postService]);

	function postService($http) {
		var server = 'http://localhost:3000';

		var newPost = {
			posts: []
		};

		var getPost = function(postId) {
			$scope.posts[0];
		};

		var getAll = function() {
			return $http.get(server + '/posts')
				.success(function(data) {
					angular.copy(data, newPost.posts);
			});
		};

		return {
			newPost: newPost,
			getPost: getPost,
			getAll: getAll
		};
	};
})();
		