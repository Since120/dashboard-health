import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAIProviderInput } from './dto/create-ai-provider.input';

@Injectable()
export class AiProvidersService {
  private readonly logger = new Logger(AiProvidersService.name);
  
  constructor(private prisma: PrismaService) {}

  async createOrUpdateProvider(createAIProviderInput: CreateAIProviderInput) {
    const { provider, apiKey, baseUrl, timeout } = createAIProviderInput;

    try {
      // Prüfen, ob der Provider bereits existiert
      const existingProvider = await this.prisma.aIProviderKey.findUnique({
        where: { provider },
      });

      if (existingProvider) {
        // Provider aktualisieren
        this.logger.log(`Aktualisiere API-Key für Provider: ${provider}`);
        return this.prisma.aIProviderKey.update({
          where: { id: existingProvider.id },
          data: {
            apiKey,
            baseUrl,
            timeout: timeout || 30000,
          },
        });
      } else {
        // Neuen Provider erstellen
        this.logger.log(`Erstelle neuen API-Key für Provider: ${provider}`);
        return this.prisma.aIProviderKey.create({
          data: {
            provider,
            apiKey,
            baseUrl,
            timeout: timeout || 30000,
          },
        });
      }
    } catch (error) {
      this.logger.error(`Fehler beim Speichern des API-Keys für Provider ${provider}:`, error);
      throw error;
    }
  }

  async getProvider(provider: string) {
    try {
      return this.prisma.aIProviderKey.findUnique({
        where: { provider },
      });
    } catch (error) {
      this.logger.error(`Fehler beim Abrufen des API-Keys für Provider ${provider}:`, error);
      throw error;
    }
  }

  async getAllProviders() {
    try {
      return this.prisma.aIProviderKey.findMany();
    } catch (error) {
      this.logger.error('Fehler beim Abrufen aller API-Keys:', error);
      throw error;
    }
  }
}