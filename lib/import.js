#!/usr/bin/env node

var FB = require('fb');
var async = require('async'); 
var moment = require('moment');
var fs = require('fs');

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
		"slug": slugify(item.message.substring(0,50)),
		"title": item.message.substring(0,50) + "...",
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
	    console.log(posts); i
	var imp = {
		    "meta":{
			            // epoch time in milliseconds
			    "exported_on":  1388805572000,
			    // Data version, current is 003
			    "version":      "003"
		   },
                   "data":{
		       "posts": posts
		   }
	};
	fs.writeFile("import.json", JSON.stringify(imp), function(err) {
    		if(err) {
        		console.log(err);
    		} else {
        		console.log("The file was saved!");
    		}
		}); 
	}); 
});

function slugify(text) {

    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')        // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
      .replace(/\-\-+/g, '-')      // Replace multiple - with single -
      .replace(/^-+/, '')          // Trim - from start of text
      .replace(/-+$/, '');         // Trim - from end of text
}
