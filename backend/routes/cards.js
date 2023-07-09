const cardRouters = require('express').Router();

const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCreateCard,
  validateCardId,
} = require('../middlewares/validate');

// Роуты карточек
cardRouters.get('/', getCards);
cardRouters.delete('/:cardId', validateCardId, deleteCardById);
cardRouters.post('/', validateCreateCard, createCard);
cardRouters.put('/:cardId/likes', validateCardId, likeCard);
cardRouters.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouters;
