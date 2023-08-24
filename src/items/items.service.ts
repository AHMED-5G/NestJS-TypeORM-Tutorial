import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({ ...createItemDto.listing });

    const tags = createItemDto.tags.map(
      (createTagDto) => new Tag(createTagDto),
    );
    const item = new Item({
      ...createItemDto,
      listing,
      comments: [],
      tags,
    });
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: Item['id']) {
    return this.itemsRepository.findOne({
      where: {
        id,
      },
      relations: { listing: true, comments: true, tags: true },
    });
  }

  async update(id: Item['id'], updateItemDto: UpdateItemDto) {
    // const item = await this.itemsRepository.findOneBy({ id });
    // item.public = updateItemDto.public;
    // const comments = updateItemDto.comments.map(
    //   (createCommentDto) => new Comment(createCommentDto),
    // );
    // item.comments = comments;
    // await this.itemsRepository.save(item);

    // build transaction for update
    await this.entityManager.transaction(async (entityManager) => {
      const item = await entityManager.findOne(Item, {
        where: {
          id,
        },
      });
      item.public = updateItemDto.public;
      const comments = updateItemDto.comments.map(
        (createCommentDto) => new Comment(createCommentDto),
      );
      item.comments = comments;
      await entityManager.save(item);

      //fire error to check if save item process will rollback

      // throw new Error('test');
      // const tagContent = 'test;
      // const tag = new Tag({ content: tagContent });
      // await entityManager.save(tag);
    });
  }

  async remove(id: Item['id']) {
    await this.itemsRepository.delete(id);
  }
}
