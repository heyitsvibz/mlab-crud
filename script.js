// also include ngRoute for all our routing needs
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })

    // .when('/map', {
    //     templateUrl: 'pages/map.html',
    //     controller: 'mapController'
    // })
    ;

    //html5 # remover
    //$locationProvider.html5Mode(true);
});

// create the controller and inject Angular's $scope
scotchApp.controller('homeController', function($scope, $http, $rootScope) {
    // #1 View
    $http.get("https://api.mlab.com/api/1/databases/vaibhavdos/collections/data_set?apiKey=y2XGT0UQ97BuJVy8eLy-czqtJvSFvhNa")
        .success(function(response) {
            $scope.myobj = response; //uncomment to start
        });


    // #2 Delete Working
    $scope.delete = function(eid) {
        var tbd = $rootScope.eid;
        $http.delete('https://api.mlab.com/api/1/databases/vaibhavdos/collections/data_set/' + tbd + '?apiKey=y2XGT0UQ97BuJVy8eLy-czqtJvSFvhNa')
            .success(function(response) {
                console.log('Deleted');
                $('#myModal2').modal('hide');
            });
    }


    // #3 create
    $scope.create = function() {
        $http.post("https://api.mlab.com/api/1/databases/vaibhavdos/collections/data_set?apiKey=y2XGT0UQ97BuJVy8eLy-czqtJvSFvhNa", { 'Name': $scope.name, 'Cell': $scope.cell, 'Location': $scope.location, 'PINcode': $scope.PINCode, 'Status': 'Pending' })
            .success(function(response) {
                console.log("data entered");
                $('#myModal').modal('hide');

            });
    };


    // Display in bootstrap modal
    $scope.boot = function(item) {
            $rootScope.ename = item.Name;
            $rootScope.ecell = item.Cell;
            $rootScope.elocation = item.Location;
            $rootScope.ePINCode = item.PINcode;
            $rootScope.eid = item._id.$oid;
        }
        // #4 update
    $scope.update = function(eid) {
        var tbu = $rootScope.eid;
        console.log(tbu);
        $http.put('https://api.mlab.com/api/1/databases/vaibhavdos/collections/data_set/' + tbu + '?apiKey=y2XGT0UQ97BuJVy8eLy-czqtJvSFvhNa', { 'Name': $scope.ename, 'Cell': $scope.ecell, 'Location': $scope.elocation, 'PINcode': $scope.ePINCode, 'Status': 'Pending' })
            .success(function(response) {
                console.log('updated');
                $('#myModal2').modal('hide');
            });


    }

});

scotchApp.controller('deleteController', function($scope, $http) {

    $http.get("https://api.mlab.com/api/1/databases/vaibhavdos/collections/data_set?apiKey=y2XGT0UQ97BuJVy8eLy-czqtJvSFvhNa")
        .success(function(response) {
            $scope.deleted = response;
        });



});

scotchApp.controller('mapController', function($scope, $http) {
    $http.get("location_file.json")
        .success(function(response) {

            //nothing
        });



});




// $scope.login = function() {
//     $http.get("https://api.mlab.com/api/1/databases/vaibhavdos/collections/cred?apiKey=y2XGT0UQ97BuJVy8eLy-czqtJvSFvhNa")
//         .success(function(response) {


//             for (var key in response) {

//                 if ((response[key].username == $scope.name) && (response[key].password == $scope.pass)) {
//                     console.log("match case");

//                 }
//             }
//         });
// };
//}
