
$('.loginBtn').click(function(){
    $('#loginForm').toggle();
    $('#signUpForm').css('display','none');
    $('#carouselHero').css('display','none');
});

$('.signUpBtn').click(function(){
    $('#signUpForm').toggle();
    $('#loginForm').css('display','none');
    $('#carouselHero').css('display','none');
});
