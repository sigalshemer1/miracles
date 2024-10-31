import React, { useState } from 'react';
import axios from 'axios';
import './ImageGeneratorPage.css'; // Optional: for styling

const ImageGeneratorPage = () => {
  const [prompt, setPrompt] = useState(''); // State for user input
  const [imageUrl, setImageUrl] = useState(null); // State for storing the generated image URL
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Function to handle image generation
  const handleGenerateImage = async () => {
    setLoading(true); // Set loading to true when the request starts
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}`, { prompt });
      setImageUrl(response.data.imageUrl); // Update the imageUrl state with the generated image URL
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Failed to generate image. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading to false when the request ends
    }
  };

  return (
    <div className="image-generator-page">
      <h1>AI Image Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)} // Update prompt state on input change
        placeholder="Enter your prompt here"
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={handleGenerateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p className="error">{error}</p>} {/* Display error message if any */}
      {imageUrl && (
        <div className="image-container">
          <h2>Generated Image:</h2>
          <img src={imageUrl} alt="Generated" className="generated-image" />
        </div>
      )}
    </div>
  );
};

export default ImageGeneratorPage;
