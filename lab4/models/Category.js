// Клас Category з можливістю вкладених категорій та товарів
class Category {
    constructor(id, name, parentId = null, children = [], products = []) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.children = children; // підкатегорії
        this.products = products; // товари в категорії
    }
}

module.exports = Category;