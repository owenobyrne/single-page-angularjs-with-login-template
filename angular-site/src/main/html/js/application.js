angular.module('bupa', ['bupaServices', 'ngAtmosphere', 'ui.router', 'LocalStorageModule', 'ui-gravatar', 'md5'])
	.config(['$stateProvider', '$urlRouterProvider', 
	   function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/login"); 
		 
		$stateProvider
			.state('login', {
				url: "/login",
				views: {
					// the @ signifies that this view is in the rootview rather than a 
					// child view of accounts. (after the @ is the state name)
					
					"applicationview@": {
						templateUrl: "templates/login.html",
						controller: LoginCtrl						
					}
				}
			})
			.state('application', {
				url: "/app", 
				onEnter: function($rootScope, $state, User){
				    console.log("entered /app");
				    User.get("", 
				    	function(res, headers) {
				    		console.log("you are indeed logged in - you may pass");
				    		$rootScope.LoggedInUser = res;
				    	}, 
				    	function(res) {
				    		console.log("You are not logged in - log in ya fecker.");
				    		$state.go("login");
				    	}
				    );
				},
				views: {
					// the @ signifies that this view is in the rootview rather than a 
					// child view of accounts. (after the @ is the state name)
					
					"applicationview@": {
						templateUrl: "templates/application.html",
						controller: ApplicationCtrl
					}
				}
			});
		}])
	.config(['$httpProvider', function($httpProvider) {
		// set up the base HTTP provider to do CORS
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
	])
	// called when the application starts up.
	.run(function ($rootScope, $state, $stateParams, localStorageService) {
		// set up the localStorage service.
		localStorageService.setPrefix('bupa');
		
		// make the route/template state available to everything
	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;
	});
