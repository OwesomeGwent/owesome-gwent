import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  public userId: number;

  public user: Pick<User, 'id' | 'username' | 'decks' | 'email'>;
}
