gsap.registerPlugin(TextPlugin);

document.addEventListener('DOMContentLoaded', () => {
  const typewriter = document.getElementById('typewriter');
  const paper = document.getElementById('paper');
  const userInput = document.getElementById('userInput');
  const resetButton = document.getElementById('resetButton');
  const inputButton = document.getElementById('inputButton');

  // Step 1: Animate the typewriter popping up
  gsap.fromTo(typewriter, 
    { y: 200, display: 'none' }, 
    { y: 0, display: 'block', duration: 1, ease: 'bounce.out' }
  );

  // Step 2: Typewriter effect for the text
  const textContent = "This is a digital Typewriter.";
  gsap.to(typewriter, {
    duration: 5,
    text: textContent,
    ease: 'none',
    delay: 1,
    onComplete: showPaper
  });

  // Step 3: Expand paper and show input area
  function showPaper() {
    gsap.to(paper, { display: 'block', duration: 1, backgroundColor: 'white' });
    gsap.to(paper, { scaleY: 1, duration: 2, ease: 'power1.inOut', onComplete: showButtons });
  }

  // Step 4: Show buttons and allow user to type their own text
  function showButtons() {
    inputButton.style.display = 'block';
    inputButton.addEventListener('click', () => {
      gsap.to(typewriter, { text: userInput.value, duration: 4 });
    });

    userInput.style.display = 'block';
    resetButton.style.display = 'block';
    resetButton.addEventListener('click', resetAnimation);
  }

  // Step 5: Reset the animation
  function resetAnimation() {
    gsap.to(typewriter, { text: '' });
    userInput.value = '';
    gsap.to(paper, { scaleY: 0, duration: 1 });
    gsap.fromTo(typewriter, { y: 200, display: 'none' }, { y: 0, display: 'block', duration: 1, ease: 'bounce.out' });
    gsap.to(typewriter, {
      duration: 5,
      text: textContent,
      ease: 'none',
      delay: 1,
      onComplete: showPaper
    });
  }
});
