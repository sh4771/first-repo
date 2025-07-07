document.addEventListener('DOMContentLoaded', function() {
  console.log('JavaScript is now running!');

  const mainTab = document.getElementById('mainTab');
  const aboutTab = document.getElementById('aboutTab');
  const mainSection = document.getElementById('mainSection');
  const aboutSection = document.getElementById('aboutSection');

  const button = document.getElementById('demoButton');
  const messageArea = document.getElementById('messageDisplay');

  // Show Main section and hide About section
  mainTab.addEventListener('click', function(e) {
    e.preventDefault();
    mainSection.style.display = 'block';
    aboutSection.style.display = 'none';
  });

  // Show About section and hide Main section
  aboutTab.addEventListener('click', function(e) {
    e.preventDefault();
    mainSection.style.display = 'none';
    aboutSection.style.display = 'block';
  });

  // Interactive button demo
  button.addEventListener('click', function() {
    console.log('Button was clicked!');
    const currentTime = new Date().toLocaleTimeString();
    const message = 'Hello! You clicked the button at ' + currentTime;
    messageArea.textContent = message;

    button.textContent = 'Thanks for clicking!';
    setTimeout(function() {
      button.textContent = 'Click Me!';
    }, 2000);
  });
});
