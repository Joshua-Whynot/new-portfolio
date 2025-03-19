import React, { useState } from 'react'
import BaseConverter from './tools/baseconverter'
import HuffmanVisualizer from './tools/huffmanvisualizer'

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState('baseConverter');
  
  const toolOptions = [
    { id: 'baseConverter', name: 'Base Converter', component: <BaseConverter /> },
    { id: 'huffmanVisualizer', name: 'Huffman Visualizer', component: <HuffmanVisualizer /> },

  ]
  
  const handleToolChange = (e) => {
    setSelectedTool(e.target.value);
  }
  

  const currentTool = toolOptions.find(tool => tool.id === selectedTool)?.component || toolOptions[0].component;
  
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <label htmlFor="tool-select" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
          Select Tool:
        </label>
        <div className="relative">
          <select
            id="tool-select"
            value={selectedTool}
            onChange={handleToolChange}
            className="block appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-gray-800 dark:text-white"
          >
            {toolOptions.map(tool => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
      

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          {toolOptions.find(tool => tool.id === selectedTool)?.name || 'Tool'}
        </h2>
        

        {currentTool}
      </div>
    </div>
  )
}

export default Tools
