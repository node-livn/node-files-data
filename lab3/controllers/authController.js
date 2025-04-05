const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { unauthorized, conflict } = require('../utils/errors');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      throw unauthorized('Невірний логін або пароль');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: user.role });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw conflict('Користувач вже існує');
    }

    const user = new User({
      username,
      password,
      role: role || 'guest'
    });

    await user.save();
    res.status(201).json({ message: 'Користувача створено' });
  } catch (error) {
    next(error);
  }
}; 