angular.module('templates-main', ['views/main.html', 'views/origen.html', 'views/partido.html']);

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
    "  <div google-chart chart=\"chart\" style=\"padding:0;width:900px;margin:auto\"></div>\n" +
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
