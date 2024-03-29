import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navbar from "../components/Navbar"
import UserDashboardTable from "../components/UserDashboardTable";
import Modal from 'react-modal';

const Dashboard = () => {
    const { id } = useParams();
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [formData, setFormData] = useState({
        user_name: "",
        course: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to fetch templates from the API
    const fetchTemplates = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:7000/template/get-template", {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
            })
            
            const data = await response.json();
            setTemplates(data?.data);
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };

    useEffect(() => {
        fetchTemplates();
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (!token) {
            window.location.replace('/login')
        }
        if(user && user === "admin"){
            window.location.replace('/admin/login')
    
        }
    }, []);

    // Function to handle template selection
    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Send the data and template ID to the backend for processing
        console.log({"user_name":formData.user_name,"course":formData.course,"template_id":selectedTemplate})
        const token = localStorage.getItem("token");
        const API_URL = `http://localhost:7000/course/createCourse`;
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "user_name": formData.user_name,
                    "course": formData.course,
                    "template_id": selectedTemplate
                })
            });
        
        
            if (response.ok) {
                console.log("Data sent successfully for template ID:", selectedTemplate.id);
                setIsModalOpen(false); // Close the modal after successful submission
            } else {
                console.error("Failed to send data");
            }
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif'}} className="flex">
            <Navbar />
            <div className="container mx-auto ml-48 p-8">
                <div className="text-2xl font-semibold">
                    <h2>Choose a template:</h2>
                </div>
                <div className="max-w-xl" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', maxHeight: '100px' }}>
                    {templates?.map((template, index) => (
                        <div key={index} onClick={() => handleTemplateSelect(template.template_code)} style={{ border: '1px solid #ddd', padding: '10px', cursor: 'pointer', background: selectedTemplate === template ? '#eceff1' : 'none', borderRadius: '5px', marginBottom: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <div dangerouslySetInnerHTML={{ __html: template.template_values }} />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center w-full">
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Form Modal"
                    className="h-[400px] bg-[#eee] border-none mt-32 mx-64"
                >
                    <h2 className="py-8">Fill in the details:</h2>
                    <input type="text" name="user_name" placeholder="Name" value={formData.user_name} onChange={handleInputChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} /><br></br>
                    <input type="text" name="course" placeholder="Course Name" value={formData.course} onChange={handleInputChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
                    <br />
                    <br />
                    <button onClick={handleSubmit} style={{ backgroundColor: '#1976D2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>Submit</button>
                    <button onClick={() => setIsModalOpen(false)} style={{ marginLeft: '10px' }}>Cancel</button>
                </Modal>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
