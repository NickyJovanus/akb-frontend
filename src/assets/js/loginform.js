/*
  Inspired by: "Login Page & Homepage"
  By: Neo
  Link: https://dribbble.com/shots/4485321-Login-Page-Homepage
*/
var fireOnHashChangesToo = true
var pageURLCheckTimer = setInterval (
    function () {
        if (this.lastPathStr !== location.pathname) {
            form();
        }
}, 100);

setTimeout(function(){
  document.querySelector('.password').removeAttribute('readonly');}, 
2000);


function form(){
  let usernameInput = document.querySelector('.email');
  let passwordInput = document.querySelector('.password');
  let showPasswordButton = document.querySelector('.password-button');
  let face = document.querySelector('.face');

  if(passwordInput !== null) {

    setTimeout(function(){
      if(passwordInput.hasAttribute('readonly'))
        document.querySelector('.password').removeAttribute('readonly');}, 
    2000);

    passwordInput.addEventListener('focus', () => {
      document.querySelectorAll('.hand').forEach(hand => {
        hand.classList.add('hidepaw');
      });
      document.querySelector('.tongue').classList.remove('breath');
    });

    passwordInput.addEventListener('blur', event => {
      document.querySelectorAll('.hand').forEach(hand => {
        hand.classList.remove('hidepaw');
        hand.classList.remove('peek');
      });
      document.querySelector('.tongue').classList.add('breath');
    });

    usernameInput.addEventListener('focus', event => {
      let length = Math.min(usernameInput.value.length - 16, 19);
      document.querySelectorAll('.hand').forEach(hand => {
        hand.classList.remove('hidepaw');
        hand.classList.remove('peek');
      });

      face.style.setProperty('--rotate-head', `${-length}deg`);
    });

    usernameInput.addEventListener('blur', event => {
      face.style.setProperty('--rotate-head', '0deg');
    });

    usernameInput.addEventListener('input', _.throttle(event => {
      let length = Math.min(event.target.value.length - 16, 19);

      face.style.setProperty('--rotate-head', `${-length}deg`);
    }, 100));

    showPasswordButton.addEventListener('click', event => {
      if (passwordInput.type === 'text') {
        passwordInput.type = 'password';
        document.querySelectorAll('.hand').forEach(hand => {
          hand.classList.remove('peek');
          hand.classList.add('hidepaw');
        });
      } else {
        passwordInput.type = 'text';
        document.querySelectorAll('.hand').forEach(hand => {
          hand.classList.remove('hidepaw');
          hand.classList.add('peek');
        });
      }
    });
  }
}