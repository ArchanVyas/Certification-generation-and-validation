import { useState, useEffect } from "react";
const MyCerti = () => {
    const [templates, setTemplates] = useState([]);
    const fetchTemplates = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URI}/template/get-template`);
            const data = await response.json();
            setTemplates(data?.data);
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };
    useEffect(() => {
        fetchTemplates()
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (!token) {
            window.location.replace('/login')
        }
        if(user && user === "admin"){
            window.location.replace('/admin/login')
    
        }        
    })
    return (
        <>
            {templates.map((template, index) => (
                <div key={index}>
                    <div dangerouslySetInnerHTML={{ __html: template.template_values }} />
                </div>
            ))}
        </>
    )
}

export default MyCerti