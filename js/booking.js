const buttonTrigger = document.querySelector(".log-trigger");
const loginBox = document.querySelector(".booking");

buttonTrigger.addEventListener('click', () => {
     loginBox.style.display = "flex";
     loginBox.classList.add("active")
})

firebase.auth().onAuthStateChanged(function (user) {
     if (user) { // if user exists and is authenticated
       userAuthenticated(user);
     } else { // if user is not logged in
       userNotAuthenticated();
     }
   });
   
   function userAuthenticated(user) {
     appendUserData(user);
     hideTabbar(false);
     showLoader(false);
   }
   
   function userNotAuthenticated() {
     hideTabbar(true);
     showPage("login");
   
     // Firebase UI configuration
     const uiConfig = {
       credentialHelper: firebaseui.auth.CredentialHelper.NONE,
       signInOptions: [
         firebase.auth.EmailAuthProvider.PROVIDER_ID,
         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
         firebase.auth.FacebookAuthProvider.PROVIDER_ID
       ],
       signInSuccessUrl: '#home'
     };
     // Init Firebase UI Authentication
     if (!_firebaseUI) {
       _firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());
     }
     _firebaseUI.start('#firebaseui-auth-container', uiConfig);
     showLoader(false);
   }
   
   // show and hide tabbar
   function hideTabbar(hide) {
     let tabbar = document.querySelector('#tabbar');
     if (hide) {
       tabbar.classList.add("hide");
     } else {
       tabbar.classList.remove("hide");
     }
   }
   
   
   // sign out user
   function logout() {
     firebase.auth().signOut();
   }
   
   function appendUserData(user) {
     console.log(user);
     document.querySelector('#user-data').innerHTML = `
       <img class="profile-img" src="${user.photoURL || "img/placeholder.jpg"}">
       <h3>${user.displayName}</h3>
       <p>${user.email}</p>
     `;
   }