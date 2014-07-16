'use strict';

angular.module('quienPagaApp')
  .controller('MainCtrl', function ($scope,$http,DataService,$filter,$location) {
    $scope.myData=[];
    $scope.SelectUI2s={SelectPartidoSector:undefined, SelectJurisdiccion:undefined, SelectOrigenConcepto:undefined, SelectDonante:undefined};
    $scope.gridOptions = { data: 'myData' };
    $scope.displayTable=false;
    $scope.filtro={partido:'',sector:'',jurisdiccion:'', origen:'', concepto:'', donante:'', agruparpor : 'Partido'};
    if (window.location.hash.indexOf('#') === -1){
      $location.path('/#/');
    }else{
      var url=window.location.hash.split('/')[1];
      angular.forEach(url.split('&'), function(value){
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
    }

    $scope.Grafica=function(){
      $scope.displayGif=true;
      $scope.myData=[];
      $scope.displayTable=false;
      $scope.gridOptions = { data: 'myData' };
      var dataArray=[];
      var gridData=[];
      DataService.GetAll($scope.filtro).then(function(response){
        gridData=response;
        var chartdata=[['Nombre','Montos']];
        var groupby='';
        angular.forEach($filter('groupBy')(response,$scope.filtro.agruparpor), function(value){
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
            case 'concepto':
              angular.forEach($filter('filter')(response,{'Concepto':value.Concepto}), function(value2){
                sum+=value2.Monto;
              });
              groupby=value.Concepto;
              break;
          }
          
          var aux=[];
          aux.push();
          aux.push(groupby);
          aux.push(sum);
          this.push(aux);
          if (sum > 0){
            dataArray.push(aux);
          }
          
        }, chartdata);

        //Agarro los primeros 15
        var cant=dataArray.length;
        console.log(cant-15);
        if (cant > 15){
          var otros=[];
          otros.push('Otros');
          otros.push(0);
          var auxChartData=[['Nombre','Montos']];
          var i=0;
          angular.forEach(dataArray, function(value){
            if (i >=15){
              otros[1]+=value[1];
            }else{
              auxChartData.push(value);
            }
            var dato={'Nombre':value[0],'Monto':value[1]};
            $scope.myData.push(dato);
            i++;
          });
          auxChartData.push(otros);
          chartdata=auxChartData;
          $scope.gridOptions = { data: 'myData' };
          $scope.displayTable=true;
        }else{
          $scope.myData=[];
          $scope.displayTable=false;
          $scope.gridOptions = { data: 'myData' };
        }

        var MainChart = {};
        MainChart.methods={};
        MainChart.type = 'PieChart';
        MainChart.data=chartdata;
        if (angular.lowercase($scope.filtro.agruparpor) === 'partido'){
          MainChart.options = {displayExactValues: true,width: 500,height: 220,is3D: false,pieHole: 0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'}, colors: ['#ff9900','#3366cc','#dc3912','#990099','#109618']};
        }else{
          MainChart.options = {displayExactValues: true,width: 500,height: 220,is3D: false,pieHole: 0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'}};
        }
        
        MainChart.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
        $scope.chart = MainChart;
      });
      $scope.displayGif=false;

    };



    $scope.Selectores=DataService.GetSelectors($scope.filtro);


    $scope.Grafica();

    $scope.displayGif=false;

    if ($scope.filtro.partido !==''){
      $scope.SelectUI2s.SelectPartidoSector=$scope.filtro.partido;
    }else{
      $scope.SelectUI2s.SelectPartidoSector=$scope.filtro.sector;

    }

    if ($scope.filtro.origen !==''){
      $scope.SelectUI2s.SelectOrigenConcepto=$scope.filtro.origen;
    }else{
      $scope.SelectUI2s.SelectOrigenConcepto=$scope.filtro.concepto;
    }

    $scope.SelectUI2s.SelectJurisdiccion=$scope.filtro.jurisdiccion;
    $scope.SelectUI2s.SelectDonante=$scope.filtro.donante;

    $scope.onSelectRowFunction = function(selectedItem){
      console.log(selectedItem);
      if (angular.lowercase($scope.filtro.agruparpor) ==='partido'){

        $scope.SelectPartidoSector=$scope.chart.data[selectedItem.row + 1][0];
        $scope.filtro.agruparpor='Sector';

      }else if (angular.lowercase($scope.filtro.agruparpor) ==='sector'){

        $scope.SelectPartidoSector=$scope.chart.data[selectedItem.row + 1][0];
        $scope.filtro.agruparpor='Jurisdiccion';

      }else if (angular.lowercase($scope.filtro.agruparpor) ==='jurisdiccion'){

        $scope.SelectJurisdiccion=$scope.chart.data[selectedItem.row + 1][0];
        $scope.filtro.agruparpor='Origen';

      }else if (angular.lowercase($scope.filtro.agruparpor) ==='origen'){

        $scope.SelectOrigenConcepto=$scope.chart.data[selectedItem.row + 1][0];
        $scope.filtro.agruparpor='Concepto';

      }else if (angular.lowercase($scope.filtro.agruparpor) ==='concepto'){

        $scope.SelectOrigenConcepto=$scope.chart.data[selectedItem.row + 1][0];
        $scope.filtro.agruparpor='Donante';

      }else if (angular.lowercase($scope.filtro.agruparpor) ==='donante'){
        $scope.SelectDonante=$scope.chart.data[selectedItem.row + 1][0];
        $scope.filtro.agruparpor='Partido';

      }
      console.log($scope.chart.data[selectedItem.row + 1][0]);

   //   $state.go('partido',{id: $scope.chart.data[selectedItem.row + 1][0]});
    };

    $scope.$watch('SelectUI2s.SelectJurisdiccion',function(newVal,oldVal){
      console.log('newVal');
      console.log(newVal);
      var url= decodeURIComponent(window.location.hash);
      var hash= (url.split('#'))[1].split('&');
      var newHash='';
      if (angular.isDefined(newVal)&& newVal !=='' && newVal!==oldVal){
        if (hash[0] !== '/'){
          var aux=hash[0].split('/');
          hash[0]=aux[aux.length-1];
          angular.forEach(hash, function(value){
            var aux2=value.split('=');
            if (angular.lowercase(aux2[0])!==angular.lowercase('jurisdiccion') && angular.lowercase(aux2[0])!== 'agruparpor'){
              if (newHash !== ''){
                newHash+= '&'  + value;
              }else{
                newHash+=value;
              }
            }else if (angular.lowercase(aux2[0])=== 'agruparpor'){
              if (angular.lowercase(aux2[1]) === angular.lowercase('jurisdiccion')){
                newHash+=(newHash !== '')? '&agruparpor=partido' : 'agruparpor=partido';
              }else{
                if (newHash !== ''){
                  newHash+= '&'  + value;
                }else{
                  newHash+=value;
                }
              }
            }
          });
          newHash+=(newHash !=='') ? '&Jurisdiccion=' + newVal : 'Jurisdiccion=' + newVal;
        }else{
          newHash=hash[0] + 'Jurisdiccion=' + newVal + '&agruparpor=partido';
        }
        $location.path(newHash);

      }else if (newVal ===''){
        if (hash[0] !== '/'){
          var aux2=hash[0].split('/');
          hash[0]=aux2[aux2.length-1];
          angular.forEach(hash, function(value){
            var aux3=value.split('=');
            if (angular.lowercase(aux3[0])!==angular.lowercase('jurisdiccion')) {
              if (newHash !== ''){
                newHash+= '&'  + value;
              }else{
                newHash+=value;
              }
            }else if (angular.lowercase(aux3[0])=== 'agruparpor'){
              if (angular.lowercase(aux3[1]) === angular.lowercase('jurisdiccion')){
                newHash+=(newHash !== '')? '&agruparpor=partido' : 'agruparpor=partido';
              }else{
                if (newHash !== ''){
                  newHash+= '&'  + value;
                }else{
                  newHash+=value;
                }
              }
            }
          });
        }
        $location.path(newHash);
      }
      $scope.filtro.jurisdiccion=newVal;
      $scope.Grafica();
    });

    $scope.$watch('filtro.agruparpor',function(newVal,oldVal){
      console.log(oldVal);
      var url= decodeURIComponent(window.location.hash);
      var hash= (url.split('#'))[1].split('&');
      var newHash='';
      if (hash[0] !== '/'){
        var aux=hash[0].split('/');
        hash[0]=aux[aux.length-1];
        angular.forEach(hash, function(value){
          var aux2=value.split('=');
          if (angular.lowercase(aux2[0])!== 'agruparpor'){
            if (newHash !== ''){
              newHash+= '&'  + value;
            }else{
              newHash+=value;
            }
          }else{
            newHash+=(newHash !== '')? '&agruparpor=' + newVal : 'agruparpor=' + newVal;
          }
        });
        $location.path(newHash);
      }else{
        newHash=hash[0] + 'agruparpor=' + newVal;
        $location.path(newHash);
      }
      $scope.filtro.agruparpor=newVal;
      $scope.Grafica();
  //    $state.go('/',{search:newHash});
    });



    $scope.$watch('SelectUI2s.SelectDonante',function(newVal,oldVal){
      console.log('newVal');
      console.log(newVal);
      var url= decodeURIComponent(window.location.hash);
      var hash= (url.split('#'))[1].split('&');
      var newHash='';
      if (angular.isDefined(newVal)&& newVal !=='' && newVal!==oldVal){
        if (hash[0] !== '/'){
          var aux=hash[0].split('/');
          hash[0]=aux[aux.length-1];
          angular.forEach(hash, function(value){
            var aux2=value.split('=');
            if (angular.lowercase(aux2[0])!==angular.lowercase('donante') && angular.lowercase(aux2[0])!== 'agruparpor'){
              if (newHash !== ''){
                newHash+= '&'  + value;
              }else{
                newHash+=value;
              }
            }else if (angular.lowercase(aux2[0])=== 'agruparpor'){
              if (angular.lowercase(aux2[1]) === angular.lowercase('donante')){
                newHash+=(newHash !== '')? '&agruparpor=partido' : 'agruparpor=partido';
              }else{
                if (newHash !== ''){
                  newHash+= '&'  + value;
                }else{
                  newHash+=value;
                }
              }
            }
          });
          newHash+=(newHash !=='') ? '&Donante=' + newVal : 'Donante=' + newVal;
        }else{
          newHash=hash[0] + 'Donante=' + newVal + '&agruparpor=partido';
        }
        $location.path(newHash);
      }else if (newVal ===''){
        if (hash[0] !== '/'){
          var aux2=hash[0].split('/');
          hash[0]=aux2[aux2.length-1];
          angular.forEach(hash, function(value){
            var aux3=value.split('=');
            if (angular.lowercase(aux3[0])!==angular.lowercase('donante')) {
              if (newHash !== ''){
                newHash+= '&'  + value;
              }else{
                newHash+=value;
              }
            }else if (angular.lowercase(aux3[0])=== 'agruparpor'){
              if (angular.lowercase(aux3[1]) === angular.lowercase('donante')){
                newHash+=(newHash !== '')? '&agruparpor=partido' : 'agruparpor=partido';
              }else{
                if (newHash !== ''){
                  newHash+= '&'  + value;
                }else{
                  newHash+=value;
                }
              }
            }
          });
        }
        $location.path(newHash);
      }
      $scope.filtro.donante=newVal;
      $scope.Grafica();
    });

    $scope.$watch('SelectUI2s.SelectOrigenConcepto',function(newVal,oldVal){
      var url= decodeURIComponent(window.location.hash);
      var hash= (url.split('#'))[1].split('&');
      var newHash='';
      if (angular.isDefined(newVal) && newVal!=='' && newVal!==oldVal){
        var selectType='Origen';
        var groupby='Partido';
        var toRemove='Concepto';
        var type= document.getElementById(newVal.replace(' ','_')).getAttribute('origen');
        if (angular.lowercase(type) === 'false'){ //SECTOR
          selectType='Concepto';
          groupby='Partido';
          toRemove='Origen';
          $scope.filtro.concepto=newVal;
        }else{
          $scope.filtro.origen=newVal;

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
          newHash+=(newHash !=='') ? '&' + selectType + '=' + newVal : selectType + '=' + newVal;
        }else{
          newHash=hash[0] + selectType + '=' + newVal + '&agruparpor=' + groupby;
        }
        $location.path(newHash);
      }else if (newVal===''){

        if (hash[0] !== '/'){
          var aux3=hash[0].split('/');
          hash[0]=aux3[aux3.length-1];
          angular.forEach(hash, function(value){
            var aux2=value.split('=');
            if (angular.lowercase(aux2[0])!==angular.lowercase('origen') && angular.lowercase(aux2[0]) !==angular.lowercase('concepto')){
              if (newHash !== ''){
                newHash+= '&'  + value;
              }else{
                newHash+=value;
              }
            }
          });
        }
        $scope.filtro.origen=newVal;
        $scope.filtro.concepto=newVal;
        $location.path(newHash);
      }
      
      $scope.Grafica();
      console.log($scope.filtro);
    });

    $scope.$watch('SelectUI2s.SelectPartidoSector',function(newVal,oldVal){
      var url= decodeURIComponent(window.location.hash);
      var hash= (url.split('#'))[1].split('&');
      console.log(hash);
      var newHash='';
      if (angular.isDefined(newVal) && newVal!=='' && newVal!==oldVal){
        var selectType='Partido';
        var groupby='Sector';
        var toRemove='Sector';
        var type= document.getElementById(newVal.replace(' ','_')).getAttribute('partido');
        console.log(type);
        if (angular.lowercase(type) === 'false'){ //SECTOR
          selectType='Sector';
          groupby='Jurisdiccion';
          toRemove='Partido';
          $scope.filtro.sector=newVal;
        }else{
          $scope.filtro.partido=newVal;
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
          newHash+=(newHash !=='') ? '&' + selectType + '=' + newVal : selectType + '=' +newVal;
        }else{
          newHash=hash[0] + selectType + '=' + newVal + '&agruparpor=' + groupby;
        }
        $location.path(newHash);
      }else if (newVal===''){
        if (hash[0] !== '/'){
          var aux3=hash[0].split('/');
          hash[0]=aux3[aux3.length-1];
          angular.forEach(hash, function(value){
            var aux2=value.split('=');
            if (angular.lowercase(aux2[0])!==angular.lowercase('partido') && angular.lowercase(aux2[0]) !==angular.lowercase('sector')){
              if (newHash !== ''){
                newHash+= '&'  + value;
              }else{
                newHash+=value;
              }
            }
          });
        }
        $scope.filtro.partido=newVal;
        $scope.filtro.sector=newVal;
        $location.path(newHash);
      }

      $scope.Grafica();
    });
 
  });