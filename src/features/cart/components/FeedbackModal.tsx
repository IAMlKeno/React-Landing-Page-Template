import { useEffect, useRef } from "react";

type ModalOpts = {
  isOpen: boolean;
  onClose?: Function;
  iframeSrc: string;
  children?: any;
}

export default function FeedbackModal(props: ModalOpts) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (props.isOpen) {
      dialog.showModal();
      dialog.close();
    }
  }, [props.isOpen]);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onClose();
  }

  return (<>
    <dialog className="modal-box">
      <div className="modal-content">
        <div id="feedback" className="text-center">
          <div className="container">
            <div className="section-title">
              <h2><a data-toggle="collapse" href="#signup-form-container">Click To Sign Up</a></h2>
            </div>
            <div className="row collapse" id="feedback-form-container">
              <iframe
                src={props.iframeSrc}
                width="640"
                height="2017"
                style={{ marginTop: "0", marginBottom: "0" }}>
                Loading…
              </iframe>
            </div>
          </div>
        </div>

        <button onClick={handleClose}>Close</button>
      </div>
    </dialog>
  </>)
}
