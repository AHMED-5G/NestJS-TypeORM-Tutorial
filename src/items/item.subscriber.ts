import {
  EventSubscriber,
  EntitySubscriberInterface,
  DataSource,
  InsertEvent,
} from 'typeorm';
import { Item } from './entities/item.entity';
import { Logger } from '@nestjs/common';

//add any new Subscriber to provider at item.module.ts provider
@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Item;
  }

  beforeInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log('beforeInsert', JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Item>): void | Promise<any> {
    this.logger.log('afterInsert', JSON.stringify(event.entity));
  }
}
