import {
  Entity,
  OneToMany,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Listing } from './listing.entity';

import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class Item extends AbstractEntity<Item> {
  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  // when u add new entity don't forget to add @Entity() at items.module.ts
  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
