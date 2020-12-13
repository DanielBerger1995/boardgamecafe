const buttonTrigger = document.querySelector(".log-trigger");
const loginBox = document.querySelector(".booking");
const bookingCurtain = document.querySelector(".booking_blur_curtain");


buttonTrigger.addEventListener('click', () => {
  loginBox.style.display = "flex";
  loginBox.classList.add("active")
  disableScroll()
  bookingCurtain.classList.add("active")
});

let _firebaseUI;
//disable scrolling
function disableScroll() { 
    // Get the current page scroll position 
    scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
  
        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
        }; 
}
//enable scrolling
function enableScroll() { 
    window.onscroll = function() {}; 
} 

//firebase auth
firebase.auth().onAuthStateChanged(function (user) {
  if (user) { // if user exists and is authenticated
    userAuthenticated(user); //this does nothing
   
  } else { // if user is not logged in
    userNotAuthenticated();
  }
});

function userAuthenticated() {
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

function hideLogin() {
  let authContainer = document.querySelector('#firebaseui-auth-container');
  authContainer.style.display = 'none';
}

// sign out user
function logout() {
  firebase.auth().signOut();
  location.reload();
  return false;
}

const bookingButtons = document.querySelectorAll(".booking div button");
const bookingSegments = document.querySelectorAll(".booking>div");
const bookingBackButton = document.querySelector(".back_arrow_booking");
const contentBox = document.querySelectorAll(".booking>div .content");
const bookingForm = document.querySelectorAll(".booking>div form")

bookingBackButton.style.display = "none";

bookingButtons[0].addEventListener('click', () => {
  bookingSegments[1].classList.remove('active');
  bookingSegments[2].classList.add('active');
  contentBox[0].style.display = 'none';
  bookingButtons[0].style.display = 'none';
  bookingBackButton.style.display = "block";
})
bookingBackButton.addEventListener('click', () => {
  bookingSegments[2].classList.remove('active');
  bookingSegments[1].classList.add('active');
  contentBox[0].style.display = 'flex';
  bookingButtons[0].style.display = 'block';
  bookingBackButton.style.display = "none";
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
      <div class="result" onclick="appendBoardGameDetailsResult()" >
          <p>${boardgameName}</p>
      </div>
    `;
  }
  document.querySelector('.search-results').innerHTML = htmlTemplate;
}
function appendboardGamesToBooking() {
  
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





function appendBoardGameDetailsResult(id) {
  console.log("hello")
  console.log(id);
  // references to the input fields
  let specificBoardGame = "";
  for (let boardGame of _boardGames) {
    if (boardGame.id == id) {
      specificBoardGame = boardGame;
    }
  }
  let htmlTemplate = "";
  htmlTemplate += 
  `
  <img src="${specificBoardGame.image})">
  <h4>${specificBoardGame.name}</h4>
  `;
  document.querySelector(".booking>div .content .gameresult-box").innerHTML = htmlTemplate;
}


//appending all opem tables

let _tables;


_tableBooking.onSnapshot(snapshotData => {
    _openTables = [];
    snapshotData.forEach(doc => {
        let openTable = doc.data();
        openTable.id = doc.id;
         _openTables.push(openTable);
    });
    appendOpenTablesAll(_openTables);

});
function appendOpenTablesAll(openTable) {
    let htmlTemplate = "";
    for (let openTable of _openTables) {
      if(openTable.open == true){
        htmlTemplate += `
      <div class="open-table-box">
                    <img src="https://osbornegroupcre.com/wp-content/uploads/2016/02/missing-image-640x360.png">
                    <div class="info-box">
                         <h3>Game title</h3>
                         <span><i class="fas fa-map-marker-alt"></i> ${openTable.cafe}</span>
                         <span><i class="far fa-calendar-alt"></i> ${openTable.date}</span>
                         <span><i class="fas fa-user-friends"></i> 1/${openTable.seats}</span>
                         <h4>Duration: ${openTable.hours} hours</h4>
                         <h4>Description:</h4>
                         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste at animi natus quidem adipisci quis consequuntur vel unde ipsum, quae commodi cum? Ad eligendi, inventore quidem repudiandae itaque odio facilis architecto, natus tempore quisquam tenetur qui ea soluta nesciunt, debitis facere. Beatae ut similique laboriosam inventore eius fugiat sunt assumenda.</p>
                         <button class="join-table">Join table</button>
                    </div>
               </div>
    `;
    }
    }
    document.querySelector('.open_tables_container').innerHTML = htmlTemplate;
}

//append user email

function appendEamil(user){
  const emailPlaceholder = document.querySelector(".account-details>p");
  let = userEamil = user.email;
  emailPlaceholder.innerHTML = `${userEamil}`;
}

function userAuthenticated(user){
 appendEamil(user);
 hideLogin(); 
bookingForm[0].addEventListener('submit', (e) => {
  e.preventDefault();
})
bookingForm[1].addEventListener('submit', (e) => {
  e.preventDefault();
  //dislay in console what has been saved in firebase
  console.log("checkbox " + bookingCheckbox.checked)
  console.log("cafe " + bookingCafes.value)
  console.log("seats " + bookingSeats.value)
  console.log("time " + bookingTimetable.value);
  console.log("date " + bookingDate.value);



  let tableOpen = bookingCheckbox.checked;
  let tableCafe = bookingCafes.value;
  let tableSeats = bookingSeats.value;
  let tableTime = bookingTimetable.value;
  let tableDate = bookingDate.value;
  let table_host = user.uid;



  // Add a new document with a generated id.
  _tableBooking.add({
    cafe: tableCafe,
    date: tableDate,
    genre_title: "undefined",
    hours: tableTime,
    open: tableOpen,
    seats: tableSeats,
    host: table_host,
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
  
  bookingForm[0].reset();
  bookingForm[1].reset();
  bookingSegments[2].classList.remove('active');
  bookingSegments[1].classList.add('active');
  contentBox[0].style.display = 'flex';
  bookingButtons[0].style.display = 'block';
  bookingBackButton.style.display = "none";
  bookingCurtain.classList.remove("active");
  showGif()
  setTimeout(()=>{
    loginBox.style.display = "none";
    loginBox.classList.remove("active");
    enableScroll()
    }, 1500)
  
})
//clicking close button
const bookingClose = document.querySelector(".booking header i");

bookingClose.addEventListener('click', () => {
  loginBox.style.display = "none";
  loginBox.classList.remove("active")
  bookingForm[0].reset();
  bookingForm[1].reset();
  enableScroll()
bookingCurtain.classList.remove("active")
})

}

//show gif for some time fumction

function showGif(){
  const gifContainer = document.querySelector("#dice_booking");
  
    gifContainer.classList.add("visible")
    setTimeout(()=>{
      gifContainer.classList.remove("visible")
    }, 1500)
}
 