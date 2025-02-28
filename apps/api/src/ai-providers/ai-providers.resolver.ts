import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AiProvidersService } from './ai-providers.service';
import { AIProvider } from './models/ai-provider.model';
import { CreateAIProviderInput } from './dto/create-ai-provider.input';
import { OpenAIService } from './openai.service';

@Resolver(() => AIProvider)
export class AiProvidersResolver {
  private readonly logger = new Logger(AiProvidersResolver.name);
  
  constructor(
    private readonly aiProvidersService: AiProvidersService,
    private readonly openaiService: OpenAIService,
  ) {}

  @Mutation(() => AIProvider)
  async createOrUpdateAIProvider(
    @Args('input') createAIProviderInput: CreateAIProviderInput,
  ) {
    this.logger.log(`Speichere API-Key für Provider: ${createAIProviderInput.provider}`);
    const result = await this.aiProvidersService.createOrUpdateProvider(createAIProviderInput);
    
    // Wenn es sich um OpenAI handelt, testen wir die Verbindung
    if (createAIProviderInput.provider === 'openai') {
      try {
        const testResult = await this.openaiService.testConnection();
        if (testResult) {
          this.logger.log('OpenAI API-Key erfolgreich validiert');
        } else {
          this.logger.warn('OpenAI API-Key konnte nicht validiert werden');
        }
      } catch (error) {
        this.logger.error('Fehler bei der Validierung des OpenAI API-Keys:', error);
      }
    }
    
    this.logger.log(`API-Key für Provider: ${createAIProviderInput.provider} erfolgreich gespeichert`);
    return result;
  }

  @Query(() => AIProvider, { nullable: true })
  async getAIProvider(@Args('provider') provider: string) {
    return this.aiProvidersService.getProvider(provider);
  }

  @Query(() => [AIProvider])
  async getAllAIProviders() {
    return this.aiProvidersService.getAllProviders();
  }

  @Query(() => Boolean)
  async testOpenAIConnection() {
    try {
      return await this.openaiService.testConnection();
    } catch (error) {
      this.logger.error('Fehler beim Testen der OpenAI-Verbindung:', error);
      return false;
    }
  }
}