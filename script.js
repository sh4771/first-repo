document.addEventListener('DOMContentLoaded', function() {
  const mainTab = document.getElementById('mainTab');
  const aboutTab = document.getElementById('aboutTab');
  const assignmentTab = document.getElementById('assignmentTab');  

  const mainSection = document.getElementById('mainSection');
  const aboutSection = document.getElementById('aboutSection');
  const assignmentSection = document.getElementById('assignmentSection');

  const button = document.getElementById('demoButton');
  const messageArea = document.getElementById('messageDisplay');

  // Show Main by default
  mainSection.classList.add('visible');

  mainTab.addEventListener('click', function(e) {
    e.preventDefault();
    mainSection.classList.add('visible');
    aboutSection.classList.remove('visible');
    mainTab.classList.add('active');
    aboutTab.classList.remove('active');
    assignmentSection.classList.remove('visible');
    assignmentTab.classList.remove('active');
  });

  aboutTab.addEventListener('click', function(e) {
    e.preventDefault();
    aboutSection.classList.add('visible');
    mainSection.classList.remove('visible');
    aboutTab.classList.add('active');
    mainTab.classList.remove('active');
    assignmentSection.classList.remove('visible');
    assignmentTab.classList.remove('active');
  });

  assignmentTab.addEventListener('click', function(e) {
    e.preventDefault();
    assignmentSection.classList.add('visible');
    mainSection.classList.remove('visible');
    aboutSection.classList.remove('visible');
    assignmentTab.classList.add('active');
    mainTab.classList.remove('active');  
    aboutTab.classList.remove('active'); // good
});


  // Interactive button demo
  button.addEventListener('click', function() {
    const currentTime = new Date().toLocaleTimeString();
    const message = 'Hello! You clicked the button at ' + currentTime;
    messageArea.textContent = message;

    button.textContent = 'Thanks for clicking!';
    setTimeout(function() {
      button.textContent = 'Click Me!';
    }, 2000);
  });
});
