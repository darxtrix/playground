var productSearchBox = document.getElementById("productSearch");
var serviceSearchBox = document.getElementById("serviceSearch");


var composeUrl = function(category,searchString) {
    var url = "";
    // OOPs browser will not be able to resolve this
    if ( category == "products" ) {
        url += "http://products-service/products?search=";
    } else { // assumming there won't be any other services
        url += "http://services-service/services/search=";
    }
    url += searchString;
    return url;
}

var makeRequest = function(url) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            appendSearchResults(resultsJson);
       }
    };
    req.open("GET",url,true);
    req.send();
}

var appendSearchResults = function(resultsJson) {
    console.log(resultsJson);
}

productSearchBox.addEventListener("input",function() {
    var searchTxt = this.value;
    makeRequest(composeUrl("products",searchTxt));
});

serviceSearchBox.addEventListener("input",function() {
    var searchTxt = this.value;
    makeRequest(composeUrl("services",searchTxt));
});