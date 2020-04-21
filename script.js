var platipus = "technically a mammal";
var locations = [];
var charger_Type = [];


$("#submit").click(function(){
    // console.log()
    renderCards()
});


function renderCards(){
    if($("#fuelType")[0].value == "electric"){
        console.log("electric was selected")
        // set test variables
        locations = [];
        chargerType = [];
        var lat = "";
        var lon = "";
        var max = 10;
        var e_QueryURL = "";
        var key = "bb020c16-6b05-47d8-bec0-0e655caac430";
        var token = "1beabf666d8a29";
        var address = $("#address").val();
        console.log(address);
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
            e_QueryURL = `${baseURL}&key=${key}&output=json&latitude=${lat}&longitude=${lon}&maxresults=${max}&distanceunit=Miles&distance=25`
            $.ajax({        
                url: e_QueryURL,
                method: "GET"
            }).then(updatePage);
        }
        // return locations and types of chargers
        function updatePage(data) {
            console.log(data);
            for (i=0; i < data.length; i++) {
                locations[i] = `Address: ${data[i].AddressInfo.Title} ${data[i].AddressInfo.Town}, ${data[i].AddressInfo.Postcode}`;
                chargerType[i] = `Charger Type: ${data[i].Connections[0].ConnectionType.FormalName}`;
            }
            for(var i = 0; i < locations.length; i++){
                $("#card"+(i+1)).empty()
                $("#card"+(i+1)).append(`
                    <div class="card">
                        <div class="card-image">
                            <img src="images/electric.jpg">
                            <a id="save" class="btn-floating halfway-fab waves-effect waves-light teal"><i class="material-icons">add</i></a>
                        </div>
                        <div class="card-content">
                            <a href="https://www.google.com/maps/search/${locations[i]}" class="location truncate"><i class="small material-icons">place</i>${locations[i]}</a>
                            <p><i class="small material-icons">ev_station</i>${chargerType[i]}</p>
                        </div>
                    </div>
                `) 
            }
        }


    }else if($("#fuelType")[0].value == "gas"){
        console.log("gas was selected")
        // input ajax call that puts location data into location array with objects
        // ajax open
        // for loop
        price = "$3.00"
        address = "42 walaby way, sydney"
        // ajax close
        for(var i = 0; i < locations.length; i++){
            $("#card"+(i+1)).empty()
            $("#card"+(i+1)).append(`
                <div class="card">
                    <div class="card-image">
                        <img src="images/fuel.jpg">
                        <span class="card-title black opacity">Location Title</span>
                        <a id="save" class="btn-floating halfway-fab waves-effect waves-light teal"><i class="material-icons">add</i></a>
                    </div>
                    <div class="card-content">
                        <p class="location"><i class="small material-icons">place</i>-${address}-</p>
                        <p><i class="small material-icons">attach_money</i>Price: ${price}</p>
                    </div>
                </div>
            `) 
        }
    }else{
        console.log("nothing was selected")
        $("#error").modal("open");
        $("#card"+(i+1)).empty()
    }
};
