// // AJAX ========================================================================
// $(document).ready(function ($) {
//   var $userForm = $('.new-user')
//
//   $userForm.on('submit', function (e) {
//     e.preventDefault()
//     var formdata = $(this).serializeArray()
//
//     window.alert('ajax call now')
//
//     $.post({
//       url: '/api/users',
//       data: formdata
//     }).done(doSomething)
//   })
//
//   function doSomething (data) {
//     window.alert('form submitted, new users created')
//     $('#all-user-list').append('<li>' + data.local.name + '<br>' + data.local.email + '<br>' + data.local.password + '</li>')
//   }
// })

//FLASH MESSAGE==============================================================

$(document).ready(function(){
                    $("#messageBox").delay(1500).hide(0)
})

//IMAGE UPLOAD==============================================================

$(document).on('click', '#close-preview', function() {
  $('.image-preview').popover('hide');
  // Hover befor close the preview
  $('.image-preview').hover(
    function() {
      $('.image-preview').popover('show');
    },
    function() {
      $('.image-preview').popover('hide');
    }
  );
});

$(function() {
  // Create the close button
  var closebtn = $('<button/>', {
    type: "button",
    text: 'x',
    id: 'close-preview',
    style: 'font-size: initial;',
  });
  closebtn.attr("class", "close pull-right");
  // Set the popover default content
  $('.image-preview').popover({
    trigger: 'manual',
    html: true,
    title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
    content: "There's no image",
    placement: 'bottom'
  });
  // Clear event
  $('.image-preview-clear').click(function() {
    $('.image-preview').attr("data-content", "").popover('hide');
    $('.image-preview-filename').val("");
    $('.image-preview-clear').hide();
    $('.image-preview-input input:file').val("");
    $(".image-preview-input-title").text("Browse");
  });
  // Create the preview image
  $(".image-preview-input input:file").change(function() {
    var img = $('<img/>', {
      id: 'dynamic',
      width: 250,
      height: 200
    });
    var file = this.files[0];
    var reader = new FileReader();
    // Set preview image into the popover data-content
    reader.onload = function(e) {
      $(".image-preview-input-title").text("Change");
      $(".image-preview-clear").show();
      $(".image-preview-filename").val(file.name);
      img.attr('src', e.target.result);
      $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
    }
    reader.readAsDataURL(file);
  });
});

//HEADER ANIMATION==========================================================

function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("main").style.marginLeft = "300px";
  document.getElementById("containerNew").style.marginLeft = "300px";

}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
    document.getElementById("containerNew").style.marginLeft = "0";
}

//SCROLL TO TOP==========================================================

$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});


//change tag color==========================================================

// $(window).scroll(function() {
// if ((document.getElementByClass(".aa-tag.for-rent")) === "") {
//   $('.aa-tag.for-rent').addClass('bestanswer')
// }
//
//
// .style.width = "300px";
//
// $("#td_id").addClass('newClass');
