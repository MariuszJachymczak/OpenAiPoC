import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';


export async function loadAndSplitChunks({
  chunkSize,
  chunkOverlap
} ) {
  const loader = new PDFLoader('./data/MachineLearning-Lecture01.pdf');
  const rawCS229Docs = await loader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
  });

  const splitDocs = await splitter.splitDocuments(rawCS229Docs);
  return splitDocs;
}

export async function initializeVectorstoreWithDocuments ({
  documents}) {
  const embeddings = new OpenAIEmbeddings();
  const vectorstore = new MemoryVectorStore(embeddings);
  await vectorstore.addDocuments(documents);
  return vectorstore;
}