const userRouters = require('express').Router();
const {
  getUsers, getUserById, changeUser, getUserMe, changeAvatar,
} = require('../controllers/users');
const {
  validateUserId,
  validateChangeUser,
  validateChangeAvatar,
} = require('../middlewares/validate');

// Роуты пользователя
userRouters.get('/', getUsers);
userRouters.get('/me', getUserMe);
userRouters.get('/:userId', validateUserId, getUserById);
userRouters.patch('/me', validateChangeUser, changeUser);
userRouters.patch('/me/avatar', validateChangeAvatar, changeAvatar);

module.exports = userRouters;
