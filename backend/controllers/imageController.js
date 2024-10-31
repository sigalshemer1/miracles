import axios from 'axios';

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const apiResponse = await axios.post(
      'YOUR_AI_IMAGE_API_ENDPOINT',
      { prompt },
      { headers: { Authorization: `Bearer ${process.env.API_KEY}` } }
    );
    res.json(apiResponse.data);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Image generation failed." });
  }
};
