function* fibGenerator(number) {
    let fibonacciArray = [];

    function fibonacci(n) {
        if (n <= 1) {
            return 1;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    for (let i = 1; i < number; i++) {
        let result = fibonacci(i);
        if (result < number) {
            fibonacciArray.push(result);
        } else {
            break;
        }
    }

    yield* fibonacciArray;
}


let fib1 = fibGenerator(21);
console.log(fib1.next())
console.log(fib1.next())
console.log(fib1.next())
console.log(fib1.next())
console.log(fib1.next())
console.log(fib1.next())

