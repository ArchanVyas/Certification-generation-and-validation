import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom';
const SearchCerti = () => {
    const [search, setSearch] = useState('');
    const componentRef = useRef();
    const [certificate, setCertificate] = useState()
    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSearch = async () => {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URI}/course/searchCertificate`, {
            uniqueId: search
        });
        console.log(response);
        setCertificate(response?.data?.data[0]?.certificate)
    }
    // Hook for handling the print functionality
    const handlePrint = useReactToPrint({
        content: () => componentRef.current, // Specify the component to print
    });

    const token = localStorage.getItem("token")

    return (
        <div>
            {token && <Navbar />}
            {!token&&<span><br></br><Link to="/login" className='p-12 font-semibold underline'>Back to login</Link></span>}
            <h1 className="p-12 font-bold text-2xl text-left">Search Certifcate By ID</h1>
            <div className="flex justify-center">
                <input type="text" className="border-2 outline-none border-gray-300 p-2" placeholder="Enter Certificate ID" onChange={(e) => handleChange(e)} />
                <button className="bg-blue-500 text-white p-2 w-[100px]"
                    onClick={handleSearch}
                >Search</button>
            </div>
            <div className='flex px-32 py-12 items-center justify-center'>
                {
                    certificate && <div>
                        <div dangerouslySetInnerHTML={{ __html: certificate }} ref={componentRef}/>
                        <div>
                            <button className="button bg-blue-500 text-white rounded-md text-lg px-8 py-2 my-4"
                                onClick={handlePrint}
                            >Download PDF</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default SearchCerti;