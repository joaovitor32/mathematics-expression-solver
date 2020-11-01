let invalidOperatorPairs = [
    "**",
    "*/",
    "/*",
    "//",
    "()",
    "^^",
    "^/",
    "/^",
    "^*",
    "*^",
    "-)",
    "+)",
    "*)",
    "/*",
    "^)",
    "-*",
    "-/",
    "-^",
    "+*",
    "+/",
    "+^",
    "(*",
    "(/",
    "(^",
    "/)",
    "*)",
    "+)",
    "-)",
    "^)",
]

let exceptions = [
    "++",
    "--",
    "+-",
    "-+",
]

const getUnaryOperator = (previous, current) => {
    
    if (previous == current) {
        return "+";
    }else{
        return "-";
    }

}

//Check Invalid terms
const checkInvalidTerms = (str, index) => {
    invalidOperatorPairs.forEach((elem, j) => {
        if (
            (str[index - 1] == invalidOperatorPairs[j][0] &&
                str[index] == invalidOperatorPairs[j][1]) &&
            (
                (!isNaN(str[index - 1]) && !isNaN(str[index])) ||
                (!isNaN(str[index]) && !isNaN(str[index + 1]))
            )
        ) {
            throw new Error("Operador inválido sendo utilizado");
        }
    })
}

const checkExceptions = (str, index) => {

    //Vai ter que ser em relação ao str
    //Usar While <- Ideia boa

    exceptions.forEach((elem, s) => {
       
        while (
            (str[index - 1] == exceptions[s][0] && str[index] == exceptions[s][1])&&
            (exceptions[s][0]!=undefined && exceptions[s][1]!=undefined)
        ) {

            let arrayStr = str.split("");

            arrayStr[index] = getUnaryOperator(arrayStr[index - 1], arrayStr[index]);

            arrayStr = arrayStr.filter((_, i) => i != (index - 1));

            str = arrayStr.join("");
           
        }
    })

    return str;
}

const CheckMathExpression = (str) => {

    let open = 0;

    let sections = str.split(/[\+\-\*\/\^\)\(]/g);

    sections.forEach(elem => {

        if (
            (elem.length > 0) &&
            !(Number(elem) !== NaN) &&
            isFinite(elem)
        ) {
            throw new Error('Erro não detectado');
        }

    });

    Object.values(str).forEach((element, index) => {
        
        let current = element;

        if (current == "(") {
            open++;
        } else if (current == ")") {
            open--;
        }

        if (index > str.length && open !== 0) {
            throw new Error("Parênteses inválidos")
        }

        if (index > 0) {
            checkInvalidTerms(str, index);
            str = checkExceptions(str, index);
        }

    });

    return str;

}

export default CheckMathExpression;