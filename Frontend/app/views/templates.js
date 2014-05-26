angular.module('templates-main', ['views/contribuyente.html', 'views/main.html', 'views/origen.html', 'views/partido.html']);

angular.module("views/contribuyente.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/contribuyente.html",
    "<div class=\"container\" style=\"margin:auto;\">\n" +
    "  <div class=\"body\" style=\"margin:auto;\">\n" +
    "    <div id=\"search\" style=\"position:absolute;right:15px;\">\n" +
    "      Donaciones de &nbsp;\n" +
    "      <select ui-select2=\"\" ng-model=\"SelectedName\" data-placeholder=\"Buscar...\" style=\"width:300px\">\n" +
    "        <option></option>\n" +
    "        <option ng-repeat=\"item in ListOfNamesModel\" value=\"{{item.DETALLE}}\">{{item.DETALLE}}</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <br/><br/>\n" +
    "    <br/><br/>\n" +
    "    <div google-chart chart=\"chart\" style=\"padding:0;width:550px;margin:auto\"></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("views/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/main.html",
    "<div class=\"body\">\n" +
    "  <div google-chart chart=\"chart\" select=\"onSelectRowFunction(selectedItem)\" class=\"grafica\" style=\"padding:0;width:400px;margin:auto\"></div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("views/origen.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/origen.html",
    "<div class=\"body\" style=\"margin:auto;\">\n" +
    "  <div google-chart chart=\"chart\" select=\"onSelectRowFunction(selectedItem)\" class=\"grafica\" style=\"width:550px;margin:auto\"></div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("views/partido.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partido.html",
    "<div class=\"body\" style=\"margin:auto;\">\n" +
    "  <div google-chart chart=\"chart\" select=\"onSelectRowFunction(selectedItem, pcurrent.name)\" style=\"padding:0;width:400px;margin:auto\"></div>\n" +
    "</div>");
}]);
