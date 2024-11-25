// Mouse tracking for the glowing light
const light = document.querySelector('.light');
const bgOverlay = document.querySelector('.bg-overlay');

// Throttle function to limit the rate of mouse movement updates
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Mouse movement event with throttling
document.addEventListener(
  'mousemove',
  throttle((e) => {
    const x = e.clientX;
    const y = e.clientY;
    light.style.left = `${x}px`;
    light.style.top = `${y}px`;

    // Update the background overlay to create a fading effect
    bgOverlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%)`;
  }, 16)
); // Throttle to ~60fps

window.addEventListener('deviceorientation', (event) => {
  if (event.beta !== null && event.gamma !== null) {
    const x = event.beta; // Forward/backward tilt in degrees
    const y = event.gamma; // Left/right tilt in degrees

    // Calculate new position based on orientation with increased sensitivity
    const newX = Math.min(
      Math.max((y + 90) * (window.innerWidth / 180) * 1.5, 0), // Increased multiplier for more movement
      window.innerWidth
    );
    const newY = Math.min(
      Math.max((90 - x) * (window.innerHeight / 180) * 1.5, 0), // Increased multiplier for more movement
      window.innerHeight
    );

    light.style.left = `${newX}px`;
    light.style.top = `${newY}px`;

    // Update the background overlay to create a fading effect
    bgOverlay.style.background = `radial-gradient(circle at ${newX}px ${newY}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%)`;
  }
});

// Parallax scrolling effect
document.addEventListener('scroll', () => {
  const parallaxSections = document.querySelectorAll('.parallax');
  parallaxSections.forEach((section) => {
    const scrollPosition = window.scrollY;
    section.style.backgroundPositionY = `${scrollPosition * 0.025}px`;
  });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.navbar a');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor click behavior
    const targetId = link.getAttribute('href'); // Get the target section ID
    const targetSection = document.querySelector(targetId); // Select the target section

    // Scroll to the target section with smooth behavior
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});
