import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BiChevronRight } from "react-icons/bi";
import '../products.css'
import './edit.css'
const Editproduct = () => {

    const [product, setProduct] = useState()
    const [selectedFile, setSelectedFile] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [data, setData] = useState({
        id: id,
        Name: '',
        Price: 0,
        Description: '',
    })
    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }
    useEffect(() => {
        axios.get('https://localhost:7164/api/Products/' + id)
            .then(res => {
                setProduct(res.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('Name', data.Name)
        formData.append('id', data.id)
        formData.append('Price', data.Price)
        formData.append('Description', data.Description)
        formData.append('Image', selectedFile)
        axios.put('https://localhost:7164/api/AdminProducts/CC', formData)
            .then(res => {
                navigate(`/product/${id}`)
            }).catch(error => {
                setError('Edit faild')
            })
    }

    useEffect(() => {
        axios.get('https://localhost:7164/api/Products/' + id)
            .then(res => {
                setProduct(res.data)
                setData({
                    ...data,
                    Name: res.data.name,
                    Price: res.data.price,
                    Description: res.data.description,
                })
            }).catch(error => {
                console.log(error)
            })
    }, [])
    console.log(data)
    const handleDelete = async () => {
        axios.delete('https://localhost:7164/api/AdminProducts/' + id)
            .then(res => {
                navigate('/')
            }).catch(error => {
                setError('Xoa that bai')
            })
    }
    const handleViewProduct = () => {
        navigate('/')
    }
    const handleViewDetailProduct = () => {
        navigate(`/product/${product.id}`)
    }
    // console.log(product)

    return (
        <div className='add-product container'>

            <p>Edit product</p>
            <div className='navigate-edit-product'>
                <span className='csp' onClick={handleViewProduct}>Products</span><span><BiChevronRight /></span>
                <span className='csp' onClick={handleViewDetailProduct}>{product && <>{product.name}</>}</span><span><BiChevronRight /></span>
                <span className='csp' >{product && <>edit</>}</span>
            </div>
            {error ? <span className='error-add'>{error}</span> : <></>}
            <form method='post' encType="multipart/form-data" className='add-product-frm' onSubmit={handleSubmit}>
                <div className='add-product-input-text'>
                    <span>Tên sản phẩm: </span>
                    <input
                        disabled={true}
                        className='input'
                        name='Name'
                        type="text"
                        value={data.Name}
                        onChange={changeHandler}
                    />
                </div>
                <div className='add-product-input-text'>
                    <span>Giá: </span>

                    <input
                        className='input'
                        type="number"
                        name="Price"
                        value={data.Price}
                        onChange={changeHandler}
                    />
                </div>
                <div className='add-product-input-text'>
                    <span>Mô tả sản phẩm: </span>

                    <textarea
                        className='input'
                        type="text"
                        name="Description"
                        value={data.Description}
                        onChange={changeHandler}
                    />
                </div>
                <div className='add-product-input-file'>
                    <span>Chọn ảnh: </span>

                    <input
                        className='input'
                        type="file"
                        name="Image"
                        value={data.Image}
                        onChange={handleFileSelect}
                        placeholder="image"
                    />
                </div>
                <div className='add-product-input-submit'>
                    <input
                        className='input'
                        type="submit"
                        value="Update"
                    />
                    <input
                        className='input'
                        type="button"
                        value="Delete"
                        onClick={handleDelete}
                    />
                </div>
            </form>
        </div>
    )
}

export default Editproduct
