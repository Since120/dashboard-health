import { Module } from '@nestjs/common';
import { AiProvidersService } from './ai-providers.service';
import { AiProvidersResolver } from './ai-providers.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { OpenAIService } from './openai.service';

@Module({
  imports: [PrismaModule],
  providers: [AiProvidersResolver, AiProvidersService, OpenAIService],
  exports: [AiProvidersService, OpenAIService],
})
export class AiProvidersModule {}