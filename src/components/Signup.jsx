
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
    const [name, Setname] = React.useState()
    const [email, Setemail] = React.useState()
    const [password, Setpassword] = React.useState()
    const navigate = useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/products')
        }
    })
    const colletData = async () => {
        // alert(`${name} , ${email} , ${password}`)
        let result = await fetch('https://gorgeous-lion-attire.cyclic.app/register', {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                'content-Type': 'application/json'
            }
        })
        result = await result.json()
        if (result) {
            localStorage.setItem("user", JSON.stringify(result.User))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate('/')

        }
        console.log(result)
    }
    return (
        <div className='signup'>
            <h2 className='signup-head'>signup</h2>
            <input className='input-box' type="text" onChange={(e) => Setname(e.target.value)} placeholder="Full Name" required />
            <input className='input-box' type="email" onChange={(e) => Setemail(e.target.value)} placeholder="  Email" required />
            <input className='input-box' type="password" onChange={(e) => Setpassword(e.target.value)} placeholder=" Password" required />
            <button onClick={colletData} className='signup-btn'>signup</button>
        </div>
    )
}
