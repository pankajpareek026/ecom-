import React from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
const AddProduct = () => {

const navigate=useNavigate()  ;
  const [name, Setname] = React.useState("")
    const [price, SetPrice] = React.useState("")
    const [category, SetCategory] = React.useState("")
    const [company, SetCompany] = React.useState("")
    const [quantity, SetQuantity] = React.useState("")
    const [err, SetError] = React.useState(false)
    const addHandle = async () => {

        let userId = JSON.parse(localStorage.getItem('user'))._id
        console.log("Add button clicked \n", userId, name, price, category, quantity, company)
        // SetProdctName("")
        // SetCompany("")
        // SetPrice("")
        // SetCategory("")
        if (!name || !price || !category || !company || !quantity) {
            SetError(true)
            return false;
        }

        let result = await fetch("https://gorgeous-lion-attire.cyclic.app/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, quantity, company, userId }),
            headers: {
                'content-Type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('token')),
            }
        })
        console.log(result.statusText)
        if (result.status === 401) {
            localStorage.clear()
            swal("Session Expired !", "Login Again", "error")
            navigate('/login')
        }
        else {
            result = await result.json()
            // swal(result)
            swal(`inserted`)
            Setname("")
            SetPrice("")
            SetCategory("")
            SetCompany("")
            SetQuantity("")
            navigate('/')
        }

    }
    // swal("hii")
    return (
        <div className="add">
            {/* <form action=""> */}
            <h3>Add Product</h3>
            <input type="text" defaultValue={name} onChange={(e) => Setname(e.target.value)} placeholder='Product Name' />
            {err && !name && <span className='invalid-input' >Enter Valid Name</span>}
            <input type="number" defaultValue={price} onChange={(e) => SetPrice(e.target.value)} placeholder='Product Price' />
            {err && !price && <span className='invalid-input' >Enter Valid Price</span>}
            <select name="" id="" defaultValue={"category"} onChange={(e) => SetCategory(e.target.value)} >
                <option value="Category" defaultValue="Category" selected={true} disabled={true}>category</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Watch">Watch</option>
                <option value="Freez">Freez</option>
            </select>
            {err && !category && <span className='invalid-input' >Please Select Valid Category </span>}
            <input type="number" placeholder='Quantity' onChange={(e) => SetQuantity(e.target.value)} />
            {err && !quantity && <span className='invalid-input' >Please Enter Quantity </span>}
            <input type="text" defaultValue={company} onChange={(e) => SetCompany(e.target.value)} placeholder="Product Company" />
            {err && !company && <span className='invalid-input' >Enter Valid Company</span>}
            <button onClick={addHandle} >Add Product</button>
            {/* </form> */}
        </div>
    )
}
export default AddProduct
