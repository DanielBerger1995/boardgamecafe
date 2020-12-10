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
const bookingCheckbox = document.querySelector('.open-table input')


const _boardGameRef = _db.collection("boardgames");
let _boardGames;


function search(searchValue) {
    _boardGameRef.onSnapshot(function (snapshotData) {
        let boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            boardGames.push(boardGame);
        });

        searchValue = searchValue.toLowerCase();
        let filteredBoardGames = boardGames.filter(boardGame => boardGame.name.toLowerCase().includes(searchValue));
        appendBoardGamesPopular(filteredBoardGames);
    });
};


//RATING//
_boardGameRef.orderBy("rating", "desc").limit(15).onSnapshot(snapshotData => {
    _boardGames = [];
    snapshotData.forEach(doc => {
        let boardGame = doc.data();
        boardGame.id = doc.id;
        _boardGames.push(boardGame);
    });
    appendBoardGamesPopular(_boardGames);

});


// append boardGames to the DOM
function appendBoardGamesPopular(boardGames) {
    let htmlTemplate = "";
    
    for (let boardGame of boardGames) {
      let boardgameName = boardGame.name;
      let boardgameImg = boardGame.image;

      htmlTemplate += `
      <div class="result" onclick="appendboardGamesToBooking('${boardgameName}', '${boardgameImg}')">
          <p>${boardgameName}</p>
      </div>
    `;
    }
    document.querySelector('.search-results').innerHTML = htmlTemplate;
}
 function appendboardGamesToBooking(){
    let searchResultContainer = document.querySelector(".booking>div .content .gameresult-box");
    let htmlTemplate2 = "";
    htmlTemplate2 +=
    `
    <img src="${boardgameImg})">
    <h4>${boardgameName}</h4>
    `;
    searchResultContainer.innerHTML = htmlTemplate2;
   }
//form submit code

const _tableBooking = _db.collection("tablebooking");
let _tables;

   bookingForm[0].addEventListener('submit', (e) => {
    e.preventDefault();
   })
  bookingForm[1].addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("checkbox " + bookingCheckbox.checked)
    console.log("cafe " +  bookingCafes.value)
    console.log("seats " +  bookingSeats.value)
    console.log("time " +  bookingTimetable.value);
    console.log("date " +  bookingDate.value);
    
    let tableOpen = bookingCheckbox.checked;
    let tableCafe = bookingCafes.value;
    let tableSeats = bookingSeats.value;
    let tableTime = bookingTimetable.value;
    let tableDate = bookingDate.value;

  
  
// Add a new document with a generated id.
    _tableBooking.add({
   cafe: tableCafe,
   date: tableDate,
   genre_title: "undefined",
   hours: tableTime,
   open: tableOpen,
   seats: tableSeats,
})
    .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
    .catch(function(error) {
    console.error("Error adding document: ", error);
});
  loginBox.style.display = "none";
  loginBox.classList.remove("active")

   })
  
   const bookingClose = document.querySelector(".booking header i");

    bookingClose.addEventListener('click', ()=> {
      loginBox.style.display = "none";
      loginBox.classList.remove("active")
      bookingForm[0].reset();
      bookingForm[1].reset();

    })


   
