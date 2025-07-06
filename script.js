// This is the JavaScript file. It adds interactivity to the page.

// Find the button by its ID
const myButton = document.getElementById('myButton');

// Find the paragraph by its ID
const message = document.getElementById('message');

// Add a click event listener to the button
myButton.addEventListener('click', function() {
  // When the button is clicked, change the paragraph text
  message.textContent = 'You clicked the button! JavaScript works!';
});
