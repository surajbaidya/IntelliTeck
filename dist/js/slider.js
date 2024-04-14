let sliderContent = document.getElementById("slider__Content");
let buttonContent = document.getElementById("button__right");
let bannerContents = document.querySelectorAll(".banner__content");
let imageContent = [
  "https://images.unsplash.com/photo-1498798821241-1f327af804fe?dpr=1&auto=format&fit=crop&w=1920&h=800&q=40&cs=tinysrgb&crop=",
  "https://images.unsplash.com/photo-1481151500463-1fa2dd2d5dbe?dpr=1&auto=format&fit=crop&w=1920&h=800&q=40&cs=tinysrgb&crop=",
  "https://images.unsplash.com/photo-1467664631004-58beab1ece0d?dpr=1&auto=format&fit=crop&w=1920&h=800&q=40&cs=tinysrgb&crop=",
];
let currentIndex = 0;

const bannerSlider = () => {
  // Change banner image
  sliderContent.style.backgroundImage = `url(${imageContent[currentIndex]})`;

  // Remove existing classes from all banner__content elements
  bannerContents.forEach((element) => {
    element.classList.remove(
      "banner-transition-1",
      "banner-transition-2",
      "banner-transition-3",
      "banner-transition-default"
    );
  });

  // Add class to the current banner__content element
  bannerContents[currentIndex].classList.add(
    `banner-transition-${currentIndex + 1}`
  );

  // Update index for next image
  currentIndex = (currentIndex + 1) % imageContent.length;
};

buttonContent.addEventListener("click", bannerSlider);

setInterval(bannerSlider, 3000);
bannerSlider();
