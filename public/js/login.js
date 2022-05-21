$(document).ready(function () {
  $("#divContainer").css("height", $(window).height() + "px");
  $(".login").css("margin-top", $(window).height() / 2 - 20 + "px");

  $(window).resize(function () {
    $("#divContainer").css("height", $(window).height() + "px");
    $(".login").css("margin-top", $(window).height() / 2 - 20 + "px");
  });

  $("#divLogin").on("click", function () {
    if ($("#divLogin").hasClass("login")) {
      $("#divLogin").removeClass("login").addClass("login-box");
      $("#divCloseLogin").css("display", "block");

      setTimeout(function () {
        $(".close-login").animate(
          {
            opacity: 1,
          },
          {
            step: function () {
              $(this).css("-webkit-transform", "rotate(180deg)");
              $(this).css("-moz-transform", "rotate(180deg)");
              $(this).css("transform", "rotate(180deg)");
            },
            duration: 250,
          },
          100
        );
      });
    }
  });

  $("#divCloseLogin").on("click", function (e) {
    if ($("#divLogin").hasClass("login-box")) {
      $(".login-box").removeClass("login-box").addClass("login");
      $("#divCloseLogin").css("display", "none");
      $(".close-login").css("opacity", "0");
      $(".close-login").css(
        "transform",
        "rotate(0deg) scaleX(1.5) scaleY(1.5)"
      );
      $(".login").css("margin-top", $(window).height() / 2 - 20 + "px");
      $(".loginForm").css("display", "none");
      $(".loginForm").css("margin-top", "60px");
      $(".loginForm").css("opacity", "0");
      e.stopPropagation();
    }
  });

  $(".login").on("transitionend webkitTransitionEnd", function (e) {
    if ($("#divLogin").hasClass("login")) {
      $("#divLogin").css("pointer-events", "auto");
    } else if ($("#divLogin").hasClass("login-box")) {
      $("#divLogin").css("pointer-events", "none");

      setTimeout(function () {
        $(".loginForm").css("display", "block").animate(
          {
            opacity: 1,
            "margin-top": "40px",
          },
          100
        );
        $("#txtUsername").focus();
      }, 150);
    }
  });

  $(".text input").on("transitionend webkitTransitionEnd", function (e) {
    e.stopPropagation();
  });

  $("#divLogin").on(
    "animationend webkitAnimationEnd oanimationend",
    function () {
      if ($("#divLogin").hasClass("btn-submit")) {
        $("#divBox").css("background-color", "#7de4b7");
        $(".sk-circle").css("display", "none");
        $("#divCheck").css("display", "block");
        $("#divCheck").css("font-size", "22pt");
      }
    }
  );
});
