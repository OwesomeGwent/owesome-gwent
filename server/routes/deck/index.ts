import express from 'express';
import { getCustomRepository, getRepository, In } from 'typeorm';
import verifyCookie from '../../middlewares/verifyCookie';
import UserRepository from '../../repositories/UserRepository';
import { Deck } from '../../src/entity/Deck';
import { IRequest } from '../../types/IAuth';

const router = express.Router();

const getRepo = () => getRepository(Deck);
const getUserRepo = () => getCustomRepository(UserRepository);
router.get('/', verifyCookie, async (req, res) => {
  const DeckRepo = getRepo();
  const { user } = req as IRequest;
  const failure = (message: string, statusCode: number = 403) => {
    return res.status(statusCode).json({
      error: message,
    });
  };
  if (!user) {
    return failure('Cannot verify User.');
  }
  if (!user.decks.length) {
    return res.json({
      decks: [],
    });
  }
  try {
    const decks = await DeckRepo.find({ where: { id: In(user.decks) } });
    return res.json({
      decks,
    });
  } catch (err) {
    console.log(err);
    failure('Cannot get decks.', 503);
  }
});
router.post('/', verifyCookie, async (req, res) => {
  const DeckRepo = getRepo();
  const { user } = req as IRequest;
  const failure = (message: string, statusCode: number = 403) => {
    return res.status(statusCode).json({
      error: message,
    });
  };
  if (!user) {
    return failure('Cannot verify user.');
  }
  const {
    deck: { name, url },
  } = req.body;
  console.log(name, url);
  const deck = new Deck();
  deck.name = name;
  deck.url = url;
  const { id: deckId } = await DeckRepo.save(deck);
  const UserRepo = getUserRepo();
  try {
    const newDecks = [...user.decks, deckId];
    await UserRepo.updateDeck(user.id, newDecks);
    return res.json({
      decks: newDecks,
    });
  } catch (err) {
    return failure('Cannot save deck.', 503);
  }
});

export default router;
