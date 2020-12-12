"use strict";

// ========== GLOBAL VARIABLES ========== //

const _videoGameRef = _db.collection("videogames");
const _boardGameRef = _db.collection("boardgames");
let _boardAs;
let _boardAt;
let _boardSs;
let _boardSt;
let _boardRs;
let _boardRt;
let _actionSolo;
let _actionTeam;
let _strategySolo;
let _strategyTeam;
let _roleplayingSolo;
let _roleplayingTeam;

/* ACTION SOLO */

_videoGameRef.where("genre", "==", "as").onSnapshot(snapshotData => {
    _actionSolo = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _actionSolo.push(videoGame);
    });

});

_boardGameRef.where("match", "==", "as").onSnapshot(snapshotData => {
    _boardAs = [];
    snapshotData.forEach(doc => {
        let boardGame = doc.data();
        boardGame.id = doc.id;
        _boardAs.push(boardGame);
    });

});

/* ACTION TEAM */

_videoGameRef.where("genre", "==", "at").onSnapshot(snapshotData => {
    _actionTeam = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _actionTeam.push(videoGame);
    });

});

_boardGameRef.where("match", "==", "at").onSnapshot(snapshotData => {
    _boardAt = [];
    snapshotData.forEach(doc => {
        let boardGame = doc.data();
        boardGame.id = doc.id;
        _boardAt.push(boardGame);
    });

});

/* ROLEPLAYING SOLO */

_videoGameRef.where("genre", "==", "rs").onSnapshot(snapshotData => {
    _roleplayingSolo = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _roleplayingSolo.push(videoGame);
    });

});

_boardGameRef.where("match", "==", "rs").onSnapshot(snapshotData => {
    _boardRs = [];
    snapshotData.forEach(doc => {
        let boardGame = doc.data();
        boardGame.id = doc.id;
        _boardRs.push(boardGame);
    });

});

/* ROLEPLAYING TEAM */

_videoGameRef.where("genre", "==", "rt").onSnapshot(snapshotData => {
    _roleplayingTeam = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _roleplayingTeam.push(videoGame);
    });

});

_boardGameRef.where("match", "==", "rt").onSnapshot(snapshotData => {
    _boardRt = [];
    snapshotData.forEach(doc => {
        let boardGame = doc.data();
        boardGame.id = doc.id;
        _boardRt.push(boardGame);
    });

});

/* STRATEGY SOLO */

_videoGameRef.where("genre", "==", "ss").onSnapshot(snapshotData => {
    _strategySolo = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _strategySolo.push(videoGame);
    });

});

_boardGameRef.where("match", "==", "ss").onSnapshot(snapshotData => {
    _boardSs = [];
    snapshotData.forEach(doc => {
        let boardGame = doc.data();
        boardGame.id = doc.id;
        _boardSs.push(boardGame);
    });

});

/* STRATEGY TEAM */

_videoGameRef.where("genre", "==", "st").onSnapshot(snapshotData => {
    _strategyTeam = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _strategyTeam.push(videoGame);
    });

});

_boardGameRef.where("match", "==", "st").onSnapshot(snapshotData => {
    _boardSt = [];
    snapshotData.forEach(doc => {
        let boardGame = doc.data();
        boardGame.id = doc.id;
        _boardSt.push(boardGame);
    });

});



// append videoGames to the DOM (replace boardAs with other boardgame groups)

function appendBoardGames(boardAs) {
    let htmlTemplate = "";
    for (let boardGame of boardAs) {
        htmlTemplate += `
    <article>
    <img src="${boardGame.image}">
    <h2>${boardGame.name}</h2>
      </div>
      </article>
    `;
    }
    document.querySelector('#lol-container').style.display = "flex";
    document.querySelector('#lol-container').innerHTML = htmlTemplate;
}


// append videoGames to the DOM (replace actionSolo with any genre)
function appendVideoGames(actionSolo) {
    let htmlTemplate = "";
    for (let videoGame of actionSolo) {
        htmlTemplate += `
    <article>
    <img src="${videoGame.img}">
    <button onclick="diceFunction();appendBoardGames(_boardAs)">${videoGame.name}</button>
      </div>
      </article>
    `;
    }
    document.querySelector('#actionSolo-container').style.display = "flex";
    document.querySelector('#actionSolo-container').innerHTML = htmlTemplate;
}

// append videoGames to the DOM (replace actionSolo with any genre)
function appendVideoGames2(actionSolo) {
    let htmlTemplate = "";
    for (let videoGame of actionSolo) {
        htmlTemplate += `
    <article>
      <img src="${videoGame.img}">
      <button onclick="diceFunction();appendBoardGames(_boardAt)">${videoGame.name}</button>
      </div>
      </article>
    `;
    }
    document.querySelector('#actionTeam-container').style.display = "flex";
    document.querySelector('#actionTeam-container').innerHTML = htmlTemplate;
}

