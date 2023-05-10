import React, { useEffect } from 'react'
import { Layout } from 'antd';
import './nav.css'
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout

const Nav = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) navigate('/signin')
  }, [token])
  const style = {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    width: '100%',
    height: 80,
    background: 'rgb(26, 26, 26)',

  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/signin')
  }
  return (
    <Header style={style}>
      <div className='header-lohout'>
        <div className='csp' onClick={handleLogout}><span><BiLogOut /></span>Logout</div>
      </div>
    </Header>
  )
}

export default Nav
