import React, { Fragment } from "react";
import { useEffect, useState } from "react";

import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";



import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)


const Home = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);

  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const params = useParams();
  const { keyword } = params;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, alert, error, keyword, currentPage, price]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Buy best products online"} />
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5 ">
                    <div className="px-5">

                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`
                         
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        onChange={(price) => setPrice(price)}
                        value={price}
                        tipFormatter={(value) => `$${value}`}
                      />
                    </div>
                  </div>

                  <div className="col-6 col-md-9 ">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
          </section>

          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;
