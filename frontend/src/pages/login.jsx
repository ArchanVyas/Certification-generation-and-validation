import hello from '../assets/login.jpg'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';
import { useEffect } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });




    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };


    const handleLoginClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URI}/user/login/user`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);
            if (data.data.token) {
                console.log('Successfully logged in');
                console.log(data)
                localStorage.removeItem("token");
                localStorage.setItem("token", data.data.token)
                localStorage.setItem("id", data.data.id)
                localStorage.setItem("username", data.data.username)
                window.location.replace('/dashboard')
            }
            else {
                alert(data.message)
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token")
        const user = localStorage.getItem("user")

        if (token) {
            window.location.replace('/dashboard')
        }
        if(user && user === "admin"){
            window.location.replace('/admin/login')
    
        }
    }, [])
    return (
        <>    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            <link rel="icon" href={logo.src} type="image/icon type" />
            <title>Attendace System</title>

            <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-4 bg-[#000010] h-[100vh]">
                <div>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="mt-16 img-fluid" alt="Sample image" />                    </div>
                <div className="p-8 px-16 mt-[5%] bg-[#000010]">      
                <p className='lg:text-[30px] text-[35px] font-bold text-[white]'>Certificate generation and validation</p>
                    <h1 className="text-[25px] font-semibold my-6 text-[white]">User Login</h1><br />
                                        {/* <h3 className="lg:text-[35px] text-[20px] text-[white] font-semibold">Login</h3><br></br> */}
                    <form className="max-w-sm">
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"

                                required />
                        </div>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required />
                        </div>

                        <button type="button" onClick={handleLoginClick} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                        <br></br>                        
                        <h1 className='text-[white]'>New user? <Link to="/signup" className="font-bold underline">Signup</Link></h1>
                        <h1 className='text-[white]'>Admin? <Link to="/admin/login" className="font-bold underline">Login</Link></h1>
                        <h1 className='text-[white]'>Find Certificate? <Link to="/search-certificate" className="font-bold underline">Click here</Link></h1>
                    </form>
                </div>
            </div>


        </>
    );
}

export default Login;