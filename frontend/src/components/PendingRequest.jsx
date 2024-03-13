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
                // Filter data where status is 0
                setData(res.data);
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };
                   
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-4">Requests</h1>
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
                    {data.map((item,index) => (
                        <tr key={item.id} className="border-b border-gray-200">
                            <td className="py-3 text-center">{index+1}</td>
                            <td className="py-3 text-center">{item.user_name}</td>
                            <td className="py-3 text-center">{item.template_Id}</td>
                            <td className="py-3 text-center">{item.course_name}</td>
                            <td className="py-3 text-center">
                             {item.status?"Accepted":"Rejected"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingRequest;
