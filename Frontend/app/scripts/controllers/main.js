'use strict';

angular.module('quienPagaApp')
  .controller('MainCtrl', function ($scope,$http,$window,DataService,$stateParams, $state,$filter) {


    //Filtro
    var filtro={partido:'',sector:'',jurisdiccion:'', origen:'', concepto:'', donante:'', agruparpor : 'Partido'};
    if (angular.isDefined($stateParams.search) && $stateParams.search !==''){
      angular.forEach($stateParams.search.split('&'), function(value){
        var param= value.$stateParams.search('=');
        switch(angular.lowercase(param[0])) {
          case 'partido':
            filtro.partido=param[1];
            break;
          case 'sector':
            filtro.sector=param[1];
            break;
          case 'concepto':
            filtro.concepto=param[1];
            break;
          case 'origen':
            filtro.origen=param[1];
            break;
          case 'jurisdiccion':
            filtro.jurisdiccion=param[1];
            break;
          case 'donante':
            filtro.donante=param[1];
            break;
          case 'agruparpor':
            filtro.agruparpor=param[1];
        }
      });
    }



    $scope.displayGif=true;
    DataService.GetAll(filtro).then(function(response){
      var chartdata=[['Partido','Montos']];
      angular.forEach($filter('groupBy')(response,filtro.agruparpor), function(value){
        var sum= 0;
        switch(angular.lowercase(filtro.agruparpor)){
          case 'partido':
            angular.forEach($filter('filter')(response,{'Partido':value.Partido}), function(value2){
              sum+=value2.Monto;
            });
            break;
          case 'sector':
            angular.forEach($filter('filter')(response,{'Sector':value.Sector}), function(value2){
              sum+=value2.Monto;
            });
            break;
          case 'origen':
            angular.forEach($filter('filter')(response,{'Origen':value.Origen}), function(value2){
              sum+=value2.Monto;
            });
            break;
          case 'jurisdiccion':
            angular.forEach($filter('filter')(response,{'Jurisdiccion':value.Jurisdiccion}), function(value2){
              sum+=value2.Monto;
            });
            break;
          case 'donante':
            angular.forEach($filter('filter')(response,{'Donante':value.Donante}), function(value2){
              sum+=value2.Monto;
            });
            break;
        }
        
        var aux=[];
        aux.push(value.Partido);
        aux.push(sum);
        this.push(aux);
      }, chartdata);
      var MainChart = {};
      MainChart.methods={};
      MainChart.type = 'PieChart';
      MainChart.data=chartdata;
      MainChart.options = {displayExactValues: true,width: 500,height: 200,is3D: false,pieHole: 0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'}, colors: ['#109618','#ff9900','#dc3912','#990099','#3366cc']};
      MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
      $scope.chart = MainChart;
    });

    $scope.Selectores=DataService.GetSelectors();

    $scope.displayGif=false;

    $scope.onSelectRowFunction = function(selectedItem){
      $state.go('partido',{id: $scope.chart.data[selectedItem.row + 1][0]});
    };

    $scope.$watch('SelectPartidoSector',function(newVal,oldVal){
      if (angular.isDefined(newVal) && newVal!==oldVal){
        console.log(newVal);
        console.log(oldVal);

        var hash= (window.location.hash.split('#'))[1].split('&');
        console.log(hash);
        var newHash='';
        if(window.location.hash.contains('Jurisdiccion')){
          angular.forEach(hash, function(value){
            var aux=value.split('=');
            if (aux[0]!=='Jurisdiccion'){
              if (newHash !== ''){
                newHash+= '&'  + value;
              }else{
                newHash+=value;
              }
            }else{
              if(newHash !== ''){
                newHash+='&Jurisdiccion=' + newVal;
              }else{
                newHash+='Jurisdiccion=' + newVal;
              }
            }
          });
        }else{
          angular.forEach(hash, function(value){
            var aux=value.split('=');
            if (newHash !== ''){
              newHash+= '&'  + value;
            }else{
              newHash+=value;
            }
          });

          if (newHash != ){
            //newHash+=
          }
        }
        console.log(newHash);
        $state.go('/',{search:newHash});
      }
    });

 
  });