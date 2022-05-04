var rating = 0;

window.onload = function () {
   document.getElementById("theGladOrSad").classList = "closed-menu";
   document
      .getElementById("closed-content")
      .addEventListener("click", openStarMenu);
};

/* opening and closing menu functions */
function openClosedMenu() {
   document.getElementById("theGladOrSad").classList = "closed-menu";
}

function openStarMenu() {
   // hide previous content
   document.getElementById("closed-content").classList = "hidden";
   // open menu
   document.getElementById("theGladOrSad").classList = "star-menu";
   // show content
   document.getElementById("star-content").classList = "";
   addStarListeners();
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
}

function openThankyouMenu() {
   // hide previous content
   document.getElementById("feedback-content").classList = "hidden";
   // open menu
   document.getElementById("theGladOrSad").classList = "thankyou-menu";
   // show content
   document.getElementById("thankyou-content").classList = "";
}

function createMouseListeners(num) {
   element = document.getElementById("star" + num);
   element.addEventListener("mouseover", function starOver() {
      if (rating == 0) {
         lightStars(num);
      }
   });
   element.addEventListener("click", function starClick() {
      if (rating == 0) {
         selectStar(num);
      }
   });
}

function addStarListeners() {
   document
      .getElementById("star-content")
      .addEventListener("mouseleave", function mouseLeave() {
         if (rating == 0) {
            lightStars(0);
         }
      });
   for (let i = 1; i < 6; i++) {
      console.log(i);
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
   // for (let i = 5; i > num; i--) {
   //    console.log(i);
   //    document.getElementById("star" + num).classList = "star";
   //    // stars[i].classList = "star-checked";
   // }
}

function selectStar(num) {
   rating = num;
   lightStars(num);
   setTimeout(openFeedbackMenu, 1000);
}

function submitFeedback(event) {
   event.preventDefault();
   var feedbackText = document.getElementById("textFeedback").value;
   var email = document.getElementById("emailInput").value;
   console.log("{email:" + email + ",feedback:" + feedbackText + "}");
   openThankyouMenu();
   //  sendFeedback();
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
