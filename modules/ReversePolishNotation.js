const OperatorsList = {
  ['+']: [(a, b) => { return `soma(${a},${b})` }, { args: 2 }],
  ['!']: [(a) => { return `fatorial(${a})` }, { args: 1 }],
  ['*']: [(a, b) => { return `mult(${a},${b})` }, { args: 2 }],
  ['^']: [(a, b) => { return `expo(${a},${b})` }, { args: 2 }],
  ['-']: [(a, b) => { return `subt(${a},${b})` }, { args: 2 }],
  ['/']: [(a, b) => { return `divi(${a},${b})` }, { args: 2 }],
  ['>']: [(a, b) => { return `maior(${a},${b})` }, { args: 2 }],
  ['<']: [(a, b) => { return `menor(${a},${b})` }, { args: 2 }],
  ['%']: [(a, b) => { return `resto(${a},${b})` }, { args: 2 }],
  ['s']: [(a) => { return `TrocaSinal(${a})` }, { args: 1 }],
};

const ReverPolishNotation = (postfix) => {
  
  let expr = postfix.split(" ");

  let stack = [];

  if (expr.length === 0) {
    return 0;
  }

  expr.forEach((elem, index) => {

    if (!isNaN(elem) && isFinite(elem)) {

      stack.push(elem);

    } else {

      //Dado o conceito de pilha se a operação for unária 
      // a sempre vai ser a váriavel com valor e b indefinido
      let a = stack.pop();

      if (OperatorsList[elem][1].args == 2) {
       
        let b = stack.pop();
        stack.push(OperatorsList[elem][0](a, b));
      
      } else {
      
        stack.push(OperatorsList[elem][0](a));
      
      }
    
    }

  });

  if (stack.length > 1) {
    return "ERROR";
  } else {
    return stack[0];
  }

}

export default ReverPolishNotation;