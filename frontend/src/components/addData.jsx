import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
const AddData = () => {
  const [companyName, setCompanyName] = useState('');
  const [providerName, setProviderName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    const apiUrl = ' ';

    const data_Send=JSON.stringify({
        companyName: companyName,
      issuerName: providerName,
    })

    console.log(data_Send);
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: data_Send,
      });
      const sample = await response.json()
      console.log(sample)
      if (sample.message==="template created successfully") {
        // Handle success
        console.log('API call successful');
      } else {
        // Handle error
        console.error(sample.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-md max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="dataInput" className="text-lg font-semibold">
          Course Name:
        </label>
        <input
          type="text"
          id="dataInput"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="additionalInfoInput" className="text-lg font-semibold">
        Issuer Name:
        </label>
        <input
          type="text"
          id="additionalInfoInput"
          value={providerName}
          onChange={(e) => setProviderName(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form><br></br>     
    </div>
    </>
  );
};

export default AddData;


