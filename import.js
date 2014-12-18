#!/usr/bin/env node

var FB = require('fb');
var async = require('async'); 
var moment = require('moment');

var posts = []; 

FB.setAccessToken(process.env.FB_ACCESSTOKEN);

FB.api(process.env.FB_SITE, function(res) {
	var i = 1;
	async.forEach(res.data, function (item, callback){ 
	    console.log(item);
	    if(!item.message) {
		   return callback();
	    }
	    var post = {
		"id": item.id.toString().split("_")[1],
		"title": "Post",
		"html": item.message,
		"image": null,
		"featured": 0,
		"page": 0,
		"author_id":1,
		"created_at": moment(item.created_time).unix()
	    };
	    if(item.picture) {
		    post.image = item.picture;
	    }
	    posts.push(post);
	    callback();
	}, function(err) {
	    console.log(posts);
	}); 
});

