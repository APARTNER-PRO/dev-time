/* OPEN MOBILE MENU */
function openNav() {
    document.getElementById("mobileNav").style.transform = "translateX(0%)";
  }
  
/* CLOSE MOBILE MENU */
function closeNav() {
    document.getElementById("mobileNav").style.transform = "translateX(-100%)";
}

/* CLOSE MOBILE MENU WHEN CLICK ON LINK */
const mobileMenuLinks = document.getElementsByClassName("mobile-nav__link");
for (let mobileMenuLink of mobileMenuLinks) {
  mobileMenuLink.addEventListener("click", closeNav);
}

/* OPEN ADVICE POP UP */
function openAdvicePopUp() {
  document.getElementById("advicePopUp").style.transform = "translateX(0%)";
}

/* CLOSE ADVICE POP UP */
function closeAdvicePopUp() {
  document.getElementById("advicePopUp").style.transform = "translateX(-100%)";
}

/* CALL BUTTON */
function callButton() {
  var callButton = document.getElementById("callButton");
  var callButtonChat = document.getElementById("callButtonChat");
  var callButtonTelegram = document.getElementById("callButtonTelegram");
  var callButtonWhatsapp = document.getElementById("callButtonWhatsapp");
  var callButtonViber = document.getElementById("callButtonViber");

  callButton.classList.toggle("call-button__animation");
  callButtonChat.classList.toggle("call-button__chat_close");
  callButtonTelegram.classList.toggle("fixed");
  callButtonWhatsapp.classList.toggle("fixed");
  callButtonViber.classList.toggle("fixed");
}

/* BACK TO TOP BUTTON */
var backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", function(){
	if (
    document.body.scrollTop > 250 ||
    document.documentElement.scrollTop > 250
  ) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});
backToTop.addEventListener("click", function(){
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

/* PRELOADER */
window.addEventListener('load', (event) => {
  setTimeout(function() {
    document.querySelector("body").classList.add("loaded");
}, 10)
});

