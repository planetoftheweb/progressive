var $ = jQuery = require('jquery');
require('./bootstrap_custom.js');
var Handlebars = require('handlebars');

$(function() {
  var topoffset = 50;

  $.getJSON('/data/pets.json', function(data) {
    var slideshowTemplate = $('#slideshow-template').html();
    var slideshowScript = Handlebars.compile(slideshowTemplate);

    var adoptionTemplate = $('#adoption-template').html();
    var adoptionScript = Handlebars.compile(adoptionTemplate);

    $('.loader').fadeOut(1000);
    $('#slideshow-content').append(slideshowScript(data));
    $('#adoption-content').append(adoptionScript(data));

    //replace IMG inside carousels with a background image
    $('#slideshow .item img').each(function() {
      var imgSrc = $(this).attr('src');
      $(this).parent().css({'background-image': 'url(' + imgSrc + ')'});
      $(this).remove();
    });

    //Activate carousel
    $('.carousel').carousel({
      pause: false
    });
  });

  $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    var hash = $(this).find('li.active a').attr('href');
    if (hash !== '#slideshow') {
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

  $('body').scrollspy({
    target: 'header .navbar',
    offset: topoffset
  });
}); //Page Ready
