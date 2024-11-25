// Mouse tracking for the glowing light
const light = document.querySelector('.light');
const bgOverlay = document.querySelector('.bg-overlay');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  light.style.left = `${x}px`;
  light.style.top = `${y}px`;

  // Update the background overlay to create a fading effect
  bgOverlay.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 20%)`;
});

window.addEventListener('deviceorientation', (event) => {
  const x = event.beta; // Forward/backward tilt in degrees
  const y = event.gamma; // Left/right tilt in degrees

  // Calculate new position based on orientation
  const newX = window.innerWidth / 5 + y * 3; // Adjust multiplier for sensitivity
  const newY = window.innerHeight / 5 - x * 3; // Adjust multiplier for sensitivity

  light.style.left = `${newX}px`;
  light.style.top = `${newY}px`;

  // Update the background overlay to create a fading effect
  bgOverlay.style.background = `radial-gradient(circle at ${newX}px ${newY}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 0%)`;
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
