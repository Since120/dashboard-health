import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AIProvider {
  @Field(() => ID)
  id: string;

  @Field()
  provider: string;

  @Field({ nullable: true })
  baseUrl?: string;

  @Field()
  timeout: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}