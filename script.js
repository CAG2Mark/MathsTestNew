// slides system

const ANS_HASH = "f4b69479d871aa4407b15163a7b247354e4d7a410e74dba9206350ae99e3c435";

var body = document.body;
var children = body.getElementsByClassName("slide");

children[0].classList.add("slide-visible");

var slide = 0;

function transition(index) {
    if (index == slide) return;

    let ltoR = index > slide;

    let s1 = children[slide];
    let s2 = children[index];

    slide = index;

    document.getElementById("back").style.display = slide == 0 ? "none" : "block";
    document.getElementById("forward").style.display = slide == (children.length - 1) ? "none" : "block";

    $(s2).css("left", ltoR ? "200%" : "-100%");
    s2.classList.add("slide-visible");
    $(s1).animate({left: !ltoR ? "200%" : "-100%"});
    $(s2).animate({left: "50%"});

    setTimeout(() => {
        //s1.classList.remove("slide-visible")
    }, 300);
}

// Source: https://stackoverflow.com/questions/51531021/javascript-aes-encryption-and-decryption-advanced-encryption-standard


let code = (function(){
    return{
      encryptMessage: function(messageToencrypt = '', secretkey = ''){
        var encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, secretkey);
        return encryptedMessage.toString();
      },
      decryptMessage: function(encryptedMessage = '', secretkey = ''){
        var decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretkey);
        var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);

        return decryptedMessage;
      }
    }
})();

function getInput(obj) {
    return obj.getElementsByTagName("input")[0];
}

var finishButton = document.getElementById("get-code-button");
function getData() {
    let ign = getInput(children[0]).value;
    let val = "";

    if (!ign.trim()) {
        alert("Please enter your IGN on the first page.")
        return;
    }

    let qs = document.getElementsByClassName("question");
    
    for (var i = 1; i < qs.length; ++i) {
        let input = getInput(qs[i]);
        if (typeof input === undefined) continue;

        val += input.value.trim() + " ";
    }

    let hash = sha256(val);
    if (hash == ANS_HASH) {
        let enc = code.encryptMessage(ign, val);
        document.getElementById("code-out").value = enc;
        alert("You got everything correct! DM me the code for your prize.");
    }
    else {
        alert("One or more of your answers were wrong. Try again.");
    }
}

document.getElementById("back").addEventListener("click", (o,e) => {
    if (slide == 0) return;
    transition(slide - 1);
})

document.getElementById("forward").addEventListener("click", (o,e) => {
    if (slide == children.length - 1) return;
    transition(slide + 1);
})