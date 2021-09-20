import React, { Fragment, useEffect } from "react";
import Header from "../components/UI/Header";
import Products from "../components/Product/Products";
import Filter from "../components/Product/Filter/Filter";
import Footer from "../components/UI/Footer";
import classes from "../styles/App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { productsActions } from "../app/productsSlice";
import axios from "axios";

function App({ products }) {
  const showProducts = useSelector((state) => state.showProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.setProductsData(products));
    dispatch(productsActions.setShowProductsData(products));
  }, [dispatch]);

  return (
    <Fragment>
      <Header title="Products List Page" />
      <div className={classes.Wrapper}>
        <Filter />
        <Products list={showProducts} />
      </div>
      <Footer />
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const response = await axios.get("http://localhost:8000/products");

  const products = response.data.map((product) => {
    return {
      id: product.id,
      name: product.productName,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      currencyType: product.priceCurrency,
      brand: product.brand,
    };
  });

  return {
    props: {
      products,
    },
  };
};

export default App;
