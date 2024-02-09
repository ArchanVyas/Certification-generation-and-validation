import { useState, useEffect } from "react";
const MyCerti = () => {
    const [templates, setTemplates] = useState([]);
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
        fetchTemplates()
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