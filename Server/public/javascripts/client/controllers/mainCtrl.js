(function(){
	'use-strict';

	angular.module('flapperNews')
		.controller('mainCtrl', ['postService', '$scope', mainCtrl]);

	function mainCtrl(postService, $scope) {
		var vm = this;

		vm.title = '';
		vm.link = '';

		vm.posts = postService.newPost.posts;

		vm.addPost = function() {	
			if(!vm.title || vm.title === '') { return; }

			// vm.posts.push({
			// 	title: vm.title,
			// 	link: vm.link,
			// 	upvotes: 0,
			// 	comments: [
			// 	    {author: 'Joe', body: 'Cool post!', upvotes: 0},
			// 	    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
			// 	]});
			
			postService.addPost({
				title: vm.title,
				link: vm.link,
			});

			vm.title = '';
			vm.link = '';

			//Persist the post in scope.
			// $scope.posts = vm.posts;
		};

		vm.incrementUpVotes = function(post) {
			// post.upvotes += 1;
			postService.upvotePost(post);
		};
	};
})();