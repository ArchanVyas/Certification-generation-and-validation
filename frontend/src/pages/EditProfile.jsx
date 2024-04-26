import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

const EditProfile = () => {
  const [data, setData] = useState();
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    university: '',
    skills: '',
    qualifications: '',

  });
  const [formDataOne, setFormDataOne] = useState({
    user_name: '',
    email: '',
    university: '',
    skills: '',
    qualifications: '',

  });
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
      setFormDataOne({
        user_name: res?.data.user_name,
        email: res?.data.email,
        university: res?.data.university,
        skills: res?.data.skills,
        qualifications: res?.data.qualifications       
      })
      setFormData({
        user_name: res?.data.user_name,
        email: res?.data.email,
        university: res?.data.university,
        skills: res?.data.skills,
        qualifications: res?.data.qualifications       
      })
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      user_name: e.target.value,
    });
  };
  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
  };
  const handleUniversityChange = (e) => {
    setFormData({
      ...formData,
      university: e.target.value,
    });
  };
  const handleQualificationChange = (e) => {
    setFormData({
      ...formData,
      qualifications: e.target.value,
    });
  };
  const handleSkillsChange = (e) => {
    setFormData({
      ...formData,
      skills: e.target.value,
    });
  };

  const saveChanges = async () => {
    //   console.log(token)
      console.log(formData)
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${process.env.REACT_APP_BASE_URI}/user/update-profile`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        console.log(data);
      if(data.status === "Success"){
            window.location.replace("/profile")
    }
        else {
            alert(data.message)
        }
    } catch (err) {
        console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <p className="text-gray-600 mb-2">Name:</p>
              <input className="text-lg font-semibold outline-none" value={formData?.user_name}
                onChange={handleNameChange}
                id="user_name"
              ></input>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-gray-600 mb-2">Email:</p>
              <input className="text-lg font-semibold outline-none" value={formData?.email}
              onChange={handleEmailChange}
              id="email"
              ></input>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-gray-600 mb-2">University:</p>
              <input className="text-lg font-semibold outline-none" value={formData?.university}
              onChange={handleUniversityChange}
              id="university"
              ></input>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-gray-600 mb-2">Qualifications:</p>
              <input className="text-lg font-semibold outline-none" value={formData?.qualifications}
              onChange={handleQualificationChange}
              id="qualifications"
              ></input>
            </div>
            <div className="col-span-2">
              <p className="text-gray-600 mb-2">Skills:</p>
              <input className="text-lg font-semibold outline-none" value={formData?.skills}
              onChange={handleSkillsChange}
              id="skills"
              ></input>
            </div>
          </div>
          <div className="mt-12">
          <a href="/profile"><button className="bg-green-700 text-white rounded-md px-4 py-2"             onClick={saveChanges}
>
            Go Back</button></a>
          <a ><button className="bg-blue-700 ml-4 text-white rounded-md px-4 py-2"             onClick={saveChanges}
>
            Save Changes</button></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
