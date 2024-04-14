(() => {
  const counters = document.querySelectorAll(".counter");
  const array = Array.from(counters);

  // Function to start counter when section is intersected
  const startCounterWhenVisible = (element) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // start the counter for this element
          startCounter(element);
          // stop observing once started
          observer.unobserve(element);
        }
      });
    });

    // observe the element
    observer.observe(element);
  };

  // Function to start the counter
  const startCounter = (item) => {
    let counterInnerText = parseInt(item.querySelector(".count").textContent); // Extract the counter value
    let count = 1;
    let speed = item.dataset.speed / counterInnerText;
    function counterUp() {
      item.querySelector(".count").textContent = count++;
      if (counterInnerText < count) {
        clearInterval(stop);
      }
    }
    const stop = setInterval(() => {
      counterUp();
    }, speed);
  };

  // Loop through each counter element and start observing
  array.forEach((item) => {
    startCounterWhenVisible(item);
  });
})();
