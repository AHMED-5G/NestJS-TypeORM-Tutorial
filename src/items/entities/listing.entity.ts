import { AbstractEntity } from '../../../src/database/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Listing extends AbstractEntity<Listing> {
  @Column({ default: '' })
  description: string;

  @Column()
  rating: number;
}