// append videoGames to the DOM (replace actionSolo with any genre)
function appendVideoGames3(actionSolo) {
    let htmlTemplate = "";
    for (let videoGame of actionSolo) {
        htmlTemplate += `
    <article>
      <img src="${videoGame.img}">
      <button onclick="diceFunction();appendBoardGames(_boardSs)">${videoGame.name}</button>
      </div>
      </article>
    `;
    }
    document.querySelector('#strategySolo-container').style.display = "flex";
    document.querySelector('#strategySolo-container').innerHTML = htmlTemplate;
}

// append videoGames to the DOM (replace actionSolo with any genre)
function appendVideoGames4(actionSolo) {
    let htmlTemplate = "";
    for (let videoGame of actionSolo) {
        htmlTemplate += `
    <article>
      <img src="${videoGame.img}">
      <button onclick="diceFunction();appendBoardGames(_boardSt)">${videoGame.name}</button>
      </div>
      </article>
    `;
    }
    document.querySelector('#strategyTeam-container').style.display = "flex";
    document.querySelector('#strategyTeam-container').innerHTML = htmlTemplate;
}

// append videoGames to the DOM (replace actionSolo with any genre)
function appendVideoGames5(actionSolo) {
    let htmlTemplate = "";
    for (let videoGame of actionSolo) {
        htmlTemplate += `
    <article>
      <img src="${videoGame.img}">
      <button onclick="diceFunction();appendBoardGames(_boardRs)">${videoGame.name}</button>
      </div>
      </article>
    `;
    }
    document.querySelector('#roleplayingSolo-container').style.display = "flex";
    document.querySelector('#roleplayingSolo-container').innerHTML = htmlTemplate;
}

// append videoGames to the DOM (replace actionSolo with any genre)
function appendVideoGames6(actionSolo) {
    let htmlTemplate = "";
    for (let videoGame of actionSolo) {
        htmlTemplate += `
    <article>
      <img src="${videoGame.img}">
      <button onclick="diceFunction();appendBoardGames(_boardRt)">${videoGame.name}</button>
      </div>
      </article>
    `;
    }
    document.querySelector('#roleplayingTeam-container').style.display = "flex";
    document.querySelector('#roleplayingTeam-container').innerHTML = htmlTemplate;
}

/* REGISTERING GSAP PLUGINS */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



/* LINE AND CIRCLE ANIMATIONS NUMBER 1 */

gsap.from(".line-one", {
    scrollTrigger: {
        trigger: "#sec1",
        endTrigger: ".circle-one",
        start: "center center",
        end: "center center",
        toggleActions: "restart pause reverse pause",
        markers: false,
        scrub: true
    },
    scaleY: 0,
    duration: 5,
    transformOrigin: "left right",
    ease: "none"
});

gsap.from(".circle-one", {
    scrollTrigger: {
        trigger: "#aBtns",
        start: "top center",
        end: "center center",
        toggleActions: "restart pause reverse pause",
        markers: false,
        scrub: true
    },
    scaleY: 0,
    duration: 5,
    transformOrigin: "top left",
    ease: "none"
});




/* LINE AND CIRCLE ANIMATIONS NUMBER 2 */

gsap.from(".line-two", {
    scrollTrigger: {
        trigger: ".line-two",
        endTrigger: ".circle-two",
        start: "center center",
        end: "center center",
        toggleActions: "restart pause reverse pause",
        markers: false,
        scrub: true
    },
    scaleY: 0,
    duration: 5,
    transformOrigin: "left right",
    ease: "none"
});

gsap.from(".circle-two", {
    scrollTrigger: {
        trigger: ".circle-two",
        endTrigger: ".circle-two",
        start: "bottom bottom",
        end: "top center",
        toggleActions: "restart pause reverse pause",
        markers: false,
        scrub: true
    },
    scaleY: 0,
    duration: 5,
    transformOrigin: "top left",
    ease: "none"
});



/* LINE AND CIRCLE ANIMATIONS NUMBER 3 */

gsap.from(".line-three", {
    scrollTrigger: {
        trigger: ".line-three",
        endTrigger: ".circle-three",
        start: "center center",
        end: "center center",
        toggleActions: "restart pause reverse pause",
        markers: false,
        scrub: true
    },
    scaleY: 0,
    duration: 5,
    transformOrigin: "left right",
    ease: "none"
});

