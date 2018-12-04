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

  @Column({ default: 0 })
  public star: number;

  @Column()
  public userId: number;

  public user: Pick<User, 'id' | 'username' | 'decks' | 'email'>;
}
