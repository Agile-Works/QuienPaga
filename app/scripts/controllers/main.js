'use strict';


angular.module('quienPagaApp')
  .controller('MainCtrl', function ($scope) {
	    var chart1 = {};
	    chart1.type = 'PieChart';
	    chart1.data = [ ['FA', 'cost'],['PN', 50000],['PC', 80000],['AP', 60000]];
	    chart1.data.push(['PI',20000]);
	    chart1.options = {displayExactValues: true,width: 400,height: 200,is3D: false,pieHole: 0.4,chartArea: {left:10,top:10,bottom:0,height:'100%'}};
	    chart1.formatters = {number : [{columnNum: 1, pattern: '$ #,##0.00'}]};
	    $scope.chart = chart1;
});