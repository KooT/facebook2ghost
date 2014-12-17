#!/usr/bin/env node

var FB = require('fb');
FB.setAccessToken(process.env.FB_ACCESSTOKEN);

FB.api(process.env.FB_SITE, function(res) {
	console.log(res);
});
