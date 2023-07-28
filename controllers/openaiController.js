const openai = require('../config/openaiConfig');

const generateMeta = async (req, res) => {
  const { title } = req.body;
  try {
    const description = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Come up with a description for YouTube video called ${title}`,
        },
      ],
      max_tokens: 100,
    });

    const tags = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Come up with 20 keywords for a YouTube video called ${title}`,
        },
      ],
      max_tokens: 100,
    });

    console.log(tags.data.choices[0].message);

    res.status(200).json({
      description: description.data.choices[0].message,
      tags: tags.data.choices[0].message,
    });
  } catch (error) {
    // do some logging here
    console.log('Something went wrong here');
  }
};

const generateImage = async (req, res) => {
  const { imageDescription } = req.body;

  try {
    const image = await openai.createImage({
      prompt: imageDescription,
      n: 1,
      size: '512x512',
    });

    console.log(image.data.data[0].url);
    res.status(200).json({
      image: image.data.data[0].url,
    });
  } catch (error) {
    // do some logging here
    console.log('Something went wrong');
  }
};

module.exports = {
  generateMeta,
  generateImage,
};
