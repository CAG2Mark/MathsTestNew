const AnswerType = {
    FUNCTION: 0,
    NUMBER: 1,
    EXACT: 2
}

var template = document.getElementById("question-template");

const customLaTeX = {
    'sqrt': function (node, options) { 
      return '\\sqrt{' + node.args[0].toTex(options) + '}';
    }
}

const texOptions = {
    parenthesis: 'auto',   
    implicit: 'hide',    
    handler: customLaTeX
}

const customFunctions = {
    ln: Math.log,
    arccos: Math.acos,
    arctan: Math.atan,
    arcsin: Math.asin,
    arcsinh: Math.asinh,
    arccosh: Math.acosh,
    arctanh: Math.atanh,
}

math.import(customFunctions);

class Question {
    constructor(prompt, answerType, signatureTests = null, isTutorial=false) {
        this.prompt = prompt;
        this.answerType = answerType;
        let node = template.cloneNode(true);
        node.removeAttribute("id");
        this.node = node;
        this.signatureTests = signatureTests;
        this.isTutorial = false;
        
        this.promptBox = node.getElementsByClassName("question-text")[0];
        this.inputBox = node.getElementsByClassName("question-input")[0];
        this.answerPreview = node.getElementsByClassName("question-answer-preview")[0];

        this.promptBox.innerHTML = this.prompt;

        this.inputBox.addEventListener("keyup", (e) => {
            let answer = this.getAnswerInput();

            if (!answer) { 
                this.answerPreview.innerHTML = "";
                return;
            }
            if (this.answerType == AnswerType.EXACT) { 
                this.answerPreview.innerHTML = answer; 
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
            let f = new MathFunction(this.getAnswerInput(), this.signatureTests);
            return f.getSignatureString();
        }
        else if (this.answerType == AnswerType.NUMBER) {
            let val = math.evaluate(this.getAnswerInput());
            return numSigToString(numSignature(val));
        }
        else if (this.answerType == AnswerType.EXACT) {
            return this.getAnswerInput();
        }
    }
}