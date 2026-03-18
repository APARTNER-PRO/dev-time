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
window.addEventListener("scroll", function () {
  if (
    document.body.scrollTop > 250 ||
    document.documentElement.scrollTop > 250
  ) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});
backToTop.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

/* PRELOADER */
window.addEventListener("load", () => {
  setTimeout(function () {
    document.querySelector("body").classList.add("loaded");
  }, 10);
});

/* STATIC CONTACT FORM SUBMIT */
const WEB3FORMS_ACCESS_KEY = "14706768-3d3b-4a08-8c96-2e6a86cbb98a";
const CONTACT_FORM_SUBMITTING_LABEL = "\u0412\u0456\u0434\u043f\u0440\u0430\u0432\u043a\u0430...";
const CONTACT_FORM_SUBJECT = "\u041d\u043e\u0432\u0430 \u0437\u0430\u044f\u0432\u043a\u0430 \u0437 \u0441\u0430\u0439\u0442\u0443 DevTime";
const CONTACT_FORM_REQUIRED_MESSAGE = "\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0437\u0430\u043f\u043e\u0432\u043d\u0456\u0442\u044c \u0456\u043c'\u044f \u0442\u0430 \u0442\u0435\u043b\u0435\u0444\u043e\u043d.";
const CONTACT_FORM_SUCCESS_MESSAGE = "\u0414\u044f\u043a\u0443\u0454\u043c\u043e! \u0412\u0430\u0448\u0435 \u043f\u043e\u0432\u0456\u0434\u043e\u043c\u043b\u0435\u043d\u043d\u044f \u0443\u0441\u043f\u0456\u0448\u043d\u043e \u043d\u0430\u0434\u0456\u0441\u043b\u0430\u043d\u043e.";
const CONTACT_FORM_ERROR_MESSAGE = "\u0421\u0442\u0430\u043b\u0430\u0441\u044f \u043f\u043e\u043c\u0438\u043b\u043a\u0430. \u0421\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0449\u0435 \u0440\u0430\u0437.";
const CONTACT_FORM_SEND_ERROR_MESSAGE = "\u041d\u0435 \u0432\u0434\u0430\u043b\u043e\u0441\u044f \u0432\u0456\u0434\u043f\u0440\u0430\u0432\u0438\u0442\u0438 \u0444\u043e\u0440\u043c\u0443.";

function setFormMessage(form, message, isSuccess) {
  const responseOutput = form.querySelector(".wpcf7-response-output");

  if (!responseOutput) {
    return;
  }

  responseOutput.textContent = message;
  responseOutput.hidden = false;
  responseOutput.setAttribute("aria-hidden", "false");
  responseOutput.classList.remove("wpcf7-validation-errors", "wpcf7-mail-sent-ng", "wpcf7-mail-sent-ok");
  responseOutput.classList.add(isSuccess ? "wpcf7-mail-sent-ok" : "wpcf7-mail-sent-ng");
}

function clearFormMessage(form) {
  const responseOutput = form.querySelector(".wpcf7-response-output");

  if (!responseOutput) {
    return;
  }

  responseOutput.textContent = "";
  responseOutput.hidden = true;
  responseOutput.setAttribute("aria-hidden", "true");
  responseOutput.classList.remove("wpcf7-validation-errors", "wpcf7-mail-sent-ng", "wpcf7-mail-sent-ok");
}

async function handleStaticContactFormSubmit(event) {
  const form = event.target;

  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  if (!form.closest(".contact-form")) {
    return;
  }

  event.preventDefault();
  event.stopImmediatePropagation();

  const submitButton = form.querySelector('input[type="submit"], button[type="submit"]');

  if (!submitButton) {
    return;
  }

  const originalLabel = submitButton.tagName === "INPUT" ? submitButton.value : submitButton.textContent;
  const nameInput = form.querySelector('[name="client_name"]');
  const phoneInput = form.querySelector('[name="client_phone"]');

  if (!nameInput?.value.trim() || !phoneInput?.value.trim()) {
    setFormMessage(form, CONTACT_FORM_REQUIRED_MESSAGE, false);

    if (!nameInput?.value.trim()) {
      nameInput?.focus();
    } else {
      phoneInput?.focus();
    }

    return;
  }

  const formData = new FormData(form);

  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("subject", CONTACT_FORM_SUBJECT);
  formData.append("from_name", "DevTime");

  clearFormMessage(form);

  if (submitButton.tagName === "INPUT") {
    submitButton.value = CONTACT_FORM_SUBMITTING_LABEL;
  } else {
    submitButton.textContent = CONTACT_FORM_SUBMITTING_LABEL;
  }

  submitButton.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || CONTACT_FORM_SEND_ERROR_MESSAGE);
    }

    setFormMessage(form, CONTACT_FORM_SUCCESS_MESSAGE, true);
    form.reset();
  } catch (error) {
    setFormMessage(form, error.message || CONTACT_FORM_ERROR_MESSAGE, false);
  } finally {
    if (submitButton.tagName === "INPUT") {
      submitButton.value = originalLabel;
    } else {
      submitButton.textContent = originalLabel;
    }

    submitButton.disabled = false;
  }
}

document.addEventListener("submit", handleStaticContactFormSubmit, true);
