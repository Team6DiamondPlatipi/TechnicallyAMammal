# TechnicallyAMammal

a platypus is technically a mammal

added readme branch


var lat = "";
var lon = "";
var max = 10;
var queryURL = "";
var key = "20838232-00c1-498d-8c22-91d34f923df8";
var query_Object = {"appid": "20838232-00c1-498d-8c22-91d34f923df8"};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
    lat = position.coords.latitude;    
    lon = position.coords.longitude;

    lat = lat.toFixed(2);
    lon = lon.toFixed(2);

    console.log(lon);
    console.log(lat);

    getURL();
}

function getURL(){
    baseURL = "https://api.openchargemap.io/v3/poi/?";
    queryURL = `${baseURL}&key=${key}&output=JSON&latitude=${lat}&longitude=${lon}&maxresults=${max}&distanceunit=Miles&distance=25`
    $.ajax({        
        url: queryURL,
        method: "GET"
    }).then(updatePage);
}

function updatePage(data) {
    console.log(data);
    console.log(queryURL);
}

