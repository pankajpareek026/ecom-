//https://api2.bybit.com/api/exchange-rate?name=JPY

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
const Login = () => {
    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate('/products')
        }
    })
    const navigate = useNavigate()
    const [email, Setemail] = React.useState("")
    const [password, Setpassword] = React.useState("")
    const loginHandle = async () => {
        // console.log(email,password)
        let result = await fetch('https://gorgeous-lion-attire.cyclic.app/login', {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: { "content-Type": "application/json" }
        })
        result = await result.json()
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.User))
            localStorage.setItem("token", JSON.stringify(result.auth))
            swal("", "", "success")
            navigate("/")
        }
        else {

        }

    }
    return (
        <div className='login'>
            <h2 className='signup-head'>Login</h2>
            <input className='input-box' type="email" onChange={(e) => Setemail(e.target.value)} placeholder="  Email" required />
            <input className='input-box' type="password" onChange={(e) => Setpassword(e.target.value)} placeholder=" Password" required />
            <button onClick={loginHandle} className='signup-btn'>Login</button>
        </div>
    )
}
export default Login
