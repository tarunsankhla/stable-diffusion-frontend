import React from 'react';
import Skeleton from './Skeleton';

const ImageDisplay = ({ image, isLoading, error }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Generated Output 👇🏻</h2>
      
      <div className="flex-grow flex items-center justify-center bg-gray-100 rounded-lg p-4">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="loader mb-2"></div>
            <p>Generating your masterpiece...</p>
            <Skeleton height="400px" width='400px' className="mb-4" />
            {/* <Skeleton height="1rem" width="80%" className="mb-2" />
            <Skeleton height="1rem" width="60%" /> */}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            <p>Error: {error}</p>
          </div>
        ) : image ? (
          <img src={image} alt="Generated" style={{ width: "400px", marginTop: "20px" }} />
        ) : (
          <div className="text-gray-500 text-center">
            <p>Your generated image will appear here</p>
          </div>
        )}
      </div>

      {image && (
        <div className="mt-4 flex justify-center">
                <img src={`data:image/png;base64,${image}`} />
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
