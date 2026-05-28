import { useRef, useEffect } from "react";
import { CartItem, ICart } from "../domain/Cart";

const emptyCart = (<div>The cart is empty</div>);
type ModalOpts = {
  isOpen: boolean;
  onClose: Function;
  children: ICart;
}
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
      <ul>
        {opts.children.cartItems.map((child: CartItem, i) => (
          <li key={child.item.id}>
            {child.item.name}
          </li>
        ))}
      </ul>
    )
  };

  // Handle native "Escape" key dismissals locally
  const handleCancel = (e: React.MouseEvent<HTMLDialogElement>) => {
    e.preventDefault();
    opts.onClose();
  };

  return (
    <dialog ref={dialogRef} onCancel={handleCancel} className="modal-box">
      <div className="modal-content">
        {opts.children.totalItems > 0
          ? buildCartList()
          : emptyCart
        }
        <button onClick={() => opts.onClose()}>Close</button>
      </div>
    </dialog>
  );
}
