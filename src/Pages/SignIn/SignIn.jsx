import React, { useState } from 'react'
import './sign.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
const SignIn = () => {
    const isLogin = localStorage.getItem('token')
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState('')
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    useEffect(() => {
        if (isLogin) navigate('/')
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("https://localhost:7164/api/Accounts/SignIn", data)
            .then(res => {
                const token = res.data.token;
                const user = res.data.user;
                localStorage.setItem('token', token);
                localStorage.setItem('user', user);
                navigate('/')
            }).catch(errors => {
                if (!errors?.response) {
                    setLoginError('No Server Response')
                } else if (errors.response?.status === 400) {
                    setLoginError("Sai tài khoản hoặc mật khẩu");
                } else if (errors.response?.status === 401) {
                    setLoginError("Unauthorized");
                } else {
                    setLoginError("Đăng nhập thất bại");
                }
            })
    };
    console.log(data)

    return (
        <div className='signin container'>
            <form className='sign-form' onSubmit={handleSubmit}>
                <p className='sign-title'>Admin</p>
                <div className='sign-input'>
                    <input
                        className='input'
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={changeHandler}
                        placeholder="Email"
                    />
                </div>
                <div className='sign-input'>
                    <input
                        className='input'
                        type="Password"
                        name="password"
                        value={data.password}
                        onChange={changeHandler}
                        placeholder="Mật khẩu"
                    />
                </div>

                <div className='sign-input sign-btn'>
                    <button className='sign-in__btn' type="submit">Đăng nhập</button>
                </div>
            </form>
        </div>

    )
}

export default SignIn
