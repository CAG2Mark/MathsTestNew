// Maths Test Main Script.

// Initialises everything and keeps everything running. 

const ANS_HASH = "d410d0be3b07861b2566c819e9e8673f9f933791aa1f79aa9b8458ee59b551fd";

// slides system
window.MathJax = {
    loader: {load: ['[tex]/ams', '[tex]/physics']},
    tex: {packages: {'[+]': ['ams', 'physics']}}
};

// init questions
var body = document.body;

var wrap = document.getElementById("wrap");
var insertLoc = document.getElementById("questions-end");

let questions = [];

for (let i = 0; i < questionsData.length; ++i) {
    let q = questionsData[i];
    let question = new Question(q.id, q.prompt, q.answerType, q.signatureTests, q.isTutorial, q.tutorialAnswer);
    questions.push(question);
    let ans;
    if (ans = config.questionAnswers[q.id]) 
    setTimeout(() => {
        question.setAnswerText(ans);
    }, 100);

    insertLoc.insertAdjacentElement('beforebegin', question.node);
}

questionNumberInput.setAttribute("max", questions.length);

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
function getData() {
    let ign = ignInput.value;
    let val = "";

    if (!ign.trim()) {
        alert("Please enter your IGN on the first page.")
        return;
    }
    
    for (var i = 1; i < questions.length; ++i) {
        let q = questions[i];
        if (q.isTutorial) continue;
        val += q.getAnswer() + ";";
    }

    let hash = sha256(val);

    console.log(hash);
    console.log(val);

    if (hash == ANS_HASH) {
        let enc = code.encryptMessage(ign, val);
        document.getElementById("code-out").value = enc;
        alert("You got everything correct! DM me the code for your prize.");
    }
    else {
        alert("One or more of your answers were wrong. Try again.");
    }
}

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
