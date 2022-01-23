const AnswerType = {
    FUNCTION: 0,
    NUMBER: 1,
    EXACT: 2
}

var template = document.getElementById("question-template");

let questionsData = [
    {
        id: "tut1",
        prompt: `(Tutorial #1) For some questions, you will have to answer
        with an answer that is a number. For example, 
        if the answer is \\(\\frac{\\pi+e}{2}\\), then <span class="mono">(pi+e)/2</span>, 
        <span class="mono">0.5(pi+e)</span>, <span class="mono">2(pi+e)/(3+1)</span> etc. 
        will all be accepted. However, your answers will be checked to a higher precision
        than most calculators, so <b>do not enter approximate numbers as your answer</b>. 
        Try entering the answer below. <br>Your answers to the tutorial questions 
        will not affect the final result of this quiz/test.`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: true,
        tutorialAnswer: "(pi+e)/2"
    },
    {
        id: "tut2",
        prompt: `(Tutorial #2) You can also have simple functions as part of your numerical
        answers if you wish. For example, if the answer is \\(\\sqrt{\\binom{5}{3} e^{\\sin \\ln 2}}\\),
        you may enter <span class="mono">sqrt(nCr(5,3) e^sin(ln(2)))</span>. Other available functions
        include <span class="mono">floor(x), cos(x), arcsin(x)</span> and more. 
        The input and output to all relevant functions are in radians.`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: true,
        tutorialAnswer: "sqrt(nCr(5,3) e^sin(ln(2)))"
    },
    {
        id: "tut3",
        prompt: `(Tutorial #3) For some questions, you may be asked to enter
        a function or expression. For example, if the question is asking for the product of
        \\(|x-1|\\) and \\(|x+1|\\), you could type <span class="mono">abs(x^2-1)</span> or
        <span class="mono">abs(x-1) * abs(x+1)</span>. All of these will be correct. You can also
        use the same functions introduced in the previous slide.
        <br>NOTE: When entering the product of lone varables, for example \\(ab\\), 
        please type something like <span class="mono">a*b</span>
        instead of <span class="mono">ab</span>. Otherwise, this may cause errors.`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{x: 1},{x: -100},{x: 2},{x: 4.5123},{x: 7},{x: 100},{x: 0}],
        isTutorial: true,
        tutorialAnswer: "abs(x^2-1)",
    },
    {
        id: "tut4",
        prompt: `(Tutorial #4) If mentioned explicitly, you will need to
        answer EXACTLY some text. For example, if the question instructs you to
        answer <b>exactly</b> the most simplified form of \\(x+x\\), answer <span class="mono">2x</span>.`,
        answerType: AnswerType.EXACT,
        signatureTests: null,
        isTutorial: true,
        tutorialAnswer: "2x"
    },
    {
        id: "altsum",
        prompt: `(Q1) \\(1-1+1-1+1-1+1=?\\)<br>Input the answer <b>exactly</b> (the answer will not be calculated for you).`,
        answerType: AnswerType.EXACT,
        signatureTests: null,
        isTutorial: false,
    },
    {
        id: "21",
        prompt: `(Q2) \\(9+10=2+?\\)`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "trig",
        prompt: `(Q3) \\(\\arcsin{\\cos{\\left(\\frac{\\pi}{4}^\\circ\\right)}}=?\\) Give your answer in <b>gradians.</b>`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "ascii",
        prompt: `(Q4) What is the ASCII code of the second letter of Obama's last name (lower case) <b>squared</b>?\\(\\)`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "derivative",
        prompt: `(Q5) \\(\\frac{\\mathrm{d}d^d}{\\mathrm{d}d} = ?\\) Answer as a fuction of \\(d\\).`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{d: 10}, {d: 2}, {d: 3}, {d: 10.4}, {d: 10}, {d: Math.E}],
        isTutorial: false
    },
    {
        id: "sqrta",
        prompt: `(Q6) Suppose \\(\\exists x \\in\\mathbb{R}, \\exists b \\in\\mathbb{R}, \\exists c \\in\\mathbb{R}, 
            \\exists a \\in \\mathbb{R}^+\\), \\(ax^2-\\sqrt{a}b+\\frac{c}{4}=0\\) holds.
            Find an expression for the maximal value of \\(\\sqrt{a}\\) in terms of \\(x,b,c\\).`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{x: 1.2, b: 6.4,  c: 25.6}, {x: 1.3, b: -5.1,  c: 13.6}, {x: -0.9, b: 5.4,  c: -10}, {x: -1.1, b: 5.9,  c: 3.8}],
        isTutorial: false
    },
    {
        id: "infsum",
        prompt: `(Q7) \\[\\lim_{N\\to\\infty}\\sum^
            {\\lfloor{\\sum^N_{k=1}{\\frac{1}{k}}}\\rfloor}_
            {{n=\\lceil\\sum^N_{k=1}\\frac{1}{2^k}}\\rceil}
            \\frac{\\left[\\lim_{a\\to\\infty}\\left(1+\\frac{i}{a}\\right)^a\\right]^{n \\pi i}}{n}= ?\\]`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "epsdelta",
        prompt: `(Q8) \\[\\lim_{a\\to -x} f(a) = \\varepsilon\\] 
            \\[\\iff \\forall \\delta > 0, \\exists L > 0,\\]
            \\[|a-?| < L \\implies |f(a)-\\varepsilon| < \\delta
            \\]
            What should ? be?`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{"x": 1, "a": 1, "L": 2}, {"x": 1.0001, "a": 1.0001, "L": 2.0002}, {"x": 3, "a": 2, "L": 5}, 
        {"x": -1, "a": -2, "L": 3}, {"x": 50, "a": 2, "L": 52}, {"x": 1000, "a": -1, "L": 49}],
        isTutorial: false
    },
    {
        id: "group",
        prompt: `(Q9) Suppose we have a vector space \\(V\\) over an infinite field \\(Q\\). It is known that \\(|V|=k\\), where \\(k\\) is a
        well-defined number. What is the value of \\(|V|\\)? Give your answer as a numerical value, not in terms of \\(k\\).`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "eoneon",
        prompt: `(Q10) If \\(\\text{eon}\\,\\text{eon}-\\text{eon}=1\\), and \\(\\text{eon}<0\\), what is the value of \\(\\text{eon}\\,\\text{eon}\\)?`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "radconv",
        prompt: `(Q11) What is the radius of convergence of the Maclaurin series of 
        \\(f(x)=\\frac{x^p}{\\sqrt[q]{a+bx^r}}\\) where 
            \\(p,q,r \\in \\mathbb{Z}^+\\), and \\(a,b \\in \\mathbb{R} - \\{0\\}\\)? Give a closed-form
            solution (no limits, summations, etc) in terms of \\(p,q,r,a,b\\).`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [
            {a:17.951410983268488, b: 71.00672474332764, p: 3, q: 15, r: 3},
            {a:67.19835737627116, b: 21.359225615703302, p: 12, q: 8, r: 1},
            {a:93.1620704936473, b: 71.9596036916113, p: 19, q: 10, r: 4},
            {a:-13.689764206482458, b: -75.09780428040847, p: 13, q: 7, r: 7},
            {a:-26.90952442633565, b: 68.06066439448281, p: 4, q: 12, r: 3},
            {a:-62.46399529310771, b: 76.53885692031601, p: 18, q: 11, r: 16},
            {a:73.96341424849726, b: -5.018640271847907, p: 5, q: 11, r: 13},
            {a:54.653406566519436, b: -11.187164213160761, p: 13, q: 17, r: 6}
        ],
        isTutorial: false
    },
    {
        id: "unwin",
        prompt: `(Q12) UnWin is very rude and wants to strong-slap every person from a group of 8
        <b>at least twice</b>. He has the energy to do 32 strong-slaps. In how many ways can he 
        distribute the 32 strong-slaps? <b>The order in which he strong-slaps does not matter</b>.
        (ie, all configurations where each person receives the same amount of slaps 
        should be counted together as one way).`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "meaninglife",
        prompt: `(Q13) What is the meaning of \\(\\text{life}\\) if the following always holds true and we
        assume "meaning" is the same as "value"?
        \\[(\\text{life}<1) \\lor \\left(\\sum_{k=1}^\\infty \\frac{1}{k^\\text{life}} \\text{ converges}\\right)\\]
        \\[\\implies 1+2+3+4+\\cdots=-\\frac{1}{12}\\]`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "coprime",
        prompt: `(Q14) How many numbers between \\(1\\) and \\(2^{\\text{The answer to life the universe and everything}}\\)
        (according to Google's calculator, at least) are not coprime with \\(69\\) 
        (ie, they share at least one commmon factor that is not \\(1\\))?`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "limsequence",
        prompt: `(Q15) For \\(c>0\\), consider the sequence:
        \\[a_0=\\alpha\\]
        \\[a_{n+1}=\\lim_{m\\to\\infty}\\left(1+\\frac{ca_n}{m}\\right)^m\\]

        For which value of \\(c \\in \\mathbb{R}\\) is there a unique \\(L \\in \\mathbb{R}\\) such that \\(\\forall \\alpha \\in \\mathbb{R}\\), 
        \\(\\lim_{n\\to\\infty} a_n \\text{ converges} \\implies \\lim_{n\\to\\infty} a_n = L\\)?
        Give your answer as the value of \\(c\\)`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "oldquiz",
        prompt: `(Q16) Let \\(S = \\{x\\in\\mathbb{Z} : P(x)\\}\\), where \\(P(x)\\) is true if and only if \\(x\\) was an answer
        to the <b>very easy mathematics and human aptitude verification test</b> (available 
            <a href="https://cag2mark.github.io/MathsTest/" target="_blank">here</a>.) What is \\(|S \\times S|\\)?`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "sunmass",
        prompt: `(Q17) David has 4 apples. His train is 7 minutes early. What is the mass of the sun in yottagrams?
        Give your answer to 3 significant figures (you may use scientific notation). Do not enter units.`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "nerdsnipe",
        prompt: `(Q18)<br>
            <img src="assets/q18.png" style="width: 400px; max-width: 90%" id="q18-image"><br>
            In the original image, what is in the place of the red question mark? Give the answer <b>exactly</b>. (Hint: reverse image search exists)`,
        answerType: AnswerType.EXACT,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "integral",
        prompt: `(Q19)<br>
            What is the value of the following definite integral?
             \\[\\int^\\infty_{-\\infty} \\pi^{-|\\equiv|}\\, \\mathrm{d} \\equiv \\]`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "bessel",
        prompt: `(Q20) Have a feel of my Calculus II final. Credit goes to my... <i>interesting</i> professor. Define the Bessel function as follows:
        \\[J_n(x) = \\sum_{k=0}^\\infty \\frac{(-1)^k (\\frac{x}{2})^{2k+n}}{k!(n+k)!}\\]
        Let \\(f(x) = J_\\frac{1}{2}(x) + J_{-\\frac{1}{2}}(x)\\) for real \\(x > 0\\). Express \\(f(x)\\) in terms of elementary functions. You
        will need the results \\(\\left(\\frac{1}{2}\\right)! = \\sqrt \\pi\\) and \\(n! = n(n-1)!\\).`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{x: 1}, {x: 1.5}, {x: Math.PI}, {x: 2}, {x: 3}, {x: 1000}, {x: 0.1}, {x: 0.01}],
        isTutorial: false
    },
];

