import 'web-streams-polyfill/dist/polyfill.es6.js';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import GeneratePDFAnswerBasedOnPrompt from './embeddings.js';
import GenerateAnswerBasedOnPrompt from './Answer.js';

const app = express();

dotenv.config();

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

app.use(bodyParser.json(), cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});

app.post('/gpt', async (req, res) => {
  let prompt = req.body.prompt;
  let response = await promptAi(prompt);
  res.send(response);
});

app.post('/dalle', async (req, res) => {
  let prompt = req.body.prompt;
  let response = await promptImage(prompt);
  res.send(response);
});

app.post('/embeddings', async (req, res) => {
  let prompt = req.body.prompt;
  let response = await GeneratePDFAnswerBasedOnPrompt(prompt);
  res.send(response);
});

app.post('/langchain', async (req, res) => {
  let prompt = req.body.prompt;
  let response = await GenerateAnswerBasedOnPrompt(prompt);
  res.send(response);
});

async function promptAi(prompt) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant.But you are drunk. Your ansers may be a bit off.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
    frequency_penalty: 0.5,
  });

  return response.choices[0];
}

async function promptImage(prompt) {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
  });

  let imageUrl = response.data[0].url;
  return imageUrl;
}
