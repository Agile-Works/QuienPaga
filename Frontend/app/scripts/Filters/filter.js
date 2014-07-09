'use strict';


var uniqueItems = function (data, key) {
  var result = [];
  var ret= [];
  if (data !== null){
    for (var i = 0; i < data.length; i++) {
      var value = data[i][key];
      if (result.indexOf(value) === -1) {
        ret.push(data[i]);
        result.push(value);
      }
    }
  }
  return ret;
};

var app=angular.module('quienPagaApp');
app.filter('groupBy',function () {
    return function (collection, key) {
      if (collection === null){
        return;
      }
      return uniqueItems(collection, key);
    };
  });

/*app.filter('filterBy',function(){
  return function(collection, args){
    angular.forEach(args, function(arg){
        console.log(arg.name + ' ' +arg.value);
      });
  };
});*/

/*angular.module('quienPagaApp')
  .filter('sumByKey', function() {
    return function(data, key) {
      if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
        return 0;
      }
      
      var sum = 0;
      for (var i = data.length - 1; i >= 0; i--) {
          sum += parseInt(data[i][key]);
      }

      return sum;
    };
  });
*/
