var $ = jQuery = require('jquery');
require('./bootstrap_custom.js');
var Handlebars = require('handlebars');

$(function() {
  var topoffset = 50;
  $('.loader').fadeOut(1000);

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
