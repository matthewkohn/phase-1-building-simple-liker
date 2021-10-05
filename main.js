// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
// When a user clicks on an empty heart:
document.addEventListener("DOMContentLoaded", () => {
  function likeCallback(event) {
    mimicServerCall()
    .then(() => handleResponse(event))
    .catch(error => handleError(error))
  }
  likeCallback();

  function handleResponse() {
  // querySelectorAll returns a Nodelist of like buttons
    const likeButtons = document.querySelectorAll('.like-glyph');
    // turns the likeButtons Nodelist into an array and assigns click event listener to each, changing the likeButton that is clicked.
    for (const button of likeButtons) {
      button.addEventListener('click', e => {
        if (button.textContent === EMPTY_HEART) {
          button.classList.add('activated-heart')
          button.textContent = FULL_HEART;
        } else if (button.textContent === FULL_HEART) {
          button.classList.remove('activated-heart');
          button.textContent = EMPTY_HEART;
        }
      })
    }
  }

  function handleError(error) {
    const modal = document.querySelector('#modal');
    const modalMessage = document.querySelector('#modal-message');
    console.log(`ERROR: ${error}`);
    // Display the error modal by removing the .hidden class
    modal.classList.remove('hidden');
    // Display the server error message in the modal
    modalMessage.textContent = error;
    // Use setTimeout to hide the modal after 3 seconds
    setTimeout(() => modal.classList.add('hidden'), 3000);
  }
})


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
