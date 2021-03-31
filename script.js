// slides system

var body = document.body;
var children = body.children;

children[0].classList.add("slide-visible");

var slide = 0;

function transition(index) {
    if (index == slide) return;

    let ltoR = index < slide;

    let s1 = children[slide];
    let s2 = children[index];

    slide = index;

    $(s2).css("left", ltoR ? "200%" : "-100%");
    $(s1).animate({left: !ltoR ? "200%" : "-100%"});
    $(s2).animate({left: "50%"});
}

document.getElementById("back").addEventListener("click", (o,e) => {
    transition(slide - 1);
})

document.getElementById("forward").addEventListener("click", (o,e) => {
    transition(slide + 1);
})