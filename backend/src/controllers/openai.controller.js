const { OpenAI } = require("openai");
const { findUserByUid } = require("../models/repositories/user.repo");
const { findStudyMaterialsByKeyword } = require("../models/repositories/study_material.repo");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = async (req, res) => {
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

const suggest = async (req, res) => {
  try {

    const username = req.user.username;

    const userFound = await findUserByUid(username);

    const markLowTop1 = userFound.list_mark
                        .sort((a, b) => a.mark - b.mark)
                        .slice(0, 1);

    const listVid = await findStudyMaterialsByKeyword(markLowTop1[0].subjectName);

    // const prompt = "";
    // const response = await openai.chat.completions.create({
    //   messages: [
    //     {
    //       role: "system", content: 'You are a helpful assistant.'
    //     },
    //     { role: "user", content: prompt }
    //   ],
    //   model: "gpt-3.5-turbo",
    //   max_tokens: 1080,
    //   temperature: 0.8,
    // });

    // let content = response.choices[0].message.content;

    res.status(200).json({
      message: 'Get content success',
      data: listVid,
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
    });
  }
};

module.exports = {
  chatCompletion,
  suggest
};
