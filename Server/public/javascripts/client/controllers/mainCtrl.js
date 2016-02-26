(function(){
	'use-strict';

	angular.module('flapperNews')
		.controller('mainCtrl', ['postService', '$scope', 'postsPromise', mainCtrl]);

	function mainCtrl(postService, $scope, postsPromise) {
		var vm = this;

		vm.title = '';
		vm.link = '';

		vm.posts = postsPromise.data;

		vm.addPost = function() {	
			if(!vm.title || vm.title === '') { return; }
			
			postService.addPost({
				title: vm.title,
				link: vm.link,
			});

			vm.title = '';
			vm.link = '';
		};

		vm.incrementUpVotes = function(post) {
			// post.upvotes += 1;
			postService.upvotePost(post);
		};
	};
})();