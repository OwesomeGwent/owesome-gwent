import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 20,
    unique: true,
  })
  public username: string;

  @Column()
  public password: string;

  @Column()
  public email?: string;

  @Column('simple-array')
  public decks?: string[];
}
