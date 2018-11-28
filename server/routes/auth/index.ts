import express from 'express';
import { getCustomRepository } from 'typeorm';
import verifyCookie from '../../middlewares/verifyCookie';
import UserRepository, { User } from '../../repositories/UserRepository';
import { IRequest } from '../../types/IAuth';
const getRepo = () => getCustomRepository(UserRepository);

const routes = express.Router();
routes.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const userRepo = getRepo();
  const user = await userRepo.findByUsername(username);
  if (user) {
    return res.status(401).json({
      success: false,
      error: 'Username is already taken',
    });
  }
  try {
    await userRepo.signup({ username, password });
    return res.json({
      username,
      success: true,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: '',
    });
  }
});

routes.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const success = (user: Partial<User>) => {
    return res.json({
      user,
      success: true,
    });
  };
  const failure = (error: string) => {
    return res.status(401).json({
      success: false,
      error,
    });
  };
  const userRepo = getRepo();
  try {
    const [token, user] = await userRepo.login(username, password);
    res.cookie('jwt_token', token, {
      maxAge: 1000 * 3600 * 24,
      httpOnly: true,
    });
    return success(user);
  } catch (err) {
    return failure(err);
  }
});

routes.get('/verify', verifyCookie, (req, res) => {
  const customReq = req as IRequest;
  const success = (user: User) => {
    const { username, email, decks } = user;
    return res.json({
      success: true,
      user: {
        username,
        email,
        decks,
      },
    });
  };
  const failure = (error: string) => {
    return res.status(401).json({
      success: false,
      error,
    });
  };
  if (customReq.user) {
    return success(customReq.user);
  }
  return failure('Cannot verify user.');
});

routes.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  return res.json({
    success: true,
  });
});
export default routes;
