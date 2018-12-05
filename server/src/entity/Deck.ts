import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IDeckCost } from '../../../shared/IDeck';
import { User } from './User';
@Entity()
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    length: 20,
  })
  public name: string;

  @Column()
  public url: string;

  @Column()
  public leaderId: string;

  @Column()
  public faction: string;

  @Column('simple-array', { default: '' })
  public starIds: string[];

  @Column()
  public userId: number;

  @Column()
  public star: number; // client에서 타입 처리용

  public user: Pick<User, 'id' | 'username' | 'decks' | 'email'>;
}
