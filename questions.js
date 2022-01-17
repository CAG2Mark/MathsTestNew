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
        with a numerical value. If so, you may enter anything
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
        id: "tut2",
        prompt: `(Tutorial #2) You can also have simple functions as part of your numerical
        answers if you wish. For example, if the answer is \\(\\sqrt{\\binom{5}{3} e^{\\sin \\ln 2}}\\),
        you may enter <span class="mono">sqrt(nCr(5,3) e^sin(ln(2)))</span>. Other available functions
        include <span class="mono">sqrt(x), floor(x), cos(x), cosh(x), arcsin(x), arccosh(x)</span> and more.
        The input and output to all relevant functions are in radians.`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: true,
        tutorialAnswer: "sqrt(nCr(5,3) e^sin(ln(2)))"
    },
    {
        id: "tut3",
        prompt: `(Tutorial #3) For some questions, you may be asked to enter
        a function. For example, if the question is asking for the sum of
        \\(0.5x^2\\) and \\(0.5x^2-1\\), you could type <span class="mono">x^2-1</span> or
        <span class="mono">(x-1)(x+1)</span>. All of these will be correct. You can also
        the same functions introduced in the previous slide.
        <br>NOTE: When entering the product of lone varables, for example \\(ab\\), 
        please type something like <span class="mono">a*b</span>
        instead of <span class="mono">ab</span>. Otherwise, this may cause errors.`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{x: 1},{x: -100},{x: 2},{x: 4.5123},{x: 7},{x: 100},{x: 0}],
        isTutorial: true,
        tutorialAnswer: "x^2-1",
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
        prompt: `(Q1) \\(1+1=?\\)`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false,
    },
    {
        id: "21",
        prompt: `(Q2) \\[\\sqrt{\\lim_{n\\to\\infty} \\left(1+\\frac{\\pi}{n}\\right)^n} = ?\\]`,
        answerType: AnswerType.NUMBER,
        signatureTests: null,
        isTutorial: false
    },
    {
        id: "sum",
        prompt: `(Q3) For \\(0<|r|<1\\), give a closed form solution for: 
        \\[\\sum^\\infty_{n=1} \\frac{r^n}{n}\\]
        by integrating \\(\\sum^\\infty_{n=0} r^n\\). Note that both are
        absolutely convergent.`,
        answerType: AnswerType.FUNCTION,
        signatureTests: [{r:0.1}, {r:0.2}, {r: 0.3}, {r: 0.4}, {r: 0.9}, {r: -0.3}, {r: -0.001}],
        isTutorial: false
    },
    {
        id: "",
        prompt: `(Q4) What is Chopin's last name? Answer <b>exactly</b>.\\(\\)`,
        answerType: AnswerType.EXACT,
        signatureTests: null,
        isTutorial: false
    },
]

class Question {
    constructor(id, prompt, answerType, signatureTests = null, isTutorial=false, tutorialAnswer=null) {
        this.id = id;
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
            MathJax.typeset([this.answerPreview]);
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