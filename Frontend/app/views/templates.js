angular.module('templates-main', ['views/contribuyente.html', 'views/main.html', 'views/origen.html', 'views/partido.html']);

angular.module("views/contribuyente.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/contribuyente.html",
    "<div class=\"container-fluid\">\n" +
    "  <div class=\"body row\">\n" +
    "    <div id=\"search\"  class=\"col-md-4 col-md-offset-8\">\n" +
    "      <select ui-select2=\"\" ng-model=\"SelectedName\" data-placeholder=\"Buscar...\" style=\"width:200px\">\n" +
    "        <option></option>\n" +
    "        <option ng-repeat=\"item in ListOfNamesModel\" value=\"{{item.DETALLE}}\">{{item.DETALLE}}</option>\n" +
    "      </select>\n" +
    "      &nbsp; &nbsp;\n" +
    "      <a ng-click=\"goToContribuyente(SelectedName)\" class=\"btn btn-default btn-sm\" style=\"background-color: #EBEBEB\">Enviar</a>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4 col-md-offset-4\">{{mensaje}} <strong>{{pdonante.nombre.replace('\"','').replace('\"','') }}</strong></div>\n" +
    "    <div class=\"col-md-4\"></div>\n" +
    "    <div google-chart chart=\"chart\" class=\"col-md-12 grafica\"></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("views/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/main.html",
    "<div class=\"body\">\n" +
    "  <div google-chart chart=\"chart\" select=\"onSelectRowFunction(selectedItem)\" style=\"padding:0;width:400px;margin:auto\"></div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("views/origen.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/origen.html",
    "<div class=\"body\">\n" +
    "  <div google-chart chart=\"chart\" select=\"onSelectRowFunction(selectedItem)\" style=\"padding:0;width:900px;margin:auto\"></div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("views/partido.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partido.html",
    "<div class=\"body\">\n" +
    "  <div google-chart chart=\"chart\" select=\"onSelectRowFunction(selectedItem, pcurrent.name)\" style=\"padding:0;width:400px;margin:auto\"></div>\n" +
    "</div>");
}]);
