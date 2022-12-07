import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'
import Footer from './components/Footer'
import Signup from './components/Signup';

import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './ProductList';
import Update from './components/Update';
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />} >
            <Route path='/' element={<ProductList />} />
            <Route path='/logout' element={<h1>Logout Page !</h1>} />
            <Route path='/update/:id' element={<Update />} />

            <Route path='/add' element={<AddProduct />} />
          </Route>

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>

  );
}

export default App;
