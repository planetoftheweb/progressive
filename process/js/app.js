var $ = jQuery = require('jquery');
require('./bootstrap_custom.js');
var Handlebars = require('handlebars');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

$(function() {
  var topoffset = 50; //variable for menu height

  $.getJSON('/data/pets.json', function(data) {
    var slideqty;
    var randSlide;

    $('.loader').fadeOut(1000);


    var appointmentsTemplate   = $("#appointments-template").html();
    var appointmentsScript = Handlebars.compile(appointmentsTemplate);

    var adoptionTemplate   = $("#adoption-template").html();
    var adoptionScript = Handlebars.compile(adoptionTemplate);

    var slideshowTemplate   = $("#slideshow-template").html();
    var slideshowScript = Handlebars.compile(slideshowTemplate);

    $('#appointments-content').append(appointmentsScript(data));
    $('#adoption-content').append(adoptionScript(data));
    $('#slideshow-content').append(slideshowScript(data));

    randSlide = Math.floor(Math.random()*slideqty);
    slideqty = $('#slideshow .item').length;
    $('#slideshow .item').eq(randSlide).addClass('active');

    //replace IMG inside carousels with a background image
    $('#slideshow .item img').each(function() {
      var imgSrc = $(this).attr('src');
      $(this).parent().css({'background-image': 'url('+imgSrc+')'});
      $(this).remove();
    });

    // Activate Carousel
    $('.carousel').carousel({
      pause: false
    });

  });

  $(document).on("click", ".openpetmodal", function () {
    $('.modal-petname').html($(this).data('petname'));
    $('.modal-petbreed').html($(this).data('petbreed'));
    $('.modal-petowner').html($(this).data('petowner'));
    $('.modal-petinfo').html($(this).data('petinfo'));
    $('.modal-petimage').attr('src','images/pets/' + $(this).data('petimage') + '.jpg');
  });

  // Add an inbody class to nav when scrollspy event fires
  $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    var hash = $(this).find('li.active a').attr('href');
    if(hash !== '#slideshow') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
  });

  //Use smooth scrolling when clicking on navigation
  $('.navbar a').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  //Activate Scrollspy
  $('body').scrollspy({
    target: 'header .navbar',
    offset: topoffset
  });

});
