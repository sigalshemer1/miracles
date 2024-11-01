import axios from 'axios';

const MAX_RETRIES = 5; // Maximum number of retry attempts
const RETRY_DELAY = 10000; // Delay between retries in milliseconds (e.g., 10 seconds)

export const generateImage = async (req, res) => {
  const { prompt } = req.body;  // Extract prompt from request body
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." }); // Check for prompt
  }

  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      const apiResponse = await axios.post(
        'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4',
        {
          inputs: prompt,
          options: { wait_for_model: true }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`, // Authorization header
            'Content-Type': 'application/json',
            'Accept': 'application/json' // Accept JSON response
          },
          responseType: 'arraybuffer', // Accept binary response
        }
      );

      // Convert binary data to base64
      const imageBase64 = Buffer.from(apiResponse.data, 'binary').toString('base64');
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`; // Set proper MIME type for JPEG

      return res.json({ imageUrl }); // Respond with the image URL

    } catch (error) {
      // Handle errors
      if (error.response) {
        console.error("API Error Response:", error.response.data);
      } else {
        console.error("Error generating image:", error.message);
      }

      if (error.response && error.response.status === 503) {
        console.log(`Attempt ${attempts + 1} failed: Model is still loading... Retrying in ${RETRY_DELAY / 1000} seconds`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); // Wait before retrying
        attempts++;
      } else {
        return res.status(500).json({
          error: "Image generation failed.",
          details: error.response ? error.response.data : error.message
        });
      }
    }
  }

  return res.status(503).json({
    error: "Service unavailable. Model is still loading after multiple attempts."
  });
};
