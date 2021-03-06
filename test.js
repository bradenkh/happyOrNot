var stars = 0;

window.onload = function () {
   openClosedMenu();
};

/* opening and closing menu functions */
function openClosedMenu() {
   document.getElementById("theGladOrSad").classList = "closed-menu";
   document
      .getElementById("closed-content")
      .addEventListener("click", openStarMenu);
   document.getElementById("closed-content").classList = "";
}

function openStarMenu() {
   // hide previous content
   document.getElementById("closed-content").classList = "hidden";
   // open menu
   document.getElementById("theGladOrSad").classList = "star-menu";
   // show content
   document.getElementById("star-content").classList = "";
   addStarListeners();
   addStarClose();
}

function addStarClose() {
   document.getElementById("star-menu-close").addEventListener("click", () => {
      openClosedMenu();
      document.getElementById("star-content").classList = "hidden";
   });
}

function openFeedbackMenu() {
   // hide previous content
   document.getElementById("star-content").classList = "hidden";
   // open menu
   document.getElementById("theGladOrSad").classList = "feedback-menu";
   // show content
   document.getElementById("feedback-content").classList = "";
   document
      .getElementById("feedback-content")
      .addEventListener("submit", submitFeedback);
   document
      .getElementById("feedback-menu-close")
      .addEventListener("click", () => {
         const submitEvent = new SubmitEvent("submit");
         document.getElementById("feedback-content").dispatchEvent(submitEvent);
      });
}

function openThankyouMenu() {
   // hide previous content
   document.getElementById("feedback-content").classList = "hidden";
   // open menu
   document.getElementById("theGladOrSad").classList = "thankyou-menu";
   // show content
   document.getElementById("thankyou-content").classList = "";
   setTimeout(() => {
      document.getElementById("theGladOrSad").classList = "closed-thankyou";
   }, "2000");
}

function closeStarMenu() {
   document.getElementById("star-content").classList = "hidden";
   document.getElementById("star-menu-close").addEventListener("click", () => {
      document.getElementById("theGladOrSad").style.animation =
         "closeStarMenu 1s";
      document.getElementById("theGladOrSad").classList = "closed-menu";
   });
}

function createMouseListeners(num) {
   element = document.getElementById("star" + num);
   element.addEventListener("mouseover", function starOver() {
      if (stars == 0) {
         lightStars(num);
      }
   });
   element.addEventListener("click", function starClick() {
      if (stars == 0) {
         selectStar(num);
      }
   });
}

function addStarListeners() {
   document
      .getElementById("star-content")
      .addEventListener("mouseleave", function mouseLeave() {
         if (stars == 0) {
            lightStars(0);
         }
      });
   for (let i = 1; i < 6; i++) {
      createMouseListeners(i);
   }
}

function lightStars(num) {
   var stars = document.getElementsByName("star");
   for (let i = 0; i < num; i++) {
      stars[i].classList = "star-checked";
   }
   for (let i = 5; i > num; i--) {
      stars[i - 1].classList = "star";
   }
}

function selectStar(num) {
   stars = num;
   lightStars(num);
   // document.getElementById("star" + num).classList = "star-selected";
   setTimeout(openFeedbackMenu, 750);
}

function submitFeedback(event) {
   event.preventDefault();
   openThankyouMenu();
   sendFeedback();
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
      if (childLink) {
         if (childLink.innerText.includes("My Profile"))
            link = childLink.getAttribute("href");
      }
   });
   return link.split("ID=")[1];
}

function buildBody() {
   var email = document.getElementById("emailInput").value;
   var feedbackText = document.getElementById("textFeedback").value;
   var url = window.location.href;
   var uid = getUID();
   const body = {
      rating: stars,
      website: url,
      uid: uid,
      email: email,
      feedback: feedbackText,
   };
   return body;
}

function sendFeedback() {
   var postUrl = "https://glad-or-sad-backend.herokuapp.com/feedback";
   var postBody = buildBody();
   var xhr = new XMLHttpRequest();
   xhr.open("POST", postUrl, true);
   xhr.setRequestHeader("Content-Type", "application/json");
   console.log(JSON.stringify(postBody));
   xhr.send(JSON.stringify(postBody));
   xhr.responseType = "text";
   setTimeout(() => {
      console.log(xhr.responseText);
   }, 2000);
}
