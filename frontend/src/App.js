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
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userActions';
import store from "./store"
import axios from 'axios';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';


//payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import OrderDetails from './components/orders/OrderDetails';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import ProductReviews from './components/admin/ProductReviews';


const App =() =>{

  const [stripeApiKey, setStripeApiKey] = useState('')

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

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
      <ProtectedRoute>
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

<Route
     path="/orders/me"
     element={
      <ProtectedRoute >
        <ListOrders />
      </ProtectedRoute>
     }
    />


   
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

     <Routes>

     <Route
     path="/dashboard"
     element={
      <ProtectedRoute >
        <Dashboard />
      </ProtectedRoute>
     }
     isAdmin={true}
      />

<Route
     path="/admin/products"
     element={
      <ProtectedRoute >
        <ProductList />
      </ProtectedRoute>
     }
     isAdmin={true}
      />
      
      <Route
     path="/admin/orders"
     element={
      <ProtectedRoute >
        <OrdersList />
      </ProtectedRoute>
     }
     isAdmin={true}
      />

<Route
     path="/admin/product"
     element={
      <ProtectedRoute >
        <NewProduct />
      </ProtectedRoute>
     }
     isAdmin={true}
      />

<Route
     path="/admin/order/:id"
     element={
      <ProtectedRoute >
        <ProcessOrder />
      </ProtectedRoute>
     }
     isAdmin={true}
      />

      
<Route
     path="/admin/users"
     element={
      <ProtectedRoute >
        <UsersList />
      </ProtectedRoute>
     }
     isAdmin={true}
      />

<Route
     path="/admin/user/:id"
     element={
      <ProtectedRoute >
        <UpdateUser />
      </ProtectedRoute>
     }
     isAdmin={true}
      />

<Route
     path="/admin/product/:id"
     element={
      <ProtectedRoute >
        <UpdateProduct />
      </ProtectedRoute>
     }
     isAdmin={true}
      />

<Route
     path="/admin/reviews"
     element={
      <ProtectedRoute >
        <ProductReviews />
      </ProtectedRoute>
     }
     isAdmin={true}
      />


     </Routes>



     
     {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
    
    
    </div>
    </Router>
  );
}

export default App;
