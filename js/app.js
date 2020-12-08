"use strict";

// ========== GLOBAL VARIABLES ========== //



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

        console.log(filteredBoardGames);

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
        htmlTemplate += `
     <a href="#select-boardGame" onclick="appendBoardGameDetails('${boardGame.id}');openDetails()"> <article>
      <img src="${boardGame.image}">
      <div class="details">
    <div>
        <h2>${boardGame.name}</h2>
        <br>
        <div class="icontext"> <img src="images/players.svg" class="icons">${boardGame.players} players </div>
      <div class="icontext">  <img src="images/clock.svg" class="icons"> ${boardGame.time}</div>
      </div>
       

        <div>
      <div class="genre"> <p>${boardGame.genre}</p></div>
      <br>
       <div class="rating">${boardGame.rating}</div>
       </div>
        </div>
      </article></a>
    `;
    }
    document.querySelector('#boardGame-popular').innerHTML = htmlTemplate;
}


//PLAYERS//
_boardGameRef.orderBy("players").limit(15).onSnapshot(snapshotData => {
    _boardGames = [];
    snapshotData.forEach(doc => {
        let boardGame = doc.data();
        boardGame.id = doc.id;
        _boardGames.push(boardGame);
    });
    appendBoardGamesPlayers(_boardGames);

});



function appendBoardGamesPlayers(boardGames) {
    let htmlTemplate = "";
    for (let boardGame of boardGames) {
        htmlTemplate += `
  <a href="#select-boardGame" onclick="appendBoardGameDetails('${boardGame.id}');openDetails()"> <article>
      <img src="${boardGame.image}">
      <div class="details">
    <div>
        <h2>${boardGame.name}</h2>
        <br>
        <div class="icontext"> <img src="images/players.svg" class="icons">${boardGame.players} players </div>
      <div class="icontext">  <img src="images/clock.svg" class="icons"> ${boardGame.time}</div>
      </div>
       

        <div>
      <div class="genre"> <p>${boardGame.genre}</p></div>
      <br>
       <div class="rating">${boardGame.rating}</div>
       </div>
        </div>
      </article></a>
    `;
    }
    document.querySelector('#boardGame-players').innerHTML = htmlTemplate;
}



//ARROWS//
let nextBtn = document.querySelector('#slideNext');
let prevBtn = document.querySelector('#slidePrev');
let slider = document.querySelector('#boardGame-popular');
let slideWidth = 90;

// Slider initial margin
slider.style.marginLeft = "0vw";

function check() {
    if (slider.style.marginLeft >= "0vw") {
        prevBtn.style.display = "none";
    } else if (slider.style.marginLeft <= "-200vw") {
        nextBtn.style.display = "none";
    } else {
        nextBtn.style.display = "inline-block";
        prevBtn.style.display = "inline-block";
    }
}

window.onload = check(); // Check the margins when the page is loaded

nextBtn.onclick = function () {
    slider.style.marginLeft = (parseInt(slider.style.marginLeft, 0) - slideWidth) + 'vw';
    check();
}

prevBtn.onclick = function () {
    slider.style.marginLeft = (parseInt(slider.style.marginLeft, 0) + slideWidth) + 'vw';
    check();
}


let nextBtn1 = document.querySelector('#slideNext1');
let prevBtn1 = document.querySelector('#slidePrev1');
let slider1 = document.querySelector('#boardGame-players');
let slideWidth1 = 90;

// Slider initial margin
slider1.style.marginLeft = "0vw";

function check1() {
    if (slider1.style.marginLeft >= "0vw") {
        prevBtn1.style.display = "none";
    } else if (slider1.style.marginLeft <= "-200vw") {
        nextBtn1.style.display = "none";
    } else {
        nextBtn1.style.display = "inline-block";
        prevBtn1.style.display = "inline-block";
    }
}

window.onload = check1(); // Check the margins when the page is loaded

nextBtn1.onclick = function () {
    slider1.style.marginLeft = (parseInt(slider1.style.marginLeft, 0) - slideWidth1) + 'vw';
    check1();
}

