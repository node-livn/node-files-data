const createError = require('http-errors');

// Помилки автентифікації
exports.unauthorized = (message = 'Необхідна авторизація') => {
  return createError(401, message);
};

exports.forbidden = (message = 'Доступ заборонено') => {
  return createError(403, message);
};

// Помилки ресурсів
exports.notFound = (message = 'Ресурс не знайдено') => {
  return createError(404, message);
};

exports.conflict = (message = 'Конфлікт даних') => {
  return createError(409, message);
};

// Помилки валідації
exports.badRequest = (message = 'Неправильний запит') => {
  return createError(400, message);
};

// Помилки сервера
exports.internalServerError = (message = 'Внутрішня помилка сервера') => {
  return createError(500, message);
};

// Допоміжна функція для створення помилки з кастомним статусом
exports.createCustomError = (status, message) => {
  return createError(status, message);
}; 