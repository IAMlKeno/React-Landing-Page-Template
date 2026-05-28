import { useRef, useEffect } from "react";
import { CartItem, ICart } from "../domain/Cart";

type ModalOpts = {
  isOpen: boolean;
  onClose: Function;
  onEmptyCart?: Function;
  children: ICart;
}

const emptyCart = (<div>The cart is empty</div>);

export default function CartModal(opts: ModalOpts) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (opts.isOpen) {
      dialog.showModal(); // Opens as a modal overlay
    } else {
      dialog.close();
    }
  }, [opts.isOpen]);

  const buildCartList = (): any => {
    return (
      <div className="cart-list">
        {opts.children.cartItems.map((child: CartItem, i) => (
          <div key={child.item.id} className="cart-list-item">
            <span>{child.item.name}</span> <span>({child.quantity}) ${child.costPerItem.toFixed(2)}</span>
          </div>
        ))}
        <div className="cart-total" style={{borderTop:"2px double", textAlign: "right"}}>
          <div>
            <span>${opts.children.totalCost.toFixed(2)}</span>
          </div>
          <div></div>
        </div>
      </div>
    )
  };

  // Handle native "Escape" key dismissals locally
  const handleCancel = (e: React.MouseEvent<HTMLDialogElement>) => {
    e.preventDefault();
    opts.onClose();
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    opts.onClose();
  }

  const handleOnEmpty = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (opts?.onEmptyCart) {
      opts.onEmptyCart();
    }
  }

  return (
    <dialog ref={dialogRef} onCancel={handleCancel} className="modal-box">
      <div className="modal-content">
        <div className="cart-list-container">
          {opts.children.totalItems > 0
            ? buildCartList()
            : emptyCart
          }
        </div>
        <hr />
        {opts.children &&
          <button onClick={handleOnEmpty}>Empty Cart</button>
        }
        &nbsp;
        <button onClick={handleClose}>Close</button>
      </div>
    </dialog>
  );
}
