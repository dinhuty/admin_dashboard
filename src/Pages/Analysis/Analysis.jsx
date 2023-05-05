import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Analysis = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) navigate('/signin')
    }, [])
    return (
        <div className='analysis height-cpn'>
            <h1>Analysis</h1>
        </div>
    )
}

export default Analysis
