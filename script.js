const ANS_HASH = "41b42623a72c543a50600038d8c7b3e898335919af79b748b92c4b4e2ec174b3";

// slides system
window.MathJax = {
    loader: {load: ['[tex]/ams', '[tex]/physics']},
    tex: {packages: {'[+]': ['ams', 'physics']}}
};

// init questions
var body = document.body;

var wrap = document.getElementById("wrap");
var insertLoc = document.getElementById("questions-end");

var children = wrap.getElementsByClassName("slide");

let questionsData = [
    {
        prompt: `(Tutorial #1) If you are asked to enter a number, you may answer anything
        equivalent to the correct answer and it will be accepted. For example, 
        if the answer is \\(\\frac{\\pi+e}{2}\\), then <span class="mono">(pi+e)/2</span>, 
        <span class="mono">0.5(pi+e)</span>, <span class="mono">2(pi+e)/(3+1)</span> etc. 
        will all be accepted. Try it below. <br>Your answers to the tutorial questions 
        will not affect the final
        result of this quiz/test.`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: true,
        tutorialAnswer: "(pi+e)/2"
    },
    {
        prompt: `(Tutorial #2) For some questions, you may be asked to enter
        a function. For example, if the question is asking for the sum of
        \\(0.5x^2\\) and \\(0.5x^2-1\\), you could type <span class="mono">x^2-1</span> or
        <span class="mono">(x-1)(x+1)</span>. All of these will be correct.
        <br>NOTE: When entering the product of lone varables, for example \\(ab\\), 
        please type something like <span class="mono">a*b</span>
        instead of <span class="mono">ab</span>. Otherwise, this may cause errors.`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{x: 1},{x: -100},{x: 2},{x: 4.5123},{x: 7},{x: 100},{x: 0}],
        isTutorial: true,
        tutorialAnswer: "x^2-1",
    },
    {
        prompt: `(Tutorial #3) If mentioned explicitly, you will need to
        answer EXACTLY some text. For example, if the question instructs you to
        answer <b>exactly</b> the most simplified form of \\(x+x\\), answer <span class="mono">2x</span>.`,
        answerType: AnswerType.EXACT,
        signatureTests: null,
        isTutorial: true,
        tutorialAnswer: "2x"
    },
    {
        prompt: `(Q1) \\(1-1+1-1+1-1+1+1=?\\)<br>Input the answer <b>exactly</b> (the answer will not be calculated for you).`,
        answerType: AnswerType.EXACT,
        signatureTests: null,
        isTutorial: false,
    },
    {
        prompt: `(Q2) \\(9+10=-2+?\\)`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        prompt: `(Q3) \\(\\arcsin{\\sin{\\left(\\frac{\\pi}{4}^\\circ\\right)}}=?\\) Give your answer in <b>radians.</b>`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        prompt: `(Q4) What is the ASCII code of the first letter of Obama's last name (upper case) <b>squared</b>?\\(\\)`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        prompt: `(Q5) \\(\\dv{a^x}{a} = ?\\)`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{a: 1, x: 10}, {a: -1, x: 2}, {a: 5, x: -4}, {a: 3.5, x: 10.4}, {a: 4, x: 10}, {a: 0.001, x: 0.003}],
        isTutorial: false
    },
    {
        prompt: `(Q6) Suppose \\(\\exists x \\in\\mathbb{R}, \\exists b \\in\\mathbb{R}, \\exists c \\in\\mathbb{R}, 
            \\exists a \\in \\mathbb{R}^+\\), \\(ax^2-\\sqrt{a}b+\\frac{c}{4}=0\\) holds.
            Find an expression for the maximal value of \\(\\sqrt{a}\\) in terms of \\(x,b,c\\).`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{x: 1.2, b: 6.4,  c: 25.6}, {x: 1.3, b: -5.1,  c: 13.6}, {x: -0.9, b: 5.4,  c: -10}, {x: -1.1, b: 5.9,  c: 3.8}],
        isTutorial: false
    },
    {
        prompt: `(Q7) \\[\\lim_{N\\to\\infty}\\sum^
            {\\lfloor{\\sum^N_{k=1}{\\frac{1}{k}}}\\rfloor}_
            {{n=\\lceil\\sum^N_{k=1}\\frac{1}{2^k}}\\rceil}
            \\frac{\\left[\\lim_{a\\to\\infty}\\left(1+\\frac{1}{a}\\right)^a\\right]^{n \\pi i}}{n}= ?\\]`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        prompt: `(Q8) \\[\\lim_{a\\to -x} f(a) = \\varepsilon\\]
            \\(\\iff\\) 
            \\[\\forall \\delta > 0, \\exists L > 0,\\]
            \\[|a-?| < L \\implies |f(a)-\\varepsilon| < \\delta
            \\]
            Enter your answer <b>exactly</b> in its most simplified form.`,
        answerType: AnswerType.EXACT,
        signatureTests: null,
        isTutorial: false
    },
    {
        prompt: `(Q9) Suppose that for any integer \\(a\\), the integer \\(a^p-a\\) is a multiple of \\(p\\). If the group \\(\\text{CKSTEM}\\)
        has order \\(p^2\\), what is the sum of the orders of the smallest and largest subgroups of \\(\\text{CKSTEM}\\), not including \\(\\text{CKSTEM}\\) itself?`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{p: 1, a: 1, G: 1}, {p: 2, a: 2, G: 2}, {p: 100, a: 10, G: 1}, {p: 0.5, a: 0.25, G: 0.125}],
        isTutorial: false
    },
    {
        prompt: `(Q10) If \\(\\text{eon}\\,\\text{eon}-\\text{eon}=1\\), and \\(\\text{eon}>0\\), what is the value of \\(\\text{eon}\\,\\text{eon}\\)?`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        prompt: `(Q11) What is the radius of convergence of the Maclaurin series of 
        \\(f(x)=\\frac{x^p}{\\sqrt[q]{a+bx^r}}\\) where 
            \\(p,q,r \\in \\mathbb{Z}^+\\), and \\(a,b \\in \\mathbb{R} - \\{0\\}\\) ?`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [
            {a:17.951410983268488, b: 71.00672474332764, p: 3, q: 15, r: 3},
            {a:67.19835737627116, b: 21.359225615703302, p: 12, q: 8, r: 1},
            {a:93.1620704936473, b: 71.9596036916113, p: 19, q: 10, r: 4},
            {a:13.689764206482458, b: 75.09780428040847, p: 13, q: 7, r: 7},
            {a:26.90952442633565, b: 68.06066439448281, p: 4, q: 12, r: 3},
            {a:62.46399529310771, b: 76.53885692031601, p: 18, q: 11, r: 16},
            {a:73.96341424849726, b: 5.018640271847907, p: 5, q: 11, r: 13},
            {a:54.653406566519436, b: 11.187164213160761, p: 13, q: 17, r: 6}
        ],
        isTutorial: false
    },
    {
        prompt: `(Q12) UnWin is very rude and wants to strong-slap every person from a group of 8
        <b>at least twice</b>. He has the energy to do 30 strong-slaps. In how many ways can he 
        distribute the 30 strong-slaps? The order in which he strong-slaps does not matter.`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        prompt: `(Q13) What is the meaning of \\(\\text{life}\\) if the following always holds true and we
        assume "meaning" is the same as "value"?
        \\[(\\text{life}<1) \\lor \\left(\\sum_{k=1}^\\infty \\frac{1}{k^\\text{life}} \\text{ converges}\\right)\\]
        \\(\\implies\\)
        \\[1+2+3+4+\\cdots=-\\frac{1}{12}\\]`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        prompt: `(Q14) How many numbers between \\(1\\) and \\(2^{\\text{The answer to life the universe and everything}}\\)
        (according to Google's calculator, at least) are not coprime with \\(69\\) 
        (ie, they share at least one commmon factor that is not \\(1\\))?`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
]

let questions = [];

for (let i = 0; i < questionsData.length; ++i) {
    let q = questionsData[i];
    let question = new Question(q.prompt, q.answerType, q.signatureTests, q.isTutorial, q.tutorialAnswer);
    questions.push(question);
    insertLoc.insertAdjacentElement('beforebegin', question.node);
}

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

document.getElementById("back").addEventListener("click", (o,e) => {
    if (slide == 0) return;
    transition(slide - 1);
})

document.getElementById("forward").addEventListener("click", (o,e) => {
    if (slide == children.length - 1) return;
    transition(slide + 1);
})