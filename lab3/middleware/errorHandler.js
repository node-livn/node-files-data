const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Якщо помилка вже має статус (http-errors)
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }

  // Помилки валідації Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Помилка валідації',
      errors: Object.values(err.errors).map(error => error.message)
    });
  }

  // Помилка дублювання ключа
  if (err.code === 11000) {
    return res.status(409).json({
      message: 'Дублювання даних',
      field: Object.keys(err.keyPattern)[0]
    });
  }

  // Помилка автентифікації
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Недійсний токен'
    });
  }

  // Помилка терміну дії токена
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Термін дії токена минув'
    });
  }

  // За замовчуванням - внутрішня помилка сервера
  res.status(500).json({
    message: 'Внутрішня помилка сервера',
    ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
  });
};

module.exports = errorHandler; 