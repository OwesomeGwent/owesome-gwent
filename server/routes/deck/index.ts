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
  const newDeck = await DeckRepo.save(saveDeck);
  const UserRepo = getUserRepo();
  try {
    const newDecks = [...user.decks, newDeck.id];
    await UserRepo.updateDeck(user.id, newDecks);
    return res.json({
      deck: newDeck,
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
router.put('/star', async (req, res) => {
  const DeckRepo = getRepo();
  const { deckId } = req.body;
  try {
    await DeckRepo.increment({ id: deckId }, 'star', 1);
    const deck = await DeckRepo.findOne(deckId);
    return res.json({
      deck,
    });
  } catch (err) {
    return res.status(503).json({
      error: 'database error',
    });
  }
});
router.get('/collection', async (req, res) => {
  const DeckRepo = getRepo();
  const {
    q = '',
    faction = '',
    leaderId = '',
    limit = 30,
    skip = 0,
  } = req.query;
  try {
    const query = DeckRepo.createQueryBuilder('deck')
      .leftJoinAndMapOne('deck.user', User, 'user', 'deck.userId = user.id')
      .take(parseInt(limit, 10))
      .skip(parseInt(skip, 10))
      .where('deck.name like :name', { name: `%${q}%` });
    if (faction) {
      query.andWhere('deck.faction = :faction', { faction });
    }
    if (leaderId) {
      query.andWhere('deck.leaderId = :leaderId', { leaderId });
    }
    query.orderBy('deck.id', 'DESC');
    const collections = await query.getMany();
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
