import React, { useEffect } from 'react'
import swal from 'sweetalert'
import { useParams } from 'react-router-dom'

const Update = () => {

    const params = useParams()
    const [name, Setname] = React.useState("")
    const [price, SetPrice] = React.useState("")
    const [category, SetCategory] = React.useState("")
    const [company, SetCompany] = React.useState("")
    const [err, SetError] = React.useState(false)
    const GetData = async () => {
        let singleData = await fetch(`http://localhost:6500/products/${params.id}`)
        singleData = await singleData.json()
        console.log(singleData.name)
        Setname(singleData.name)
        SetPrice(singleData.price)
        SetCategory(singleData.category)
        SetCompany(singleData.company)
    }
    useEffect(() => {
        GetData()

    })
    const updateHandle = async () => {


        console.log("Add button clicked \n", name, price, category, company)
        // Setname("")
        // SetCompany("")
        // SetPrice("")
        // SetCategory("")
        if (!name || !price || !category || !company) {
            SetError(true)
            return false;
        }
        else {
            console.log(name, price, category, company)

            let result = await fetch("http://localhost:6500/update", {
                method: "PUT",
                body: JSON.stringify({ name, price, category, company, _id: params.id }),
                headers: { 'content-Type': 'application/json' }

            })

            result = await result.json()
            console.log(result)
           if(result.matchedCount)swal("updated successfully")
           else swal("updated successfully")

        }



    }

    return (
        <div className="add">

            <h3>Update</h3>
            <input type="text" defaultValue={name} onChange={(e) => { Setname(e.target.value) }} placeholder='Product Name' required={true} />
            {err && !name && <span className='invalid-input' >Enter Valid Name</span>}
            <input type="number" defaultValue={price} onChange={(e) => SetPrice(e.target.value)} placeholder='Product Price' required={true} />
            {err && !price && <span className='invalid-input' >Enter Valid Price</span>}
            <select name="" id="" defaultValue={category} onChange={(e) => SetCategory(e.target.value)} required={true}>
                <option value="Category" selected disabled={true}>category</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Watch">Watch</option>
                <option value="Freez">Freez</option>
            </select>
            {err && !category && <span className='invalid-input'>Please Select Valid Category </span>}
            <input type="text" defaultValue={company} onChange={(e) => SetCompany(e.target.value)} placeholder="Product Company" required={true} />
            {err && !company && <span className='invalid-input' >Enter Valid Company</span>}
            <button onClick={updateHandle} >Update</button>

        </div>
    )
}
export default Update