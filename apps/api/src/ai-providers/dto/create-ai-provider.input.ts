import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAIProviderInput {
  @Field()
  provider: string;

  @Field()
  apiKey: string;

  @Field({ nullable: true })
  baseUrl?: string;

  @Field(() => Int, { nullable: true, defaultValue: 30000 })
  timeout?: number;
}