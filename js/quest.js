"use strict";

// ========== GLOBAL VARIABLES ========== //

const _videoGameRef = _db.collection("videogames");
let _videoGames;


//ACTION SHOOTER SOLO//
_videoGameRef.where("genre", "==", "ass").onSnapshot(snapshotData => {
    _videoGames = [];
    snapshotData.forEach(doc => {
        let videoGame = doc.data();
        videoGame.id = doc.id;
        _videoGames.push(videoGame);
    });

});


// append videoGames to the DOM
function appendVideoGames(videoGames) {
    let htmlTemplate = "";
    for (let videoGame of videoGames) {
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
        trigger: "#sec2",
        start: "top center",
        end: "bottom center",
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




document.getElementById("scroll-btn").addEventListener("click", slowScroll);

function slowScroll() {
    gsap.to(window, { duration: 5, scrollTo: "#sec2" });
}




/* LEFT AND RIGHT SIDE BUTTONS */

function btn1aClick() {
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
    document.querySelectorAll('.btn1a, .btn1c').forEach(el => el.classList.add('disappearing'));
    setTimeout(() => {
        document.querySelectorAll('.btn1a, .btn1c').forEach(el => el.style.display = "none")
    }, 750);
}

