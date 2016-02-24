(function(){
	'use-strict';

	angular.module('flapperNews')
		.factory('postService', ['$http', '$q', postService]);

	function postService($http, $q) {
		var server = 'http://localhost:3000';

		var newPost = {
			posts: []
		};

		var getPost = function(postId) {
			// return $http.get(server + '/posts/' + postId)
			// 	.then(function(data) {
			// 		post = data;
			// 	});

			// return $http.get(server + '/posts/' + postId);

			// var deferred = $q.defer();

			// $http.get(server + '/posts/' + postId)
			// 	.success(function(data){
			// 		deferred.resolve(data);
			// 	});

			// return deferred;

			return $http.get(server + '/posts/' + postId)
					.success(function(res) {									
						return res.data;
					});
		};

		var getAll = function() {
			return $http.get(server + '/posts')
				.success(function(data) {
					angular.copy(data, newPost.posts);
			});
		};

		var addPost = function(post) {
			return $http.post(server + '/posts', post)
				.success(function(data) {
					newPost.posts.push(data);
				});
		};

		var upvotePost = function(post) {
			return $http.put(server + '/posts/' + post._id + '/upvote')
				.success(function(data) {
					post.upvotes += 1;
				});
		};

		var createComment = function(post, comment) {			
			return $http.post(server + '/posts/' + post._id + '/comments', comment)
				.success(function(data) {
					post.comments.push(data);
				});
		};

		var upvoteComment = function(post, comment) {
			return $http.put(server + '/posts/' + post._id + '/comments/' + comment._id +'/upvote')
				.success(function(data) {
					comment.upvotes += 1;
				});	
		}

		return {
			newPost: newPost,
			getPost: getPost,
			getAll: getAll,
			addPost: addPost,
			upvotePost: upvotePost,
			createComment: createComment,
			upvoteComment: upvoteComment
		};
	};
})();
		