var children = wrap.getElementsByClassName("slide");

children[0].classList.add("slide-visible");

var slide = 0;

var startCnt = document.getElementsByClassName("starting-slide").length;
var startingSlideCnt = startCnt + tutorialQuestionsCnt;

function transition(index) {
    if (index == slide) return;

    if (index >= children.length) return;

    let ltoR = index > slide;

    let s1 = children[slide];
    let s2 = children[index];

    slide = index;

    // hide errors on last page
    if (slide == children.length - 1) {
        document.getElementById("incorrect-page").classList.add("end-page-hidden");
        document.getElementById("error-page").classList.add("end-page-hidden");
    }


    document.getElementById("back").style.display = slide == 0 ? "none" : "block";
    document.getElementById("forward").style.display = slide == (children.length - 1) ? "none" : "block";
    document.getElementById("skip-questions").style.display = 0 < slide && slide < startingSlideCnt? "block" : "none";
    questionNumberInput.style.display = startingSlideCnt <= slide && (slide <= questionsData.length) ? "block" : "none"
    questionNumberInput.value = slide - 4;

    let s2Anim = ltoR ? "right-in" : "left-in";
    let s1Anim = !ltoR ? "right-out" : "left-out";
    //$(s2).css("left", ltoR ? "200%" : "-100%");
    s2.classList.add("slide-visible");
    s2.classList.add(s2Anim);
    s1.classList.add(s1Anim);
    //$(s1).animate({left: !ltoR ? "200%" : "-100%"});
    //$(s2).animate({left: "50%"});

    setTimeout(() => {
        s2.classList.remove(s2Anim);
        s1.classList.remove(s1Anim);
        s1.classList.remove("slide-visible")
    }, 400);
}

document.getElementById("back").addEventListener("click", (o,e) => {
    if (slide == 0) return;
    transition(slide - 1);
})

document.getElementById("forward").addEventListener("click", (o,e) => {
    if (slide == children.length - 1) return;
    transition(slide + 1);
})

document.getElementById("skip-questions").addEventListener("click", (o,e) => {
    transition(startingSlideCnt);
});

function handleQuestionNumberChange() {
    if (!Number.isInteger(parseInt(questionNumberInput.value))) return;
    transition(parseInt(questionNumberInput.value)+ startingSlideCnt - 1);
}

questionNumberInput.addEventListener("focusout", (e) => {
    handleQuestionNumberChange();
})

questionNumberInput.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key !== 'Enter') return;
    handleQuestionNumberChange();
})

setTimeout(() => {
    document.body.classList.remove("no-animation");
}, 100);

var privacyButton = document.getElementById("privacy-button");
var privacyPage = document.getElementById("privacy-popup"); 

var helpButton = document.getElementById("help-button");
var helpPage = document.getElementById("help-popup"); 

var popups = [
    [privacyPage, privacyButton, false], 
    [helpPage, helpButton, false]
]

var privacyTuple = popups[0];
var helpPage = popups[1];

for (let i = 0; i < popups.length; ++i) {
    let cur = popups[i];
    cur[1].addEventListener("click", (e) => {
        updatePopupPage(cur, !cur[2]);
    })
}

function updatePopupPage(popupTuple, show) {
    if (!(popupTuple[2] ^ show)) return;

    popupTuple[2] = show;
    if (popupTuple[2]) {
        for (let i = 0; i < popups.length; ++i) {
            let cur = popups[i];
            if (cur === popupTuple) continue;
            
            updatePopupPage(cur, false);
        }
        popupIn(popupTuple);
    } else {
        popupOut(popupTuple);
    }
}

function popupIn(popupTuple) {
    popupTuple[1].classList.add("hovered");
    popupTuple[0].classList.add("opacity-animate-in");
    popupTuple[0].classList.remove("opacity-animate-out");
}

function popupOut(popupTuple) {
    popupTuple[1].classList.remove("hovered");
    popupTuple[0].classList.remove("opacity-animate-in");
    popupTuple[0].classList.add("opacity-animate-out");
}

var darkModeButton = document.getElementById("dark-mode-button");
darkModeButton.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
    darkMode = !darkMode;
    updateDarkMode();
}

function updateDarkMode() {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
    config.darkMode = darkMode;
    saveConfig();
}