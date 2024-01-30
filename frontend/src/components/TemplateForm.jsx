import React, { useState } from 'react';

const TemplateForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming your API endpoint is 'https://example.com/api'
    const apiUrl = 'https://example.com/api';
    console.log(inputValue)
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputValue }),
      });

      if (response.ok) {
        // Handle success
        console.log('API call successful');
      } else {
        // Handle error
        console.error('API call failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-md max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="dataInput" className="text-lg font-semibold">
          Enter Data:
        </label>
        <input
          type="text"
          id="dataInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TemplateForm;
