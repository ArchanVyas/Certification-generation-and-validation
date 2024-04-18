import { useEffect, useState } from "react";
const AdminNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [active,setActive] = useState("Dashboard");
    const currentPath = window.location.pathname;

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    useEffect(()=>{
        if(currentPath === "/admin/dashboard"){
            setActive("Dashboard")
        }
        else if(currentPath === "/admin/course"){
            setActive("Course")
        }
        else if(currentPath === "/admin/validate"){
            setActive("Validate")
        }
        else if(currentPath === "/admin/templateform"){
            setActive("Template")
        }
    },[currentPath])
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");        
        localStorage.clear()
        window.location.replace('/admin/login')
    }

    return(
    <>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>


        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full top-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CGV</span>
                </a>
                <button data-collapse-toggle="navbar-default" 
                 onClick={toggleMenu}
                 type="button"
                 className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"             
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`w-full text-left md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
                    <ul className="lg:items-center font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="/admin/dashboard" className={`inline-block block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0  ${active === "Dashboard" ? "text-blue-500" : "text-white"}`}>Dashboard</a>
                        </li>                      
                        <li>
                            <a href="/admin/course" className={`inline-block block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0  ${active === "Course" ? "text-blue-500" : "text-white"}`}>Course</a>
                        </li>
                        <li>
                            <a href="/admin/validate" className={`inline-block block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0  ${active === "Validate" ? "text-blue-500" : "text-white"}`}>Validate</a>
                        </li>
                        <li>
                            <a href="/admin/templateform" className={`inline-block block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent  md:p-0  ${active === "Template" ? "text-blue-500" : "text-white"}`}>Template</a>
                        </li>
                        <li>
                            <a className="inline-block px-4 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent bg-[red] rounded-md" onClick={logout}>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav><br></br><br></br><br></br>

    </>)
}

export default AdminNavbar