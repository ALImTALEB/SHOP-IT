import './App.css';

import { useEffect, useState } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails';

//cart imports
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';

//order imports
import OrderSuccess from './components/cart/OrderSuccess';

import ListOrders from './components/orders/ListOrders';

//user imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';

import ProtectedRoute from './components/route/ProtectedRoute';
import UpdatePassword from './components/user/UpdatePassword';

import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

//admin imports
import Dashboard from './components/admin/Dashboard';

import { loadUser } from './actions/userActions';
import store from "./store"
import axios from 'axios';

//payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderDetails from './components/orders/OrderDetails';


const App =() =>{

  const [stripeApiKey, setStripeApi] = useState('')

  useEffect( () => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi')
      
      setStripeApi(data.stripeApiKey)
    }

    getStripeApiKey()

  }, [] )

  return (
    <Router>
    <div className="App">
      <Header />
      <div className="container container-fluid">
     <Routes>
     <Route path="/" element={<Home />} exact />
     <Route path="/search/:keyword" element={<Home />} />
     <Route path="/product/:id" element={<ProductDetails />} exact />
     <Route path="/cart" element={<Cart />} exact />


     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/password/forgot" element={<ForgotPassword />} exact />
     <Route path="/password/reset/:token" element={<NewPassword />} exact />

     <Route
     path="/me"
     element={
      <ProtectedRoute isAdmin={true} >
        <Profile />
      </ProtectedRoute>
     }
    />

<Route
     path="/me/update"
     element={
      <ProtectedRoute >
        <UpdateProfile />
      </ProtectedRoute>
     }
    />

<Route
     path="/password/update"
     element={
      <ProtectedRoute >
        <UpdatePassword />
      </ProtectedRoute>
     }
    />


<Route
     path="/order/:id"
     element={
      <ProtectedRoute >
        <OrderDetails />
      </ProtectedRoute>
     }
    />


<Route
     path="/shipping"
     element={
      <ProtectedRoute >
        <Shipping />
      </ProtectedRoute>
     }
    />

<Route
     path="/order/confirm"
     element={
      <ProtectedRoute >
        <ConfirmOrder />
      </ProtectedRoute>
     }
    />

<Route
     path="/success"
     element={
      <ProtectedRoute >
        <OrderSuccess />
      </ProtectedRoute>
     }
    />



<Route exact path='/orders/me' element={<ProtectedRoute />}>
            <Route exact path='/ProtectedRoute' element={<ListOrders />}/>
          </Route>


<Route
     path="/dashboard"
     element={
      <ProtectedRoute >
        <Dashboard />
      </ProtectedRoute>
     } />
   
      <Route
     path="/payment"
     element={
       stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
      <ProtectedRoute >
        <Payment />
      </ProtectedRoute>
      </Elements>
     }
    />
    

     </Routes>
     </div>
     <Footer />
    </div>
    </Router>
  );
}

export default App;
