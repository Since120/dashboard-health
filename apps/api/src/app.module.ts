import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AiProvidersModule } from './ai-providers/ai-providers.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true, // Enable GraphQL Playground
      introspection: true, // Allow introspection in all environments
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    AiProvidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}