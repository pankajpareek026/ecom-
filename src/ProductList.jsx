import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
export default function ProductList() {

    const navigate = useNavigate()
    const [products, SetProducts] = React.useState([])
    useEffect(() => {
        getProducts()
    }, [])


    const getProducts = async () => { // to geting all products displayed inside table
        let result = await fetch('http://localhost:6500/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token')),
                user: JSON.parse(localStorage.getItem('user'))._id

            }
        })

        if (result.status === 401) {
            swal("Session Expired !", "Login Please ", "warning")
            localStorage.clear()
            navigate('login')
        }
        else {
            result = await result.json();
            SetProducts(result)
        }


    }
    // getProducts()

    const searchHandle = async (e) => {
        const key = e.target.value
        if (key) {
            let searchResult = await fetch(`http://localhost:6500/search/${e.target.value}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token')),
                    user: JSON.parse(localStorage.getItem('user'))._id
                }
            })
            searchResult = await searchResult.json()
            console.log(searchResult)
            if (searchResult) SetProducts(searchResult)

        }
        else {
            getProducts()

        }


    }

    const deleteHandle = async (id) => {  // function to delete existing Records 
        console.log(id)
        let permision = window.confirm("Delete Transaction")
        if (permision) {

            let result = await fetch(`http://localhost:6500/products/${id}`, {
                method: "delete",

            })
            result = await result.json()

            //    alert("deleted")
            getProducts()
        }
        else {
            console.log("cancled")
        }
    }
    return (
        <div className="product-list">
            <h2>products List</h2>
            <input type="search" onChange={searchHandle} className='search-box' placeholder='search product' />
            {products.length > 0 ? <>

                <table>
                    <thead>
                        <tr key={0}>
                            <th>S.no </th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Quantity</th>
                            <th>Opration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => {

                            return (<tr key={index}>
                                <td>{index + 1} </td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td>{item.quantity}</td>
                                <td><button onClick={() => deleteHandle(item._id)} >delete</button>
                                    <Link to={`/update/${item._id}`}>update</Link>
                                </td>


                            </tr>)
                        })}
                    </tbody>
                </table>
            </> : <h3>Product Not Found !</h3>
            }

        </div>
    )
}