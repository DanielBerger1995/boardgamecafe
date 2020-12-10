const buttonTrigger = document.querySelector(".log-trigger");
const loginBox = document.querySelector(".booking");

buttonTrigger.addEventListener('click', () => {
     loginBox.style.display = "flex";
     loginBox.classList.add("active")
});

let _firebaseUI;


firebase.auth().onAuthStateChanged(function (user) {
     if (user) { // if user exists and is authenticated
       userAuthenticated(user);
     } else { // if user is not logged in
       userNotAuthenticated();
     }
   });
   
   function userAuthenticated(){
     hideLogin();
   }
   function userNotAuthenticated() {
   
     // Firebase UI configuration
     const uiConfig = {
       credentialHelper: firebaseui.auth.CredentialHelper.NONE,
       signInOptions: [
         firebase.auth.EmailAuthProvider.PROVIDER_ID,
         
       ],
       signInFlow: 'popup',
       callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            hideLogin();
            return false;
        }
    },
     };
     // Init Firebase UI Authentication
     if (!_firebaseUI) {
       _firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
     }
     _firebaseUI.start('#firebaseui-auth-container', uiConfig);
   }
   
   function  hideLogin(){
     let authContainer = document.querySelector('#firebaseui-auth-container');
     authContainer.style.display = 'none';
   }
   
   // sign out user
   function logout() {
     firebase.auth().signOut();
   }

   const bookingButtons = document.querySelectorAll(".booking div button");
   const bookingSegments = document.querySelectorAll(".booking>div");
   const bookingBackButton = document.querySelector(".booking>div:nth-of-type(3) span a");
   const contentBox = document.querySelectorAll(".booking>div .content");
   const bookingForm = document.querySelectorAll(".booking>div form")

   bookingForm[0].addEventListener('submit', (e) => {
    e.preventDefault();
   })
  bookingForm[1].addEventListener('submit', (e) => {
    e.preventDefault();
   })

bookingButtons[0].addEventListener('click', ()=>{
  bookingSegments[1].classList.remove('active');
  bookingSegments[2].classList.add('active');
  contentBox[0].style.display = 'none'
  bookingButtons[0].style.display = 'none'

})
bookingBackButton.addEventListener('click', ()=>{
  bookingSegments[2].classList.remove('active');
  bookingSegments[1].classList.add('active');
  contentBox[0].style.display = 'flex';
  bookingButtons[0].style.display = 'block'
})


const bookingSeats = document.querySelector('#seats');
const bookingTimetable = document.querySelector('#timetable');
const bookingCafes = document.querySelector('#cafes');
const bookingDate = document.querySelector('#dates');

console.log(bookingDate.value)



