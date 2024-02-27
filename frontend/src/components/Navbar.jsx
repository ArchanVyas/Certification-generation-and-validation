import React from 'react';
import { useLocation } from 'react-router-dom';
import { HomeOutlined, UserOutlined, FileSearchOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const items = [
    { key: '1', icon: <HomeOutlined />, label: 'Home', link:'/dashboard' },
    { key: '2', icon: <FileSearchOutlined />, label: 'Request', link:'/request' },
    { key: '3', icon: <ProfileOutlined />, label: 'Profile', link:'/profile' },
    { key: '4', icon: <LogoutOutlined />, label: 'Logout', link:'/logout' },
];

const Sidebar = () => {
    const { pathname } = useLocation(); // Get the current pathname from the location

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className='fixed min-h-screen'>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
                className="flex flex-col justify-center"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical " />
                <div className='grid justify-left items-center h-full'>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} selectedKeys={[pathname]}>
                        {items.map(item => (
                            <Menu.Item key={item.link} icon={item.icon}>
                                <Link to={item.link}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </div>
            </Sider>      
        </Layout>
    );
};

export default Sidebar;
