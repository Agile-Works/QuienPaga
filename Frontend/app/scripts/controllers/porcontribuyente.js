'use strict';

angular.module('quienPagaApp')
  .controller('PorContribuyenteCtrl', function ($scope,$http,$stateParams,DataService,$location) {
    DataService.GetSelect2Data().then(function(data){
      $scope.ListOfNamesModel = data;
    });

    if ($stateParams.nombre !== 'Otros'){
      $scope.mensaje= 'Donnaciones realiazadas por ';
      DataService.GetDetailForContributor($stateParams.nombre).then(function(data){
        $scope.pcurrent=$stateParams.id;
        $scope.pdonante={nombre :  $stateParams.nombre};
        var chartdata= [['Donante','Montos',{role:'style'}, { role: 'annotation' } ]];
        var datacolors=['#3366cc','#dc3912','#ff9900','#109618','#990099','#0099c6','#dd4477','#66aa00','#aaaa11','#316395','#22aa99'];
        angular.forEach(data, function(value, index){
          var dato=angular.fromJson(value);
          var aux=[];
          aux.push(dato.Label);
          aux.push(dato.Monto);
          aux.push(datacolors[index]);
          aux.push(dato.Label);
          this.push(aux);
        }, chartdata);
        var MainChart = {};
        MainChart.methods={};
        MainChart.type = 'BarChart';
        MainChart.displayed = 'true';
        MainChart.data=chartdata;
        MainChart.options = {title: 'Donaciones de ' + $stateParams.nombre ,displayExactValues: true,width: 600,height: 200,chartArea: {left:10,top:10,bottom:0,height:'80%'},legend: 'none'};
        MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
        $scope.chart = MainChart;
        
      });
    }else{
      $scope.mensaje = 'Ingrese el nombre que desea consultar en el buscador';
    }

    $scope.onSelectRowFunction = function(){
      //$state.go('partido',{id: $scope.chart.data[selectedItem.row + 1][0]});
    };

    $scope.goToContribuyente = function (SelectedName) {
      if (event){
        event.preventDefault();
      }

      console.log(SelectedName);

      if (SelectedName !== '') {
        $location.path('/contribuyente/'+SelectedName);
      } else {
        return false;
      }
    };

  });