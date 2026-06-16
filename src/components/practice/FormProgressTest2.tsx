import { useEffect, useRef, useState } from "react"

export default function FormProgressTestTwo() {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const form: HTMLFormElement = formRef.current;
    const formState: FormData = new FormData(form);
    const allValues = Object.fromEntries(formState.entries());
    console.debug('sas');
    setFormState(allValues);
  }, []);


  const calculateProgress = (currentState) => {
    let newProgress = 0;
    const totalFields = Object.entries(formState).length;

    for (const inputField of Object.values<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(formRef.current)) {
      if (inputField && inputField instanceof HTMLElement) {
        if (inputField?.hasAttribute('minlength')) {
          const min = Number(inputField.getAttribute('minlength'));
          const max = Number(inputField.getAttribute('maxlength'));
          if (inputField.value.length > min && inputField.value.length < max) {
            newProgress++;
          }
        }
        if (inputField instanceof HTMLSelectElement) {
          if (inputField.value) {
            newProgress++;
          }
        }
      }
    }

    const calculatedProgress = newProgress / totalFields * 100;
    setProgress(calculatedProgress);
  }

  const handleFormStateUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const t = e.currentTarget;
    const value = t.value;
    const key = t.name;
    const currentState = { ...formState, [key]: value };
    setFormState(currentState);
    calculateProgress(currentState);
    
  }

  return (<>
    <div className="form-test-two" style={{ margin: "auto" }}>
      <form ref={formRef} id="test-form-two">
        <div className="form-control">
          <label htmlFor="fname">First name</label>
          <input type="text" id="fname" name="fname" minLength={3} maxLength={120} required onChange={handleFormStateUpdate} />
        </div>
        <div className="form-control">
          <label htmlFor="lname">Last name</label>
          <input type="text" id="lname" name="lname" minLength={3} maxLength={120} required onChange={handleFormStateUpdate} />
        </div>
        <div className="form-control">
          <label htmlFor="dbx-character">Fav DBZ Character</label>
          <input
            type="text"
            id="dbx-character"
            name="dbx-character"
            minLength={3}
            maxLength={120}
            onChange={handleFormStateUpdate}
            required />
        </div>
        <div className="form-control">
          <label htmlFor="reason">Reason</label>
          <select id="reason" name="reason" required onChange={handleFormStateUpdate} >
            <option value="">-- Please Select --</option>
            <option value="complaint">Complaint</option>
            <option value="compliment">Compliment</option>
          </select>
        </div>
        <div className="form-control" style={{ height: "200px" }}>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={5} minLength={3} maxLength={4096} required  onChange={handleFormStateUpdate} />
        </div>
        <hr />
        <input type="submit" className="btn btn-success" disabled={progress !== 100} />
      </form>
      <hr />
      <div className="progression-wrapper" style={{ display: "flex", alignContent: "center", justifyContent: "space-between" }}>
        <div className="progress-number-container"><span className="progress-number">{progress}%</span></div>
        <div className="progress-container" style={{ width: "250px", height: "20px", backgroundColor: "lightgray" }}>
          <div className="progress-container" style={{ height: "100%", width: `${progress}%`, backgroundColor: "green" }}></div>
        </div>
      </div>
    </div>
  </>)
}
