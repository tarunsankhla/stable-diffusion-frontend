import React, { useState } from 'react';

const ImageHistory = ({ history, onItemClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) {
    return null;
  }

  return (
    <div style={{width:"100%", display:"flex", alignContent:"center", flexDirection:"column",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    }} className="bg-white p-6 rounded-lg shadow-md">
      <div style={{flexDirection:"row"}} className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Past Results</h2>
        <button
          className="btn-text text-blue-500 hover:text-blue-700"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'View All'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          
          {history.map((item) => (
            <div 
              key={item.id} 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onItemClick(item)}
            >
               <p className="text-xs text-gray-600 mt-1 truncate">
                {item.prompt}
              </p>
              <img src={item.image} />

              {/* <img 
                src={`data:image/png;base64,${item.image}`} 
                alt={item.prompt}
                className="w-full h-auto rounded shadow"
              /> */}
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageHistory;
