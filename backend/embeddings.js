import 'dotenv/config';
import {
  loadAndSplitChunks,
  initializeVectorstoreWithDocuments,
} from './libs/helpers.js';
import { createRephraseQuestionChain } from './libs/helpers.js';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { RunnableWithMessageHistory } from '@langchain/core/runnables';
import { ChatMessageHistory } from 'langchain/stores/message/in_memory';
// import { HttpResponseOutputParser } from 'langchain/output_parsers';

export default async function GeneratePDFAnswerBasedOnPrompt(prompt) {
  const splitDocs = await loadAndSplitChunks({
    chunkSize: 1536,
    chunkOverlap: 128,
  });

  const vectorstore = await initializeVectorstoreWithDocuments({
    documents: splitDocs,
  });

  const retriever = vectorstore.asRetriever();

  function createDocumentRetrievalChain() {
    const convertDocsToString = (documents) => {
      return documents
        .map((document) => `<doc>\n${document.pageContent}\n</doc>`)
        .join('\n');
    };

    const documentRetrievalChain = RunnableSequence.from([
      (input) => input.standalone_question,
      retriever,
      convertDocsToString,
    ]);

    return documentRetrievalChain;
  }

  const documentRetrievalChain = createDocumentRetrievalChain();
  const rephraseQuestionChain = createRephraseQuestionChain();

  const ANSWER_CHAIN_SYSTEM_TEMPLATE = `You are an experienced researcher,
expert at interpreting and answering questions based on provided sources.
Using the below provided context and chat history,
answer the user's question to the best of your ability
using only the resources provided. Be verbose! Your answers will always be in Polish.

<context>
{context}
</context>`;

  const answerGenerationChainPrompt = ChatPromptTemplate.fromMessages([
    ['system', ANSWER_CHAIN_SYSTEM_TEMPLATE],
    new MessagesPlaceholder('history'),
    [
      'human',
      `Now, answer this question using the previous context and chat history:

    {standalone_question}`,
    ],
  ]);
  const conversationalRetrievalChain = RunnableSequence.from([
    RunnablePassthrough.assign({
      standalone_question: rephraseQuestionChain,
    }),
    RunnablePassthrough.assign({
      context: documentRetrievalChain,
    }),
    answerGenerationChainPrompt,
    new ChatOpenAI({ modelName: 'gpt-3.5-turbo-1106' }),
  ]);
  // const httpResponseOutputParser = new HttpResponseOutputParser({
  //   contentType: 'text/plain',
  // });

  const messageHistory = new ChatMessageHistory();

  // const getMessageHistoryForSession = (sessionId) => {
  //   // if (messageHistories[sessionId] !== undefined) {
  //   //   return messageHistories[sessionId];
  //   // }
  //   const newChatSessionHistory = new ChatMessageHistory();
  //   messageHistories[sessionId] = newChatSessionHistory;
  //   return newChatSessionHistory;
  // };
  const finalRetrievalChain = new RunnableWithMessageHistory({
    runnable: conversationalRetrievalChain,
    getMessageHistory: (_sessionId) => messageHistory,
    historyMessagesKey: 'history',
    inputMessagesKey: 'question',
  });

  const originalAnswer = await finalRetrievalChain.invoke(
    {
      question: prompt,
    },
    {
      configurable: { sessionId: 'test' },
    },
  );

  const answer = originalAnswer.content;
  return answer;
}
