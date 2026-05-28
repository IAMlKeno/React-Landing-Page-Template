import React, { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { useClassCart } from "../context/CartClassProvider";

export default function CartIcon() {
  const { cart } = useClassCart();
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
  const [ cartCount, setCartCount ] = useState<number>(0);

  useEffect(() => {
    const displayedItemCount = cart.totalItems > 0 ? cart.totalItems : 0;
    setCartCount(displayedItemCount);
  }, [cart]);

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsModalOpen(true);
  }

  return (
    <>
      <button onClick={handleClick} style={{display: "inline-block", border: "1px solid"}}>
        <span><i className="fa fa-shopping-cart"></i></span><span className="items-cart-count">{cartCount}</span>
      </button>
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} children={cart} />
    </>
  );
}
