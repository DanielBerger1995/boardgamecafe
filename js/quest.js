"use strict";

// ========== GLOBAL VARIABLES ========== //

const _videoGameRef = _db.collection("videogames");
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

/* ACTION TEAM */

_videoGameRef.where("genre", "==", "at").onSnapshot(snapshotData => {
    _actionTeam = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _actionTeam.push(videoGame);
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

/* ROLEPLAYING TEAM */

_videoGameRef.where("genre", "==", "rt").onSnapshot(snapshotData => {
    _roleplayingTeam = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _roleplayingTeam.push(videoGame);
    });

});

/* STRATEGY SOLO */

_videoGameRef.where("genre", "==", "rs").onSnapshot(snapshotData => {
    _strategySolo = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _strategySolo.push(videoGame);
    });

});

/* STRATEGY TEAM */

_videoGameRef.where("genre", "==", "rt").onSnapshot(snapshotData => {
    _strategyTeam = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _strategyTeam.push(videoGame);
    });

});


// append videoGames to the DOM (replace actionSolo with any genre)
function appendVideoGames(actionSolo) {
    let htmlTemplate = "";
    for (let videoGame of actionSolo) {
        htmlTemplate += `
    <article>
      <img src="${videoGame.img}">
        <h2>${videoGame.name}</h2>
      </div>
      </article>
    `;
    }
    document.querySelector('#videoGame-container').innerHTML = htmlTemplate;
}



/* REGISTERING GSAP PLUGINS */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



/* LINE AND CIRCLE ANIMATIONS NUMBER 1 */

gsap.from(".line-one", {
    scrollTrigger: {
        trigger: ".circle-one",
        end: "top center",
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
        end: "bottom center",
        toggleActions: "restart pause reverse pause",
        markers: true,
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
        trigger: ".circle-two",
        end: "top center",
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
        trigger: "#sec3",
        end: "top center",
        toggleActions: "restart pause reverse pause",
        markers: false,
        scrub: true
    },
    scaleY: 0,
    duration: 5,
    transformOrigin: "top right",
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

