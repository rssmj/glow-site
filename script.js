// Mouse tracking for the glowing light (desktop)
const light = document.querySelector('.light');
const bgOverlay = document.querySelector('.bg-overlay');

// Set the initial position of the light to the center of the screen
window.addEventListener('DOMContentLoaded', () => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Set the initial position for the light
  light.style.left = `${centerX}px`;
  light.style.top = `${centerY}px`;

  // Make the initial light bigger
  light.style.width = '500px';
  light.style.height = '500px';

  // Set the initial background overlay position
  bgOverlay.style.background = `radial-gradient(circle at ${centerX}px ${centerY}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%)`;
});

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

document.addEventListener(
  'mousemove',
  throttle((e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Update light position
    light.style.left = `${x}px`;
    light.style.top = `${y}px`;

    // Update the background overlay with a fading effect
    bgOverlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%)`;
  }, 50)
); // Limit the event to fire at most every 50 milliseconds

// Light effect with device orientation (mobile)
window.addEventListener('deviceorientation', (event) => {
  if (event.beta !== null && event.gamma !== null) {
    // Offsets for a more natural holding position
    const xTiltOffset = 90; // Adjust this value for forward/backward offset
    const yTiltOffset = 0; // Adjust this value for left/right offset

    const xTilt = event.beta - xTiltOffset; // Forward/backward tilt, adjusted with offset
    const yTilt = event.gamma - yTiltOffset; // Left/right tilt, adjusted with offset

    // Increase acceleration for the tilt effect by multiplying by a factor
    const accelerationFactor = 2.5; // Adjust this value for more/less acceleration
    const newX = Math.min(
      Math.max(
        (yTilt * accelerationFactor + 90) * (window.innerWidth / 180),
        0
      ),
      window.innerWidth
    );

    const invertedXTilt = -xTilt * accelerationFactor;

    const newY = Math.min(
      Math.max((90 - invertedXTilt) * (window.innerHeight / 180), 0),
      window.innerHeight
    );

    // Update light position
    light.style.transform = `translate(${newX}px, ${newY}px)`;

    // Update the background overlay
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