gsap.from(".circle-three", {
    scrollTrigger: {
        trigger: ".circle-three",
        endTrigger: ".circle-three",
        start: "bottom bottom",
        end: "top center",
        toggleActions: "restart pause reverse pause",
        markers: false,
        scrub: true
    },
    scaleY: 0,
    duration: 5,
    transformOrigin: "top left",
    ease: "none"
});




function actionBtn() {
    document.getElementById("sBtns").style.display = "none";
    document.getElementById("rBtns").style.display = "none";
}




/* LEFT AND RIGHT SIDE BUTTONS */

function btn1aClick() {
    document.getElementById("sBtns").style.display = "none";
    document.getElementById("rBtns").style.display = "none";
    document.querySelectorAll('.btn1').forEach(el => el.classList.add('disappearing'));
    setTimeout(() => {
        document.querySelectorAll('.btn1').forEach(el => el.style.display = "none")
    }, 750);
    setTimeout(() => {
        document.querySelectorAll('.btn1a').forEach(el => el.classList.remove('disappearing'));
        document.querySelectorAll('.btn1a').forEach(el => el.classList.add('appearing'))
        document.querySelectorAll('.btn1a').forEach(el => el.style.display = "block")
    }, 750)
}

function btn1cClick() {
    document.getElementById("aBtns").style.display = "none";
    document.getElementById("sBtns").style.display = "none";
    document.querySelectorAll('.btn1').forEach(el => el.classList.add('disappearing'));
    setTimeout(() => {
        document.querySelectorAll('.btn1').forEach(el => el.style.display = "none")
    }, 750);
    setTimeout(() => {
        document.querySelectorAll('.btn1c').forEach(el => el.classList.remove('disappearing'));
        document.querySelectorAll('.btn1c').forEach(el => el.classList.add('appearing'))
        document.querySelectorAll('.btn1c').forEach(el => el.style.display = "block")
    }, 750)
}

function btn2aClick() {
    document.querySelectorAll('.btn2').forEach(el => el.classList.add('disappearing'));
    setTimeout(() => {
        document.querySelectorAll('.btn2').forEach(el => el.style.display = "none")
    }, 750);
    setTimeout(() => {
        document.querySelectorAll('.btn2a').forEach(el => el.classList.remove('disappearing'));
        document.querySelectorAll('.btn2a').forEach(el => el.classList.add('appearing'))
        document.querySelectorAll('.btn2a').forEach(el => el.style.display = "block")
    }, 750)
}

function btn2bClick() {
    document.querySelectorAll('.btn2').forEach(el => el.classList.add('disappearing'));
    setTimeout(() => {
        document.querySelectorAll('.btn2').forEach(el => el.style.display = "none")
    }, 750);
    setTimeout(() => {
        document.querySelectorAll('.btn2b').forEach(el => el.classList.remove('disappearing'));
        document.querySelectorAll('.btn2b').forEach(el => el.classList.add('appearing'))
        document.querySelectorAll('.btn2b').forEach(el => el.style.display = "block")
    }, 750)
}




/* MIDDLE BUTTONS */

function btn1bClick() {
    document.getElementById("aBtns").style.display = "none";
    document.getElementById("sBtns").style.display = "none";
    document.querySelectorAll('.btn1a, .btn1c').forEach(el => el.classList.add('disappearing'));
    setTimeout(() => {
        document.querySelectorAll('.btn1a, .btn1c').forEach(el => el.style.display = "none")
    }, 750);
}


/* SLOW SCROLLING */

function scrollPageTo(to, duration = 2000) {
    const easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    return new Promise((resolve, reject) => {
        const element = document.scrollingElement;

        if (typeof to === 'string') {
            to = document.querySelector(to) || reject();
        }
        if (typeof to !== 'number') {
            to = to.getBoundingClientRect().top + element.scrollTop;
        }

        let start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        const animateScroll = function () {
            currentTime += increment;
            let val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            } else {
                resolve();
            }
        };
        animateScroll();
    });
}

function scrollClick1() {
    setTimeout(() => {
        window.scrollPageTo('#anchor');
    }, 1400);
}

function scrollClick2() {
    setTimeout(() => {
        window.scrollPageTo('#anchor2');
    }, 1400);
}

function diceFunction() {

    document.getElementById("bigWrapper").style.opacity = "0";

    setTimeout(() => {
        document.getElementById("bigWrapper").style.display = "none";
    }, 1000);

    setTimeout(() => {
        document.getElementById("loader").style.opacity = "1";
    }, 1000);

    // setTimeout(() => {
    //     document.getElementById("dice").style.opacity = "0";
    // }, 5000);

    setTimeout(() => {
        document.getElementById("sec4").style.opacity = "1";
    }, 5000);
}