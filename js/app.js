"use strict";

// ========== GLOBAL VARIABLES ========== //



const _boardGameRef = _db.collection("boardgames");
let _boardGames;



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
      <img class="imgwrappy" src="${boardGame.image}">
      <div class="details">
   <div class="lefty">
        <h2>${boardGame.name}</h2>
       <div>
         <div class="icontext"> <img src="images/players.svg" class="icons">${boardGame.playersmin}-${boardGame.playersmax} players </div>
      <div class="icontext">  <img src="images/clock.svg" class="icons"> ${boardGame.timestart}-${boardGame.timeend} mins</div>
      </div></div>

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

//SEARCH//
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

        appendBoardGamesAll(filteredBoardGames);
    });
};



//ALL//


_boardGameRef.orderBy("rating", "desc").onSnapshot(snapshotData => {
    _boardGames = [];
    snapshotData.forEach(doc => {
        let boardGame = doc.data();
        boardGame.id = doc.id;
        _boardGames.push(boardGame);
    });
    appendBoardGamesAll(_boardGames);

});



function appendBoardGamesAll(boardGames) {
    let htmlTemplate = "";
    for (let boardGame of boardGames) {
        htmlTemplate += `
  <a href="#select-boardGame" onclick="appendBoardGameDetails('${boardGame.id}');openDetails()"> <article class="allgames_wrapper">
      <img class="imgwrappy" src="${boardGame.image}">
      <div class="details2">
    <div class="lefty">
        <h2>${boardGame.name}</h2>
       <div>
         <div class="icontext"> <img src="images/players.svg" class="icons">${boardGame.playersmin}-${boardGame.playersmax} players </div>
      <div class="icontext">  <img src="images/clock.svg" class="icons"> ${boardGame.timestart}-${boardGame.timeend} mins</div>
      </div></div>
       

        <div>
      <div class="genre"> <p>${boardGame.genre}</p></div>
      <br>
       <div class="rating">${boardGame.rating}</div>
       </div>
        </div>
      </article></a>
    `;
    }
    document.querySelector('#boardGame-all').innerHTML = htmlTemplate;
}



//ARROWS//
let nextBtn = document.querySelector('#slideNext');
let prevBtn = document.querySelector('#slidePrev');
let slider = document.querySelector('#boardGame-popular');
let slideWidth = 92;

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
    <img class="specificimage" src="${specificBoardGame.image}" alt="Event Photo">
         
            
            
             
               <div class="details3">
    <div class="infowrap">
    <div class="leftside">
        <h2 class="boardgametitle">${specificBoardGame.name}</h2>
        <br>
         <div class="icontext"> <img src="images/players.svg" class="icons">${specificBoardGame.playersmin}-${specificBoardGame.playersmax} players </div>
      <div class="icontext">  <img src="images/clock.svg" class="icons"> ${specificBoardGame.timestart}-${specificBoardGame.timeend} mins</div>
      </div>
       

        <div class="rightside">
      <div class="genre"> <p>${specificBoardGame.genre}</p></div>
      <br>
       <div class="rating">${specificBoardGame.rating}</div>
       </div>
       </div>
       <br>
       <h2>Available at:</h2>
        <p class="try1">${specificBoardGame.place}</p>
       
        <br>
       <p class="describe">${specificBoardGame.description}</p>
        </div>
     
            
        </article>
        
        `;

    document.querySelector('#select-boardGame').innerHTML = htmlTemplate;
}













//FILTER//


function Vestergade() {
    _boardGameRef.where("place", "array-contains", "Vestergade").onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesAll(_boardGames);
    });
}

function Fredensgade() {
    _boardGameRef.where("place", "array-contains", "Fredensgade").onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesAll(_boardGames);
    });
}




function oneplayer() {
    _boardGameRef.where("playersmin", "<=", 1).onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesAll(_boardGames);
    });
}

function twoplayer() {
    _boardGameRef.where("playersmin", "==", 2).onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesAll(_boardGames);
    });
}

function threeplayer() {
    _boardGameRef.where("playersmin", "==", 3).onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesAll(_boardGames);
    });
}

function sixplayer() {
    _boardGameRef.where("playersmax", ">=", 6).onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesAll(_boardGames);
    });
}

function LessthanThrity() {
    _boardGameRef.where("timeend", "<=", 30).onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesAll(_boardGames);
    });
}

function MorethanThrity() {
    _boardGameRef.where("timestart", "==", 30).where("timeend", "<=", 60).onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesAll(_boardGames);
    });
}

function MorethanSixty() {
    _boardGameRef.where("timestart", ">=", 60).onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });

        appendBoardGamesAll(_boardGames);
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

function strategy(strategy) {
    _boardGameRef.where("genre", "==", "Strategy").onSnapshot(function (snapshotData) {
        _boardGames = [];
        snapshotData.forEach(function (doc) {
            let boardGame = doc.data();
            boardGame.id = doc.id;
            _boardGames.push(boardGame);
        });
        appendBoardGamesAll(_boardGames);

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

//DROPDOWN//
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        /*for each option in the original select element,
        create a new DIV that will act as an option item:*/
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function (e) {
            /*when an item is clicked, update the original select box,
            and the selected item:*/
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
        /*when the select box is clicked, close any other select boxes,
        and open/close the current select box:*/
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);


let option = document.querySelector('#location option')
console.log(option);



