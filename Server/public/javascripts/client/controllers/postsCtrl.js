(function(){
	'use-strict';

	angular.module('flapperNews')
		.controller('postsCtrl', ['postService', 'postPromise', postsCtrl]);

	function postsCtrl(postService, postPromise) {
		var vm = this;		

		vm.comment = '';
		vm.author = '';

		vm.post = postPromise.data;

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
		