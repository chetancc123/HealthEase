import {Link, Route, Routes} from 'react-router-dom';
import SignIn from './Components/signin.js';
import Home from './Components/home.js';
import SignUp from './Components/signup.js';
import Admin from './Components/admin.js';
import Customer from './Components/customer.js';
import AddCategory from './Components/addCategory.js';
import AddProduct from './Components/addProduct.js';
import AddSalesman from './Components/addSalesman.js';
import AddOrder from './Components/AddOrder.js';
import Category from './Components/Category.js';
import Product from './Components/product.js';
import Order from './Components/order.js';
import Salesman from './Components/salesman.js';
import CustData from './Components/customerData.js';
function App() {
  return (
    <div className="">
      <Link to="/"></Link>
      
      <Routes>
        <Route path='/' element={<Home/>}> </Route>
        <Route path='/signin' element={<SignIn/>}> </Route>
        <Route path='/signup' element={<SignUp/>}> </Route>
        <Route path='/admin' element={<Admin/>}> </Route>
        <Route path='/customer' element={<Customer/>}> </Route>
        <Route path='/addCategory' element={<AddCategory/>}></Route>
        <Route path='/addProduct' element={<AddProduct/>}></Route>
        <Route path='/addSalesman' element={<AddSalesman/>}></Route>
        <Route path='/addOrder' element={<AddOrder/>}></Route>
        <Route path='/category' element={<Category/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/order' element={<Order/>}></Route>
        <Route path='/salesman' element={<Salesman/>}></Route>
        <Route path='/custData' element={<CustData/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
