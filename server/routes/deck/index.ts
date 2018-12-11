import express from 'express';
import { getCustomRepository, getRepository, In } from 'typeorm';
import verifyCookie from '../../middlewares/verifyCookie';
import UserRepository, { User } from '../../repositories/UserRepository';
import { Deck } from '../../src/entity/Deck';
import { IRequest } from '../../types/IAuth';

const router = express.Router();

const getRepo = () => getRepository(Deck);
const getUserRepo = () => getCustomRepository(UserRepository);
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
    let newDeck = new Deck();
    newDeck = {
      ...newDeck,
      ...deck,
    };
    await DeckRepo.save(deck); // last update 올리기 위해 save로 줌.
    return res.json();
  } catch (err) {
    return res.status(503).json({
      error: 'Database Error',
    });
  }
});
router.delete('/:deckId', verifyCookie, async (req, res) => {
  const { user } = req as IRequest;
  const success = () =>
    res.json({
      success: true,
    });
  const failure = (message: string, statusCode: number = 403) => {
    return res.status(statusCode).json({
      error: message,
    });
  };
  if (!user) {
    return failure('Fail to verify user. Please login.');
  }
  const { deckId } = req.params;
  const { decks } = user;
  const updatedDecks = decks.filter(id => id !== deckId);
  if (updatedDecks.length === decks.length) {
    return failure('Can not find matched deck in your deck list.');
  }
  const DeckRepo = getRepo();
  const UserRepo = getUserRepo();
  // TODO: Add releation
  try {
    await DeckRepo.createQueryBuilder()
      .delete()
      .where('id = :deckId', { deckId })
      .execute();
    await UserRepo.createQueryBuilder()
      .update()
      .where('id = :userId', { userId: user.id })
      .set({ decks: updatedDecks });
    return success();
  } catch {
    return failure('Fail to delete deck. Try again.');
  }
});
router.get('/view/:deckId', async (req, res) => {
  const DeckRepo = getRepo();
  const { deckId } = req.params;
  try {
    const deck = await DeckRepo.createQueryBuilder('deck')
      .leftJoinAndMapOne('deck.user', User, 'user', 'deck.userId = user.id')
      .where('deck.id = :deckId', { deckId })
      .getOne();
    return res.json({
      deck,
    });
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      error: 'Cannot get a matched deck.',
    });
  }
});
router.get('/list', verifyCookie, async (req, res) => {
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
router.put('/star', verifyCookie, async (req, res) => {
  const DeckRepo = getRepo();
  const { user } = req as IRequest;
  const failure = (message: string, statusCode: number = 403) => {
    return res.status(statusCode).json({
      error: message,
    });
  };
  if (!user) {
    return failure('Please Login before star.');
  }
  const { deckId } = req.body;
  const strId = user.id.toString();
  try {
    const deck = await DeckRepo.findOne(deckId);
    if (!deck) {
      return failure('Cannot find matched deck.');
    }
    if (deck.starIds.some(id => id === strId)) {
      return failure(`You have already starred!`);
    }
    const newStars = [...deck.starIds, strId];
    await DeckRepo.update(deckId, {
      starIds: newStars,
      star: newStars.length,
    });
    return res.json({
      star: newStars.length,
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
    order = 'latest',
  } = req.query;
  try {
    const query = DeckRepo.createQueryBuilder('deck')
      .leftJoinAndMapOne('deck.user', User, 'user', 'deck.userId = user.id')
      .take(parseInt(limit, 10))
      .skip(parseInt(skip, 10))
      .where('deck.completed = :completed', { completed: true })
      .andWhere('deck.name like :name', { name: `%${q}%` });
    if (faction) {
      query.andWhere('deck.faction = :faction', { faction });
    }
    if (leaderId) {
      query.andWhere('deck.leaderId = :leaderId', { leaderId });
    }
    if (order === 'latest') {
      query.orderBy('deck.created', 'DESC');
    } else if (order === 'star') {
      query.orderBy('deck.star', 'DESC');
    }
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
