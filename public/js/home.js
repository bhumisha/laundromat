
// fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyBz7e4X_piywmlaQOSdB4DPoaqq6PI9lfk')

//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })

$("#findZip").click(function () {
    var searchFor = $("#zip-input").val();
    console.log(searchFor);
    $("#zip-input").val("");
});

$("#zip-input").keypress(function (e) {
    var key = e.which;
    if (key == 13) {
        event.preventDefault();
        $("#findZip").click();
        $("#zip-input").val("");
    }
});