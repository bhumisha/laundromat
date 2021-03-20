


// $("#findZip").click(function () {
//     var searchFor = $("#zip-input").val();
//     console.log(searchFor);
//     $("#zip-input").val("");
// });

// $("#zip-input").keypress(function (e) {
//     var key = e.which;
//     if (key == 13) {
//         event.preventDefault();
//         $("#findZip").click();
//         $("#zip-input").val("");
//     }
// });

$('#loginBtn').click(function(){
    $('#loginForm').toggle();
    $('#signUpForm').css('display','none');
    $('#carouselHero').css('display','none');
});

$('#signUpBtn').click(function(){
    $('#signUpForm').toggle();
    $('#loginForm').css('display','none');
    $('#carouselHero').css('display','none');
});
