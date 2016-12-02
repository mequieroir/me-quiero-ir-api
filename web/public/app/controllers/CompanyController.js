           
(function(){

  angular
       .module('app')
       .controller('PersonController', [
         '$q', '$state','$stateParams', 'ApiConnectionService',
          PersonController
       ]);
       /**
       * TODO: REFACTORIZAR A UN SERVICE
       */
  function PersonController($q, $state, $stateParams,ApiConnectionService) {
    var vm = this;
    vm.user = {} 

    vm.save = function(argument) {
      // body...
      var _path = "user";
      var _method= "POST"
      var _data = vm.user;
      if (vm.user.userId != undefined) {
        _path ="user/" + vm.user.userId;
        _method = "PUT";
        _data.type = 'company'
      }
       
      var requestData = {
        path: _path,
        method: _method,
        data: _data
      }
      ApiConnectionService.callApi(requestData)
      .then(function(data){
        $state.transitionTo('home.companies');
      },function(data){
        $state.transitionTo('home.companies');
        console.log("error")
      })
    }

    vm.cancel = function(argument) {
      $state.transitionTo('home.companies');
    }



    function init(){
      var id = $stateParams.userId
      if (id != null) {
          var _path = "user/" + id;
          var requestData = {
            path: _path,
            method: "GET"
          }
          ApiConnectionService.callApi(requestData)
          .then(function(data){
            vm.user = data;
            vm.user.skills = Object.keys(vm.user.skills).map(key => vm.user.skills[key]);;
          },function(data){
            console.log("error")
          })
      }
      
    }

    init();


  }

})();
