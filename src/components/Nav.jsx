
import { Link, useNavigate } from 'react-router-dom'
export default function Nav() {
    const logo = "https://i.ibb.co/0sx4T32/logoaaa-removebg-preview.png"
    const auth = localStorage.getItem('user')
    const navigate = useNavigate()
    const logout = () => {
        console.log("logout")
        localStorage.clear()

        navigate('/signup')
    }
    return (

        <div className='nav'>
            <img className='logo' src={logo} alt="" />
            {auth ? <ul className='nav-ul' >
                <li> <Link to="/">Products</Link> </li>
                <li> <Link to="/add">Add Product</Link> </li>
                <li> <Link to="/update">Update</Link> </li>
               
                <li className='align-right'> <Link to="/signup" onClick={logout} >Logout  [ {JSON.parse(auth).name} ]</Link> </li>
            </ul>
                :
                <ul className='nav-ul' style={{
                    marginLeft:
                        "auto"
                }} ><li> <Link to="/signup">Sign Up</Link> </li>
                    <li > <Link to="/login">Login</Link> </li></ul>}
        </div>
    )
}