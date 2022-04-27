var starIsOpen = false;
var feedbackIsOpen = false;

document
   .getElementById("fbButtonText")
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
   document.getElementById("feedbackButton").classList = "fbStarMenu";
   setTimeout(() => {
      document.getElementById("fbButtonText").innerHTML =
         "How would you rate this site?";
   }, 150);
   document.getElementById("starMenu").classList = "starMenuShown";
   for (let i = 1; i < 6; i++) {
      var star = document.getElementById("star" + i);
      star.classList = "star";
   }
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
      stars[i].classList = "starChecked";
   }
}

function selectStar(num) {
   lightStars(num);
   removeStarListeners();
   openFeedbackMenu();
   console.log("{rating:" + num + "}");
}

function openFeedbackMenu() {
   starIsOpen = false;
   feedbackIsOpen = true;
   document.getElementById("feedbackButton").classList = "fbFeedbackMenuOpen";
   var stars = document.getElementsByName("star");
   stars.forEach((el) => {
      el.classList = "hidden";
   });
   document.getElementById("starMenu").classList = "hidden";
   document.getElementById("textFeedback").classList = "feedbackTextInput";
   document.getElementById("fbButtonText").innerHTML =
      "Let us know your thoughts!";
   document.getElementById("emailPrompt").classList = "emailPrompt";
   document.getElementById("emailInput").classList = "emailInput";
   document.getElementById("feedbackDisclaimer").classList =
      "feedbackDisclaimer";
   document.getElementById("feedbackSubmit").classList = "feedbackSubmit";
   console.log(document.getElementById("writtenFeedbackForm"));
   var form = document.getElementById("writtenFeedbackForm");
   console.log(form);
   form.addEventListener("submit", submitFeedback);
}

function submitFeedback(event) {
   var feedbackText = document.getElementById("textFeedback").value;
   var email = document.getElementById("emailInput").value;
   if (feedbackText == "") {
      document.getElementById("feedbackSubmitError").innerText =
         "Please enter feedback before submission.";
   } else {
      console.log("{email:" + email + ",feedback:" + feedbackText + "}");
      activateThankYou();
   }
   event.preventDefault();
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
