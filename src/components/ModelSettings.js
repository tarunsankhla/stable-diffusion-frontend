// src/components/ModelSettings.js
import React, { useState } from 'react';

const ModelSettings = ({ onSettingsChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState({
    width: 512,
    height: 512,
    seed: -1,
    samplingMethod: 'euler_a',
    useFP16: true,
    api: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    const updatedSettings = {
      ...settings,
      [name]: type === 'number' ? Number(newValue) : newValue
    };
    
    console.log(updatedSettings);
    setSettings(updatedSettings);
    onSettingsChange(updatedSettings);
  };

  const samplingMethods = [
    { value: 'euler_a', label: 'Euler Ancestral' },
    { value: 'euler', label: 'Euler' },
    { value: 'lms', label: 'LMS' },
    { value: 'heun', label: 'Heun' },
    { value: 'dpm2', label: 'DPM2' },
    { value: 'dpm2_ancestral', label: 'DPM2 Ancestral' },
    { value: 'ddim', label: 'DDIM' }
  ];

  const randomizeSeed = () => {
    const randomSeed = Math.floor(Math.random() * 2147483647);
    setSettings({ ...settings, seed: randomSeed });
    onSettingsChange({ ...settings, seed: randomSeed });
  };

  return (
    <div className="mb-6">
      <button
        type="button"
        className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        <span>{showAdvanced ? '▼' : '►'}</span>
      </button>
      
      {showAdvanced && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="width">
                Width
              </label>
              <select
                id="width"
                name="width"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={settings.width}
                onChange={handleChange}
              >
                <option value="384">384px</option>
                <option value="512">512px</option>
                <option value="640">640px</option>
                <option value="768">768px</option>
              </select>
            </div> */}
            <div className="md:col-span-2">
              <input name='api' type='text' value={settings.api} onChange={handleChange} 
              placeholder='Enter you API'
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            
            {/* <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
                Height
              </label>
              <select
                id="height"
                name="height"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={settings.height}
                onChange={handleChange}
              >
                <option value="384">384px</option>
                <option value="512">512px</option>
                <option value="640">640px</option>
                <option value="768">768px</option>
              </select>
            </div> */}
            
            {/* <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seed">
                Seed
              </label>
              <div className="flex">
                <input
                  id="seed"
                  name="seed"
                  type="number"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={settings.seed}
                  onChange={handleChange}
                  placeholder="-1 for random"
                />
                <button
                  type="button"
                  onClick={randomizeSeed}
                  className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  🎲
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Use -1 for random seed</p>
            </div> */}
            
            {/* <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="samplingMethod">
                Sampling Method
              </label>
              <select
                id="samplingMethod"
                name="samplingMethod"
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={settings.samplingMethod}
                onChange={handleChange}
              >
                {samplingMethods.map(method => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          
          {/* <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="useFP16"
                checked={settings.useFP16}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Use FP16 (faster generation with slightly lower quality)</span>
            </label>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ModelSettings;
