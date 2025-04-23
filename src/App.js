// App.js with image history functionality
import React, { useState, useEffect } from 'react';
import './App.css';
import GenerationForm from './components/GenerationForm';
import ImageDisplay from './components/ImageDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import ModelSettings from './components/ModelSettings';
import ImageHistory from './components/ImageHistory';

function App() {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [imageHistory, setImageHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [advancedSettings, setAdvancedSettings] = useState({
    width: 512,
    height: 512,
    seed: -1,
    samplingMethod: 'euler_a',
    useFP16: true,
    api: ''
  });
  const [prompt, setPrompt] = useState('');


  // Load image history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('imageHistory');
    if (savedHistory) {
      try {
        setImageHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse image history:', e);
      }
    }
  }, []);

  const suggestions = [
    "A ninja with blonde hair",
    "A cat in a forest",
    "Samurai with a ninja band",
    "Mountains in Naruto style"
    // "A cyberpunk city at night",
    // "Samurai in a bamboo forest",
    // "Anime-style cat on a rooftop",
    // "Abstract art made of coffee",
    // "Mystical fox in the snow",
  ];

  const handleSuggestionClick = (text) => {
    setPrompt(text);
  };

  // Save image history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('imageHistory', JSON.stringify(imageHistory));
  }, [imageHistory]);

  const generateImage = async ( negativePrompt, steps, guidanceScale, model) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        prompt: prompt,
        num_inference_steps: 10,
        guidance_scale: 7.5,
        seed: 42,
        pipeline_type: model
      });

      console.log(params.toString());
      try {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "prompt": prompt
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        console.log(advancedSettings.api);

        let apiEndpoint = advancedSettings.api ?? "http://162.243.222.155:8000/generate-image";

        const response = await fetch(apiEndpoint, requestOptions);
        // .then((response) => response.text())
        // .then((result) => console.log(result))
        // .catch((error) => console.error(error));

        // const response = await fetch(`${apiEndpoint}/api/generate/?${params.toString()}`, {
        //   method: "GET",
        //   headers: {
        //     "ngrok-skip-browser-warning": "true",
        //   },
        // });
        console.log(response);
        if (!response.ok) {
          throw new Error("Image fetch failed");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setGeneratedImage(url);
        const timestamp = new Date().toISOString();
        const historyItem = {
          id: timestamp,
          image: url,
          prompt,
          negativePrompt,
          settings: {
            steps,
            guidanceScale,
            ...advancedSettings
          },
          timestamp
        };

        setImageHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep only the last 10 
        console.log(historyItem);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    } catch (err) {
      console.error('Failed to generate image:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsChange = (newSettings) => {
    setAdvancedSettings(newSettings);
  };

  const handleHistoryItemClick = (item) => {
    setGeneratedImage(item.image);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="form-container flex flex-row">
              <GenerationForm
                onGenerateImage={generateImage}
                setPrompt={setPrompt}
                prompt={prompt}
                isLoading={isLoading}
              />
              <div className="mt-6">
                <ModelSettings onSettingsChange={handleSettingsChange} />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(s)}
                    className="btn-text bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="image-container app-container">
                <ImageDisplay
                  image={generatedImage}
                  isLoading={isLoading}
                  error={error}
                />
              </div>
              <div className="mt-6 app-container">
                <ImageHistory
                  history={imageHistory}
                  onItemClick={handleHistoryItemClick}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
