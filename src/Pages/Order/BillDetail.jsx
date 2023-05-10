import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BiChevronRight } from 'react-icons/bi'
import './bill.css'

const BillDetail = () => {

    const token = localStorage.getItem('token')
    const { id } = useParams()
    const [bill, setBill] = useState()
    const [status, setStatus] = useState()
    const [payStatus, setPayStatus] = useState()
    const [load, setLoad] = useState()
    const navigate = useNavigate()
    const arr = [
        'Đang giao hàng',
        ''
    ]

    useEffect(() => {
        axios.get('https://localhost:7164/BillDetail/', {
            params: {
                id: id
            }
        })
            .then(res => {
                setBill(res.data)
                setStatus(res.data.orderStatus)
                setPayStatus(res.data.payStatus)
            })
            .catch(error => console.log('error get detail bill'))
    }, [load])

    const hanldeSetStatus = (stt) => {
        axios.patch('https://localhost:7164/SetBill/Status', [{
            id: id,
            status: stt
        }],
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(res => {
                setLoad(!load)
                console.log('thanh cong')
            })
            .catch(error => console.log('Error set status'))
    }
    const handleViewProduct = () => {
        navigate('/order')
    }
    console.log(bill)
    return (
        <div className='bill container height-cpn'>
            <p className='detail-title'>Chi tiết hóa đơn</p>
            <div className='navigate-detail-bill'>
                <span className='csp' onClick={handleViewProduct}>Products</span><span><BiChevronRight /></span>
                <span className='csp'>Chi tiết đơn hàng</span>
            </div>
            {
                bill &&
                <>

                    <div className='bill-detail'>
                        <p className="bill-detail-title">
                            Thông tin giao hàng:
                        </p>
                        <div className="detail-info">
                            <p><span>Giao hàng tới: </span>Xóm 4 - Giao tiến - Giao Thủy - Nam Định</p>
                            <p><span>Số điện thoại: </span>0367570800</p>
                            <p><span>Email: </span>{bill.email}</p>

                        </div>
                        <p className="bill-detail-title">
                            Trạng thái:
                        </p>
                        <div className="detail-status">
                            {
                                payStatus === 'Thanh toán thành công' &&
                                <p><span>Trạng thái thanh toán: </span><p className='detail-status-name success-order'>Đã thanh toán</p></p>

                            }
                            {
                                payStatus === 'Chưa thanh toán' &&
                                <p><span>Trạng thái thanh toán: </span><p className='detail-status-name cancle-status'>Thanh toán khi nhận hàng</p></p>

                            }

                            <p><span>Thời gian đặt: </span>{bill.orderDate}</p>
                        </div>
                        <div className="detail-status">
                            {
                                status === 'Đã hủy đơn' &&
                                <p><span>Trạng thái đơn hàng: </span><p className='detail-status-name cancle-status'>{bill.orderStatus}</p></p>

                            }
                            {
                                status === 'Đang giao hàng' &&
                                <p><span>Trạng thái đơn hàng: </span><p className='detail-status-name shipping-status'>{bill.orderStatus}</p></p>
                            }
                            {
                                (status === 'Đã đặt hàng' || status === 'Chờ thanh toán') &&
                                <p><span>Trạng thái đơn hàng: </span><p className='detail-status-name'>{bill.orderStatus}</p></p>
                            }
                            {
                                status === 'Đã giao hàng' &&
                                <p><span>Trạng thái đơn hàng: </span><p className='detail-status-name success-order'>{bill.orderStatus}</p></p>
                            }
                            <p><span>Thời gian đặt: </span>{bill.orderDate}</p>
                        </div>
                        <p className="bill-detail-title">
                            Thông tin sản phẩm đặt:
                        </p>
                        <div className='bill-detail-product'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>IDProduct</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Size</th>
                                        <th>Số lượng</th>
                                        <th>Giá</th>
                                    </tr>
                                </thead>
                                {
                                    bill.detail.map((item, index) => (

                                        <tr key={index}>
                                            <td>{item.productId}</td>
                                            <td>{item.productName}</td>
                                            <td>{item.size}</td>
                                            <td>{item.qty}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    ))
                                }
                            </table>

                        </div>
                        {
                            (status === 'Đã đặt hàng' || status === 'Chờ thanh toán') &&
                            <p className="hanldeStatus">
                                <button className='cancel-order csp' onClick={() => hanldeSetStatus(0)}>Vận chuyển đơn</button>
                                <button className='cancel-order csp' onClick={() => hanldeSetStatus(1)}>Hủy đơn này</button>
                            </p>
                        }
                        {
                            (status === 'Đang giao hàng') &&
                            <p className="hanldeStatus">
                                <button className='cancel-order csp' >Thông tin vận chuyển</button>
                            </p>
                        }
                        {
                            (status === 'Đã hủy đơn') &&
                            <p className="hanldeStatus">
                                <button className='cancel-order csp' >Xóa đơn hàng</button>
                            </p>
                        }
                        {
                            (status === 'Đã giao hàng') &&
                            <p className="hanldeStatus">
                                <button className='cancel-order csp'>Xem đánh giá</button>
                            </p>
                        }
                    </div>
                </>

            }

        </div>
    )
}

export default BillDetail
