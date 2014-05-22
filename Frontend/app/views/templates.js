angular.module('templates-main', ['views/contribuyente.html', 'views/main.html', 'views/origen.html', 'views/partido.html']);

angular.module("views/contribuyente.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/contribuyente.html",
    "<div class=\"body\">\n" +
    "  <div id=\"search\" style=\"width:400px; float:right\">\n" +
    "    <select ui-select2=\"\" ng-model=\"SelectedName\" data-placeholder=\"Buscar...\" style=\"width:200px\">\n" +
    "      <option></option>\n" +
    "      <option ng-repeat=\"item in ListOfNamesModel\" value=\"{{item.DETALLE}}\">{{item.DETALLE}}</option>\n" +
    "    </select>\n" +
    "    <a href=\"#/contribuyente/{{(SelectedName|json)}}\" style=\"btn btn-primary\" >Enviar</a>\n" +
    "  </div>\n" +
    "  </br>\n" +
    "  <span>Donaciones realizadas por {{pdonante.nombre.replace('\"','').replace('\"','') }}</span>\n" +
    "  <div google-chart chart=\"chart\" style=\"padding:0;width:900px;margin:auto\"></div>\n" +
    "</div>\n" +
    "");
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
