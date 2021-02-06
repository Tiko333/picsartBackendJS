function fibRec(num) {
    num = num + 1;
    let result = 0;

    function fibonacci(num) {
        if (num <= 1) {
            return 1;
        }
        return fibonacci(num - 1) + fibonacci(num - 2);
    }

    return (fibRec[Symbol.iterator] = function () {
        return {
            next: () => {
                result = fibonacci(num++);
                return {
                    value: result,
                    done: false
                };
            }
        }
    })()
}

function fib(num) {
    let current = 0;
    let fibonacci = 0;
    let previous = 0;
    return (fib[Symbol.iterator] = function () {
        return {
            next: () => {
                if (current === 0) {
                    fibonacci = num + (num - 1);
                    current = fibonacci;
                    previous = num;
                } else {
                    fibonacci = fibonacci + previous;
                    previous = current;
                    current = fibonacci;
                }
                return {
                    value: fibonacci,
                    done: false
                };
            }
        }
    })()
}