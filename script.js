// Mouse tracking for the glowing light
const bgOverlay = document.querySelector('.bg-overlay');
const light = document.querySelector('.light');
const trail = document.querySelector('.trail');

// Create a trail effect
const trailCount = 25; // Number of trail elements
const trails = [];

for (let i = 0; i < trailCount; i++) {
  const trail = document.createElement('div');
  trail.className = 'trail';
  document.body.appendChild(trail);
  trails.push(trail);
}

// Function to update the position of the light and trails
function updateLightPosition(x, y) {
  light.style.left = `${x}px`;
  light.style.top = `${y}px`;

  // Update the background overlay to create a fading effect
  bgOverlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%)`;

  // Update trail positions
  trails.forEach((trail, index) => {
    const trailX = x - index * 10; // Offset for trail effect
    const trailY = y - index * 10; // Offset for trail effect
    trail.style.left = `${trailX}px`;
    trail.style.top = `${trailY}px`;
    trail.style.opacity = 1 - index / trailCount; // Fade out effect
  });
}

// Debounce function to limit the rate of function execution
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Throttle function to limit the rate of mouse movement updates
let isThrottled = false;

document.addEventListener(
  'mousemove',
  debounce((e) => {
    if (!isThrottled) {
      updateLightPosition(e.clientX, e.clientY);
      isThrottled = true;
      requestAnimationFrame(() => {
        isThrottled = false;
      });
    }
  }, 10)
); // Adjust debounce wait time as needed

window.addEventListener('deviceorientation', (event) => {
  if (event.beta !== null && event.gamma !== null) {
    const x = event.beta; // Forward/backward tilt in degrees
    const y = event.gamma; // Left/right tilt in degrees

    // Calculate new position based on orientation with increased sensitivity
    const newX = Math.min(
      Math.max((y + 90) * (window.innerWidth / 180) * 2, 0), // Increased multiplier for more movement
      window.innerWidth
    );
    const newY = Math.min(
      Math.max((90 - x) * (window.innerHeight / 180) * 2, 0), // Increased multiplier for more movement
      window.innerHeight
    );

    // Only update the light position based on orientation
    light.style.left = `${newX}px`;
    light.style.top = `${newY}px`;
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
