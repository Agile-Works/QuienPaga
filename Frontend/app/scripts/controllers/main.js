'use strict';

angular.module('quienPagaApp')
  .controller('MainCtrl', function ($scope,$http,$window,DataService,$stateParams, $state,$filter) {
    //$scope.filtro
    $scope.filtro={partido:'',sector:'',jurisdiccion:'', origen:'', concepto:'', donante:'', agruparpor : 'Partido'};
    
    if (angular.isDefined($stateParams.search) && $stateParams.search !==''){
      angular.forEach($stateParams.search.split('&'), function(value){
        var param= value.split('=');
        if (param[0].indexOf('/') !== -1){
          var aux= param[0].split('/');
          param[0]=aux[aux.length-1];
        }

        switch(angular.lowercase(decodeURIComponent(param[0]))) {
          case 'partido':
            $scope.filtro.partido=decodeURIComponent(param[1]);
            break;
          case 'sector':
            $scope.filtro.sector=decodeURIComponent(param[1]);
            break;
          case 'concepto':
            $scope.filtro.concepto=decodeURIComponent(param[1]);
            break;
          case 'origen':
            $scope.filtro.origen=decodeURIComponent(param[1]);
            break;
          case 'jurisdiccion':
            $scope.filtro.jurisdiccion=decodeURIComponent(param[1]);
            break;
          case 'donante':
            $scope.filtro.donante=decodeURIComponent(param[1]);
            break;
          case 'agruparpor':
            $scope.filtro.agruparpor=decodeURIComponent(param[1]);
        }
      });
      console.log('$scope.filtro');
      console.log($scope.filtro);
      console.log('------------------------');
    }



    $scope.displayGif=true;
    DataService.GetAll($scope.filtro).then(function(response){
      var chartdata=[['Nombre','Montos']];
      var groupby='';
      angular.forEach($filter('groupBy')(response,$scope.filtro.agruparpor), function(value){
        console.log(response);
        var sum= 0;
        switch(angular.lowercase($scope.filtro.agruparpor)){
          case 'partido':
            angular.forEach($filter('filter')(response,{'Partido':value.Partido}), function(value2){
              sum+=value2.Monto;
            });
            groupby=value.Partido;
            break;
          case 'sector':
            angular.forEach($filter('filter')(response,{'Sector':value.Sector}), function(value2){
              sum+=value2.Monto;
            });
            groupby=value.Sector;
            break;
          case 'origen':
            angular.forEach($filter('filter')(response,{'Origen':value.Origen}), function(value2){
              sum+=value2.Monto;
            });
            groupby=value.Origen;
            break;
          case 'jurisdiccion':
            angular.forEach($filter('filter')(response,{'Jurisdiccion':value.Jurisdiccion}), function(value2){
              sum+=value2.Monto;
            });
            groupby=value.Jurisdiccion;
            break;
          case 'donante':
            angular.forEach($filter('filter')(response,{'Donante':value.Donante}), function(value2){
              sum+=value2.Monto;
            });
            groupby=value.Donante;
            break;
        }
        
        var aux=[];
        aux.push();
        aux.push(groupby);
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

    $scope.$watch('SelectJurisdiccion',function(newVal,oldVal){
      if (angular.isDefined(newVal) && newVal!==oldVal){
        var url= decodeURIComponent(window.location.hash);
        var hash= (url.split('#'))[1].split('&');
        var newHash='';
        if (hash[0] !== '/'){
          var aux=hash[0].split('/');
          hash[0]=aux[aux.length-1];
          if(angular.lowercase(window.location.hash).indexOf('jurisdiccion') !== -1){
            angular.forEach(hash, function(value){
              var aux=value.split('=');
              if (angular.lowercase(aux[0])!=='jurisdiccion'){
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
            if (hash[0] !== ''){
              newHash+=hash[0] + '&Jurisdiccion=' + newVal;
            }else{
              newHash+='Jurisdiccion=' + newVal;
            }
          }
        }else{
          newHash=hash[0] + 'Jurisdiccion=' + newVal;
        }

        if (newHash.indexOf('agruparpor') ===-1){
          newHash+='&agruparpor=Partido';
        }
        
        console.log(newHash);
        $state.go('/',{search:newHash});
      }
    });

    $scope.$watch('SelectDonante',function(newVal,oldVal){
      if (angular.isDefined(newVal) && newVal!==oldVal){
        var url= decodeURIComponent(window.location.hash);
        var hash= (url.split('#'))[1].split('&');
        console.log(hash);
        var newHash='';
        if (hash[0] !== '/'){
          var aux=hash[0].split('/');
          hash[0]=aux[aux.length-1];
          if(angular.lowercase(window.location.hash).indexOf('donante') !== -1){
            angular.forEach(hash, function(value){
              var aux=value.split('=');
              if (angular.lowercase(aux[0])!=='donante'){
                if (newHash !== ''){
                  newHash+= '&'  + value;
                }else{
                  newHash+=value;
                }
              }else{
                if(newHash !== ''){
                  newHash+='&Donante=' + newVal;
                }else{
                  newHash+='Donante=' + newVal;
                }
              }
            });
          }else{
            if (hash[0] !== ''){
              newHash+=hash[0] + '&Donante=' + newVal;
            }else{
              newHash+='Donante=' + newVal;
            }
          }
        }else{
          newHash=hash[0] + 'Donante=' + newVal;
        }

        if (newHash.indexOf('agruparpor') ===-1){
          newHash+='&agruparpor=Partido';
        }
        
        console.log(newHash);
        $state.go('/',{search:newHash});
      }
    });

    $scope.$watch('SelectOrigenConcepto',function(newVal,oldVal){
      if (angular.isDefined(newVal) && newVal!==oldVal){
        var url= decodeURIComponent(window.location.hash);
        var hash= (url.split('#'))[1].split('&');
        console.log(hash);
        var newHash='';
        var selectType='Origen';
        var groupby='Partido';
        var toRemove='Concepto';
        var type= newVal.split('&');
        if (angular.lowercase(type[1]) === 'false'){ //SECTOR
          selectType='Concepto';
          groupby='Partido';
          toRemove='Origen';
        }

        if (hash[0] !== '/'){
          var aux=hash[0].split('/');
          hash[0]=aux[aux.length-1];
          angular.forEach(hash, function(value){
            var aux2=value.split('=');
            if (angular.lowercase(aux2[0])!==angular.lowercase(selectType) && angular.lowercase(aux2[0]) !==angular.lowercase(toRemove) && angular.lowercase(aux2[0])!== 'agruparpor'){
              if (newHash !== ''){
                newHash+= '&'  + value;
              }else{
                newHash+=value;
              }
            }else if (angular.lowercase(aux2[0])=== 'agruparpor'){
              if (angular.lowercase(aux2[1]) === angular.lowercase(selectType)){
                newHash+=(newHash !== '')? '&agruparpor=' + groupby : 'agruparpor=' + groupby;
              }else{
                if (newHash !== ''){
                  newHash+= '&'  + value;
                }else{
                  newHash+=value;
                }
              }
            }
          });
          newHash+=(newHash !=='') ? '&' + selectType + '=' + type[0] : selectType + '=' + type[0];
        }else{
          newHash=hash[0] + selectType + '=' + type[0] + '&agruparpor=' + groupby;
        }
       
        console.log(newHash);
        $state.go('/',{search:newHash});
      }
    });

    $scope.$watch('SelectPartidoSector',function(newVal,oldVal){
      if (angular.isDefined(newVal) && newVal!==oldVal){
        var url= decodeURIComponent(window.location.hash);
        var hash= (url.split('#'))[1].split('&');
        console.log(hash);
        var newHash='';
        var selectType='Partido';
        var groupby='Sector';
        var toRemove='Sector';
        var type= newVal.split('&');
        if (angular.lowercase(type[1]) === 'false'){ //SECTOR
          selectType='Sector';
          groupby='Jurisdiccion';
          toRemove='Partido';
        }

        if (hash[0] !== '/'){
          var aux=hash[0].split('/');
          hash[0]=aux[aux.length-1];
          angular.forEach(hash, function(value){
            var aux2=value.split('=');
            if (angular.lowercase(aux2[0])!==angular.lowercase(selectType) && angular.lowercase(aux2[0]) !==angular.lowercase(toRemove) && angular.lowercase(aux2[0])!== 'agruparpor'){
              if (newHash !== ''){
                newHash+= '&'  + value;
              }else{
                newHash+=value;
              }
            }else if (angular.lowercase(aux2[0])=== 'agruparpor'){
              if (angular.lowercase(aux2[1]) === angular.lowercase(selectType)){
                newHash+=(newHash !== '')? '&agruparpor=' + groupby : 'agruparpor=' + groupby;
              }else{
                if (newHash !== ''){
                  newHash+= '&'  + value;
                }else{
                  newHash+=value;
                }
              }
            }
          });
          newHash+=(newHash !=='') ? '&' + selectType + '=' + type[0] : selectType + '=' + type[0];
        }else{
          newHash=hash[0] + selectType + '=' + type[0] + '&agruparpor=' + groupby;
        }
       
        console.log(newHash);
        $state.go('/',{search:newHash});
      }
    });
 
  });