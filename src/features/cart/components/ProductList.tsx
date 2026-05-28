import React, { useState } from "react";
import { getAllProducts, Product } from "../domain/Product";
import { useClassCart } from "../context/CartClassProvider";

export default function ProductList() {
  const [ productList ] = useState<Product[]>(getAllProducts());
  const { cart, dispatch } = useClassCart();

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

  const handleRemoveFromCart = (evt: React.MouseEvent<HTMLButtonElement>, item: Product) => {
    evt.preventDefault();
    dispatch({ type: 'REMOVE_FROM_CART', item });
  }

  const countInCart = (product: Product): number => {
    const v = cart.cartItems.find((item) => item.item.id == product.id);
    return v ? v.quantity : 0;
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
                  <h3>
                    {p.name} <small><em>({p.sku})</em></small>
                  </h3>
                  <div className="product-description">
                    {p.description}
                  </div>
                  <div>
                    <div className="cart-actions-container" onClick={(e) => e.preventDefault()}>
                      <button className="cart-actions remove-cart" onClick={(e) => handleRemoveFromCart(e, p)}>
                        <i className="fa fa-minus"></i>
                      </button>
                      &nbsp;&nbsp;
                      Add to cart ({countInCart(p)})
                      &nbsp;&nbsp;
                      <button className="cart-actions add-cart" onClick={(e) => handleAddToCart(e, p)}>
                        <i className="fa fa-add"></i>
                      </button>
                    </div>
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
