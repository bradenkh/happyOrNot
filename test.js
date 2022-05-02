var starIsOpen = false;
var feedbackIsOpen = false;

var rating;
var uid = getUID();
var feedback;
var email;

document
   .getElementById("open-close-button")
   .addEventListener("click", handleFeedbackButtonClick);

function handleFeedbackButtonClick() {
   if (starIsOpen) {
      closeStarMenu();
   } else {
      openStarMenu();
   }
}

function closeStarMenu() {
   starIsOpen = false;
   document.getElementById("feedbackButton").classList = "fbClosedButton";
   // setTimeout(() => {
   //    document.getElementById("fbButtonText").classList = "fbClosedText";
   // }, 400);
   setTimeout(() => {
      document.getElementById("fbButtonText").innerHTML = "+-";
   }, 150);

   document.getElementById("starMenu").classList = "starMenuHidden";
   removeStarListeners();
   for (let i = 1; i < 6; i++) {
      var star = document.getElementById("star" + i);
      star.classList = "hidden";
   }
}

function openStarMenu() {
   starIsOpen = true;
   document.getElementById("starMenu").classList = "star-menu-open";
   document.getElementById("feedbackMenu").classList = "feedbackMenu-star";
   document.getElementById("menu-top-text").innerText =
      "How would you rate the OneStop?";
   // for (let i = 1; i < 6; i++) {
   //    var star = document.getElementById("star" + i);
   //    star.classList = "star";
   // }
   addStarListeners();
}

function removeStarListeners() {
   for (let i = 1; i < 6; i++) {
      var old_element = document.getElementById("star" + i);
      var new_element = old_element.cloneNode(true);
      old_element.parentNode.replaceChild(new_element, old_element);
   }
}

function createMouseListeners(num) {
   element = document.getElementById("star" + num);
   element.addEventListener("mouseover", () => {
      lightStars(num);
   });
   element.addEventListener("mouseout", (event) => {
      lightStars(0);
   });
   element.addEventListener("click", (event) => {
      selectStar(num);
   });
}

function addStarListeners() {
   for (let i = 1; i < 6; i++) {
      createMouseListeners(i);
   }
}

function lightStars(num) {
   var stars = document.getElementsByName("star");
   stars.forEach((el) => {
      el.classList = "star";
   });
   for (let i = 0; i < num; i++) {
      stars[i].classList = "star-checked";
   }
}

function selectStar(num) {
   lightStars(num);
   removeStarListeners();
   // this is where we set what number will be sent
   // to the server.
   rating = num;
   setTimeout(openFeedbackMenu, 500);
}

function openFeedbackMenu() {
   starIsOpen = false;
   feedbackIsOpen = true;
   var stars = document.getElementsByName("star");
   stars.forEach((el) => {
      el.classList = "hidden";
   });

   document.getElementById("starMenu").classList = "hidden";
   document.getElementById("writtenFeedbackForm").classList =
      "written-feedback-form";
   document.getElementById("open-close-button").classList =
      "open-close-button-feedback";
   document.getElementById("feedbackFormText").classList = "feedbackFormText";
   document.getElementById("textFeedback").classList = "feedback-text-input";
   document.getElementById("emailPrompt").classList = "email-prompt";
   document.getElementById("emailInput").classList = "email-input";
   document.getElementById("feedbackDisclaimer").classList =
      "feedback-disclaimer";
   document.getElementById("feedbackSubmit").classList = "feedback-submit";
   console.log(document.getElementById("writtenFeedbackForm"));
   var form = document.getElementById("writtenFeedbackForm");
   console.log(form);
   form.addEventListener("submit", submitFeedback);
}

function submitFeedback(event) {
   event.preventDefault();
   var feedbackText = document.getElementById("textFeedback").value;
   var email = document.getElementById("emailInput").value;
   console.log("{email:" + email + ",feedback:" + feedbackText + "}");
   // activateThankYou();
   sendFeedback();
}

function activateThankYou() {
   feedbackIsOpen = false;
   document.getElementById("fbButtonText").innerHTML =
      "Thank you for your feedback!";
   document.getElementById("writtenFeedBackMenu").classList = "hidden";
   setTimeout(() => {
      document.getElementById("theGladOrSad").classList = "hidden";
   }, 2000);
}

function getUID() {
   if (document.querySelector("[title='Sign In']") != null) {
      return null;
   }
   var list = document
      .querySelector("div.dropdown.pull-right")
      .querySelector("ul")
      .querySelectorAll("li");
   var link;
   list.forEach((element) => {
      var childLink = element.querySelector("a");
      console.log();
      if (childLink) {
         if (childLink.innerText.includes("My Profile"))
            link = childLink.getAttribute("href");
      }
   });
   return link.split("ID=")[1];
}

function buildURL() {
   var postUrl = "localhost:8080/feedback?" + "rating=" + rating;
   // "&webpage=" +
   // window.location.href.split("//:")[1];
   if (uid) {
      postUrl += "&uid=" + uid;
   }
   if (email) {
      postUrl += "&email=" + email;
   }
   if (feedback) {
      postUrl += "&feedback=" + feedback;
   }
}

function sendFeedback() {
   var postUrl = buildURL();
   var xhr = new XMLHttpRequest();
   xhr.open("POST", postUrl, true);
   xhr.send();
}
