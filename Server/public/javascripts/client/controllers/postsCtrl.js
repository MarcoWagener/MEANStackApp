(function(){
	'use-strict';

	angular.module('flapperNews')
		.controller('postsCtrl', ['$stateParams', 'postService', postsCtrl]);

	function postsCtrl($stateParams, postService) {
		var vm = this;		

		vm.comment = '';
		vm.author = '';

		postService
			.getPost($stateParams.id)
			.success(function(data){
				vm.post = data;
			});

		vm.addComment = function(post) {
			postService
				.createComment(post, 
					{ body: vm.comment,
					  author: vm.author 
					})
				.success(function() {
					vm.comment = '';
					vm.author = '';
				});
		};

		vm.upvoteComment = function(post, comment) {
			postService
				.upvoteComment(post,comment);
		};
	};
})();
		