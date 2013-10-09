exports.businesses = [ {
	businessId : "realex",
	users : [ {
		email : "owen.obyrne@realexpayments.com",
		password : "owen",
		firstname : "Owen",
		surname : "O Byrne"
	}, {
		email : "colm.lyon@realexpayments.com",
		password : "colm",
		firstname : "Colm",
		surname : "Lyon"
	} ]
} ];

exports.findOne = function(businessId, user, done) {
	var foundUser = false;
	this.businesses.forEach(function(b) {
		if (b.businessId === businessId) {
			b.users.forEach(function(u) {
				if (u.email === user) {
					foundUser = {
						businessId : businessId,
						user : u
					};
				}
			});
		}
	});
	return done(null, foundUser);
};
