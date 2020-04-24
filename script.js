var platipus = "technically a mammal";
var locations = [];
var charger_Type = [];
var distances = [];
var names = [];
var phones = [];
var hist

$("body").keypress(function(event) {
    if (event.which == 13) {
        console.log("yes");
        renderCards()
        $("#address")[0].value = "";
    }
})

$("#submit").click(function(){
    renderCards()
    $("#address")[0].value = ""
});


// 
function renderHistory(){
    hist = JSON.parse(localStorage.getItem("hist"));
    if( hist === null){
        hist = {
            gasHist: [],
            elecHist: []
        };
        localStorage.setItem("hist", JSON.stringify(hist));
    } else { 
        for( var i = 0; i < hist.elecHist.length; i++){
            $("#electricPlacesList").append(`<li><a class="histlink" href="https://www.google.com/maps/search/${hist.elecHist[i]}" target="_blank">${hist.elecHist[i]}</a></li>`);
        }
        for( var i = 0; i < hist.gasHist.length; i++){
            $("#gasPlacesList").append(`<li><a class="histlink" href="https://www.google.com/maps/search/${hist.gasHist[i]}" target="_blank">${hist.gasHist[i]}</a></li>`);
        }
    };
};
renderHistory();

// --- function to render cards ---
function renderCards(){
    // render electric
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
            for (i=0; i < data.length; i++) {
                names[i] = data[i].AddressInfo.Title
                locations[i] = `${data[i].AddressInfo.AddressLine1}, ${data[i].AddressInfo.Town}, ${data[i].AddressInfo.Postcode} ${data[i].AddressInfo.StateOrProvince}`;
                chargerType[i] = `Charger - ${data[i].Connections[0].ConnectionType.FormalName}`;
                phones[i] = data[i].AddressInfo.ContactTelephone1;
            }
            for(var i = 0; i < locations.length; i++){

                //create save buttons on each card with unique ID's (saveElectric1 through saveElectric10)
                var saveElecID = "saveElectric" + i;
                var savBtn = $("<button>");
                savBtn.attr("id", saveElecID);


                $("#card"+(i+1)).empty()
                $("#card"+(i+1)).append(`
                    <div class="card">
                        <div class="card-image">
                            <img class="imgH" src="images/electric.jpg">
                            <button id="${saveElecID}" class="btn-floating halfway-fab waves-effect waves-light teal"><i class="material-icons">add</i></button>
                        </div>
                        <div class="card-content">
                            <i class='fas fa-building'  style='font-size:24px'></i>${names[i]} 
                            <p><br><i class='fas fa-phone'  style='font-size:24px'></i>${phones[i]} </p>
                            <p><br><a href="https://www.google.com/maps/search/${locations[i]}" class="location" target="_blank"><i class="small material-icons">place</i><span class="savePlace">${locations[i]}</span></a></p>
                            <p><br><i class="small material-icons">ev_station</i>${chargerType[i]}</p>
                        </div>
                    </div>
                `)
                
                 console.log(data);
            }

            //Save button for Electric cards
            $("button").click(function() {
                var id = $(this).attr('id');
                var buttonPosition = id.charAt(id.length-1);
                console.log(buttonPosition);
                var selectedLocation = locations[buttonPosition];
                // we dont use this code but for some reason it's required to render... no idea why
                var listItem = $("<li>");
                listItem.attr("style", "font-size: 15px; color: black;")
                listItem.text(selectedLocation);
                //renders history item to correct list 
                $("#electricPlacesList").append(`<li><a class="histlink" href="https://www.google.com/maps/search/${selectedLocation}" target="_blank">${selectedLocation}</a></li>`);
                // pushes item to history for rendering when page reloads
                hist.elecHist.push(selectedLocation)
                localStorage.setItem("hist", JSON.stringify(hist));
            });
        }



// render gas
    }else if($("#fuelType")[0].value == "gas"){
        console.log("gas was selected")
        
        // GAS INPUT
        // var locations = [];
        // var distances = [];
        // var names = [];
        var address = $("#address").val();
        var myurl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=gas&location=${address}`;
        getURL();
        function getURL() {
           $.ajax({
           url: myurl,
           method: "GET",
           dataType: 'json',
           headers: {
              'Authorization':'Bearer T2wxpy51o7xLn4IRb0aA-wYFxHJm2fVI61S3T93kHvUh3OgaUJi2vNTjwKbJtvRvHyyhFVOE2JlajaiHeRXQbmmI4bGvwfUbknG7vIXJ756j8FNwzw9m47blHc6YXnYx',
           }
        }).then(getGas);

        function getGas(data) {
           console.log(data);
           console.log(locations);
           for (var i = 0; i < 10; i++) {
              locations[i] = `${data.businesses[i].location.address1}, ${data.businesses[i].location.city}, ${data.businesses[i].location.state} ${data.businesses[i].location.zip_code}`;

              distances[i] = ` Distance (miles): ${Math.round((data.businesses[i].distance/1609.34)*100)/100.0}`;
              names[i] = data.businesses[i].name;
              phones[i] = data.businesses[i].display_phone;
           }
           console.log(locations);
           console.log(distances);
           console.log(phones);
     
     for(var i = 0; i < locations.length; i++){

        //create save buttons on each card with unique ID's for gas section
        var saveGasID = "saveGas" + i;
        var savBtnGas = $("<button>");
        savBtnGas.attr("id", saveGasID);
        
        $("#card"+(i+1)).empty()
        $("#card"+(i+1)).append(`
            <div class="card gascard">
                <div class="card-image">
                    <img class="gas" src="images/fuel.jpg">
                    <button id="${saveGasID}" class="btn-floating halfway-fab waves-effect waves-light teal"><i class="material-icons">add</i></button>
                </div>
                <div class="card-content">
                    <i class='fas fa-building'  style='font-size:24px'></i>${names[i]} 
                    <p><br><a href="https://www.google.com/maps/search/${locations[i]}" class="location" target="_blank"><i class="small material-icons">place</i><span class="savePlace">${locations[i]}</span></a></p>
                    <p><br><i class='fas fa-phone'  style='font-size:24px'></i>${phones[i]} </p>
                    <p><br><i class='fas fa-route'  style='font-size:24px'></i>${distances[i]}</p>
                </div>
            </div>
        `)}

        //Save button for gas cards
        $("button").click(function() {
            var id2 = $(this).attr('id');
            var buttonPosition2 = id2.charAt(id2.length-1);
            console.log(buttonPosition2);
            var selectedLocation2 = locations[buttonPosition2];
            // we dont use this code but for some reason it's required to render... no idea why
            var gasListItem = $("<li>");
            gasListItem.attr("style", "font-size: 15px; color: black;")
            gasListItem.text(selectedLocation2);
            // reders to history list
            $("#gasPlacesList").append(`<li><a class="histlink" href="https://www.google.com/maps/search/${selectedLocation2}" target="_blank">${selectedLocation2}</a></li>`);
            // pushes items to local storage
            hist.gasHist.push(selectedLocation2)
            localStorage.setItem("hist", JSON.stringify(hist));
            });
}}
    }
else{
        console.log("nothing was selected")
        $("#error").modal("open");
        $("#card"+(i+1)).empty()
    }
};