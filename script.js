function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return (a * b).toString();;
}
function div(a, b) {
    if (b === 0) {
    }
    return a / b;
}

function neg(a) {
    if (a === "") {
        return "";
    }
    a = parseFloat(a);
    return (a * -1).toString();
}

function per(a) {
    a == parseFloat(a);
    return (a / 100).toString();
}

function roundNumber(num, dec) {
    num = parseFloat(num);
    return (Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec)).toString();
}

const nums = document.querySelectorAll('.number');
const secOps = document.querySelectorAll('.secondary-operator');
const priOps = document.querySelectorAll('.main-operators');
const display = document.querySelector('#display');
let op1 = "";
let op2 = "";
let opSel = false;
let decUsed = false;
let length = 0;

function operate(str) {
    if (str === "") {
        display.textContent = "0";
        return;
    }
    str = roundNumber(str, 6);
    op1 = roundNumber(op1, 6);
    op2 = roundNumber(op2, 6);
    str = str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    display.textContent = str;
}

secOps.forEach((op) => {
    op.addEventListener('click', () => {
        console.log(op.textContent);
        if (op.textContent === 'C') {
            opSel ? op2 = "" : op1 = "";
            operate("");
            decUsed = false;
            length = 0;

        }
        else if (op.textContent === "+/-") {
            opSel ? op2 = neg(op2) : op1 = neg(op1);
            opSel ? operate(op2) : operate(op1);
        }
        else if (op.textContent === "%") {
            opSel ? op2 = per(op2) : op1 = per(op1);
            opSel ? operate(op2) : operate(op1);
        }
        else if (op.textContent === "." && !decUsed) {
            opSel ? op2 += "." : op1 += '.';
            opSel ? operate(op2) : operate(op1);
            decUsed = true;
        }
    })
})

nums.forEach((num) => {
    num.addEventListener('click', () => {
        if (!opSel && length < 7) {
            op1 += num.textContent;
            operate(op1);
        }
        else if (opSel && length < 7) {
            op2 += num.textContent;
            operate(op2);
        }
        length++;
    })
})



