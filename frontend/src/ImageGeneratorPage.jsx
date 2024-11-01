import React, { useState } from 'react';
import axios from 'axios';
import './ImageGeneratorPage.css';

const ImageGeneratorPage = () => {
  const [prompt, setPrompt] = useState(''); // State for user input
  const [imageUrl, setImageUrl] = useState(null); // State for storing the generated image URL
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Function to handle image generation
  const handleGenerateImage = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null); // Reset imageUrl when a new request is made
    try {
        const response = await axios.post("http://localhost:5000/api/generate-image", { prompt });
        const newImageUrl = response.data.imageUrl;
        setImageUrl(newImageUrl);
    } catch (err) {
        console.error("Error generating image:", err);
        if (err.response) {
            setError(`Error: ${err.response.data.error || "Failed to generate image."}`);
        } else {
            setError("Network error. Please check your connection and try again.");
        }
    } finally {
        setLoading(false);
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
