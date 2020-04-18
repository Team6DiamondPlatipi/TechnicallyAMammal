
// set test variables
var lat = "";
var lon = "";
var max = 10;
var queryURL = "";
var key = "20838232-00c1-498d-8c22-91d34f923df8";
var token = "1beabf666d8a29";
var address = "7711 fiesta way raleigh";

var geocode_Base = `https://us1.locationiq.com/v1/search.php?key=${token}&q=${address}&format=json`;

getLatLon();

// convert address to lat lon
function getLatLon() {
    $.ajax({
        url: geocode_Base,
        method: "GET"
    }).then(updateLatLon);
}
// set lat and lon variables from api
function updateLatLon(latlon) {
    lat = latlon[0].lat;
    lon = latlon[0].lon;
    getURL();
}
// get electric data from api
function getURL(){
    baseURL = "https://api.openchargemap.io/v3/poi/?";
    queryURL = `${baseURL}&key=${key}&output=json&latitude=${lat}&longitude=${lon}&maxresults=${max}&distanceunit=Miles&distance=25`
    $.ajax({        
        url: queryURL,
        method: "GET"
    }).then(updatePage);
}
// return locations and types of chargers
function updatePage(data) {
    for (i=0; i < data.length; i++) {
        var location = `Address: ${data[i].AddressInfo.Title} ${data[i].AddressInfo.Town}, ${data[i].AddressInfo.Postcode}`;
        var chargerType = `Charger Type: ${data[i].Connections[0].ConnectionType.FormalName}`;
        console.log(location);
        console.log(chargerType);
        console.log("");
    }
}

