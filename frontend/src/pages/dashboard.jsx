import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navbar from "../components/Navbar"
import UserDashboardTable from "../components/UserDashboardTable";
import Modal from 'react-modal';
import PieChartDash from "../components/PieChartDash";
import BarChartDash from "../components/BarChartDash";
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
            const response = await fetch(`${process.env.REACT_APP_BASE_URI}/template/get-template`, {
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

    const fetchData = async () => {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URI}/course/getCourse`, {
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
                // setData(res?.data);
            }
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };

    
    useEffect(() => {
        fetchTemplates();
        fetchData();

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
        const API_URL = `${process.env.REACT_APP_BASE_URI}/course/createCourse`;
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
    const username = localStorage.getItem("username")
    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-8 text-center w-[100%]">
            <h1>Hello, {username}</h1>
            <div className="grid grid-cols-2 gap-20 mt-12">
            <PieChartDash />
            <BarChartDash />
            </div>
                <div className="text-2xl font-semibold mb-12">
                    <h2>Choose a template:</h2>
                </div>
                <div style={{ justifyContent: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', maxHeight: '100px'}}
                className="grid grid-cols-2"
                >
                    {templates?.map((template, index) => (
                        <div key={index} onClick={() => handleTemplateSelect(template.template_code)} style={{ padding: '10px', cursor: 'pointer', background: selectedTemplate === template ? '#eceff1' : 'none', borderRadius: '5px', marginBottom: '10px'}} className="min-h-screen">
                            <div dangerouslySetInnerHTML={{ __html: template.template_values }}/>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center w-[50%]">
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
