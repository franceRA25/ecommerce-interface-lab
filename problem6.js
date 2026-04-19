function safeDivide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    } catch (error) {
        return error.message;
    } finally {
        console.log("Operation Attempted");
    }
}

//testing
console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));
