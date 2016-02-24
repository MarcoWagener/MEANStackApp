var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

//Get instances of the db models.
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// POSTS //
// GET //
router.get('/posts', function(req, res, next) {
	Post.find(function(err, posts) {
		if(err) { return next(err); }

		res.json(posts);
	});
});

//Because the post object was retrieved using the middleware function and 
//attached to the req object, all our request handler has to do is return the JSON back to the client.
// GET //
router.get('/posts/:post', function(req, res) {
	req.post.populate('comments', function(err, post) {
		if(err) { return next(err); }

		res.json(req.post);
	});
});

// POST //
router.post('/posts', function(req, res, next) {
	var post = new Post(req.body);

	post.save(function(err, post) {
		if(err) { return next(err); }

		res.json(post);
	});
});

// UPVOTE //
//curl -X PUT http://localhost:3000/posts/<POST ID>/upvote
router.put('/posts/:post/upvote', function(req, res, next) {
	req.post.upvote(function(err, post) {
		if(err) { return next(err); }

		res.json(post);
	});
});

// One thing you might notice about the remaining routes we need to implement is that 
// they all require us to load a post object by ID. Rather than replicating the same 
// code across several different request handler functions, we can use Express 
// param() function to automatically load an object.

//If we define a route URL with :post in it, this function will be run first.
//Assuming the :post parameter contains an ID, our function will retrieve the post object 
//from the database and attach it to the req object after which the route handler function will be called.
router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);

	query.exec(function(err, post) {
		if (err) { return next(err); }
		if(!post) { return next(new Error('cannot find post')); }

		//Implicitly include the post in the request.
		req.post = post;
		return next();
	});
});

// COMMENTS //
// POST //
router.post('/posts/:post/comments', function(req, res, next) {
	var comment = new Comment(req.body);
	comment.post = req.post;

	comment.save(function(err, comment) {
		if(err) { return next(err); }

		req.post.comments.push(comment);
		req.post.save(function(err, post) {
			if(err) { return next(err); }

			res.json(comment);
		});
	});
});

// UPVOTE //
router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
	req.comment.upvote(function(err, comment){
		if(err) { return next(err); }

		res.json(comment);
	});
});

router.param('comment', function(req, res, next, cid){
	var query = Comment.findById(cid);

	query.exec(function(err, comment){
		if(err) { return next(err); }
		if(!comment) { return next(new Error('cannot find comment')); }

		req.comment = comment;
		return next();
	});
});

module.exports = router;
