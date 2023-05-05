import React from 'react'
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { MdChromeReaderMode, MdAccountCircle, MdScreenShare } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import './sidebar.css'
const { Sider } = Layout

const Sidebar = () => {

  const style = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
  }

  const navItem = [
    {
      path: '/',
      name: 'Product',
      icon: <MdChromeReaderMode />
    },
    {
      path: '/user',
      name: 'User',
      icon: <MdAccountCircle />
    },
    {
      path: '/order',
      name: 'Order',
      icon: <MdScreenShare />
    },
    {
      path: '/analysis',
      name: 'Analysis',
      icon: <MdAccountCircle />
    },

  ]
  const { pathname } = useLocation()
  const activeNav = navItem.findIndex(e => e.path === pathname)
  return (
    <Sider style={style}  width={250}>
      <div className="sidebar-top">
        <p>Dashboard</p>
      </div>
      <div className="sidebar-main">
        {
          navItem.map((item, index) => (
            <Link to={item.path} key={index} >
              <div className={` ${index === activeNav ? 'sidebar-menu-item active_nav ' : 'sidebar-menu-item'}`}>
                <i>{item.icon}</i>
                <p>{item.name}</p>
              </div>
            </Link>
          ))
        }
      </div>

    </Sider>
  )
}

export default Sidebar
