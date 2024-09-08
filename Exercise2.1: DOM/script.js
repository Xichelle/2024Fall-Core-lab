// Eye movement logic based on scroll
window.addEventListener('scroll', function() {
    const eye = document.querySelector('.pupil');
    const scrollPosition = window.scrollY;
    const documentHeight = document.body.scrollHeight - window.innerHeight;
  
    // Calculate the angle based on scroll position (constrained between 0 and 360 degrees)
    const angle = (scrollPosition / documentHeight) * 360;
    
    // Radius of circular movement (inside eye area)
    const radius = 20; // Radius should be less than half the eye size (to keep the pupil within eye)
    
    // Calculate x and y positions for circular movement
    const moveX = radius * Math.cos(angle * (Math.PI / 180)); // Convert angle to radians
    const moveY = radius * Math.sin(angle * (Math.PI / 180));
  
    // Apply the movement to the pupil (circular path)
    eye.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
  