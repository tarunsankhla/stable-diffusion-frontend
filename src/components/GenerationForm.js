import React, { useState } from 'react';

const GenerationForm = ({ onGenerateImage, setPrompt,prompt,isLoading }) => {
  // const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [steps, setSteps] = useState(50);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [model, setModel] = useState('custom');
  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateImage(prompt, negativePrompt, steps, guidanceScale, model);
  };

  return (
    <div className="text-container bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-1xl mb-4">From thought to art — one prompt at a time.</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prompt">
            {/* Prompt */}
          </label>
          <textarea
            id="prompt"
            className="promptInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your image description here..."
            rows="4"
            required
          />
        </div>
         {/* dropdown for model selection between stable-diffusion and ghibli */}
       
         {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="negative-prompt">
            Negative Prompt (Optional)
          </label>
          <textarea
            id="negative-prompt"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="What you don't want in the image..."
            rows="2"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="steps">
              Steps ({steps})
            </label>
            <input
              id="steps"
              type="range"
              min="20"
              max="100"
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guidance-scale">
              Guidance Scale ({guidanceScale})
            </label>
            <input
              id="guidance-scale"
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={guidanceScale}
              onChange={(e) => setGuidanceScale(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
         */}
        <div className="option-container flex items-center justify-center">
        {/* <div className="mb-4"> */}
          {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
            Model
          </label>
          <select
            id="model"
            name="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"    
            >
            <option value="base">Stable Diffusion</option>
            <option value="custom">Finetuner model</option>
            </select> */}
        {/* </div> */}
          <button
            type="submit"
            className="btn-generate bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={isLoading}
          >
            {isLoading ? '....' : '👆🏻'}
          </button>
          
        </div> 
      </form>
    </div>
  );
};

export default GenerationForm;
