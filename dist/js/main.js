// YouTube Player API for header BG video

// Insert the <script> tag targeting the iframe API
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Get the video ID passed to the data-video attribute
const bgVideoID = document
  .querySelector(".js-background-video")
  .getAttribute("data-video");

// Set the player options
const playerOptions = {
  // Autoplay + mute has to be activated (value = 1) if you want to autoplay it everywhere
  // Chrome/Safari/Mobile
  autoplay: 1,
  mute: 1,
  autohide: 1,
  modestbranding: 1,
  rel: 0,
  showinfo: 0,
  controls: 0,
  disablekb: 1,
  enablejsapi: 1,
  iv_load_policy: 3,
  // For looping video you have to have loop to 1
  // And playlist value equal to your currently playing video
  loop: 1,
  playlist: bgVideoID,
};

// Get the video overlay, to mask it when the video is loaded
const videoOverlay = document.querySelector(".js-video-overlay");

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
let ytPlayer;
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("yt-player", {
    width: "1280",
    height: "720",
    videoId: bgVideoID,
    playerVars: playerOptions,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();

  // Get the duration of the currently playing video
  const videoDuration = event.target.getDuration();

  // When the video is playing, compare the total duration
  // To the current passed time if it's below 2 and above 0,
  // Return to the first frame (0) of the video
  // This is needed to avoid the buffering at the end of the video
  // Which displays a black screen + the YouTube loader
  setInterval(function () {
    const videoCurrentTime = event.target.getCurrentTime();
    const timeDifference = videoDuration - videoCurrentTime;

    if (2 > timeDifference > 0) {
      event.target.seekTo(0);
    }
  }, 1000);
}

// When the player is ready and when the video starts playing
// The state changes to PLAYING and we can remove our overlay
// This is needed to mask the preloading
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    videoOverlay.classList.add("header__video-overlay--fadeOut");
  }
}

/* form JS */
$(".form-input").focus(function () {
  jQuery(this).parents(".form-group").addClass("focused");
});

jQuery(".form-input").blur(function () {
  var inputValue = jQuery(this).val();
  if (inputValue == "") {
    jQuery(this).removeClass("filled");
    jQuery(this).parents(".form-group").removeClass("focused");
  } else {
    jQuery(this).addClass("filled");
  }
});

// js for custom select
document.addEventListener("click", function (event) {
  var select = document.querySelector(".custom-select");
  var selectedOption = select.querySelector(".selected-option");
  var optionsList = select.querySelector(".options");

  if (
    event.target === selectedOption ||
    event.target.classList.contains("arrow")
  ) {
    select.classList.toggle("active");
    var arrow = selectedOption.querySelector(".arrow");
    if (!arrow) {
      arrow = document.createElement("span");
      arrow.classList.add("arrow");
      arrow.innerHTML = "&#9660;";
      selectedOption.appendChild(arrow);
    } else {
      arrow.classList.toggle("rotate-up");
    }
  } else if (optionsList.contains(event.target)) {
    // If an option is clicked, update the selected option text
    var clickedOption = event.target.closest("li");
    if (
      clickedOption &&
      clickedOption.parentElement.classList.contains("options")
    ) {
      selectedOption.textContent = clickedOption.textContent.trim();
      select.classList.remove("active");
      var prevArrow = select.querySelector(".arrow");
      if (prevArrow) {
        prevArrow.remove();
      }
      var arrow = document.createElement("span");
      arrow.classList.add("arrow");
      arrow.innerHTML = "&#9660;";
      clickedOption.appendChild(arrow);
    }
  } else {
    // If clicking outside the select box or options list, remove only the active class
    select.classList.remove("active");
    var arrow = select.querySelector(".arrow");
    if (arrow) {
      arrow.remove();
    }
  }
});

// js for textarea
var textarea = document.getElementById("myTextarea");

textarea.addEventListener("keydown", autosize);

function autosize() {
  var el = this;
  setTimeout(function () {
    el.style.cssText = "height:auto; padding:0";
    el.style.cssText = "height:" + el.scrollHeight + "px";
  }, 0);
}

// hamburger menu
jQuery(".menu-tigger").on("click", function () {
  jQuery(this).toggleClass("button-tigger");
  jQuery("nav").toggleClass("res-menu");

  // Toggle class on body to prevent scrolling
  jQuery("body").toggleClass("menu-open");
});
