import { useState,useEffect } from "react";
const Dashboard = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        let companyCode = localStorage.getItem("companyCode");
        let idAsInt = parseInt(companyCode, 10);
        const API_URL = 'http://localhost:7000/template/get-template'
        console.log(API_URL);
        const token = localStorage.getItem("token")
        // alert(token)
        try {
            const response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `${token}`,
                }
            });
            const data_new = await response.json()
            console.log(data_new?.data)
            setData(data_new?.data)
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchData();
    },[]);
    return (
        <div className="w-full">
            <a href="/templateForm"> <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"

      >Add Data</button></a>
        <h2>Data from API:</h2>
        {data?.map((e, index) => (
            <div>
          <div key={index} dangerouslySetInnerHTML={{ __html: e.template_values }} /><br></br></div>
        ))}
      </div>
    );
}

export default Dashboard;