import hello from '../assets/login.jpg'
import logo from '../assets/logo.png'
import { useState } from 'react';
import { Link } from 'react-router-dom';



const Signup = () => {
    const [step, setStep] = useState(1);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        user_name: '',
        qualifications:'',
        university:'',
        skills:''
    });

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            setSelectedFile(file);
        }
    };

    const handleNextClick = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handleBackClick = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 1));
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };
    const handleSignupClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URI}/user/signUp/user`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);

            if (data.code === 201) {
                console.log('Successfully signed up');
                window.location.replace('/login')
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            <link rel="icon" href={logo.src} type="image/icon type" />
            <title>Attendace System</title>
            <div className={`lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 gap-4 bg-[#000010] min-h-screen ${step === 2 ? 'next' : step === 1 ? 'prev' : ''}`}>
                <div>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="mt-16 img-fluid " alt="Sample image" />                      </div>
                <div className="p-8 px-16 mt-[5%] bg-[#000010]">
                    <h1 className="lg:text-[65px] text-[35px] font-bold text-[white]">User Sign up</h1><br />
                    <form className="max-w-full ">

                        <div className="signup-page mb-5 max-w-sm">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                className="email bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-5 max-w-sm">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                            <input
                                type="password"
                                id="password"
                                className="password bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-5 max-w-sm">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                            <input
                                type="text"
                                id="user_name"
                                className="user_name bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your Username"
                                value={formData.user_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-5 max-w-sm">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your University</label>
                            <input
                                type="text"
                                id="university"
                                className="university bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your University"
                                value={formData.university}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-5 max-w-sm">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Skills</label>
                            <input
                                type="text"
                                id="skills"
                                className="skills bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your skills"
                                value={formData.skills}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-5 max-w-sm">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Qualifications</label>
                            <input
                                type="text"
                                id="qualifications"
                                className="qualifications bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your qualifications"
                                value={formData.qualifications}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex justify-between mt-5 max-w-sm">
                            <button type="button" onClick={handleSignupClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-w-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Signup</button>

                        </div><br></br>
                        <div className='w-full'>
                        </div>
                    </form><br></br>
                    <h1 className="text-[white]">Back To <Link to="/login" className='font-bold underline'> Login </Link></h1>

                </div>

            </div>
        </>
    );
}

export default Signup;