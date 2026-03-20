//number 1
function checkVariable(input) {
  switch (typeof input) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "bigint":
      return "bigint";
    case "undefined":
      return "undefined";
    case "object":
      return "object";
    default:
      return "object";
  }
}

//number 2
function generateIDs(count) {
  const ids = [];

  for (let i = 0; i < count; i++) {
    if (i === 5) {
      continue; 
    }
    ids.push(`ID-${i}`);
  }
  return ids;
}

console.log(generateIDs(7)); 

//number 3
function calculateTotal(...numbers) {
  return numbers.reduce((total, current) => {
    if (typeof current !== "number") {
      throw new TypeError("Invalid input: All arguments must be numbers");
    }
    return total + current;
  }, 0);
}

//number4
function getTopScorers(playerList) {
    return playerList
    .filter(player => player.score > 8)
    .map(player => player.name)
    .join(", ") ;
}

const players = [
    {name: "john patrick", score: 10},
    {name: "francis", score: 5},
    {name: "jayson", score: 67}
];
console.log(getTopScorers(players));

//number 5
class Item{
    #discount = 0.1;
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    get finalPrice() {
        return this.price - (this.price * this.#discount);
    
    }
}

const item1 = new Item("mouse", 1500);
console.log(item1.finalPrice);

//number 6
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


console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));
