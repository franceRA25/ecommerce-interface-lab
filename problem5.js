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

//testing
const item1 = new Item("mouse", 1500);
console.log(item1.finalPrice);
