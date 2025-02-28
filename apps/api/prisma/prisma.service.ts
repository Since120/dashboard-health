import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma-Verbindung zur Datenbank hergestellt');
    } catch (error) {
      this.logger.error('Fehler beim Verbinden mit der Datenbank:', error);
      throw error;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    // Da Prisma.PrismaClientEvent nicht verfügbar ist, verwenden wir einen Typ-Cast,
    // um den TypeScript-Compiler zu umgehen
    // @ts-ignore - Ignorieren Sie das TypeScript-Problem, damit der Code kompiliert
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}