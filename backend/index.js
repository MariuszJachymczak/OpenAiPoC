const { OpenAI } = require('openai');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(bodyParser.json(), cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //Allow for all origins
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
  res.send(response); // This line was missing
});

dotenv.config();

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

let promptAi = async (prompt) => {
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
    top_p: 1,
  });

  return response.choices[0];
};

async function promptImage(prompt) {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
  });

  imageUrl = response.data[0].url;
  return imageUrl;
}

// promptAi('What is JavaScript?').then((res) => {
//   console.log(res.message);
// });
promptImage('Pigs in space').then((res) => {
  console.log(res);
});
