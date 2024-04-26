import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
const TemplateForm = () => {
  const [data, setData] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token")
    // Assuming your API endpoint is 'https://example.com/api'
    const apiUrl = `${process.env.REACT_APP_BASE_URI}/template/create-template`;
    console.log(data)
    console.log(additionalInfo)
    const data_Send=JSON.stringify({
      template_values: data,
      template_name: additionalInfo,
      template_code:additionalInfo
    })
    console.log(data_Send)
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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

  useEffect(()=>{
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (!token) {
        window.location.replace('/login')
    }
    if(user && user !== "admin"){
        window.location.replace('/login')

    }
  },[])

  return (
    <>
    <AdminNavbar />
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-md max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="dataInput" className="text-lg font-semibold">
          Enter Data:
        </label>
        <input
          type="text"
          id="dataInput"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="additionalInfoInput" className="text-lg font-semibold">
          Additional Information:
        </label>
        <input
          type="text"
          id="additionalInfoInput"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        >
          Submit
        </button>
      </form><br></br>
      <a href="/dashboard"> <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"

      >Dashboard</button></a>
    </div>
    </>
  );
};

export default TemplateForm;
