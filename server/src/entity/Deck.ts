import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
