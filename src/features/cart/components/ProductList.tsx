import React, { useState } from "react";
import { getAllProducts, Product } from "../domain/Product";
import { useClassCart } from "../context/CartClassProvider";

export default function ProductList() {
  const [ productList ] = useState<Product[]>(getAllProducts());
  const { dispatch } = useClassCart();

  const iconStyle = {
    fontSize: "38px",
    marginBottom: "20px",
    transition: "all 0.5s",
    color: "#fff",
    width: "100px",
    height: "100px",
    padding: "30px 0",
    borderRadius: "50%",
    background: "linear-gradient(to right, #6372ff 0%, #5ca9fb 100%)",
    boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.05)"
  }

  const handleAddToCart = (evt: React.MouseEvent<HTMLButtonElement>, item: Product) => {
    evt.preventDefault();
    dispatch({ type: 'ADD_TO_CART', item });
  }

  return (
    <>
      <div id="products" className="text-center section">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Products</h2>
          </div>

          <div className="row product-list">
            {productList &&
              productList.map((p: Product) => (
                <div key={p.id} className="col-xs-6 col-md-3 product-name">
                  <i className={`fa fa-solid ${p.icon}`} style={iconStyle}></i>
                  <div>{p.name} <small><em>({p.sku})</em></small></div>
                  <div>
                    <button className="add-cart" onClick={(e) => handleAddToCart(e, p)}>
                      Add to cart&nbsp;&nbsp;<i className="fa fa-add"></i>
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}
