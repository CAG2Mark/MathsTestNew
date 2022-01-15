const PRECISION = 10;
var max = Math.pow(10, PRECISION);

function numSignature(x) {
    let i = 0;
    while (Math.abs(x) < max && i < PRECISION) {
        x *= 10;
        ++i;
    }
    return { val: Math.trunc(x), pow: i.toString() };
}

function numSigToString(x) {
    return `[${x.val},${x.pow}]`;
}

function signaturesEqual(x, y) {
    return x.val == y.val && x.pow == y.pow;
}

function areSameFloats(x, y) {
    return signaturesEqual(numSignature(x), numSignature(y));
}

class MathFunction {
    constructor(func) {
        this.func = func;
    }

    /* vals could be like:
    [
        {'x': 1, 'y' = 2},
        {'x': 2, 'y' = 4} 
    ]
    */
    getSignature(vals) {
        let signature = [];
        for (let i = 0; i < vals.length; ++i) {
            let f = math.evaluate(this.func, vals[i]);
            signature.push(numSignature(f));
        }
        return signature;
    }

    getSignatureString(vals) {
        let ret = "{";
        let signature = this.getSignature(vals);
        for (let i = 0; i < signature.length; ++i) {
            let point = signature[i];
            ret += numSigToString(point);
            if (i != signature.length - 1) ret += ',';
        }
        ret += '}';
        return ret;
    }

    getLatex() {
        return math.parse(this.func).toTex();
    }

    // that: the other function.
    // vals: the set of vals used to getSignature
    equals(that, vals) {
        // should be same length
        let thisSig = this.getSignature(vals);
        let thatSig = that.getSignature(vals);
        for (let i = 0; i < thisSig.length; ++i) {
            if (!signaturesEqual(thisSig[i], thatSig[i])) return false;
        }
        return true;
    }
}