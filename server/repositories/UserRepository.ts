import { EntityRepository, Repository } from 'typeorm';
import { decrypt, encrypt, jwtSign } from '../helpers/auth';
import { User } from '../src/entity/User';

export { User };

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public signup(user: Partial<User>) {
    if (!user.username || !user.password) {
      throw new Error('잘못된 아이디 혹은 비밀번호.');
    }
    return this.insert({
      ...user,
      password: encrypt(user.password),
    });
  }
  public async login(username: string, password: string) {
    const user = await this.findOne({ username });
    if (!user) {
      throw new Error('잘못된 아이디 혹은 비밀번호.');
    }
    if (decrypt(user.password) === password) {
      const token = await jwtSign({ username });
      return [token, { ...user, password: undefined }];
    }
    throw new Error('잘못된 아이디 혹은 비밀번호.');
  }
  public findByUsername(username?: string) {
    return this.findOne({ username });
  }
  public updateDeck(userId: number, deckIds: string[]) {
    return this.update(userId, { decks: deckIds });
  }
}
