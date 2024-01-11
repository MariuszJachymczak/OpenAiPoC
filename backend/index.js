const { OpenAI } = require("openai");
const dotenv = require("dotenv");
dotenv.config();

const configuration = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);

let promptAi = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant.But you are drunk. Your ansers may be a bit off.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
    top_p: 1,
  });
  return response.choices[0];
};

promptAi("What is JavaScript?").then((res) => {
  console.log(res.message);
});
