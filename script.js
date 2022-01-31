// Maths Test Main Script.

// Initialises everything and keeps everything running. 

const ANS_HASH = "d8949bbf0b0377bea403a272eeda0ee71f8b9c76520deac6b8fc8b11aca2fcec";

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
var ignInput = document.getElementById("ign-input");

var errorPage = document.getElementById("error-page");
var incorrectPage = document.getElementById("incorrect-page");
var correctPage = document.getElementById("correct-page");

var finishPages = [errorPage, incorrectPage, correctPage];

function showPage(page) {
    for (let i = 0; i < finishPages.length; ++i) {
        let cur = finishPages[i];
        if (cur === page) continue;
        cur.classList.add("end-page-hidden");    
    }
    page.classList.remove("end-page-hidden");
}

var latestErrorQuestion = 0;

document.getElementById("error-redirect-button").addEventListener("click", () => {
    transition(latestErrorQuestion + startingSlideCnt - 1);
});

function checkAnswers() {
    let ign = ignInput.value;
    let val = "";

    if (!ign.trim()) {
        alert("Please enter your IGN on the first page.")
        return;
    }
    
    for (var i = 0; i < questions.length; ++i) {
        let q = questions[i];
        if (q.isTutorial) continue;
        try {
            val += q.getAnswer() + ";";
        }
        catch (error) {
            document.getElementById("error-question-num").innerHTML = q.qNum;
            latestErrorQuestion = q.qNum;
            showPage(errorPage);
            console.log(error);
            return;
        }
    }

    let hash = sha256(val);

    console.log(hash);
    console.log(val);

    if (hash == ANS_HASH) {
        let enc = code.encryptMessage(ign, val);
        document.getElementById("code-out").innerHTML = enc;
        showPage(correctPage);
    }
    else {
        showPage(incorrectPage);
    }
}

finishButton.addEventListener("click", checkAnswers);

ignInput.addEventListener("focusout", (e) => {
    config.ign = ignInput.value;
    saveConfig();
})

ignInput.value = config.ign;

document.getElementById("q18-image").addEventListener("contextmenu", (e) => {
    e.preventDefault();
    alert("You really thought I would let you reverse image search it directly? Lmao no")
    document.body.classList.add("LMAO-you-are-doing-the-inspect-element-of-shame-after-right-clicking-question-18s-image")
});
