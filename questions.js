const AnswerType = {
    FUNCTION: 0,
    NUMBER: 1,
    EXACT: 2
}

var template = document.getElementById("question-template");

const customLaTeX = {
    'sqrt': function (node, options) { 
      return '\\sqrt{' + node.args[0].toTex(options) + '}';
    },
    'nCr': function (node, options) { 
        return `\\binom{${node.args[0].toTex(options)}}{${node.args[1].toTex(options)}}`;
    }
}

const texOptions = {
    parenthesis: 'auto',   
    implicit: 'hide',    
    handler: customLaTeX
}

function gcd(a,b) {
    if (!(Number.isInteger(a) && Number.isInteger(b))) return 1;
    a = Math.abs(a);
    b = Math.abs(b);
    while (b != 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to find the nCr
function nCr(n, r) {
    if (n <= 0 || r < 0 || n < r) return 0;
    if (!Number.isInteger(r)) return NaN;
    var p = 1, k = 1;
    if (Number.isInteger(n) && n - r < r)
        r = n - r;
    if (r != 0) {
        while (r) {
            p *= n;
            k *= r;
            var m = gcd(p, k);
            p /= m;
            k /= m;
            --n;
            --r;
        }
    } else {
        p = 1;
    }
    return k == 1 ? p : p/k;
}

const customFunctions = {
    ln: Math.log,
    arccos: Math.acos,
    arctan: Math.atan,
    arcsin: Math.asin,
    arcsinh: Math.asinh,
    arccosh: Math.acosh,
    arctanh: Math.atanh,
    nCr: nCr,
}

math.import(customFunctions);

class Question {
    constructor(prompt, answerType, signatureTests = null, isTutorial=false, tutorialAnswer=null) {
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
        });
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