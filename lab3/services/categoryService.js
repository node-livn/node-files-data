const categoryRepository = require('../repositories/categoryRepository');
const productRepository = require('../repositories/productRepository');

exports.getAllCategories = async () => {
    // Використання Promise
    return await categoryRepository.loadCategoriesAsync();
};

// Отримання всіх товарів з усіх категорій
exports.getAllProducts = async () => {
    const categories = await categoryRepository.loadCategoriesAsync();
    const allProducts = [];
    
    // Рекурсивна функція для отримання всіх товарів з категорій та підкатегорій
    const extractProducts = (category) => {
        // Додати товари з поточної категорії
        if (category.products && category.products.length > 0) {
            allProducts.push(...category.products.map(product => ({
                ...product,
                categoryId: category.id,
                categoryName: category.name
            })));
        }
        
        // Перевірити підкатегорії
        if (category.children && category.children.length > 0) {
            category.children.forEach(child => extractProducts(child));
        }
    };
    
    // Обробити всі кореневі категорії
    categories.forEach(category => extractProducts(category));
    
    return allProducts;
};

// Отримання категорії за ID
exports.getCategoryById = async (id) => {
    const categories = await categoryRepository.loadCategoriesAsync();
    const products = await productRepository.loadProductsAsync();
    const targetId = parseInt(id);

    // Рекурсивна функція для пошуку категорії
    function findCategory(categories) {
        for (const category of categories) {
            if (category.id === targetId) {
                return category;
            }

            if (category.children && category.children.length > 0) {
                const found = findCategory(category.children);
                if (found) return found;
            }
        }
        return null;
    }

    const category = findCategory(categories);
    if (!category) return null;

    // Рекурсивна функція для збору товарів з категорії та підкатегорій
    function collectProducts(category) {
        let collectedProducts = products.filter((product) => product.categoryId === category.id);

        if (category.children && category.children.length > 0) {
            for (const child of category.children) {
                collectedProducts = collectedProducts.concat(collectProducts(child));
            }
        }

        return collectedProducts;
    }

    // Додати товари до категорії
    category.products = collectProducts(category);

    return category;
};
