(function () {
  "use strict";

  /*=====================================
		Sticky
	======================================= */
  window.onscroll = function () {
    var header_navbar = document.querySelector(".navigation");
    var sticky = header_navbar.offsetTop;

    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
    } else {
      header_navbar.classList.remove("sticky");
    }

    var pageLink = document.querySelectorAll(".page-scroll");

    pageLink.forEach((elem) => {
      if (window.pageYOffset > sticky) {
        elem.classList.remove("text-white");
        elem.classList.add("text-gray-700");
      } else {
        elem.classList.remove("text-gray-700");
        elem.classList.add("text-white");
      }
    });
  };

  // Get the navbar

  // for menu scroll
  var pageLink = document.querySelectorAll(".page-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });

      pageLink.forEach((prevActive) => prevActive.classList.remove("active"));
      elem.classList.add("active");
    });
  });

   var contactmebutton = document.getElementById("goto_contact");
  contactmebutton.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("contact").scrollIntoView({
      behavior: "smooth",
      offsetTop: 1 - 60,
    });
  });

  var resumebutton = document.getElementById("goto_resume");
  resumebutton.addEventListener("click", (e) => {
    e.preventDefault();
    window
      .open(
        "https://drive.google.com/file/d/1A4GdkAopkjJhRLgYVTFZ-aHxNBvBZ9x0/view?usp=sharing",
        "_blank"
      )
      .focus();
  });
})();

function onFormSubmit() {
  var postalCodeBox = document.getElementById("postalcode");
  var errorMessage = document.getElementById("error");
  var errorBox = document.getElementById("error-box");

  var isError = false;

  try {
    fixPostalCode(postalCodeBox.value);
  } catch (e) {
    isError = true;
    errorMessage.innerText = e.message;
    console.log(e.message);
  }

  if (isError) {
    errorBox.classList.remove("hidden");
    return false;
  }
  return true;
}

function fixPostalCode(postalCode) {
  // remove leading and trailing space and convert to uppercase
  postalCode = postalCode.trim().toUpperCase();
  if (postalCode.length > 7) {
    throw new Error("Invalid Postal Code");
  }
  if (postalCode.length === 6) {
    postalCode = postalCode.substring(0, 3) + " " + postalCode.substring(3, 6);
  }
  if (postalCode.charAt(3) !== " ") {
    throw new Error("Invalid Postal Code");
  }
  // check format of postal code
  if (!postalCode.match(/[^DFIOQWUZ][0-9][^DFIOQU] [0-9][^DFIOQU][0-9]/)) {
    throw new Error("Invalid Postal Code Not Match any province");
  }
  return postalCode;
}
