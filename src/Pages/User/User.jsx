import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './user.css'

const User = () => {

  const token = localStorage.getItem('token')
  console.log(token)
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('https://localhost:7164/ListUser', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        PageIndex: 1,
        PageSize: 30
      }
    }).then(res => {
      setData(res.data.users)
    }).catch(error => console.log('error'))

  }, [])
  console.log(data)

  return (
    <div className='user height-cpn box'>
      <div className='user-add'>
        <div className='csp'>Add User</div>
      </div>
      <table className='bill-detail-table table'>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>SDT</th>
          <th>Status</th>
          <th></th>
        </tr>
        {data && data?.map((item, index) => (
          <tr key={index}>
            <td className='id'>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.adress}</td>
            <td>{item.phoneNumber}</td>
            <td className='user_status'>Active</td>
            <td className='csp edit-btn'>edit</td>
          </tr>
        ))}
      </table>
    
    </div>
  )
}

export default User
