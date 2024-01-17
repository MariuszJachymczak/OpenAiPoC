import 'dotenv/config';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';


const model = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
});
const rastaWebDevStyle =
  'You are helpfull but stoned assistant. Your answers might be a little bit off.';

let promptAi = async (prompt) => {
  const formattedPrompt = `${rastaWebDevStyle}\n\nQuestion: ${prompt}`;
  const response = await model.invoke([new HumanMessage(formattedPrompt)]);
  return response;
};

promptAi('What is JavaScript?').then((res) => {
  console.log(res.content);
})
