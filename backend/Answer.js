import * as dotenv from 'dotenv';
import { OpenAI } from '@langchain/openai';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';

dotenv.config();

const chatPrompt = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(
    'The following is a friendly conversation between a human and an AI.',
  ),
  new MessagesPlaceholder('history'),
  HumanMessagePromptTemplate.fromTemplate('{input}'),
]);

const model = new OpenAI({});
const chain = new ConversationChain({
  memory: new BufferMemory({
    returnMessages: true,
    memoryKey: 'history',
  }),
  prompt: chatPrompt,
  llm: model,
});

export default async function GenerateAnswerBasedOnPrompt(prompt) {
  try {
    const response = await chain.call({ input: prompt });
    return response.response;
  } catch (error) {
    console.error('Error processing the conversation:', error);
    throw error;
  }
}
