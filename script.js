function add(a, b) {
    return (parseFloat(a) + parseFloat(b)).toString();
}

function sub(a, b) {
    return (parseFloat(a) - parseFloat(b)).toString();

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
const priOps = document.querySelectorAll('.main-operator');
const display = document.querySelector('#display');
let op1 = "";
let op2 = "";
let opSel = 0;
let decUsed = false;
let length = 0;
function operate(str) {

    if (str === "" || str === '-') {
        display.textContent = "0";
        return;
    }
    str = roundNumber(str, 6);
    str = str.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    display.textContent = str;
}

function calc() {

    if (opSel === 1) {
        op1 = div(op1, op2);
    }
    else if (opSel === 2) {
        op1 = mul(op1, op2);

    }
    else if (opSel === 3) {
        op1 = add(op1, op2);
    }
    else if (opSel === 4) {
        op1 = sub(op1, op2);
    }
    opSel = 0;
    op2 = "";
    operate(op1);
}

priOps.forEach((op) => {
    op.addEventListener('click', () => {

        length = 0;
        decUsed = false;
        operate(op1);
        if (op.textContent === '÷') {

            if (opSel === 0) {
                opSel = 1;
                operate(op2);
            }
            else if (op2 !== "") {
                opSel = 1;
                calc();
                operate(op1);
            }
            opSel = 1;


        }
        else if (op.textContent === 'x') {

            console.log(opSel, op1, op2)
            if (opSel === 0) {
                opSel = 2;
                operate(op2);
            }
            else if (op2 !== "") {
                opSel = 2;
                calc();
                operate(op1);
            }
            opSel = 2;

        }
        else if (op.textContent === '+') {
            if (opSel === 0) {
                opSel = 3;
                operate(op2);
            }
            else if (op2 !== "") {
                opSel = 3;
                calc();
                operate(op1);
            }
            opSel = 3;


        }
        else if (op.textContent === '-') {
            if (opSel === 0) {
                opSel = 4;
                operate(op2);

            }
            else if (op2 !== "") {
                opSel = 4;
                calc();
                operate(op1);
            }
            opSel = 4;


        }

        else if (op.textContent === '=') {
            calc();
        }
    })
})

secOps.forEach((op) => {
    op.addEventListener('click', () => {
        if (op.textContent === 'C') {
            op2 = "";
            op1 = "";
            operate("");
            decUsed = false;
            length = 0;
            opSel = 0;

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



