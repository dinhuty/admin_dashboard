import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './products.css'

const AddProduct = () => {

    const [selectedFile, setSelectedFile] = useState(null)
    const navigate = useNavigate()
    const [error, setError] = useState()
    const [data, setData] = useState({
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

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('Name', data.Name)
        formData.append('Price', data.Price)
        formData.append('Description', data.Description)
        formData.append('Image', selectedFile)

        axios.post('https://localhost:7164/api/AdminProducts/Add/Product', formData)
            .then(res => {
                if (res.data == 'Image or category maybe null!!') {
                    setError('Image or category maybe null!!')
                } else {
                    navigate(`/product/${res.data}`)
                }

            }).catch(error => {
                console.log('add faild')
            })
    }
    console.log(data)
    return (
        <div className='add-product'>
            <p>Thêm sản phẩm</p>
            {error ? <span className='error-add'>{error}</span> : <></>}
            <form method='post' encType="multipart/form-data" className='add-product-frm' onSubmit={handleSubmit}>
                <div className='add-product-input-text'>
                    <span>Tên sản phẩm: </span>
                    <input
                        className='input'
                        name='Name'
                        type="text"
                        value={data.name}
                        onChange={changeHandler}
                    />
                </div>
                <div className='add-product-input-text'>
                    <span>Giá: </span>

                    <input
                        className='input'
                        type="number"
                        name="Price"
                        value={data.price}
                        onChange={changeHandler}
                    />
                </div>
                <div className='add-product-input-text'>
                    <span>Mô tả sản phẩm: </span>

                    <textarea
                        className='input'
                        type="text"
                        name="Description"
                        value={data.description}
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
                        value="Thêm"
                    />
                </div>
            </form>
        </div>
    )
}

export default AddProduct

// import React from 'react';
// import axios from 'axios';

// const AddProduct = () => {
//   // a local state to store the currently selected file.
//   const [selectedFile, setSelectedFile] = React.useState(null);

//   const handleSubmit = async(event) => {
//     event.preventDefault()
//     const formData = new FormData();

//     formData.append("Name", 'Dinh');
//     formData.append("Price", 200);
//     formData.append("Description", 'ok');
//     formData.append("Image", selectedFile);


//     console.log(selectedFile)
//     try {
//       const response = await axios({
//         method: "post",
//         url: "https://localhost:7164/api/AdminProducts/Add/Product",
//         data: formData,
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log(formData)
//     } catch(error) {
//       console.log(error)
//     }
//   }

//   const handleFileSelect = (event) => {
//     setSelectedFile(event.target.files[0])
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileSelect}/>
//       <input type="submit" value="Upload File" />
//     </form>
//   )
// };

// export default AddProduct;
