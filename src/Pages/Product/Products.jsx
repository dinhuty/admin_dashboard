import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './products.css'
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if(!token) navigate('/signin')
    axios.get('https://localhost:7164/api/Products/GetProduct', {
      params: {
        PageIndex: 1,
        PageSize: 30
      }
    }).then(res => {
      setData(res.data.products)
    }).catch(error => console.log('error'))

  }, [])

  const hanldeView = (id) => {
    navigate(`/product/${id}`)
  }
  const hanldeViewAdd = () => {
    navigate(`/product/add`)
  }
  console.log(data)
  return (
    <div className='product container height-cpn box'>
      <div className='user-add'>
        <div className='csp' onClick={hanldeViewAdd}>Add Product</div>
      </div>
      <table className='user-table'>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Price</th>
          <th>Status</th>
          <th></th>
        </tr>
        {data && data?.map((item, index) => (
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>on sale</td>
            <td className='csp edit-btn' onClick={() => hanldeView(item.id)}>detail</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Products
