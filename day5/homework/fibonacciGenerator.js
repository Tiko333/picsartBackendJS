let fib = function fibonacci(n) {
    if (n <= 1) {
        return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function* fibGenerator(number) {
    let fibonacciArray = [];

    for (let i = 1; i < number; i++) {
        let result = fib(i);
        if (result < number) {
            fibonacciArray.push(result);
        } else {
            break;
        }
    }

    yield* fibonacciArray;
}


let fibGen = fibGenerator(21);
console.log(fibGen.next())
console.log(fibGen.next())
console.log(fibGen.next())
console.log(fibGen.next())
console.log(fibGen.next())
console.log(fibGen.next())

