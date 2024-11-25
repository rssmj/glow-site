// Mouse tracking for the glowing light (desktop)
const light = document.querySelector('.light');
const bgOverlay = document.querySelector('.bg-overlay');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Update light position
  light.style.left = `${x}px`;
  light.style.top = `${y}px`;

  // Update the background overlay with a fading effect
  bgOverlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%)`;
});

// Light effect with device orientation (mobile)
window.addEventListener('deviceorientation', (event) => {
  if (event.beta !== null && event.gamma !== null) {
    const xTilt = event.beta; // Forward/backward tilt
    const yTilt = event.gamma; // Left/right tilt

    // Map tilt values to screen dimensions
    const newX = Math.min(
      Math.max((yTilt + 90) * (window.innerWidth / 180), 0),
      window.innerWidth
    );
    const newY = Math.min(
      Math.max((90 - xTilt) * (window.innerHeight / 180), 0),
      window.innerHeight
    );

    // Update light position
    light.style.left = `${newX}px`;
    light.style.top = `${newY}px`;

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
