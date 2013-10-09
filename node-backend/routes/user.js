
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.get = function( req, res ) {
	//res.setHeader('Content-Type', 'application/json');
	require("util").log("here in user.get with user: " + req.user.user.email);
	res.json( req.user );
};
