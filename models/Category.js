// Клас Category з можливістю вкладених категорій або товарів
class Category {
    constructor(id, name, parentId = null, children = []) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.children = children; // може містити як підкатегорії, так і товари
    }
}

module.exports = Category;