class Question {
    constructor(id, qNum, prompt, answerType, signatureTests = null, isTutorial=false, tutorialAnswer=null) {
        this.id = id;
        this.qNum = qNum;
        this.prompt = prompt;
        this.answerType = answerType;
        let node = template.cloneNode(true);
        node.removeAttribute("id");
        this.node = node;
        this.signatureTests = signatureTests;
        this.isTutorial = isTutorial;
        this.tutorialAnswer = tutorialAnswer;
        
        this.promptBox = node.getElementsByClassName("question-text")[0];
        this.inputBox = node.getElementsByClassName("question-input")[0];
        this.answerPreview = node.getElementsByClassName("question-answer-preview")[0];

        this.promptBox.innerHTML = this.prompt;

        this.inputBox.addEventListener("keyup", (e) => {
            this.updateAnswer();
            config.questionAnswers[this.id] = this.getAnswerInput();
            saveConfig();
        });
    }

    updateAnswer() {
        let answer = this.getAnswerInput();

        if (!answer) { 
            this.answerPreview.innerHTML = "";
            return
        }
        if (this.answerType == AnswerType.EXACT) { 
            this.answerPreview.innerHTML = answer;
            if (this.isTutorial) 
                this.answerPreview.innerHTML += this.checkAnswer() ? " (Correct)" : " (Incorrect)";
            return;
        }

        try {
            let tex = math.parse(answer)
                .toTex(texOptions)
                .toString()
                .replaceAll("~", "")
                .replaceAll("varphi", "phi") // remove ugly default phi
                .replaceAll("phi", "varphi");
            if (this.answerType == AnswerType.NUMBER) {
                let evaled_ = math.evaluate(answer);
                let evaled = evaled_.toFixed(6);

                let isApprox = evaled.length < evaled_.toString().length;
                if (!isApprox) evaled = evaled_.toString();
                
                if (evaled.includes("function")) {
                    this.answerPreview.innerHTML = "(Error parsing)";
                } else if ( evaled != tex) {
                    this.answerPreview.innerHTML = `\\(${tex}${isApprox?"\\approx":"="}${evaled}\\)`
                } else {
                    this.answerPreview.innerHTML = `\\(${tex}\\)`
                }
            } else {
                this.answerPreview.innerHTML = `\\(${tex}\\)`
            }
            if (this.isTutorial) 
                this.answerPreview.innerHTML += this.checkAnswer() ? " (Correct)" : " (Incorrect)";
            renderMathInElement(this.answerPreview);
        } catch (error) {
            this.answerPreview.innerHTML = "(Error parsing)"
        }
    }

