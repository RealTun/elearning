const { OpenAI } = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = async (req, res, next) => {
  try {
    // example body request
    // {
    //   "prompt": "hãy khen tôi đẹp zai"
    // }
    const prompt = req.body.prompt;
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system", content: 'You are a helpful assistant.'
        },
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 1080,
      temperature: 0.8,
    });

    let content = response.choices[0].message.content;

    res.status(200).json({
      message: 'Get content success',
      data: content,
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
    });
  }
};

module.exports = {
  chatCompletion
};
