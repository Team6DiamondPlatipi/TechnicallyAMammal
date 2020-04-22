var platipus = "technically a mammal";
var locations = [1,2,3,4,5,6,7,8,9,10]


$("#submit").click(function(){
    // console.log()
    renderCards()
});


function renderCards(){
    if($("#fuelType")[0].value == "electric"){
        console.log("electric was selected")
        // input ajax call that puts location data into location array with objects
        // input ajax call that puts location data into location array with objects
        // ajax open
        // for loop
        charger = "XY 4000 extreme"
        address = "42 walaby way, sydney"
        // ajax close
        for(var i = 0; i < locations.length; i++){
            $("#card"+(i+1)).empty()
            $("#card"+(i+1)).append(`
                <div class="card">
                    <div class="card-image">
                        <img src="images/electric.jpg">
                        <span class="card-title black opacity">Location Title</span>
                        <a id="save" class="btn-floating halfway-fab waves-effect waves-light teal"><i class="material-icons">add</i></a>
                    </div>
                    <div class="card-content">
                        <p class="location"><i class="small material-icons">place</i>-${address}-</p>
                        <p><i class="small material-icons">ev_station</i>Type: ${charger}</p>
                    </div>
                </div>
            `) 
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



// //Saving info to list/local storage

// $("#save").click(function() {
//     alert("button was clicked");
//     saveToFavorites()
// });

// var savedItems = [];


//     function saveToFavorites() {
//         var savedPlace = $(".savePlace").val();
//         savedPlace.push();
//         console.log(savedPlace);
//         // localStorage.setItem(locations, value);

//         // $("#placesList").append(listItem);
// }

