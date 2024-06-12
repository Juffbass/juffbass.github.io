$(document).ready(function(){
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">&larr;</button>',
        nextArrow: '<button type="button" class="slick-next">&rarr;</button>',
    });
});
