export default function($scope){
  //show-hide About Us section
  $scope.aboutShow = false;
  $scope.showAbout = function(){
    $scope.aboutShow = !$scope.aboutShow;
  }
  //show-hide Agents
  $scope.agentsShow = false;
  $scope.showAgents = function(){
    $scope.agentsShow = !$scope.agentsShow;
  }
  //show-hide Locations
  $scope.locationsShow = false;
  $scope.showLocations = function(){
    $scope.locationsShow = !$scope.locationsShow;
  }
  //show-hide Events
  $scope.eventsShow = false;
  $scope.showEvents = function(){
    $scope.eventsShow = !$scope.eventsShow;
  }
}//end controller
