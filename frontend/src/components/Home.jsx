import React from "react";
import { useEffect } from "react";

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../actions/productActions";


const Home = () => {

  const dispatch = useDispatch()

  const { loading, products, error, productsCount } = useSelector(state => state.products)

useEffect( () => {
  dispatch(getProducts())
}, [dispatch])

  return (
    <>
    { loading ? <Loader /> : (
      <>
      <MetaData title={'Buy best products online'} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">

        { products && products.map(product => (

          <Product key={product._id} product={product} />

        ))}

          
        </div>
      </section>
      </>
    ) }
   
    </>
  );
};

export default Home;
