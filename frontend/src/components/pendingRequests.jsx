import { useState, useEffect } from 'react'

const PendingRequest = () => {
    const [data, setData] = useState([])
    const fetchTemplates = async () => {
        try {
            const response = await fetch("http://localhost:7000/template/get-template");
            const data = await response.json();
            setData(data?.data);
        } catch (error) {
            console.error("Error fetching templates:", error);
        }
    };
    useEffect(() => {
        fetchTemplates()
    }, [])
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                    <tr>
                        <th>Certificate</th> 
                    </tr>
                    <tr>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    data?.map((item)=>{
                        return(
                            <tr>
                                <td>{item?.}</td>
                            </tr>
                        )
                    })
                }
                </tbody>

            </table>
          
        </div>
    )
}

export default PendingRequest