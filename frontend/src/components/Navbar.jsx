// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { HomeOutlined, UserOutlined, FileSearchOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
// import { Layout, Menu, theme } from 'antd';
// import { Link } from 'react-router-dom';

// const { Sider } = Layout;

// const items = [
//     { key: '1', icon: <HomeOutlined />, label: 'Home', link:'/dashboard' },
//     { key: '2', icon: <FileSearchOutlined />, label: 'Request', link:'/request' },
//     { key: '3', icon: <ProfileOutlined />, label: 'Profile', link:'/profile' },
//     { key: '4', icon: <LogoutOutlined />, label: 'Logout', link:'/logout' },
// ];

// const Sidebar = () => {
//     const { pathname } = useLocation();

//     const {
//         token: { colorBgContainer, borderRadiusLG },
//     } = theme.useToken();

//     return (
//         <Layout className='fixed min-h-screen'>
//             <Sider
//                 breakpoint="md"
//                 collapsedWidth="0"
//                 className="flex flex-col justify-center"
//                 onBreakpoint={(broken) => {
//                     console.log(broken);
//                 }}
//                 onCollapse={(collapsed, type) => {
//                     console.log(collapsed, type);
//                 }}
//             >
//                 <div className="demo-logo-vertical " />
//                 <div className='grid justify-left items-center h-full'>
//                     <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[pathname]}>
//                         {items.map(item => (
//                             <Menu.Item key={item.link} icon={item.icon}>
//                                 <Link to={item.link}>{item.label}</Link>
//                             </Menu.Item>
//                         ))}
//                     </Menu>
//                 </div>
//             </Sider>      
//         </Layout>
//     );
// };

// export default Sidebar;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
    const currentPath = window.location.pathname;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [active,setActive] = useState("Home");
    console.log(currentPath)
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    useEffect(()=>{
        if(currentPath === "/dashboard"){
            setActive("Home")
        }
        else if(currentPath === "/request"){
            setActive("Request")
        }
        else if(currentPath === "/search-certificate"){
            setActive("Search")
        }
        else if(currentPath === "/profile" || currentPath === "/edit-profile"){
            setActive("Profile")
        }
    },[currentPath])

    return(
    <>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>


        <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full">
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
                            <a href="/dashboard" className={`inline-block block text-sm py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent ${active === 'Home' ? "text-blue-500":"text-white"}`} >Home</a>
                        </li>                      
                        <li>
                            <a href="/request" className={`inline-block block text-sm py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent ${active === 'Request' ? "text-blue-500":"text-white"}`}>Request</a>
                        </li>
                        <li>
                            <a href="/search-certificate" className={`inline-block block text-sm py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent ${active === 'Search' ? "text-blue-500":"text-white"}`}>Search Certificate</a>
                        </li>
                        <li>
                            <a href="/profile" className={`inline-block block text-sm py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent ${active === 'Profile' ? "text-blue-500":"text-white"}`}>Profile</a>
                        </li>                     
                        <li>
                            <a href="/logout" className="inline-block px-4 py-2 text-gray-900 rounded text-sm hover:bg-red-600 md:border-0 dark:text-white bg-[red] rounded-md">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
<br></br><br></br>
    </>)
}

export default Sidebar