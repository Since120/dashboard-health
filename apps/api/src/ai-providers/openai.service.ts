import { Injectable, Logger } from '@nestjs/common';
import { AiProvidersService } from './ai-providers.service';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private openai: OpenAI | null = null;
  
  constructor(private aiProvidersService: AiProvidersService) {}
  
  async getOpenAIClient(): Promise<OpenAI> {
    if (this.openai) return this.openai;
    
    const providerData = await this.aiProvidersService.getProvider('openai');
    
    if (!providerData || !providerData.apiKey) {
      this.logger.error('OpenAI API-Key nicht in der Datenbank gefunden');
      throw new Error('OpenAI API-Key nicht konfiguriert');
    }
    
    this.openai = new OpenAI({
      apiKey: providerData.apiKey,
      baseURL: providerData.baseUrl || undefined,
      timeout: providerData.timeout || 30000,
    });
    
    this.logger.log('OpenAI-Client erfolgreich initialisiert');
    return this.openai;
  }
  
  async testConnection(): Promise<boolean> {
    try {
      const client = await this.getOpenAIClient();
      const models = await client.models.list();
      this.logger.log(`OpenAI-Verbindungstest erfolgreich, verfügbare Modelle: ${
        models.data.map(model => model.id).join(', ')
      }`);
      return true;
    } catch (error) {
      this.logger.error('OpenAI-Verbindungstest fehlgeschlagen:', error);
      return false;
    }
  }
}