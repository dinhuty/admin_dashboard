import React, { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Order = () => {

  const token = localStorage.getItem('token')
  const [data, setData] = useState()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!token) navigate('/signin')
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
  }, [])
  console.log(data)
  const handleView = (id) => {
    navigate(`/order/${id}`)
  }
  return (
    <div className='order  height-cpn box'>
      <table className='user-table order_table table'>
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
            {
              item.status == 'Đã đặt hàng' && <td className="status1">{item.status}</td>
            }
            {
              item.status == 'Đang giao hàng' && <td className="status2">{item.status}</td>
            }
            {
              item.status == 'Đã giao hàng' && <td className="status3">{item.status}</td>
            }
            {
              item.status == 'Đã hủy đơn' && <td className="status4">{item.status}</td>
            }

            <td className='csp edit-btn' onClick={() => handleView(item.id)}>Chi tiết</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Order
