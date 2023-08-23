import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  // when u add new entity don't forget to add @Entity() at items.module.ts
  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
}
