import * as dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { createOpenAIFunctionsAgent, AgentExecutor } from 'langchain/agents';
import { TavilySearchResults } from '@langchain/community/tools/tavily_search';
import { createRetrieverTool } from 'langchain/tools/retriever';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';

dotenv.config();

const loader = new CheerioWebBaseLoader(
  'https://js.langchain.com/docs/get_started/introduction',
);
const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 20,
});

const splitDocs = await splitter.splitDocuments(docs);

const embeddings = new OpenAIEmbeddings();

const vectorStore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  embeddings,
);

const retriever = vectorStore.asRetriever({
  k: 2,
});

const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
  temperature: 0.2,
});

const prompt = ChatPromptTemplate.fromMessages([
  ('system', 'You are a helpful assistant.'),
  new MessagesPlaceholder('chat_history'),
  ('human', '{input}'),
  new MessagesPlaceholder('agent_scratchpad'),
]);

const searchTool = new TavilySearchResults();
const retrieverTool = createRetrieverTool(retriever, {
  name: 'lcel_search',
  description: 'Use this tool when searching for information on the webpage.',
});

const tools = [searchTool, retrieverTool];

const agent = await createOpenAIFunctionsAgent({
  llm: model,
  prompt,
  tools,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
});

const chat_history = [];

export default async function PromptScrapper(prompt) {
  const response = await agentExecutor.invoke({
    input: prompt,
    chat_history: chat_history,
  });

  chat_history.push(new HumanMessage(prompt));
  chat_history.push(new AIMessage(response.output));
  return response.output;
}
