import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconName } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import axios from 'axios'

const ProductDetail = () => {
    const [product, setProduct] = useState()
    const [size, setSize] = useState()
    const navigate = useNavigate()
    const { id } = useParams()
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) navigate('/signin')
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        axios.get('https://localhost:7164/api/Products/' + id)
            .then(res => {
                setProduct(res.data)
                setSize(res.data.sizes)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const handleViewProduct = () => {
        navigate('/')
    }
    const handleViewEditProduct = () => {
        navigate(`/product/edit/${id}`)
    }
    return (
        <div className='productdetail container'>
            <p className='detail-product-header'>Chi tiết mặt hàng</p>
            <div className='navigate-detail-product'>
                <span className='csp' onClick={handleViewProduct}>Products</span><span><BiChevronRight /></span><span>{product && <>{product.name}</>}</span>
            </div>

            {
                product ?
                    <div className='main-detail-product'>
                        <div className='detail-product'>
                            <div className='detail-product-item'><span>Sản phẩm:</span> <p>{product.name}</p></div>
                            <div className='detail-product-item'><span>Giá:</span><p>{product.price}</p> </div>
                            <div className='detail-product-item'><span>Mô tả: </span><p>{product.description}</p> </div>
                            <div className='detail-product-item'><span>Sizes:</span> </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                {
                                    size.map((item, index) => (

                                        <tr key={index}>
                                            <td>{item.size}</td>
                                            <td>{item.qty}</td>
                                        </tr>

                                    ))

                                }
                            </table>
                            {/* <div className='detail-product-item'><span>Sizes:</span> </div>
                            {
                                size.map((item, index) => (
                                    <div className='product-detail-size' key={index}>
                                        <p>Size: {item.size}</p>
                                        <p>Số lượng: {item.qty}</p>
                                    </div>
                                ))

                            } */}
                            <button>Add size</button>
                            <button onClick={handleViewEditProduct}>Edit</button>

                        </div>
                        <div className="detail-product">
                            <div className='detail-product-item'><span>Ảnh:</span>
                                <img src={`data:image/jpeg;base64,${product.im}`} className='img__product cursor-btn' />
                            </div>

                        </div>
                    </div> : 'ERROR'


            }

        </div>
    )
}

export default ProductDetail
