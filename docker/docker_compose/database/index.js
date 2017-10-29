const fs = require('fs');
const http = require('http');
const url = require('url');

const JSON_CONTENT_TYPE = 'application/json'
const port = 9090;

const DATABASES = ['services','products'];

var requestHandler = (request,response) => {
    var dbName, searchString, dbContents;
    var ifBadRequest = false;

    // parse the dbName if present
    var urlPath = url.parse(request.url).pathname;
    if( urlPath.length > 0 ) {
        dbName = urlPath.slice(1);
        // check if it is a valid database name 
        if ( DATABASES.indexOf(dbName) == -1){
            // set the request to be a bad request
            ifBadRequest = true;
        }
    } else {
        // set the request to be a bad request
        ifBadRequest = true;
    }

    // parse the search string if present 
    var queryParams = url.parse(request.url).query;
    if ( queryParams && queryParams.length > 0 ) {
        var params = queryParams.split("=");
        if ( params.length == 2 && params[0] == 'search') {
            searchString = params[1];
        }
    } 

    console.log("Database Name :: " + dbName);
    console.log("Search String :: " + searchString);
    console.log("If bad request :: " + ifBadRequest);

    // Check if bad request 
    if (ifBadRequest) {
        // set the response type to application/json
         var errData = {
            "name" : "",
            "message" : ""
        }
        response.writeHead(400,{'Content-Type': JSON_CONTENT_TYPE})
        errData["name"] = "Bad request";
        errData["message"] = "Content type is application/json"
        response.end(JSON.stringify(errData));
    } else {
        var responeData = [], records;
        // set the response type to application/json
        response.writeHead(200,{'Content-Type': JSON_CONTENT_TYPE});
        var rawRecords = fs.readFileSync(`./${dbName}.json`);
        //console.log(rawRecords.toString());
        records = JSON.parse(rawRecords.toString());
        // do search 
        var names = [];
        records.forEach(function(record) {
             names.push(record.name);
        });
        // console.log(names);
        var filteredNames = [];
        var filteredNames = names.filter(function(c) {
            if ( searchString == undefined || searchString.length == 0 || (c.toLowerCase()).indexOf(searchString.toLowerCase()) != -1 ) {
                return c;
            }
        });
        records.forEach(function(record) {
            if ( filteredNames.indexOf(record.name) != -1 ){
                responeData.push(record);
            }
        });
        response.end(JSON.stringify(responeData));
    }
}


const server = http.createServer(requestHandler);


server.listen(port, err => {
    if (err) {
        return console.log("something bad happened",err)
    }

    console.log(`server is listening on ${port}`)
})