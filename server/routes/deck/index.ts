import express from 'express';
import { getCustomRepository, getRepository, In } from 'typeorm';
import verifyCookie from '../../middlewares/verifyCookie';
import UserRepository, { User } from '../../repositories/UserRepository';
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
  const { deck } = req.body;
  let saveDeck = new Deck();
  saveDeck = {
    ...saveDeck,
    ...deck,
    userId: user.id,
  };
  const { id: deckId } = await DeckRepo.save(saveDeck);
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
router.put('/', async (req, res) => {
  const DeckRepo = getRepo();
  const { deck } = req.body;
  try {
    const newDeck = await DeckRepo.update(deck.id, deck);
    return res.json({
      deck: newDeck,
    });
  } catch (err) {
    return res.status(503).json({
      error: 'Database Error',
    });
  }
});
router.get('/collections', async (req, res) => {
  const DeckRepo = getRepo();
  const { limit = 10, skip = 10 } = req.query;
  try {
    const collections = await DeckRepo.createQueryBuilder('deck')
      .leftJoinAndMapOne('deck.user', User, 'user', 'deck.userId = user.id')
      .take(parseInt(limit, 10))
      .skip(parseInt(skip, 10))
      .getMany();
    return res.json({
      deck: collections,
    });
  } catch (err) {
    return res.status(503).json({
      error: 'Database Error',
    });
  }
});
export default router;
