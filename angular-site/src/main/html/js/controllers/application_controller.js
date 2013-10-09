function ApplicationCtrl($scope, User, Session) {
	
	$scope.logout = function() {
		Session.logout("");
		$scope.$state.go("login");
	};
}

//ApplicationCtrl.$inject = ['$scope', 'User', 'Session'];

