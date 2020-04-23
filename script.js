var platipus = "technically a mammal";
var locations = [];
var charger_Type = [];
var distances = [];

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
                locations[i] = `${data[i].AddressInfo.Title} ${data[i].AddressInfo.Town}, ${data[i].AddressInfo.Postcode}`;
                chargerType[i] = `Charger - ${data[i].Connections[0].ConnectionType.FormalName}`;
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
                            <a href="https://www.google.com/maps/search/${locations[i]}" class="location"><i class="small material-icons">place</i><span class="savePlace">${locations[i]}</span></a>
                            <p><i class="small material-icons">ev_station</i>${chargerType[i]}</p>
                        </div>
                    </div>
                `)
                
                // console.log(locations[i]);
            }

            //Save button for Electric cards
            $("button").click(function() {
            var id = $(this).attr('id');
            // console.log(id);
            var buttonPosition = id.charAt(id.length-1);
            console.log(buttonPosition);
            var selectedLocation = locations[buttonPosition];
            var listItem = $("<li>");
            listItem.attr("style", "font-size: 15px; color: black;")
            listItem.text(selectedLocation);
            localStorage.setItem(location, selectedLocation);
            console.log(listItem);
            $("#electricPlacesList").append(listItem);
            // var selectedLocation = `https://www.google.com/maps/search/ + ${locations[buttonPosition]}`;
            // console.log(selectedLocation);
            // alert(selectedLocation);
            });
        }




    }else if($("#fuelType")[0].value == "gas"){
        console.log("gas was selected")
        
        // GAS INPUT
        var locations = [];
        var distances = [];
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
              locations[i] = data.businesses[i].location.address1;
              distances[i] = `Distance (miles): ${Math.round((data.businesses[i].distance/1609.34)*100)/100.0}`;
           }
           console.log(locations);
           console.log(distances);
        
     
     for(var i = 0; i < locations.length; i++){

        //create save buttons on each card with unique ID's for gas section
        var saveGasID = "saveGas" + i;
        var savBtnGas = $("<button>");
        savBtnGas.attr("id", saveGasID);
        
        $("#card"+(i+1)).empty()
        $("#card"+(i+1)).append(`
            <div class="card">
                <div class="card-image">
                    <img class="gas" src="images/fuel.jpg">
                    <button id="${saveGasID}" class="btn-floating halfway-fab waves-effect waves-light teal"><i class="material-icons">add</i></button>
                </div>
                <div class="card-content">
                    <a href="https://www.google.com/maps/search/${locations[i]}" class="location"><i class="small material-icons">place</i><span class="savePlace">${locations[i]}</span></a>
                    <p><i class="small material-icons">distance</i>${distances[i]}</p>
                </div>
            </div>
        `)}

        //Save button for Electric cards
        $("button").click(function() {
            var id2 = $(this).attr('id');
            // console.log(id);
            var buttonPosition2 = id2.charAt(id2.length-1);
            console.log(buttonPosition2);
            var selectedLocation2 = locations[buttonPosition2];
            var gasListItem = $("<li>");
            gasListItem.attr("style", "font-size: 15px; color: black;")
            gasListItem.text(selectedLocation2);
            localStorage.setItem(location, selectedLocation2);
            console.log(gasListItem);
            $("#gasPlacesList").append(gasListItem);
            // var selectedLocation = `https://www.google.com/maps/search/ + ${locations[buttonPosition]}`;
            // console.log(selectedLocation);
            // alert(selectedLocation);
            });
}}
    }
else{
        console.log("nothing was selected")
        $("#error").modal("open");
        $("#card"+(i+1)).empty()
    }
};



//  function saveToHistory(id, location) {
//     console.log(id);
//     console.log(location);

//         // var savedPlace = $(".savePlace").val();
//         // savedItems.push(savedPlace);
//         // console.log(savedItems);
//         // // localStorage.setItem(locations, value);

//         // // $("#placesList").append(listItem);
// }
