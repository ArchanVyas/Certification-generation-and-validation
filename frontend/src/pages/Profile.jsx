import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

const Profile = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URI}/user/get-profile/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await response.json();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-semibold mb-6">Profile</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <p className="text-gray-600 mb-2">Name:</p>
              <p className="text-lg font-semibold">{data?.user_name}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-gray-600 mb-2">Email:</p>
              <p className="text-lg font-semibold">{data?.email}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-gray-600 mb-2">University:</p>
              <p className="text-lg font-semibold">{data?.university}</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-gray-600 mb-2">Qualifications:</p>
              <p className="text-lg font-semibold">{data?.qualifications}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-600 mb-2">Skills:</p>
              <p className="text-lg font-semibold">{data?.skills}</p>
            </div>
          </div>
          <div className="mt-12">
          <a href="/edit-profile"><button className="bg-blue-700 text-white rounded-md px-4 py-2">Edit Profile</button></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