prevBtn1.onclick = function () {
    slider1.style.marginLeft = (parseInt(slider1.style.marginLeft, 0) + slideWidth1) + 'vw';
    check1();
}


/*
 
$(document).ready(function () {
    $('#arrowR').click(function () {
        $("#boardGame-popular").animate({
            marginLeft: '-=90vw'
        }, 1000);
 
 
        let moveRight = document.getElementById('boardGame-popular')
        let arrowRight = document.getElementById('arrowR')
        let arrowLeft = document.getElementById('arrowL')
 
 
        if (moveRight.style.marginLeft < "-202vw") {
 
            arrowRight.style.visibility = "hidden";
            arrowRight.style.transition = "0.3s ease-in";
            arrowLeft.style.transition = "0.3s ease-in";
            arrowLeft.style.visibility = "visible";
        }
        else {
            arrowRight.style.visibility = "visible";
            arrowLeft.style.visibility = "hidden";
 
        }
 
    });
});
 
$(document).ready(function () {
    $('#arrowL').click(function () {
        $("#boardGame-popular").animate({
            marginLeft: '+=90vw'
        }, 1000);
 
 
    });
});
 
 
*/


/*
  if ($('#boardGame-popular').css("margin-left") = "-200px") {
            $('"arrowR"').css("visibility", "hidden")
        }
        
        */



/*
function right() {
    let moveRight = document.getElementById('boardGame-popular')
 
    moveRight.style.transition = "0.5s ease-in";
    if (moveRight.style.marginLeft = "-92vw") {
        moveRight.style.backgroundColor = "green";
 
    }
}
*/
/*
 
function right() {
    let moveRight = document.getElementById('boardGame-popular')
    moveRight.classList.add('pushRight');
}
*/

//OPEN SPECIFIC BOARDGAME DETAILS//

function openDetails() {
    let openedDetails = document.getElementById('select-boardGame')
    let opacity = document.getElementById('opacityCover')
    openedDetails.classList.add('opendetails');
    opacity.classList.add('opacitycover');
}

function closeDetails() {
    let openedDetails = document.getElementById('select-boardGame')
    let opacity = document.getElementById('opacityCover')
    openedDetails.classList.remove('opendetails');
    opacity.classList.remove('opacitycover');
}



//SPECIFIC BOARDGAME//

function appendBoardGameDetails(id) {
    console.log(id);
    // references to the input fields
    let specificBoardGame = "";
    for (let boardGame of _boardGames) {
        if (boardGame.id == id) {
            specificBoardGame = boardGame;
        }
    }

    let htmlTemplate = "";
    console.log();
    htmlTemplate += `
        <article>
        <div class="closebutton" onclick="closeDetails()"></div>
     <div class="specificimage"><img src="${specificBoardGame.image}" alt="Event Photo"></div>
         
            
            
                <h2>${specificBoardGame.name}</h2>
               
     
            
        </article>
        `;

    document.querySelector('#select-boardGame').innerHTML = htmlTemplate;
}














//FILTER//

function place1() {
    _boardGameRef.where("place", "array-contains", "Vestergade").onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesPopular(_boardGames);
    });
}

function place11() {
    _boardGameRef.orderBy("players").where("place", "==", "1").onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesPlayers(_boardGames);
    });
}

function place2() {
    _boardGameRef.where("place", "==", "2").onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });
        appendBoardGamesPlayers(_boardGames);
        appendBoardGamesPopular(_boardGames);
    });
}

function strategy() {
    _boardGameRef.where("genre", "==", "strategy").onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });
        appendBoardGamesPlayers(_boardGames);
        appendBoardGamesPopular(_boardGames);
    });
}
/*
function orderByPlayers() {
    _boardGameRef.orderBy("players").onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });
        appendBoardGames(_boardGames);
    });
    document.querySelector('#boardGame-popular').innerHTML = htmlTemplate;
}

orderByPlayers();
*/