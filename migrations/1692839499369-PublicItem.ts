import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicItem1692839499369 implements MigrationInterface {
  private readonly logger = new Logger(PublicItem1692839499369.name);
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('PublicItem1692839499369 up');
    await queryRunner.query('UPDATE item SET public = 1');
  }

  public async down(): Promise<void> {
    this.logger.log('PublicItem1692839499369 down');
  }
}
