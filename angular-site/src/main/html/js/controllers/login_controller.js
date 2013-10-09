function LoginCtrl($scope, Session) {
	$scope.businessid = "realex";
	$scope.username = "owen.obyrne@realexpayments.com";
	$scope.password = "owen";
	$scope.incorrectlogin = false;
	$scope.errormessage = "";
	
	$scope.login = function() {
		Session.login("",
			{"username": this.businessid + "/" + this.username, "password": this.password}, 
			this.loginCallback, 
			this.loginErrorCallback
		);
	};
	
	$scope.loginCallback = function(res, headers) {
		console.log("logged in as " + res.user.email);
		$scope.$state.go("application");
	};

	$scope.loginErrorCallback = function(res) {
		
		if (res.status == 401) {
			$scope.errormessage = "Incorrect Login Details";
			console.log("Incorrect Login");
		} else {
			$scope.errormessage = "Something went wrong...";
			console.log("Error! " + res);
		}
		$scope.incorrectlogin = true;
	};
}

//LoginCtrl.$inject = ['$scope', 'Session'];

