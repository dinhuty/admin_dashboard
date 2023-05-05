import React, { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Order = () => {

  const token = localStorage.getItem('token')
  const [data, setData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    if(!token) navigate('/signin')
    axios.get('https://localhost:7164/GetAllBill', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        PageIndex: 1,
        PageSize: 30
      }
    }).then(res => setData(res.data))
      .catch(error => {
        console.log('error gete bill')
      })
  },[])
  const handleView = (id) => {
    navigate(`/order/${id}`)
  }
  return (
    <div className='order container height-cpn box'>
      <h1>----Order---</h1>
      <table className='user-table'>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>SDT</th>
          <th>Trạng thái đơn hàng</th>
          <th></th>
        </tr>
        {data && data?.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.status}</td>
            <td className='csp edit-btn' onClick={() => handleView(item.id)}>Chi tiết</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Order
