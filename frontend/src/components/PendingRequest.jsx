import { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const PendingRequest = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:7000/course/getCourse/`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await response.json();
            console.log(res);
            if (res.status === "Success") {
                // Filter data where status is 0
                const filteredData = res.data.filter(item => item.status === "0");
                setData(filteredData);
            }
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };

    const approveCourse = async (id) => {
        //   console.log(token)
          try {
            const token = localStorage.getItem("token")
            const response = await fetch('http://localhost:7000/course/updateCourse', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({"_id":id,"status":"1"})
            });
    
            const data = await response.json();
            console.log(data);
         
        } catch (err) {
            console.error(err);
        }
      }
    const denyCourse = async (id) => {
        //   console.log(token)
          try {
            const token = localStorage.getItem("token")
            const response = await fetch('http://localhost:7000/course/updateCourse', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({"_id":id,"status":"2"})
            });
    
            const data = await response.json();
            console.log(data);
         
        } catch (err) {
            console.error(err);
        }
      }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">Pending Request</h1>
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2">ID</th>
                        <th className="py-2">Username</th>
                        <th className="py-2">Template ID</th>
                        <th className="py-2">Course Name</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                            <td className="py-3 text-center">{item.template_Id}</td>
                            <td className="py-3 text-center">{item.user_name}</td>
                            <td className="py-3 text-center">{item.template_Id}</td>
                            <td className="py-3 text-center">{item.course_name}</td>
                            <td className="py-3 text-center">
                                <button className="mr-2 px-3 py-2 rounded-md bg-green-500 text-white" onClick={approveCourse(item._id)}>
                                    <IoCheckmark className="text-lg"/>
                                </button>
                                <button className="px-3 py-2 rounded-md bg-red-500 text-white" onClick={denyCourse(item._id)}>
                                    <RxCross2 className="text-lg" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingRequest;