    getNode() {
        return this.node;
    }

    getAnswerInput() {
        return this.inputBox.value
            .trim();
    }

    getAnswer() {
        if (this.answerType == AnswerType.FUNCTION) {
            let f = new MathFunction(this.getAnswerInput());
            return f.getSignatureString(this.signatureTests);
        }
        if (this.answerType == AnswerType.NUMBER) {
            let val = math.evaluate(this.getAnswerInput());
            return numSigToString(numSignature(val));
        }
        if (this.answerType == AnswerType.EXACT) {
            return this.getAnswerInput();
        }
    }

    setAnswerText(val) {
        this.inputBox.value = val;
        this.updateAnswer();
    }

    // tutorial only
    checkAnswer() {
        if (this.answerType == AnswerType.FUNCTION) {
            let f = new MathFunction(this.getAnswerInput());
            let g = new MathFunction(this.tutorialAnswer);
            return f.equals(g, this.signatureTests);
        }
        if (this.answerType == AnswerType.NUMBER) {
            let val1 = math.evaluate(this.getAnswerInput());
            let val2 = math.evaluate(this.tutorialAnswer);
            return areSameFloats(val1, val2);
        }

        return this.getAnswerInput().trim() == this.tutorialAnswer.trim();
    }
}

var questionNumberInput = document.getElementById("question-number");

// init questions
var body = document.body;

var wrap = document.getElementById("wrap");
var insertLoc = document.getElementById("questions-end");

var questions = [];
var tutorialQuestionsCnt = 0;

for (let i = 0; i < questionsData.length; ++i) {
    let q = questionsData[i];
    
    if (q.isTutorial) ++tutorialQuestionsCnt;
    
    let question = new Question(q.id, i + 1 - tutorialQuestionsCnt, q.prompt, q.answerType, q.signatureTests, q.isTutorial, q.tutorialAnswer);
    questions.push(question);
    let ans;
    if (ans = config.questionAnswers[q.id]) 
    setTimeout(() => {
        question.setAnswerText(ans);
    }, 100);

    insertLoc.insertAdjacentElement('beforebegin', question.node);
}

questionNumberInput.setAttribute("max", questions.length);