(function(){
	'use-strict';

	angular.module('flapperNews')
		.controller('postsCtrl', ['$stateParams', 'postService', postsCtrl]);

	function postsCtrl($stateParams, postService) {
		vm.post = postService.getPost($stateParams.id);
	};
})();
		