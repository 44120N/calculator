function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculateResult() {
    var expression = document.getElementById('display').value;
    
    try {
        // Basic Operators
        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/÷/g, '/');
        expression = expression.replace(/(.*?)%/g, '($1)/100');
        expression = expression.replace(/\^/g, '**');
        expression = expression.replace(/(?:√|sqrt)\((.*?)\)/g, 'Math.sqrt($1)');
        
        // Exponent
        expression = expression.replace(/E/g, '*10**')

        // Factorial
        expression = expression.replace(/(.*?)!/g, 'factorial($1)');

        // Mathematics Constant
        expression = expression.replace(/π/g, 'Math.PI');
        expression = expression.replace(/e/g, 'Math.E');

        // Trigonometry Functions
        expression = expression.replace(/sin\((.*?)\)/g, 'sin($1)');
        expression = expression.replace(/cos\((.*?)\)/g, 'cos($1)');
        expression = expression.replace(/tan\((.*?)\)/g, 'tan($1)');

        // Trigonometry Inverse Functions
        expression = expression.replace(/sin\**-1\((.*?)\)/g, function(_, p1) {
            return toRadians(Math.asin(p1), true);
        });

        expression = expression.replace(/cos\**-1\((.*?)\)/g, function(_, p1) {
            return toRadians(Math.acos(p1), true);
        });

        expression = expression.replace(/tan\**-1\((.*?)\)/g, function(_, p1) {
            return toRadians(Math.atan(p1), true);
        });

        // Logarithms
        expression = expression.replace(/log\((.*?)\)/g, 'Math.log10($1)')
        expression = expression.replace(/ln\((.*?)\)/g, 'Math.log($1)')

        var result = eval(expression);
        roundResult = parseFloat(result.toFixed(12));
        console.log(roundResult);
        document.getElementById('display').value = roundResult;
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function handleEnterKey(event) {
    if (event.keyCode === 13) {
        calculateResult();
    }
}
document.getElementById('display').addEventListener('keydown', handleEnterKey);

// Factorial
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

// Trigonometry functions
function sin(angle){
    return Math.sin(toRadians(angle, false))
};

function cos(angle){
    return Math.cos(toRadians(angle, false))
};

function tan(angle){
    result = Math.tan(toRadians(angle, false));
    if ((result >= 5443746451065123)){
        return Infinity;
    }
    else{
        return result;
    }
}

// Trigonometry Rad-Deg
let isDegreeMode = false;

function toggleAngleMode() {
    isDegreeMode = !isDegreeMode;
    updateAngleModeButton();
}

function updateAngleModeButton() {
    const angleModeButton = document.getElementById('AngleMode');
    const spans = angleModeButton.getElementsByTagName('span');

    for (const span of spans) {
        if (span.classList.contains('active')) {
            span.classList.remove('active');
            break;
        }
    }

    const activeSpan = isDegreeMode ? spans[1] : spans[0];
    activeSpan.classList.add('active');
}

function toRadians(value) {
    if (isInvActive) {
        return isDegreeMode ? (value * (180 / Math.PI)) % 360 : value;
    } else {
        return isDegreeMode ? (value * (Math.PI / 180)) % (2 * Math.PI) : value;
    }
}

// Trigonometry Inverse
let isInvActive = false;

function toggleInvMode() {
    isInvActive = !isInvActive;
    updateInvButton();
}

function updateInvButton() {
    const invButton = document.getElementById('inv');
    if (isInvActive) {
        invButton.classList.add('active');
    } else {
        invButton.classList.remove('active');
    }
}

// Trigonometry Display
function calcSin() {
    var sin = document.getElementById('display');

    if (isInvActive) {
        sin.value += 'sin^-1(';
    } else {
        sin.value += 'sin(';
    }
}

function calcCos() {
    var cos = document.getElementById('display');

    if (isInvActive) {
        cos.value += 'cos^-1(';
    } else {
        cos.value += 'cos(';
    }
}

function calcTan() {
    var tan = document.getElementById('display');

    if (isInvActive) {
        tan.value += 'tan^-1(';
    } else {
        tan.value += 'tan(';
    }
}
