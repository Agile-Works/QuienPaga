angular.module('templates-main', ['views/contribuyente.html', 'views/main.html', 'views/origen.html', 'views/partido.html']);

angular.module("views/contribuyente.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/contribuyente.html",
    "<div class=\"container\" style=\"margin:auto;\">\n" +
    "  <div class=\"body\" style=\"margin:auto;\">\n" +
    "    <div id=\"search\" style=\"margin-left: 220px\">\n" +
    "      Donaciones de &nbsp;\n" +
    "      <select ui-select2=\"\" ng-model=\"SelectedName\" data-placeholder=\"Buscar...\" style=\"width:300px\">\n" +
    "        <option></option>\n" +
    "        <option ng-repeat=\"item in ListOfNamesModel\" value=\"{{item.DONANTE}}\">{{item.DONANTE}}</option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <br/><br/>\n" +
    "    <br/><br/>\n" +
    "    <p ng-show=\"displayGif\" style=\"width: 70px; margin:70px auto;\"><img src=\"/Portals/_Sudestada/QuienPaga/scripts/wait.GIF\"></p>\n" +
    "    <div google-chart chart=\"chart\" style=\"padding:0;width:550px;margin:auto\"></div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("views/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/main.html",
    "<div class=\"body\">\n" +
    "  <p ng-show=\"displayGif\" style=\"width: 70px; margin:70px auto;\"><img src=\"/Portals/_Sudestada/QuienPaga/scripts/wait.GIF\"></p>\n" +
    "<div id=\"subHeader\">\n" +
    "  <div id=\"search\" style=\"margin:auto;width:895px;height:50px\">\n" +
    "    <select ui-select2=\"\" ng-model=\"SelectPartidoSector\" data-placeholder=\"Partidos o Sectores...\" style=\"width:280px\">\n" +
    "      <option></option>\n" +
    "      <option value=\"Todos\" partido=\"true\">Todos</option>\n" +
    "      <option ng-repeat=\"item in Selectores.partidosector\" value=\"{{item.name}}\" partido=\"{{item.isPartido}}\">{{item.name}}</option>\n" +
    "    </select>\n" +
    "     <select ui-select2=\"\" ng-model=\"SelectJurisdiccion\" data-placeholder=\"Jurisdicción...\" style=\"width:150px\">\n" +
    "      <option></option>\n" +
    "      <option ng-repeat=\"item in Selectores.jurisdiccion\" value=\"{{item.Jurisdiccion}}\">{{item.Jurisdiccion}}</option>\n" +
    "    </select>\n" +
    "     <select ui-select2=\"\" ng-model=\"SelectOrigenConcepto\" data-placeholder=\"Origen o Concepto...\" style=\"width:240px\">\n" +
    "      <option></option>\n" +
    "      <option ng-repeat=\"item in Selectores.origenconcepto\" value=\"{{item.name}}\" origen=\"{{item.isOrigen}}\">{{item.name}}</option>\n" +
    "    </select>\n" +
    "     <select ui-select2=\"\" ng-model=\"SelectDonante\" data-placeholder=\"Donante...\" style=\"width:210px\">\n" +
    "      <option></option>\n" +
    "      <option ng-repeat=\"item in Selectores.donante | groupBy:'name'\" value=\"{{item.name}}\">{{item.name}}</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div id=\"subBody\" style=\"margin-top:40px;\">\n" +
    "  <div id=\"container\"  style=\"width:1024px;margin:auto\">\n" +
    "    <div id=\"left\" style=\"width:400px !important;display:inline-block;\">\n" +
    "      <table  style=\"margin-left:150px\">\n" +
    "       <tr>\n" +
    "         <th>Agrupar por:</th>\n" +
    "         <th></th>\n" +
    "       </tr>\n" +
    "        <tr>\n" +
    "          <td>Partido</td>\n" +
    "          <td><input type=\"radio\" ng-model=\"Group\" value=\"Partido\"></td>\n" +
    "        </tr>\n" +
    "          <td>Sector</td>\n" +
    "          <td><input type=\"radio\" ng-model=\"Group\" value=\"Sector\"></td>\n" +
    "        <tr>\n" +
    "          <td>Jurisdiccion</td>\n" +
    "          <td><input type=\"radio\" ng-model=\"Group\" value=\"Jurisdiccion\"></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td>Origen</td>\n" +
    "          <td><input type=\"radio\" ng-model=\"Group\" value=\"Origen\"></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td>Concepto</td>\n" +
    "          <td><input type=\"radio\" ng-model=\"Group\" value=\"Concepto\"></td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "          <td>Donante</td>\n" +
    "          <td><input type=\"radio\" ng-model=\"Group\" value=\"Donante\"></td>\n" +
    "        </tr>\n" +
    "      </table>\n" +
    "      </div>  \n" +
    "      <div id=\"right\" style=\"width: 600px;display:inline-block; margin:auto;\">  \n" +
    "        <div google-chart chart=\"chart\" select=\"onSelectRowFunction(selectedItem)\" class=\"grafica\" style=\"padding:0;width:400px;margin:auto\"></div>\n" +
    "      </div>  \n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("views/origen.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/origen.html",
    "<div class=\"body\" style=\"margin:auto;\">\n" +
    "  <p ng-show=\"displayGif\" style=\"width: 70px; margin:70px auto;\"><img src=\"/Portals/_Sudestada/QuienPaga/scripts/wait.GIF\"></p>\n" +
    "  <div google-chart chart=\"chart\" select=\"onSelectRowFunction(selectedItem)\" class=\"grafica\" style=\"width:550px;margin:auto\"></div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("views/partido.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/partido.html",
    "<div class=\"body\" style=\"margin:auto;\">\n" +
    "  <p ng-show=\"displayGif\" style=\"width: 70px; margin:70px auto;\"><img src=\"/Portals/_Sudestada/QuienPaga/scripts/wait.GIF\"></p>\n" +
    "  <div google-chart chart=\"chart\" select=\"onSelectRowFunction(selectedItem, pcurrent.name)\" style=\"padding:0;width:400px;margin:auto\"></div>\n" +
    "</div>");
}]);
