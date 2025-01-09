const { OpenAI } = require("openai");
const { findUserByUid } = require("../models/repositories/user.repo");
const { findStudyMaterialsByKeyword } = require("../models/repositories/study_material.repo");
const { saveChat, getChatHistoryByUserId, deleteChatHistoryByUserId } = require("../models/repositories/chatHistory.repo");
const { convertToObjectIdMongodb } = require("../utils");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getContentAI = async (prompt) => {
  try {
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
    return content;
  }
  catch(error){
    return error.message;
  }
}

const suggest = async (req, res) => {
  try {

    const username = req.user.username;

    const userFound = await findUserByUid(username);

    const markOrderLow = userFound.list_mark
      .sort((a, b) => a.mark - b.mark)
    // .slice(0, 1);

    const listVid = await findStudyMaterialsByKeyword(markOrderLow[0].subjectName);

    console.log(req.user);

    const exampleResponse = [
      {
        "day": "Thứ Hai",
        "time": "10:00",
        "video_title": "",
        "url": "",
        "embed_code": ""
      },
      {
        "day": "Thứ Ba",
        "time": "14:00",
        "video_title": "",
        "url": "",
        "embed_code": ""
      },
    ];

    // const prompt = `Hãy cho tôi lịch tự học các video trong ${listVid} có cả thứ trong tuần, giờ học, hãy chỉ trả lời cho tôi ra dạng response như mẫu ${exampleResponse} để tôi có thể lấy dùng cho frontend, không trả lời thêm các từ khác`;

    // let content = await getContentAI(prompt);;

    res.status(200).json({
      message: 'Get content success',
      // data: JSON.parse(content),
      // data: content,
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
    });
  }
};

const chatWithAI = async (req, res) => {
  const message = req.body.message;
  const userId = convertToObjectIdMongodb(req.user._id);

  try {
    if (message === '') {
      return res.status(400).json({
        message: 'message can not be blank',
      });
    }

    console.log(message);

    const aiResponse = await getContentAI(message);
    const isSavedChat = await saveChat(userId, message, aiResponse);

    if(!isSavedChat){
      res.status(400).json({
        message: 'Try again',
      });
    }

    // Trả kết quả cho người dùng
    res.status(200).json({
      message: 'Chat successful',
      answer: aiResponse,
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
    });
  }
};

const getChatHistory = async (req, res) => {
  const userId = convertToObjectIdMongodb(req.user._id);

  try {
    const chatHistory = await getChatHistoryByUserId(userId);
    if (!chatHistory) {
      return res.status(404).json({
        message: "No chat history found"
      });
    }

    res.status(200).json({
      message: "Get chat history success",
      data: chatHistory,
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
    });
  }
};

const clearChatHistory = async (req, res) => {
  const userId = convertToObjectIdMongodb(req.user._id);

  try {
    await deleteChatHistoryByUserId(userId);
    res.status(200).json({
      message: 'Chat history cleared successfully',
    });
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getContentAI,
  suggest,
  chatWithAI,
  getChatHistory,
  clearChatHistory
};
