$(function () {

    var sideLinksHtml = "";

    sideLinksHtml   += "<p>Some links to sites to help you.</p><strong>Referances</strong></br>"
                    +  "<li class=\"nav-item\"> <a class=\"nav-link\" href=\"https://www.w3schools.com/jquery/default.asp\">Learn JQuery</a> </li>"
                    +  "<li class=\"nav-item\"> <a class=\"nav-link\" href=\"https://www.geeksforgeeks.org/how-to-get-client-ip-address-using-javascript/\">How to get client IP address using JavaScript ?</a> </li>"
                    +  "<li class=\"nav-item\"> <a class=\"nav-link\" href=\"https://getbootstrap.com/docs/3.3/getting-started/\">Getting started with Bootstrap</a> </li>"
                    +  "<li class=\"nav-item\"> <a class=\"nav-link\" href=\"https://www.mydatahack.com/website-page-routing-with-node-js-express-and-ejs/\">Routing and EJS</a> </li>";

    $("#usefullLinks").html(sideLinksHtml);
});
