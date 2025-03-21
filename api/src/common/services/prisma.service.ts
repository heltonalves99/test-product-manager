import {
  INestApplication,
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma connected');
    } catch (error) {
      console.error('Error connecting to Prisma:', error);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('Prisma disconnected');
    } catch (error) {
      console.error('Error disconnecting from Prisma:', error);
    }
  }

  enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', () => {
      console.log('Closing app due to beforeExit signal');
      app.close().catch((error) => {
        console.error('Error closing app:', error);
      });
    });
  }
}
