// Простий клас Product для демонстрації структури даних
class Product {
    constructor(id, name, description, price, categoryId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
    }
}

module.exports = Product;
