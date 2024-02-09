import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = () => {
    const { id } = useParams();
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        course: ""
    });

    // Function to fetch templates from the API
    const fetchTemplates = async () => {
        try {
            const response = await fetch("http://localhost:7000/template/get-template");
            const data = await response.json();
            setTemplates(data?.data);
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    // Function to handle template selection
    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        const updatedTemplates = templates.map(template => {
            if (template.id === id) {
                return {
                    ...template,
                    template_values: template.template_values.replace(/Joe Nathan/g, formData.name) || template.template_values.replace(/Daniel Vitorrie/g, formData.name)
                };
            }
            return template;
        });
        setTemplates(updatedTemplates);

        // Send PATCH request to update the template code in the backend
        const token = localStorage.getItem("token");
        const API_URL = `http://localhost:7000/template/updateCertificate/1`;
        try {
            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`,
                },
                body: JSON.stringify({ template_values: selectedTemplate.template_values }) // Assuming the backend accepts template_values in the body
            });
            if (response.ok) {
                console.log("Template code updated successfully");
            } else {
                console.error("Failed to update template code");
            }
        } catch (error) {
            console.error("Error updating template code:", error);
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        window.location.replace('/');
    };

    // Function to download the certificate as PDF
    const downloadCertificate = () => {
        const element = document.getElementById('certificate');

        html2canvas(element)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgWidth = 208;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save("certificate.pdf");
            });
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '20px' }}>
            <header style={{ backgroundColor: '#1976D2', padding: '10px', marginBottom: '20px', borderRadius: '5px', color: 'white', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ margin: 0 }}>Dashboard</h1>
                    <button style={{ backgroundColor: '#E53935', color: 'white', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: '5px' }} onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Link to="/templateForm" style={{ textDecoration: 'none' }}>
                    <button style={{ backgroundColor: '#388E3C', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', marginRight: '10px', cursor: 'pointer', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>Add</button>
                </Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <h2>Choose a template:</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {templates.map((template, index) => (
                    <div key={index} onClick={() => handleTemplateSelect(template)} style={{ border: '1px solid #ddd', padding: '10px', cursor: 'pointer', background: selectedTemplate === template ? '#eceff1' : 'none', borderRadius: '5px', marginBottom: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                        <div dangerouslySetInnerHTML={{ __html: template.template_values }}  />
                    </div>
                ))}
            </div>
            {selectedTemplate && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div>
                        <h3>Fill in the details:</h3>
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
                        <br />
                        <input type="text" name="course" placeholder="Course" value={formData.course} onChange={handleInputChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
                        <br />
                        <button onClick={handleSubmit} style={{ backgroundColor: '#1976D2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>Update Template</button>
                    </div>
                </div>
            )}
            {formData.name && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div>
                        <h2>Updated Form:</h2>
                        <div id="certificate">
                            {templates.map((template, index) => (
                                <div key={index}>
                                    {template.template_name === "1" ? <div dangerouslySetInnerHTML={{ __html: template.template_values }} /> : ""}
                                </div>
                            ))}
                        </div>
                        <button onClick={downloadCertificate} style={{ backgroundColor: '#1976D2', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>Download PDF</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
